import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    /**
   * Registers a new user.
   * 1. Checks if user exists.
   * 2. Hashes password.
   * 3. Creates user in DB.
   */
    async register(registerDto: RegisterDto) {
        // Check if user already exists based on email
        const existingUser = await this.usersService.findOne(registerDto.email);
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        // Create the user via UsersService
        const user = await this.usersService.createUser({
            email: registerDto.email,
            password: hashedPassword,
        });

        return {
            message: 'User registered successfully',
            user: { id: user.id, email: user.email },
        };
    }

    /**
   * Authenticates a user.
   * 1. Finds user by email.
   * 2. Compares passwords.
   * 3. Generates JWT token.
   */
    async login(loginDto: LoginDto) {
        // Find user by email
        const user = await this.usersService.findOne(loginDto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT payload
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
