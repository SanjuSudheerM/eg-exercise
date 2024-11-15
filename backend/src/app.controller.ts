import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Logger,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SignInDto } from './dto/user.request.dto';
import { UserRequestDto } from './dto/user.request.dto';
import { HttpExceptionFilter } from './filter/http-exception';

@Controller()
@UseFilters(new HttpExceptionFilter())
export class AppController {
  logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Post('signUp')
  @UseInterceptors(ClassSerializerInterceptor)
  createAccount(@Body() body: UserRequestDto) {
    this.logger.debug('Entering sign up controller');
    return this.appService.createAccount(body);
  }

  @Post('signIn')
  @UseInterceptors(ClassSerializerInterceptor)
  signIn(@Body() body: SignInDto) {
    this.logger.debug('Entering sign in controller');
    return this.appService.signIn(body.email, body.password);
  }
}
