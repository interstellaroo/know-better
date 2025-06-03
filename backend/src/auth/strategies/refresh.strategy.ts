import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../../common/interfaces/token-payload.interface";
import { AuthService } from "../auth.service";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor(
        private readonly authService: AuthService,
        configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.Refresh,
            ]),
            secretOrKey: configService.getOrThrow('JWT_REFRESH_SECRET'),
            ignoreExpiration: true,
            passReqToCallback: true,
        });
    };

    async validate(request: Request, payload: TokenPayload) {
        return await this.authService.validateRefreshToken(request.cookies?.Refresh, payload.sub);
    }
}
