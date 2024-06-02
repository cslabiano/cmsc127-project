DROP DATABASE IF EXISTS kusina;

CREATE DATABASE kusina;
USE kusina;

CREATE OR REPLACE TABLE user(
    user_id int(4) NOT NULL AUTO_INCREMENT,
    user_name varchar(15) NOT NULL,
    password longtext NOT NULL,
    primary key (user_id),
    constraint user_user_name_uk unique(user_name)
);

CREATE OR REPLACE TABLE establishment(
	estab_id int(4) NOT NULL AUTO_INCREMENT,
	estab_name varchar(15) NOT NULL,
	image_link longtext NOT NULL,
	address varchar(50),
	primary key(estab_id)
);

CREATE OR REPLACE TABLE userestab(
	user_id int(4) NOT NULL,
	estab_id int(4) NOT NULL,
	primary key(user_id, estab_id),
	constraint userestab_user_id_fk foreign key(user_id) references user(user_id),
	constraint userestab_estab_id_fk foreign key(estab_id) references establishment(estab_id)
);

CREATE OR REPLACE TABLE item(
	item_id int(4) NOT NULL AUTO_INCREMENT,
	price int(4) NOT NULL,
	name varchar(25),
	description varchar(50),
	image_link longtext NOT NULL,
	estab_id int(4) NOT NULL,
	primary key(item_id),
	constraint item_estab_id_fk foreign key(estab_id) references establishment(estab_id)
);

CREATE OR REPLACE TABLE estabcontact(
	estab_id int(4) NOT NULL,
	contact int(11) NOT NULL,
	primary key(estab_id, contact),
	constraint estabcontact_estab_id_fk foreign key(estab_id) references establishment(estab_id)	
);

CREATE OR REPLACE TABLE itemclass(
	item_id int(4) NOT NULL,
	classification varchar(15) NOT NULL,
	primary key(item_id, classification),
	constraint itemclass_item_id_fk foreign key(item_id) references item(item_id)
);

CREATE OR REPLACE TABLE estabreview(
	user_id int(4) NOT NULL,
	estab_id int(4) NOT NULL,
	date date default curdate() NOT NULL,
	time time default curtime() NOT NULL,
	rating int(1) NOT NULL,
	comment varchar(500),
	primary key(user_id, estab_id, date, time, rating, comment),
	constraint estabreview_user_id_fk foreign key(user_id) references user(user_id),
	constraint estabreview_estab_id_fk foreign key(estab_id) references establishment(estab_id)
);

CREATE OR REPLACE TABLE itemreview(
	user_id int(4) NOT NULL,
	item_id int(4) NOT NULL,
	date date default curdate() NOT NULL,
	time time default curtime() NOT NULL,
	rating int(1) NOT NULL,
	comment varchar(500),
	primary key(user_id, item_id, date, time, rating, comment),
	constraint itemreview_user_id_fk foreign key(user_id) references user(user_id),
	constraint itemreview_item_id_fk foreign key(item_id) references item(item_id)
);

INSERT INTO user(user_name, password) VALUES 
	('Markus', PASSWORD('123456789')), 
	('Angela', PASSWORD('ilove127')), 
	('Perico', PASSWORD('bestprof'));

INSERT INTO establishment(estab_name, address, image_link) VALUES 
	("Mommy Lode\'s", 'Square, Los Banos, Laguna', 'https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg'), 
	('Jollibee', 'UP Gate, Los Banos, Laguna', 'https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg'),
	('Coffee Bean', 'Calamba, Laguna', 'https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg'),
	('Jollibee', 'Junction, Los Banos, Laguna','https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg'),
	('Comeshots', 'Raymundo, Los Banos, Laguna', 'https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg'),
	('Coffee Grind', 'Centtro, Los Banos, Laguna', 'https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg'),
	('Coffeespot', 'Lopez Ave., Los Banos, Laguna', 'https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg');

