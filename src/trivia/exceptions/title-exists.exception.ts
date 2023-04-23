import { HttpException, HttpStatus } from '@nestjs/common';

export class TitleExistsException extends HttpException {
  constructor() {
    super('TRIVIA:TITLE_EXISTS', HttpStatus.CONFLICT);
  }
}
