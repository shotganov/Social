import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: loginDto.username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = (await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    )) as boolean;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id, role: user.role };

    return {
      token: await this.jwtService.signAsync(payload),
      user: user,
    };
  }

  async register(data: CreateUserDto) {
    if (!data.username || data.username.trim() === '') {
      throw new BadRequestException('Username is required');
    }

    if (!data.password || data.password.trim() === '') {
      throw new BadRequestException('Password is required');
    }

    if (data.password.length < 6) {
      throw new BadRequestException(
        'Password must be at least 6 characters long',
      );
    }

    if (data.password.length > 50) {
      throw new BadRequestException('Password must not exceed 50 characters');
    }

    const username = data.username.trim();

    if (username.length < 3) {
      throw new BadRequestException(
        'Username must be at least 3 characters long',
      );
    }

    if (username.length > 50) {
      throw new BadRequestException('Username must not exceed 50 characters');
    }

    const existing = await this.prisma.user.findUnique({
      where: { username: username },
    });

    if (existing) {
      throw new ConflictException('Username already exists');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = await this.prisma.user.create({
      data: {
        username: username,
        role: 'user',
        passwordHash,
        avatar: data.avatar?.trim(),
        bio: data.bio?.trim(),
      },
      select: {
        id: true,
        role: true,
        username: true,
        avatar: true,
        bio: true,
      },
    });

    const payload = { userId: user.id, role: user.role };

    return {
      token: await this.jwtService.signAsync(payload),
      user: user,
    };
  }
}
