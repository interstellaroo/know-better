import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm';
import { CreateResultDto } from './dto/create-result.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}

  async create(dto: CreateResultDto): Promise<Result> {
    try {
        const result = await this.resultRepository.create({ ...dto });
        return await this.resultRepository.save(result);
    } catch (error) {
        throw new InternalServerErrorException('There was an error saving results');
    }
  }

  async getById(resultId: string): Promise<Result> {
    const result = await this.resultRepository.findOneBy({ id: resultId });
    if (!result) {
        throw new NotFoundException('Result not found');
    }
    return result;
  }
}
