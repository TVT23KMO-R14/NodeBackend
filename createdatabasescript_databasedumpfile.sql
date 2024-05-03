--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6 (Debian 15.6-0+deb12u1)
-- Dumped by pg_dump version 15.6 (Debian 15.6-0+deb12u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: favorite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorite (
    "idFavorite" integer NOT NULL,
    "user_idUser" integer,
    favorite integer
);


ALTER TABLE public.favorite OWNER TO postgres;

--
-- Name: favorite_idFavorite_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.favorite ALTER COLUMN "idFavorite" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."favorite_idFavorite_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."group" (
    "idGroup" integer NOT NULL,
    "groupName" character varying(45) NOT NULL,
    "groupDescription" character varying(255),
    "groupLogo" character varying
);


ALTER TABLE public."group" OWNER TO postgres;

--
-- Name: groupContent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."groupContent" (
    "idGroupContent" integer NOT NULL,
    "group_idGroup" integer,
    "groupMember_idGroupMember" integer,
    type character varying,
    "contentId" integer,
    "contentImg" character varying,
    "contentName" character varying
);


ALTER TABLE public."groupContent" OWNER TO postgres;

--
-- Name: groupContent_idGroupContent_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."groupContent" ALTER COLUMN "idGroupContent" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."groupContent_idGroupContent_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: groupInvite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."groupInvite" (
    "idGroupInvite" integer NOT NULL,
    "groupMember_idGroupMember" integer,
    "group_idGroup" integer,
    "inviteText" character varying(255),
    "inviteUserId" integer NOT NULL
);


ALTER TABLE public."groupInvite" OWNER TO postgres;

--
-- Name: groupInvite_idGroupInvite_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."groupInvite" ALTER COLUMN "idGroupInvite" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."groupInvite_idGroupInvite_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: groupMember; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."groupMember" (
    "idGroupMember" integer NOT NULL,
    "user_idUser" integer,
    "group_idGroup" integer,
    role character varying(45)
);


ALTER TABLE public."groupMember" OWNER TO postgres;

--
-- Name: groupMember_idGroupMember_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."groupMember" ALTER COLUMN "idGroupMember" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."groupMember_idGroupMember_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: group_idGroup_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."group" ALTER COLUMN "idGroup" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."group_idGroup_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review (
    "idReview" integer NOT NULL,
    "user_idUser" integer,
    rating integer,
    review text,
    "idMovie" integer,
    "reviewType" character varying NOT NULL,
    "reviewImg" text DEFAULT '/img/apple.png'::text NOT NULL,
    "reviewObjectName" text
);


ALTER TABLE public.review OWNER TO postgres;

--
-- Name: review_idReview_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.review ALTER COLUMN "idReview" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."review_idReview_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    "idUser" integer NOT NULL,
    "firstName" character varying(45) NOT NULL,
    "lastName" character varying(45) NOT NULL,
    "userName" character varying(45) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_idUser_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN "idUser" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."users_idUser_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: favorite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorite ("idFavorite", "user_idUser", favorite) FROM stdin;
\.


--
-- Data for Name: group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."group" ("idGroup", "groupName", "groupDescription", "groupLogo") FROM stdin;
104	Tepon Tarinat	Tämä ryhmä keskittyy sci-fi ja fantasia tarinoihin sekä animeen	./img/calculator.png
105	Lutikan KauhuRyhmä	Tämä ryhmä on kauhun ystäville	./img/baseball.jpg
106	Josun ToimintaFanit	Pelkkää toimintaa täynnä	./img/rocket.png
107	SohvaMonsterit	Tervetuloa Sohvamonstereiden ryhmään!	./img/moon.png
108	Josun Riehakkaat elokuvat	Tähän ryhmään on kaikki tervetulleita	./img/moon.png
17	testikuvankanssa	liibalaa	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7skqIGf4c94Mk9_PnyILXxK9dGTRmbWVT9tDmI22jzA&s
21	testi	setti	../img/baseball.jpg
23	Testi	Tähän kuvausta	./img/moon.png
26	testi1.0	jio	./img/baseball.jpg
63	testijuttua	hienotesi	./img/baseball.jpg
87	testilol	testiwow	./img/baseball.jpg
89	Kauhukakarat	Kauhuleffoihin keskittynyt ryhmä	./img/apple.png
90	Kauhukakarat2	Joukko trolleja	./img/calculator.png
91	Kauhukakarat3	Tähän kuvausta	./img/apple.png
92	Kauhukakarat4	Joukko trolleja	./img/rocket.png
93	testijuttu	jeeeeeeee	./img/moon.png
94	Kauhukakarat5	Kauhuleffoihin keskittynyt ryhmä	./img/rocket.png
95	karjut123	karjut123	./img/calculator.png
96	joonanformitesti22222	hienojuttu2222	./img/rocket.png
98	makkispekkikset	tämä on Josun testi ryhmä	./img/apple.png
99	Kauhukakarat666	Joukko trolleja	./img/apple.png
100	Kauhukakarat667	Joukko trolleja	./img/calculator.png
102	testiryhmä	aasd	./img/baseball.jpg
\.


