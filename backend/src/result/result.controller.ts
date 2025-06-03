import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResultService } from './result.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateResultDto } from './dto/create-result.dto';
import { Result } from './entities/result.entity';

@ApiTags('Results')
@Controller('results')
export class ResultController {
    constructor(
        private readonly resultService: ResultService,
    ) {}

    @Post()
    async create(@Body() dto: CreateResultDto): Promise<{id: string}> {
        const result = await this.resultService.create(dto)
        return { id: result.id }
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Result> {
        const result = await this.resultService.getById(id);
        console.log("RESULT -------------------------", result)
        return result;
    }

}