INSERT INTO item(price, name, description, image_link, estab_id) VALUES
	(55, 'Garlic Chicken', 'Chicken sauteed in garlic', 'https://png.pngtree.com/background/20230427/original/pngtree-buffet-with-a-variety-of-food-for-sale-picture-image_2496277.jpg', 1),
	(75, 'Buttered Spicy Chicken', 'Chicken covered in spicy butter', 'https://png.pngtree.com/background/20230427/original/pngtree-buffet-with-a-variety-of-food-for-sale-picture-image_2496277.jpg', 1),
	(65, 'Sisig', 'Pork sisig topped with egg', 'https://png.pngtree.com/background/20230427/original/pngtree-buffet-with-a-variety-of-food-for-sale-picture-image_2496277.jpg', 1),
	(75, 'Mix and Match', 'Choose your own combination', 'https://png.pngtree.com/background/20230427/original/pngtree-buffet-with-a-variety-of-food-for-sale-picture-image_2496277.jpg', 2),
	(120, 'Chickenjoy with rice', 'Signature chicken', 'https://png.pngtree.com/background/20230427/original/pngtree-buffet-with-a-variety-of-food-for-sale-picture-image_2496277.jpg', 2),
	(85, 'Burger Steak', 'Burger patty topped with gravy', 'https://png.pngtree.com/background/20230427/original/pngtree-buffet-with-a-variety-of-food-for-sale-picture-image_2496277.jpg', 2),
	(215, 'Caramel Macchiato', 'Caramel espresso', 'https://i0.wp.com/blog.petpooja.com/wp-content/uploads/2022/01/5e1c750cf335dVariety-of-mocktails-for-top-page-of-blog.jpg?resize=568%2C378&ssl=1', 3),
	(165, 'Buttered Cheese Bread', 'Bread baked with cheese', 'https://ediblenortheastflorida.ediblecommunities.com/sites/default/files/images/aggregator/dessert%20table4.jpg', 3),
	(215, 'Mocha Frappuccino', 'Coffee with chocolate', 'https://i0.wp.com/blog.petpooja.com/wp-content/uploads/2022/01/5e1c750cf335dVariety-of-mocktails-for-top-page-of-blog.jpg?resize=568%2C378&ssl=1', 3),
	(100, 'Jolli-Fries', 'Lightly salted crispy fries', 'https://images.squarespace-cdn.com/content/v1/5d96d524052c897425394aaf/fe8e7af9-83a2-4e18-8280-ac5b278ad2f7/salad-bar-presentation.jpg', 4),
	(90, 'Jolli-Hotdog', 'Hotdog bun', 'https://ediblenortheastflorida.ediblecommunities.com/sites/default/files/images/aggregator/dessert%20table4.jpg', 4),
	(135, 'Spicy Chicken', 'Signature chicken but spicy', 'https://png.pngtree.com/background/20230427/original/pngtree-buffet-with-a-variety-of-food-for-sale-picture-image_2496277.jpg', 4),
	(90, 'Garlic Mayo', 'Chicken with garlic mayo sauce', 'https://png.pngtree.com/background/20230427/original/pngtree-buffet-with-a-variety-of-food-for-sale-picture-image_2496277.jpg', 5),
	(90, 'Sriracha', 'Chicken with sriracha sauce', 'https://png.pngtree.com/background/20230427/original/pngtree-buffet-with-a-variety-of-food-for-sale-picture-image_2496277.jpg', 5),
	(90, 'Teriyaki', 'Pork topped with teriyaki sauce', 'https://png.pngtree.com/background/20230427/original/pngtree-buffet-with-a-variety-of-food-for-sale-picture-image_2496277.jpg', 5),
	(100, 'Iced Coffee', 'Signature iced coffee', 'https://i0.wp.com/blog.petpooja.com/wp-content/uploads/2022/01/5e1c750cf335dVariety-of-mocktails-for-top-page-of-blog.jpg?resize=568%2C378&ssl=1', 6),
	(120, 'Chocolate Chip', 'Coffee with chocolate', 'https://ediblenortheastflorida.ediblecommunities.com/sites/default/files/images/aggregator/dessert%20table4.jpg', 6),
	(125, 'Americano', 'Black coffee', 'https://i0.wp.com/blog.petpooja.com/wp-content/uploads/2022/01/5e1c750cf335dVariety-of-mocktails-for-top-page-of-blog.jpg?resize=568%2C378&ssl=1', 6),
	(150, 'Pumpkin Spice', 'Limited edition', 'https://i0.wp.com/blog.petpooja.com/wp-content/uploads/2022/01/5e1c750cf335dVariety-of-mocktails-for-top-page-of-blog.jpg?resize=568%2C378&ssl=1', 7),
	(155, 'Strawberry Spice', 'Coffee topped with strawberries', 'https://i0.wp.com/blog.petpooja.com/wp-content/uploads/2022/01/5e1c750cf335dVariety-of-mocktails-for-top-page-of-blog.jpg?resize=568%2C378&ssl=1', 7),
	(100, 'Homemade cookies', 'In-house baked perfection', 'https://ediblenortheastflorida.ediblecommunities.com/sites/default/files/images/aggregator/dessert%20table4.jpg', 7),
	(79, 'Salad on the go', 'Small portion of salad in a cup', 'https://images.squarespace-cdn.com/content/v1/5d96d524052c897425394aaf/fe8e7af9-83a2-4e18-8280-ac5b278ad2f7/salad-bar-presentation.jpg', 2);

