import { TriviaService } from './trivia.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTriviaDto, UpdateTriviaDto } from './dto/create-trivia.dto';
import { GetAllTriviasDto } from './dto/get-all-trivias.dto';

@Controller('trivia')
export class TriviaController {
  constructor(private service: TriviaService) {}

  // @Public()
  @Get('all')
  async getTrivias(@Query() query: GetAllTriviasDto) {
    return this.service.getTrivias(query);
  }

  @Post()
  async createTrivia(@Body() data: CreateTriviaDto) {
    await this.service.createTrivia(data);
  }

  @Put(':id')
  updateTrivia(
    @Param(':id', new ParseUUIDPipe()) id: string,
    @Body() triviaData: UpdateTriviaDto,
  ) {
    return triviaData;
  }
}
