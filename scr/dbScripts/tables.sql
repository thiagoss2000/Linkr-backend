CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"username" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE default NOW()
);

CREATE TABLE "sessions" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE default NOW()
);


CREATE TABLE "public.users" (
	"id" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"perfil_photo" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.post" (
	"id" serial NOT NULL,
	"user_id" bigint NOT NULL,
	"text_post" varchar(144) NOT NULL,
	"link" TEXT NOT NULL,
	CONSTRAINT "post_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.likes" (
	"post_id" bigint NOT NULL,
	"id" serial NOT NULL,
	"user_id" bigint NOT NULL,
	CONSTRAINT "likes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.follwers" (
	"user_id" bigint NOT NULL,
	"follow_id" bigint NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.sessions" (
	"id" serial NOT NULL,
	"token" bigint NOT NULL UNIQUE,
	"user_id" bigint NOT NULL,
	"created_at" timestamp with time zone NOT NULL DEFAULT ' NOW()',
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.hastag" (
	"id" serial NOT NULL,
	"hastag" TEXT NOT NULL UNIQUE,
	CONSTRAINT "hastag_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.post_hastag" (
	"id" serial NOT NULL,
	"id_hastag" bigint NOT NULL,
	"id_post" bigint NOT NULL,
	CONSTRAINT "post_hastag_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "post" ADD CONSTRAINT "post_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("post_id") REFERENCES "post"("id");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "follwers" ADD CONSTRAINT "follwers_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "follwers" ADD CONSTRAINT "follwers_fk1" FOREIGN KEY ("follow_id") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");


ALTER TABLE "post_hastag" ADD CONSTRAINT "post_hastag_fk0" FOREIGN KEY ("id_hastag") REFERENCES "hastag"("id");
ALTER TABLE "post_hastag" ADD CONSTRAINT "post_hastag_fk1" FOREIGN KEY ("id_post") REFERENCES "post"("id");







