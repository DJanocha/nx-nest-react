import { Controller, Get, Post, UseGuards, Req, Body } from '@nestjs/common';

import { AppService } from './app.service';
import { LocalAuthGuard } from '../auth/local-auth-guard';
import { AuthService } from '../auth/auth.service';
import { PublicRoute } from '../auth/decorators/public-route';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Controller('/')
@ApiTags('auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @PublicRoute()
  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(LocalAuthGuard)
  @PublicRoute()
  @Post('auth/login')
  async login(@Req() req) {
    const { id: userId, email } = req.user;
    return this.authService.login({ userId, email });
  }

  @Get('/me')
  getMe(@Req() req) {
    return req.user;
  }

  // @UseGuards(LocalAuthGuard)
  @PublicRoute()
  @Post('/auth/register')
  @ApiBody({
    schema: {},
    required: true,
    isArray: false,
  })
  async register(@Req() req, @Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
