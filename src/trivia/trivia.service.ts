import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Trivia } from '@prisma/client';

@Injectable()
export class TriviaService {
  constructor(private prisma: PrismaService) {}

  async createTrivia(data: Prisma.TriviaCreateInput): Promise<Trivia | null> {
    return this.prisma.trivia.create({ data });
  }
}
