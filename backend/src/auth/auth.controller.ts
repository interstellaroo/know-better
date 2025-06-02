import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/signup.dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { RefreshAuthGuard } from '../common/guards/refresh-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() dto: SignUpDto, @Res({ passthrough: true }) response: Response) {
    await this.authService.signup(dto, response);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@GetUser() user: User, @Res({ passthrough: true }) response: Response) {
    await this.authService.login(user, response);
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  async refresh(@GetUser() user: User, @Res({ passthrough: true }) response: Response) {
    await this.authService.login(user, response);
  }
}
