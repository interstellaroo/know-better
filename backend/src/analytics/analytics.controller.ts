import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { UrlAssessmentDto } from './dto/url-assessment.dto';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Post('text')
  async analyzeText() {}

  @Post('url')
  async analyzeUrl(@Body() data: UrlAssessmentDto) {
    const res = await this.analyticsService.urlAssessment(data);
    console.log(res)
    return res;
  }
}
