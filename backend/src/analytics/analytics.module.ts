import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { ContentAnalyticsService } from './services/content-analytics.service';
import { SourceAnalyticsService } from './services/source-analytics.service';
import { HttpModule } from '@nestjs/axios';
import { AIAnalyticsService } from './services/ai-analytics.service';
import { ResultModule } from 'src/result/result.module';
import { StructureAnalyticsService } from './services/structure-analytics.service';

@Module({
  imports: [HttpModule, ResultModule],
  providers: [
    AnalyticsService,
    ContentAnalyticsService,
    SourceAnalyticsService,
    AIAnalyticsService,
    StructureAnalyticsService,
  ],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
