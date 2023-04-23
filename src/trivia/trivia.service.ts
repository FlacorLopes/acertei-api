import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Trivia } from '@prisma/client';
import { TitleExistsException } from './exceptions/title-exists.exception';

@Injectable()
export class TriviaService {
  constructor(private prisma: PrismaService) {}

  async createTrivia(data: Prisma.TriviaCreateInput): Promise<Trivia | null> {
    const triviaWithSameName = await this.prisma.trivia.findUnique({
      where: {
        title: data.title,
      },
    });

    if (triviaWithSameName) throw new TitleExistsException();
    return this.prisma.trivia.create({ data });
  }
}
