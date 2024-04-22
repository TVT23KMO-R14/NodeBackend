-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.favorite
(
    "idFavorite" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "user_idUser" integer,
    favorite integer,
    CONSTRAINT favorite_pkey PRIMARY KEY ("idFavorite")
);

CREATE TABLE IF NOT EXISTS public."group"
(
    "idGroup" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "groupName" character varying(45) COLLATE pg_catalog."default",
    "groupDescription" character varying(255) COLLATE pg_catalog."default",
    "groupLogo" character varying COLLATE pg_catalog."default",
    CONSTRAINT group_pkey PRIMARY KEY ("idGroup")
);

CREATE TABLE IF NOT EXISTS public."groupContent"
(
    "idGroupContent" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "group_idGroup" integer,
    "groupMember_idGroupMember" integer,
    content text COLLATE pg_catalog."default",
    CONSTRAINT "groupContent_pkey" PRIMARY KEY ("idGroupContent")
);

CREATE TABLE IF NOT EXISTS public."groupInvite"
(
    "idGroupInvite" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "groupMember_idGroupMember" integer,
    "group_idGroup" integer,
    "inviteText" character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT "groupInvite_pkey" PRIMARY KEY ("idGroupInvite"),
    CONSTRAINT "thereCanBeOnly2" UNIQUE ("groupMember_idGroupMember", "group_idGroup")
);

CREATE TABLE IF NOT EXISTS public."groupMember"
(
    "idGroupMember" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "user_idUser" integer,
    "group_idGroup" integer,
    role character varying(45) COLLATE pg_catalog."default",
    CONSTRAINT "groupMember_pkey" PRIMARY KEY ("idGroupMember"),
    CONSTRAINT "thereCanBeOnly1" UNIQUE ("user_idUser", "group_idGroup")
);

CREATE TABLE IF NOT EXISTS public.review
(
    "idReview" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "user_idUser" integer,
    rating integer,
    review text COLLATE pg_catalog."default",
    "idMovie" integer,
    CONSTRAINT review_pkey PRIMARY KEY ("idReview")
);

CREATE TABLE IF NOT EXISTS public.users
(
    "idUser" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "firstName" character varying(45) COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying(45) COLLATE pg_catalog."default" NOT NULL,
    "userName" character varying(45) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY ("idUser")
);

ALTER TABLE IF EXISTS public.favorite
    ADD CONSTRAINT "favorite_user_idUser_fkey" FOREIGN KEY ("user_idUser")
    REFERENCES public.users ("idUser") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public."groupContent"
    ADD CONSTRAINT "groupContent_groupMember_idGroupMember_fkey" FOREIGN KEY ("groupMember_idGroupMember")
    REFERENCES public."groupMember" ("idGroupMember") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public."groupContent"
    ADD CONSTRAINT "groupContent_group_idGroup_fkey" FOREIGN KEY ("group_idGroup")
    REFERENCES public."group" ("idGroup") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public."groupInvite"
    ADD CONSTRAINT "groupInvite_groupMember_idGroupMember_fkey" FOREIGN KEY ("groupMember_idGroupMember")
    REFERENCES public."groupMember" ("idGroupMember") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public."groupInvite"
    ADD CONSTRAINT "groupInvite_group_idGroup_fkey" FOREIGN KEY ("group_idGroup")
    REFERENCES public."group" ("idGroup") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public."groupMember"
    ADD CONSTRAINT "groupMember_group_idGroup_fkey" FOREIGN KEY ("group_idGroup")
    REFERENCES public."group" ("idGroup") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public."groupMember"
    ADD CONSTRAINT "groupMember_user_idUser_fkey" FOREIGN KEY ("user_idUser")
    REFERENCES public.users ("idUser") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.review
    ADD CONSTRAINT "review_user_idUser_fkey" FOREIGN KEY ("user_idUser")
    REFERENCES public.users ("idUser") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;

END;