import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { User } from 'src/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}
    
    async signup(dto: SignUpDto, response: Response) {
        const newUser = await this.userService.create(dto);
        await this.login(newUser, response);
    }

    async login(user: User, response: Response) {
        const accessTokenExpiry = new Date(Date.now() + parseInt(this.configService.getOrThrow<string>('JWT_ACCESS_EXP')));
        const refreshTokenExpiry = new Date(Date.now() + parseInt(this.configService.getOrThrow<string>('JWT_REFRESH_EXP')));

        const tokenPayload: TokenPayload = {
            sub: user.id,
        };
        
        const accessToken = this.jwtService.sign(tokenPayload, {
            secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
            expiresIn: `${this.configService.getOrThrow('JWT_ACCESS_EXP')}ms`,
        });
        const refreshToken = this.jwtService.sign(tokenPayload, {
            secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
            expiresIn: `${this.configService.getOrThrow('JWT_REFRESH_EXP')}ms`,
        });

        await this.userService.update(user.id, { refreshToken: await hash(refreshToken, 10) })

        response.cookie('Authentication', accessToken, {
            httpOnly: true,
            secure: this.configService.get('NODE_ENV') === 'production',
            expires: accessTokenExpiry,
        });
        response.cookie('Refresh', refreshToken, {
            httpOnly: true,
            secure: this.configService.get('NODE_ENV') === 'production',
            expires: refreshTokenExpiry,
        })

    }

    async validateUser(email: string, password: string) {
        try {
            const user = await this.userService.getByEmail(email);
            if (!await compare(password, user.password)) {
                throw new UnauthorizedException('Invalid credentials');
            }
            return user;
        } catch (error) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    async validateRefreshToken(refreshToken: string, userId: string) {
        try {
            const user = await this.userService.getById(userId);
            if(!user.refreshToken || !(await compare(refreshToken, user.refreshToken))) {
                throw new UnauthorizedException();
            }
            return user;
        } catch(error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
