import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    /**
   * Finds a unique user by their email address.
   * @param email The email of the user to find
   * @returns The user object if found, null otherwise
   */
    async findOne(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    /**
   * Creates a new user in the database.
   * @param data The data to create the user with
   * @returns The created user object
   */
    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }
}
