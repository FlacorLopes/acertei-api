import { randomUUID } from 'crypto';
import { PrismaService } from './../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Trivia } from '@prisma/client';
import { CreateTriviaDto } from './dto/create-trivia.dto';
import { ITriviaColumn } from 'src/lib/Trivia';
import { Collator } from 'src/utils/Collator';
import { GetAllTriviasDto } from './dto/get-all-trivias.dto';

@Injectable()
export class TriviaService {
  constructor(private prisma: PrismaService) {}

  async getTrivias(params: GetAllTriviasDto): Promise<{
    data: Trivia[];
    pages: number;
    page: number;
    total: number;
  }> {
    const limit = params.limit || 1;
    const page = params.page || 1;

    console.log('fetching pages: ', page, limit, params);

    const [trivias, triviasCount] = await Promise.all([
      this.prisma.trivia.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'asc',
        },
      }),
      this.prisma.trivia.count(),
    ]);

    return {
      data: trivias,
      total: triviasCount,
      page: page,
      pages: Math.ceil(triviasCount / limit),
    };
  }

  async createTrivia(data: CreateTriviaDto): Promise<Trivia | null> {
    const triviaWithSameName = await this.prisma.trivia.findUnique({
      where: {
        title: data.title,
      },
    });

    if (triviaWithSameName)
      throw new HttpException('TRIVIA:TITLE_EXISTS', HttpStatus.CONFLICT);

    const questionsAmount = data.content.columns[0].values.length;

    const normalizedContent: ITriviaColumn[] = data.content.columns.map(
      (column) => ({
        ...column,
        id: randomUUID(),
        values: column.values.map((v) => ({
          id: randomUUID(),
          value: v.value,
        })),
      }),
    );

    const seemColumns: string[] = [];
    const hasColumnDuplicates = normalizedContent.some((column) => {
      if (
        seemColumns.some((seen) => Collator.compare(column.label, seen) === 0)
      )
        return true;

      seemColumns.push(column.label);
    });

    if (hasColumnDuplicates)
      throw new HttpException('TRIVIA:COLUMN_DUPLICATE', HttpStatus.CONFLICT);

    return this.prisma.trivia.create({
      data: {
        ...data,
        id: randomUUID(),
        questionsAmount,
        content: normalizedContent as any,
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
      },
    });
  }
}
