import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { response } from 'express';
import { AIServiceResponse } from 'src/common/interfaces/ai-service-response.interface';

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
        { "text": data },
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
      throw new InternalServerErrorException('Something went wrong with AI API.')
    }
  }
}