--
-- Data for Name: groupContent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."groupContent" ("idGroupContent", "group_idGroup", "groupMember_idGroupMember", type, "contentId", "contentImg", "contentName") FROM stdin;
\.


--
-- Data for Name: groupInvite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."groupInvite" ("idGroupInvite", "groupMember_idGroupMember", "group_idGroup", "inviteText", "inviteUserId") FROM stdin;
43	74	104	Haluaisn liittyä ryhmäänne	313
\.


--
-- Data for Name: groupMember; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."groupMember" ("idGroupMember", "user_idUser", "group_idGroup", role) FROM stdin;
67	241	63	member
68	43	93	member
69	6	93	member
70	8	93	member
73	241	96	member
74	312	104	admin
75	313	105	admin
76	314	106	admin
77	315	106	member
78	316	107	admin
79	315	107	member
80	314	108	admin
81	317	108	member
22	43	23	member
57	43	99	admin
58	43	100	admin
60	241	102	admin
64	241	100	member
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review ("idReview", "user_idUser", rating, review, "idMovie", "reviewType", "reviewImg", "reviewObjectName") FROM stdin;
43	43	10	I have never seen such an amazing film since I saw The Shawshank Redemption. Shawshank encompasses friendships, hardships, hopes, and dreams. And what is so great about the movie is that it moves you, it gives you hope. Even though the circumstances between the characters and the viewers are quite different, you don't feel that far removed from what the characters are going through.\n\nIt is a simple film, yet it has an everlasting message. Frank Darabont didn't need to put any kind of outlandish special effects to get us to love this film, the narration and the acting does that for him. Why this movie didn't win all seven Oscars is beyond me, but don't let that sway you to not see this film, let its ranking on the IMDb's top 250 list sway you, let your friends recommendation about the movie sway you.\n\nSet aside a little over two hours tonight and rent this movie. You will finally understand what everyone is talking about and you will understand why this is my all time favorite movie.	278	movie	https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg	The Shawshank Redemption
47	43	10	Hazbin Hotel is a wildly inventive and bold animated series that dives deep into the concept of redemption in the most unlikely of settings: Hell itself. Creator Vivienne "VivziePop" Medrano brings us a vibrant, audacious underworld filled with colorful, albeit morally ambiguous characters. The princess of Hell, Charlie, is a standout with her naive yet endearing quest to rehabilitate demons through her new venture, the Hazbin Hotel. The pilot episode, packed with snappy dialogues, catchy music, and an energetic voice cast, hooks you right from the start.\n\nWhile the series sports a unique and engaging art style that sets it apart, the pacing can feel a bit rushed, and its handling of sensitive themes isn't always as polished as some might hope. Nonetheless, "Hazbin Hotel" is a breath of fresh air for viewers seeking an adult animation that combines dark humor with a heart. A must-watch if you enjoy animations that push boundaries and explore dark themes with a humorous twist!	94954	series	https://image.tmdb.org/t/p/w500/rXojaQcxVUubPLSrFV8PD4xdjrs.jpg	Hazbin Hotel
49	313	10	"Blade" (1998) on vauhdikas ja mieleenpainuva vampyyritoimintaelokuva, joka toi sarjakuvamaailman anti-sankarin, Bladen, valkokankaalle Wesley Snipesin näyttelemänä. Elokuva yhdistelee taitavasti toimintaa, kauhuelementtejä ja tieteisfantasiaa luoden omaperäisen maailman, jossa vampyyrit ovat salassa elävä yhteiskunta, joka uhkaa ihmiskunnan olemassaoloa. Snipesin esittämä Blade on karismaattinen ja moniulotteinen hahmo, jonka taistelu vampyyreja vastaan on henkilökohtainen koston ja oman identiteetin etsinnän tarina.\n\nVisuaalisesti elokuva on tyylikäs, ja sen tummasävyiset kuvauspaikat ja dynaamiset taistelukohtaukset luovat jännittävän tunnelman. Erityisesti kohtaukset, joissa Blade käyttää monipuolista asearsenaaliaan vampyyrien tuhoamiseen, ovat ikonisia ja viihdyttäviä. Elokuva on vaikuttanut merkittävästi vampyyrielokuvien ja -sarjojen kehitykseen, ja se on saanut aikaan useita jatko-osia ja jopa televisiosarjan. "Blade" onnistuu olemaan sekä viihdyttävä että ajatuksia herättävä, tarjoten katsottavaa niin toiminnan ystäville kuin genrefilmin arvostajillekin.	36647	movie	https://image.tmdb.org/t/p/w500/oWT70TvbsmQaqyphCZpsnQR7R32.jpg	Blade
51	314	7	Breaking Bad on Vince Gilliganin luoma televisiosarja, joka kertoo kemianopettaja Walter Whiten (Bryan Cranston) muuttumisesta kiltistä opettajasta pelättyksi huumekeisariksi. Sarja alkaa siitä, kun Walter saa tietää sairastavansa parantumatonta syöpää, mikä ajaa hänet epätoivoiseen päätökseen ryhtyä valmistamaan metamfetamiinia perheensä taloudellisen tulevaisuuden turvaamiseksi. Sarja on kriitikoiden ylistämä sen monimutkaisten hahmojen, mestarillisen käsikirjoituksen ja tiheän tunnelman vuoksi. Aaron Paulin esittämä Jesse Pinkman tuo tarinaan syvyyttä ja inhimillisyyttä. "Breaking Bad" on jännittävä, emotionaalinen ja usein sydäntäsärkevä, ja se tutkii moraalin rajamaita sekä toivon ja epätoivon välistä taistelua.	1396	series	https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg	Breaking Bad
53	314	10	Tämä elokuva oli 10/10	335984	movie	https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg	Blade Runner 2049
6	3	8	Arvostelutekstiä tähän jonkin verran ja silleen	1234	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
7	3	8	Arvostelutekstiä tähän jonkin verran ja silleen ja lisää	12	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
8	3	3	Arvostelutekstiä tähän jonkin verran ja silleen ja lisää ja lisää	124	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
10	3	9	Arvostelutekstiä tähän jonkin verran ja silleen ja lisää ja lisää	12412	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
21	43	9	Pirun hyvä leffa, oink oink oink.	129	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
22	43	8	Suru tuli puseroon :-(	12477	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
23	241	8	on elokuva	13	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
24	241	10	on elokuva\n	14	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
25	241	10	tämä on elokuva arvostelu	15	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
26	241	10	arvostelu	16	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
27	241	6	ihan ok kai	17	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
28	241	10	on elokuva maino	278	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
29	241	10	tämä on toinen arvio	278	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
30	241	9	Tässä on arvio elokuvaan "No End"	124	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
31	241	7	elokuva arvio kummisetä 2	240	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
32	241	8		240	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
44	43	10	One of the finest films made in recent years. It's a poignant story about hope. Hope gets me. That's what makes a film like this more than a movie. It tells a lesson about life. Those are the films people talk about 50 or even 100 years from you. It's also a story for freedom. Freedom from isolation, from rule, from bigotry and hate. Freeman and Robbins are majestic in their performances. Each learns from the other. Their relationship is strong and you feel that from the first moment they make contact with one another. There is also a wonderful performance from legend James Whitmore as Brooks.\n\nHe shines when it is his time to go back into the world, only to find that the world grew up so fast he never even got a chance to blink. Stephen King's story is brought to the screen with great elegance and excitement. It is an extraordinary motion that people "will" be talking about in 50 or 100 years.	278	movie	https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg	The Shawshank Redemption
48	313	10	Hazbin Hotel on ainutlaatuinen animaatiosarja, joka pyörii internetissä ja on saanut paljon huomiota omaperäisen tyylinsä ja rohkean käsikirjoituksensa ansiosta. Sarja sijoittuu kuvitteelliseen Helvetin syövereihin, jossa sen perustaja, prinsessa Charlie, pyrkii perustamaan hotellin, jossa demonit voivat "parantua" pahoista tavoistaan ja mahdollisesti ansaita paikan Taivaassa. Sarjan huumori on tummaa ja sarkastista, mikä sopii hyvin sen goottilaishenkiseen ja värikkääseen visuaaliseen tyyliin. Hahmot ovat monimutkaisia ja karismaattisia, mikä tekee heistä mielenkiintoisia ja mieleenpainuvia. "Hazbin Hotel" haastaa perinteisiä käsityksiä moraalista ja lunastuksesta, tarjoten samalla sekä nauruja että syvällisempiä pohdintoja. Sarjan ensimmäinen jakso toimi lupaavana pilottina, ja fanit odottavat innolla lisää sisältöä.	94954	series	https://image.tmdb.org/t/p/w500/rXojaQcxVUubPLSrFV8PD4xdjrs.jpg	Hazbin Hotel
50	314	10	The Dark Knight on Christopher Nolanin ohjaama mestariteos, joka ilmestyi vuonna 2008. Elokuvan synkkä sävy ja syvällinen kerronta nostavat sen yhdeksi kaikkien aikojen parhaista supersankarielokuvista. Christian Bale esittää Batmania, joka joutuu vastakkain Heath Ledgerin unohtumattomasti tulkitseman Jokerin kanssa. Ledgerin roolisuoritus on paitsi pelottava myös syvästi inhimillinen, mikä tekee hahmosta kiehtovan. Elokuvan juoni kietoutuu korruption, moraalin ja uhrauksen teemojen ympärille, mikä tarjoaa katsojalle jännittävän ja ajatuksia herättävän kokemuksen. Visuaalisesti vaikuttava ja hyvin kirjoitettu, "The Dark Knight" ei ainoastaan määrittele Batman-elokuvia uudelleen, vaan nostaa koko lajityypin uudelle taiteelliselle tasolle.	155	movie	https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg	The Dark Knight
52	314	10	Tämä on Bladen arvio 10/10	36647	movie	https://image.tmdb.org/t/p/w500/oWT70TvbsmQaqyphCZpsnQR7R32.jpg	Blade
33	241	6	Schindler's List review	424	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
34	241	10	asdf	424	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
35	241	8	Animaatioelokuva	129	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
36	241	10	Dark knight	155	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
37	241	10	Pulp fiction on mainio elokuva	680	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
38	241	10	TÄmä on testi arvio	680	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
39	241	10	Tämä on arvio numero 1234	19404	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
40	241	10	12 vihaista miestä	389	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
41	241	10	Tämä on arvio	372058	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
42	241	10	en tykännyt 	13	movie	/img/apple.png	Elokuvan/sarjan nimi tietokannasta
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users ("idUser", "firstName", "lastName", "userName", password, email) FROM stdin;
3	fgh568	fgh568	fgh568	$2b$10$gVQqj2aGt/g9EZk65fCum.KwEJGJ.QHub6b5jMlPpOVwqQ3qBMdlq	fgh@fgh.vom
5	jkl	jkl	jkl	$2b$10$IXUH/IpBVvPGimukmp7jneyoG17pL9qzbNSWrBealfT7RdkldWp92	jkl@jkl-go
6	yhg	yggh	yggg	$2b$10$tcpzvYf.7MYFCz7QTcyY.eY4ODWfQplrjjLoauyn7B4o5MZ5XTnpK	ygg@tgvv.fo
8	Jorma	Jortikka	kiesus	$2b$10$oOZiAT8lQ9g8hlJ94d5bgOHGmISuPwpU8CkNUadF1o5neZdqW4bhi	sdfasdf@sadfsdaf.com
290	test	test	test1	$2b$10$CCjJ5.muOndTyxP0whErRehutmX9R1lq5LmAF6ox3iLdshc2bMgzi	test@test.test
299	Teppo	Teurastaja	Teris	$2b$10$L1fODmNGmD2boyKekZoTR.Z2iyvxmG5YcMpdWMNXrYTPVD//7rns6	teppo@nomail.kom
301	Teppo	Teurastaja	terkku	$2b$10$xC5cyJokenSrDoYuyMqAM.9.GpmcnEMRHxCedYQqrG1mp17o.VGf6	teppo@nomail.kom
302	Tiina	m	tn	$2b$10$BElZkXXqtoh7qj9NbPoojOMr5hhK2ct0/Qig3NCyJfA5pQAul3tlm	tn@gg.com
241	test	test	test	$2b$10$m7FYDPnS/A8A0gHmjxC9jONmDh2Bh6wW9GeNtcn0BdlRTcWXMoVKa	test@test.test
304	Tiina	m	tnn	$2b$10$bMu7ig5u48hHxP1si7ro2eOO1C4D2/wPM5xw0kUXSykzSNNeo/arW	tn@gg.com
305	Tiina	Mantykivi	tn123	$2b$10$XvpLswFygjqxEBCFlJCbxOL5/ba1HSXF2RZnaV4ZLBwHsglFf6rXK	tn123@ggg.com
306	jos	jos	jos	$2b$10$5/K55L1LgtFhEgyHs9fn9epTq7k7VvqopjFd8sq0/NmWqR1dR4zGe	jos@jos.jos
307	TämäOnTestiAjo	TämäOnTestiAjo	TämäOnTestiAjo	$2b$10$lZ4D0sKYxjsiyQ9pw1COKuXyiN6nV2yYf5giV40Q9zORUV2E7xRTK	TämäOnTestiAjot@test.test
312	Teppo	Testi	Tepsa	$2b$10$UiTGjkfAxi.CmdTEre9aqO0S8aX2q6mm9I.kiKcOcmQNpL1Jsyau2	tepsa@teppo.fi
313	Toni	Luukka	Lutikka	$2b$10$JXO5YNDqemUSkubv/cJIcOubN4pPVJsQXLj782nqQpqmmrihtidd2	Lutikka@ton.fi
314	Josu	Korhonen	Josu	$2b$10$Mlh3/xFrUmohnb7y/wv6jedTG9PDlDScJU4nXx.6hFFuIbN0htFdS	Josu@html.com
315	pasi	virtanen	pasi1	$2b$10$gGdwHFz1KEOfUjIbtn.DYO1X7epYvkOvz5/nuutHSHZpq.dJQ/pZe	pasi1@gmail.com
316	jouni	korhonen	jonezki01	$2b$10$w27CMZZdhyhFGU5X1knQX.GA9viHZjqHgAvqjb5kZuVdDr/ox8pJe	jouni.korhonen@riippumatto.com
43	Teppo	Termospullo	Termis	$2b$10$62ivKlWEt9I1FQ4O34kFQuEU6O5uKGMs9IJWiBWjTCKi6py12k.0y	terkku@kerkku.eitoimi
317	TEST	TEST	TEST	$2b$10$aHzxswSbefwQwmGA014Xqu1h0Zdl.gHKiu4OudXt3AIoOKYw/28Q6	test@test.test
318	rekister	rekister	rekister	$2b$10$C2KGG/N4Gxqep9La2RoDbubT1iJ0u7Jgfb95RexvujqriFEQ/aJ4S	rekister@mail.awl
55	test	test	test2	$2b$10$rOFBfr1AdqyI751BOFfcL.IQCyxSXZsrg91ePDllFDgfkUUh6qNsO	test@test.test
\.


--
-- Name: favorite_idFavorite_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."favorite_idFavorite_seq"', 1, false);


--
-- Name: groupContent_idGroupContent_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."groupContent_idGroupContent_seq"', 1, false);


--
-- Name: groupInvite_idGroupInvite_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."groupInvite_idGroupInvite_seq"', 47, true);


--
-- Name: groupMember_idGroupMember_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."groupMember_idGroupMember_seq"', 87, true);


--
-- Name: group_idGroup_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."group_idGroup_seq"', 113, true);


--
-- Name: review_idReview_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."review_idReview_seq"', 53, true);


--
-- Name: users_idUser_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."users_idUser_seq"', 319, true);


--
-- Name: favorite favorite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT favorite_pkey PRIMARY KEY ("idFavorite");


--
-- Name: groupContent groupContent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."groupContent"
    ADD CONSTRAINT "groupContent_pkey" PRIMARY KEY ("idGroupContent");


--
-- Name: groupInvite groupInvite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."groupInvite"
    ADD CONSTRAINT "groupInvite_pkey" PRIMARY KEY ("idGroupInvite");


--
-- Name: groupMember groupMember_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."groupMember"
    ADD CONSTRAINT "groupMember_pkey" PRIMARY KEY ("idGroupMember");


--
-- Name: group group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_pkey PRIMARY KEY ("idGroup");


--
-- Name: groupInvite one_invite_per_one_user_per_group; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."groupInvite"
    ADD CONSTRAINT one_invite_per_one_user_per_group UNIQUE ("group_idGroup", "inviteUserId");


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY ("idReview");


--
-- Name: groupMember thereCanBeOnly1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."groupMember"
    ADD CONSTRAINT "thereCanBeOnly1" UNIQUE ("user_idUser", "group_idGroup");


--
-- Name: group unique_groupname; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT unique_groupname UNIQUE ("groupName");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("idUser");


--
-- Name: users users_userName_unq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_userName_unq" UNIQUE ("userName");


--
-- Name: favorite favorite_user_idUser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT "favorite_user_idUser_fkey" FOREIGN KEY ("user_idUser") REFERENCES public.users("idUser") ON DELETE CASCADE NOT VALID;


--
-- Name: groupContent groupContent_groupMember_idGroupMember_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."groupContent"
    ADD CONSTRAINT "groupContent_groupMember_idGroupMember_fkey" FOREIGN KEY ("groupMember_idGroupMember") REFERENCES public."groupMember"("idGroupMember") ON DELETE CASCADE NOT VALID;


--
-- Name: groupContent groupContent_group_idGroup_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."groupContent"
    ADD CONSTRAINT "groupContent_group_idGroup_fkey" FOREIGN KEY ("group_idGroup") REFERENCES public."group"("idGroup") ON DELETE CASCADE NOT VALID;


--
-- Name: groupInvite groupInvite_groupMember_idGroupMember_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."groupInvite"
    ADD CONSTRAINT "groupInvite_groupMember_idGroupMember_fkey" FOREIGN KEY ("groupMember_idGroupMember") REFERENCES public."groupMember"("idGroupMember") ON DELETE CASCADE NOT VALID;


--
-- Name: groupInvite groupInvite_group_idGroup_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."groupInvite"
    ADD CONSTRAINT "groupInvite_group_idGroup_fkey" FOREIGN KEY ("group_idGroup") REFERENCES public."group"("idGroup") ON DELETE CASCADE NOT VALID;


--
-- Name: groupMember groupMember_group_idGroup_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."groupMember"
    ADD CONSTRAINT "groupMember_group_idGroup_fkey" FOREIGN KEY ("group_idGroup") REFERENCES public."group"("idGroup") ON DELETE CASCADE NOT VALID;


--
-- Name: groupMember groupMember_user_idUser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."groupMember"
    ADD CONSTRAINT "groupMember_user_idUser_fkey" FOREIGN KEY ("user_idUser") REFERENCES public.users("idUser") ON DELETE CASCADE NOT VALID;


--
-- Name: review review_user_idUser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "review_user_idUser_fkey" FOREIGN KEY ("user_idUser") REFERENCES public.users("idUser") ON DELETE CASCADE NOT VALID;


--
-- PostgreSQL database dump complete
--

