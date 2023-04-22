import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TriviaController } from './trivia.controller';
import { TriviaService } from './trivia.service';

@Module({
  controllers: [TriviaController],
  providers: [TriviaService, PrismaService],
})
export class TriviaModule {}
