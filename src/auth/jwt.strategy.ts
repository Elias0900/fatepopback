import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * Strategy for validating JWT tokens.
 * Extracts token from Authorization header (Bearer).
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'secretKey123',
        });
    }

    /**
     * Validates the payload extracted from the JWT.
     * @param payload The decoded JWT payload
     * @returns The user object attached to the request
     */
    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}
