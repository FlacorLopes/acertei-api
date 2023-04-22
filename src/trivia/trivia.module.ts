import { Module } from '@nestjs/common';
import { TriviaController } from './trivia.controller';

@Module({
  controllers: [TriviaController]
})
export class TriviaModule {}
