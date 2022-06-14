CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"name" TEXT NOT NULL ,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE default NOW()
);

CREATE TABLE "sessions" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE default NOW()
);
