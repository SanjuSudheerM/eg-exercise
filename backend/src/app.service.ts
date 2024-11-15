import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { comparePassword, generatePasswordHash } from './utils/hash-password';
import { UserResponseDto } from './dto/user.response.dto';
import { UserRequestDto } from './dto/user.request.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private prismaService: PrismaService) {}

  async createAccount(body: UserRequestDto) {
    this.logger.debug('Entering creating account service');
    try {
      const passwordHash = await generatePasswordHash(body.password);
      this.logger.debug(passwordHash);
      const response = await this.prismaService.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: passwordHash,
        },
      });
      return new UserResponseDto(response);
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        {
          message: 'Error in creating account',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      this.logger.debug('Leaving creating account service');
    }
  }

  async signIn(email: string, password: string) {
    this.logger.debug('Entering sign in service');
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          message: 'User not found',
        },
        HttpStatus.UNAUTHORIZED,
      );
      // throw new Error('user not found');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException(
        {
          message: 'Invalid credentials',
        },
        HttpStatus.UNAUTHORIZED,
      );
      // throw new Error('Invalid credentials');
    }
    this.logger.debug('Leaving sign in service');
    return new UserResponseDto(user);
  }
}
