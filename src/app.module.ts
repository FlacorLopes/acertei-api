import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TriviaModule } from './trivia/trivia.module';
import { CategoryModule } from './category/category.module';
import { MatchModule } from './match/match.module';
import { ScoreModule } from './score/score.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    TriviaModule,
    CategoryModule,
    MatchModule,
    ScoreModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
