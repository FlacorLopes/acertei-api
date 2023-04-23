import { TriviaService } from './trivia.service';
import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTriviaDto, UpdateTriviaDto } from './dto/create-trivia.dto';

@Controller('trivia')
export class TriviaController {
  constructor(private service: TriviaService) {}

  @Post()
  async createTrivia(@Body() data: CreateTriviaDto) {
    await this.service.createTrivia({
      ...data,
      id: randomUUID(),
      content: data.content as any,
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
    });
  }

  @Put(':id')
  updateTrivia(
    @Param(':id', new ParseUUIDPipe()) id: string,
    @Body() triviaData: UpdateTriviaDto,
  ) {
    return triviaData;
  }
}
