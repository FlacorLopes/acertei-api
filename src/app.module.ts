import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TriviaModule } from './trivia/trivia.module';
import { CategoryModule } from './category/category.module';
import { MatchModule } from './match/match.module';
import { ScoreModule } from './score/score.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TriviaModule,
    CategoryModule,
    MatchModule,
    ScoreModule,
    PrismaModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
