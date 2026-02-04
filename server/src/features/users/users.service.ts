import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { AuthService } from '../auth/auth.service';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { ConflictException } from 'src/exceptions/ConflictException';
import { LoginUserDto } from './dto/login-user.dto';
import { UnauthorizedException } from 'src/exceptions/UnauthorizedException';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await  this.prisma.user.findUnique({where: {email: createUserDto.email} });    
    if(user != null) throw new ConflictException('User already exists.');

    const passwordHash = await this.authService.hashPassword(createUserDto.senha);
    return this.prisma.user.create({
      data:{
        name: createUserDto.nome,
        email: createUserDto.email,
        passwordHash: passwordHash
      },
      omit:{
        passwordHash: true
      }
    })
  }

  async findOne(id: number) {
    const user = await  this.prisma.user.findUnique({where: {id}, omit: {passwordHash: true} });
    if(user == null) throw new NotFoundException('User not found.');
    return user;
  }

  async login(dto: LoginUserDto) {
    const user = await this.findUserByEmail(dto.email);    
    if(user == null) throw new NotFoundException('User not found by email.');

    const validPassword = await this.authService.comparePasswords(dto.senha, user.passwordHash);    
    if(!validPassword) throw new UnauthorizedException('Invalid password.');

    const token = await this.authService.createToken(user);
    return { token };
  }

  private async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({where: {email}});
  }
}
