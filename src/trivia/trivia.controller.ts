import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { CreateTriviaDto, UpdateTriviaDto } from './dto/create-trivia.dto';

@Controller('trivia')
export class TriviaController {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  @Post()
  async createTrivia(@Body() data: CreateTriviaDto) {
    try {
      const id = randomUUID();

      const trivia = await this.prisma.trivia.create({
        data: {
          categories: {
            create: data.categories.map((categoryId) => ({
              category: {
                connect: {
                  id: categoryId,
                },
              },
              id: randomUUID(),
            })),
          },
          title: data.title,
          content: data.content as any,
          questionsAmount: data.questionsAmount,
          id,
        },
        include: {
          categories: true,
        },
      });

      return trivia;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  updateTrivia(
    @Param(':id', new ParseUUIDPipe()) id: string,
    @Body() triviaData: UpdateTriviaDto,
  ) {
    return triviaData;
  }
}
