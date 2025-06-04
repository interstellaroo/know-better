import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { response } from 'express';
import { AIServiceResponse } from 'src/common/interfaces/ai-service-response.interface';
import { SentimentAnalysisResponse } from 'src/common/interfaces/sentiment-analysis-response.interface';

@Injectable()
export class AIAnalyticsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async evalWithModels(text: string): Promise<AIServiceResponse> {
    const classification = await this.modelClassification(text);
    return classification;
  }

  async modelClassification(data: string): Promise<AIServiceResponse> {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.configService.getOrThrow('AI_API_URL')}/ai/analyze/classify/`,
        { text: data },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      console.log(response);
      const result: AIServiceResponse = {
        label: response.data.response.label,
        confidence: response.data.response.confidence,
      };

      return result;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Something went wrong with AI API.',
      );
    }
  }
  /**
   * Sending text to the external API for sentiment analysis using TextBlob
   *
   * @param data - text for TextBlob to process
   * @returns an object containing three sentiment indicators
   *  - polarity: a float between -1.0 and 1.0 indicating emotional tone
   *  - subjectivity: a float between 0.0 and 1.0 indicating how opinion-based the text is
   *  - label: descriptive classification - positive, negative or neutral
   */
  async sentimentAnalysis(data: string): Promise<SentimentAnalysisResponse> {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.configService.getOrThrow('AI_API_URL')}`,
        { text: data },
        { headers: { 'Content-Type': 'application/json' } },
      );

      const result: SentimentAnalysisResponse = {
        polarity: response.data.response.polarity,
        subjectivity: response.data.response.subjectivity,
        label: response.data.response.label,
      };

      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong during sentiment analysis',
      );
    }
  }
}
