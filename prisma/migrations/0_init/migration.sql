-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Match" (
    "id" UUID NOT NULL,
    "triviaId" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "winnerId" UUID,
    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "MatchScore" (
    "id" UUID NOT NULL,
    "matchId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "score" INTEGER,
    "attempts" INTEGER,
    CONSTRAINT "MatchScore_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Trivia" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" JSONB NOT NULL,
    "questionsAmount" INTEGER NOT NULL,
    CONSTRAINT "Trivia_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "TriviaOnCategory" (
    "id" UUID NOT NULL,
    "triviaId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,
    CONSTRAINT "TriviaOnCategory_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "UserOnMatch" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "matchId" UUID NOT NULL,
    CONSTRAINT "UserOnMatch_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "category_name_unique" ON "Category"("name");
-- CreateIndex
CREATE UNIQUE INDEX "trivia_title_unique" ON "Trivia"("title");
-- CreateIndex
CREATE UNIQUE INDEX "user_email_unique" ON "User"("email");
-- AddForeignKey
ALTER TABLE "Match"
ADD CONSTRAINT "match_authorid_foreign" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "Match"
ADD CONSTRAINT "match_triviaid_foreign" FOREIGN KEY ("triviaId") REFERENCES "Trivia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "Match"
ADD CONSTRAINT "match_winnerid_foreign" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "MatchScore"
ADD CONSTRAINT "matchscore_matchid_foreign" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "MatchScore"
ADD CONSTRAINT "matchscore_userid_foreign" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "TriviaOnCategory"
ADD CONSTRAINT "triviaoncategory_categoryid_foreign" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "TriviaOnCategory"
ADD CONSTRAINT "triviaoncategory_triviaid_foreign" FOREIGN KEY ("triviaId") REFERENCES "Trivia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "UserOnMatch"
ADD CONSTRAINT "useronmatch_matchid_foreign" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "UserOnMatch"
ADD CONSTRAINT "useronmatch_userid_foreign" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;