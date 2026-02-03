import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from 'generated/prisma/client';
import { AuthService } from '../auth/auth.service';
import { NotFoundException } from 'src/exceptions/NotFoundException';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await  this.prisma.user.findUnique({where: {email: createUserDto.email} });
    if(user != null) throw new Error('User already exists');

    const passwordHash = await this.authService.hashPassword(createUserDto.senha);
    return this.prisma.user.create({
      data:{
        name: createUserDto.nome,
        email: createUserDto.email,
        passwordHash: passwordHash
      }
    })
  }

  async findOne(id: number) {
    const user = await  this.prisma.user.findUnique({where: {id} });
    if(user == null) throw new NotFoundException('User not found');
    return user;
  }

}
