import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'generated/prisma/client';

@Injectable()
export class AuthService {
    private readonly saltRounds = parseInt(process.env.SALT_ROUNDS!);

    constructor(private readonly jwtService: JwtService) { }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return bcrypt.hash(password, salt);
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async createToken(user: User) {
        const payload = { id: user.id, name: user.name, email: user.email };
        return await this.jwtService.signAsync(payload)
    }
}