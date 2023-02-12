import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailOccupiedException extends HttpException {
  constructor() {
    super('Email already taken', HttpStatus.CONFLICT);
  }
}
