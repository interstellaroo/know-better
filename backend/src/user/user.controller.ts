import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return await this.userService.create(createUserDto);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<UserEntity> {
        return await this.userService.findById(id);
    }
}
