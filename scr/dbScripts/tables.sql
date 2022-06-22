CREATE TABLE "users" (
	"id" serial NOT NULL,
	"user_name" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"image" TEXT,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"deleted_at" TIMESTAMP,
	"name" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "likes" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	CONSTRAINT "likes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "posts" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"deleted_at" TIMESTAMP,
	"link" TEXT NOT NULL,
	"title" TEXT,
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"deleted_at" TIMESTAMP,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "followers" (
	"id" serial NOT NULL,
	"following_id" integer NOT NULL,
	"followers_id" integer NOT NULL,
	CONSTRAINT "followers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hashtags" (
	"id" serial NOT NULL,
	"text" TEXT NOT NULL,
	CONSTRAINT "hashtags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments" (
	"id" serial NOT NULL,
	"post_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"text" TEXT NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "posts_hashtags" (
	"id" serial NOT NULL,
	"post_id" integer NOT NULL,
	"hashtag_id" integer NOT NULL,
	CONSTRAINT "posts_hashtags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "re_posts" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"posts_id" integer NOT NULL,
	CONSTRAINT "re_posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "metadata" (
	"id" integer NOT NULL,
	"subject" TEXT,
	"presentation" TEXT,
	"image" TEXT
) WITH (
  OIDS=FALSE
);




ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("post_id") REFERENCES "posts"("id");

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "followers" ADD CONSTRAINT "followers_fk0" FOREIGN KEY ("following_id") REFERENCES "users"("id");
ALTER TABLE "followers" ADD CONSTRAINT "followers_fk1" FOREIGN KEY ("followers_id") REFERENCES "users"("id");


ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("post_id") REFERENCES "posts"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "posts_hashtags" ADD CONSTRAINT "posts_hashtags_fk0" FOREIGN KEY ("post_id") REFERENCES "posts"("id");
ALTER TABLE "posts_hashtags" ADD CONSTRAINT "posts_hashtags_fk1" FOREIGN KEY ("hashtag_id") REFERENCES "hashtags"("id");

ALTER TABLE "re_posts" ADD CONSTRAINT "re_posts_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "re_posts" ADD CONSTRAINT "re_posts_fk1" FOREIGN KEY ("posts_id") REFERENCES "posts"("id");

ALTER TABLE "metadata" ADD CONSTRAINT "metadata_fk0" FOREIGN KEY ("id") REFERENCES "posts"("id");
ALTER TABLE re_posts ADD "created_at" TIMESTAMP NOT NULL DEFAULT NOW();
ALTER TABLE re_posts ADD "deleted_at" TIMESTAMP;