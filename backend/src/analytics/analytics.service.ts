import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UrlAssessmentDto } from './dto/url-assessment.dto';
import { SourceAnalyticsService } from './services/source-analytics.service';
import { chromium } from 'playwright';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import { ContentAnalyticsService } from './services/content-analytics.service';
import { CredabilityScore } from 'src/common/interfaces/credability-score.interface';
import { AIAnalyticsService } from './services/ai-analytics.service';
import { ResultService } from 'src/result/result.service';
import { CreateResultDto } from 'src/result/dto/create-result.dto';

const paywallKeywords = [
  'subscribe',
  'log in',
  'sign in',
  'preview',
  'verify access',
];
const patterns = ['/advertisement/i', '/skip advertisement/i', '/video/i'];

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly resultService: ResultService,
    private readonly sourceService: SourceAnalyticsService,
    private readonly contentService: ContentAnalyticsService,
    private readonly aiService: AIAnalyticsService,
  ) {}

  async urlAssessment(data: UrlAssessmentDto) {
    const url_content = await this.getUrlContent(data.url);

    const [ai_analysis, content_analysis, domain_analysis] = await Promise.all([
      this.aiService.evalWithModels(url_content.text),
      this.contentService.evalContent(url_content.title),
      this.sourceService.evalDomain(data.url),
    ]);

    const { hasClaims, claims } = content_analysis;

    const overall_score = this.getOverallScore({
      aiScore: ai_analysis,
      domainScore: domain_analysis,
      factCheckCount: content_analysis.hasClaims ? 1 : 0,
    });

    const result = await this.resultService.create({
      title: url_content.title ?? 'Your article',
      aiAnalysis: ai_analysis,
      contentAnalysis: { hasClaims },
      claims: Array.isArray(claims) ? claims : [],
      domainScore: domain_analysis,
      overallScore: overall_score,
    });

    return { id: result.id }
  }

  async textAssessment() {}

  async getUrlContent(url: string) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 15000,
      });

      const htmlContent = await page.content();
      await browser.close();

      const dom = new JSDOM(htmlContent, { url });
      const reader = new Readability(dom.window.document);
      const article = reader.parse();

      if (!article || !article.textContent) {
        throw new BadRequestException('Sorry, article could not be extracted');
      }

      let text = article.textContent.trim();
      const title = article.title?.trim();

      text = text.toLowerCase();
      if (paywallKeywords.some((keyword) => text.includes(keyword))) {
        throw new BadRequestException(
          'Sorry, article could not be extracted. Most likely due to paywall.',
        );
      }

      patterns.forEach((pattern) => {
        text = text.replace(pattern, '');
      });

      return {
        title: title,
        text: text,
      };
    } catch (error) {
      await browser.close();
      throw new InternalServerErrorException(
        'There was an error during text extraction. Try again',
      );
    }
  }

  private getOverallScore(data: {
    aiScore: { label: number; confidence: number };
    domainScore: number; // 0–1
    factCheckCount: number;
  }): number {
    // 1. AI: wygładzenie wpływu confidence
    const rawAI =
      data.aiScore.label === 1
        ? data.aiScore.confidence
        : 1 - data.aiScore.confidence;

    const aiInterpolated = Math.pow(rawAI, 1.5) * 100; // bardziej liniowo-fałszywe lub prawdziwe

    // 2. Domain: przeskalowanie domeny logarytmicznie (mniej agresywne dla młodych)
    const domainInterpolated = Math.sqrt(data.domainScore) * 100;

    // 3. Fact-checks: delikatny boost, np. 10–15 punktów
    const factBoost = data.factCheckCount > 0 ? 15 : 0;

    // Finalne ważenie (możesz jeszcze dostroić)
    const score = aiInterpolated * 0.6 + domainInterpolated * 0.3 + factBoost;

    return Math.round(score);
  }
}
