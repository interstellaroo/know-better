import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContentAnalysisResponse } from 'src/common/interfaces/content-analysis-response.interface';

@Injectable()
export class ContentAnalyticsService {
  constructor(private readonly httpService: HttpService,
        private readonly configService: ConfigService,
  ) {}

  async evalContent(articleTitle: string | undefined): Promise<ContentAnalysisResponse> {
    if (articleTitle == undefined) {
        throw new InternalServerErrorException('No title provided for Google Fact Check API.')
    }
    const claims = await this.searchGoogleClaims(articleTitle);

    const response: ContentAnalysisResponse = {
      hasClaims: claims.length > 0,
      claims: claims.length ? claims : "No public claims found",
    }

    return response;
  }

  async searchGoogleClaims(query: string): Promise<any[]> {
    const url = 'https://factchecktools.googleapis.com/v1alpha1/claims:search';
    const response = await this.httpService.axiosRef.get(url, {
      params: {
        query,
        key: this.configService.getOrThrow<string>('GOOGLE_FACT_CHECK_API_KEY'),
        languageCode: 'en',
        maxAgeDays: 365,
        pageSize: 5,
      },
    });
    console.log(response)

    return response.data.claims || [];
  }

  async 
}