INSERT INTO estabreview(user_id, estab_id, rating, comment) VALUES
	(1, 1, 4, 'Delicious.'),
	(1, 2, 3, 'Saks lang.'),
	(1, 3, 5, 'Mahal pero masarap.'),
	(1, 5, 3, 'Pwede na.'),
	(1, 6, 2, 'Mahal na, di pa masarap.'),
	(2, 1, 4, 'Babalik-balikan.'),
	(2, 2, 5, 'My favorite.'),
	(2, 3, 3, 'Too pricy.'),
	(2, 4, 4, 'Yummy.'),
	(2, 5, 3, 'Mid.'),
	(2, 7, 2, 'Auq dito.'),
	(3, 2, 2, 'Di na katulad nang dati.'),
	(3, 3, 4, 'Masarap.'),
	(3, 4, 3, 'At least dito may spicy sila.'),
	(3, 5, 4, 'Fave dinner.'),
	(3, 6, 1, 'Pangit tambayan'),
	(3, 7, 3, 'Okay na ig.');

INSERT INTO itemreview(user_id, item_id, rating, comment) VALUES
	(1, 1, 4,'Good enough,'),
	(1, 2, 3, 'Tasty'),
	(1, 4, 3, 'Eh so-so.'),
	(1, 6, 3, 'Pantawaid gutomn'),
	(1, 9, 4, 'Ok lang.'),
	(1, 10, 4, 'Tastes nice'),
	(1, 12, 3, 'Never again'),
	(1, 14, 5, 'Sobrang sarap'),
	(1, 16, 3, 'Pwede na'),
	(1, 18, 4, 'Babalikan.'),
	(1, 20, 3, 'Goods na'),
	(2, 2, 4, 'Yummu.'),
	(2, 3, 3, 'Masarap naman'),
	(2, 5, 4, 'Sige msarap.'),
	(2, 7, 3, 'Ok naman.'),
	(2, 10, 4, 'Sarap sarap'),
	(2, 11, 4, 'Sarap naman ig'),
	(2, 12, 4,'Good enough,'),
	(2, 14, 3, 'Tasty'),
	(2, 15, 3, 'Eh so-so.'),
	(2, 16, 4, 'Pantawaid gutomn'),
	(2, 17, 4, 'Ok lang.'),
	(2, 20, 4, 'Tastes nice'),
	(2, 21, 3, 'Never again'),
	(3, 1, 5, 'Sobrang sarap'),
	(3, 3, 3, 'Pwede na'),
	(3, 4, 4, 'Babalikan.'),
	(3, 6, 3, 'Goods na'),
	(3, 8, 4, 'Babalikan.'),
	(3, 9, 3, 'Goods na'),
	(3, 11, 4, 'Yummu.'),
	(3, 15, 3, 'Masarap naman'),
	(3, 16, 4, 'Sige msarap.'),
	(3, 17, 3, 'Ok naman.'),
	(3, 18, 4, 'Sarap sarap'),
	(3, 19, 4, 'Sarap naman ig');

-- INSERT INTO estabcontact(estab_id, contact) VALUES 