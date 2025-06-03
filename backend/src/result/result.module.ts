import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { Result } from './entities/result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ResultService],
  controllers: [ResultController],
  imports: [TypeOrmModule.forFeature([Result])],
  exports: [ResultService]
})
export class ResultModule {}
