import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/signup.dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { RefreshAuthGuard } from '../common/guards/refresh-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Registers a new user account with data provided in SignUpDto.
   *
   * @param dto - Validated SignUpDto with user credentials (email and password).
   * @param response - Express response object used with `passthrough` to set access and refresh tokens as cookies.
   * @returns void
   */
  @Post('signup')
  async signup(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await this.authService.signup(dto, response);
  }
  /**
   * Logs a user into their account. Firstly, the provided user credentials are validated in the database by LocalAuthGuard. 
   * If the user object exists, it is attached to the ongoing request and then read by the GetUser decorator. Access and refresh
   * tokens are generated with provided data and attached to the outgoing response.
   *
   * @param user - User entity attached to the incomming request by the LocalAuthGuard, if valid.
   * @param response - Express response object used with `passthrough` to set access and refresh tokens as cookies.
   * @returns void
   */
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @GetUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await this.authService.login(user, response);
  }
  /**
   * 
   * @param user 
   * @param response
   * @returns void 
   */
  @Get('refresh')
  @UseGuards(RefreshAuthGuard)
  async refresh(
    @GetUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await this.authService.login(user, response);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getUser(@GetUser() user: User) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
