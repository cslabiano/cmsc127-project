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

INSERT INTO establishment(estab_name, address) VALUES 
	("Mommy Lode\'s", 'Square, Los Banos, Laguna'), 
	('Jollibee', 'UP Gate, Los Banos, Laguna'),
	('Coffee Bean', 'Calamba, Laguna'),
	('Jollibee', 'Junction, Los Banos, Laguna'),
	('Comeshots', 'Raymundo, Los Banos, Laguna'),
	('Coffee Grind', 'Centtro, Los Banos, Laguna'),
	('Coffeespot', 'Lopez Ave., Los Banos, Laguna');

INSERT INTO item(price, name, description, estab_id) VALUES
	(55, 'Garlic Chicken', 'Chicken sauteed in garlic', 1),
	(75, 'Buttered Spicy Chicken', 'Chicken covered in spicy butter', 1),
	(65, 'Sisig', 'Pork sisig topped with egg', 1),
	(75, 'Mix and Match', 'Choose your own combination', 2),
	(120, 'Chickenjoy with rice', 'Signature chicken', 2),
	(85, 'Burger Steak', 'Burger patty topped with gravy', 2),
	(215, 'Caramel Macchiato', 'Caramel espresso', 3),
	(165, 'Buttered Cheese Bread', 'Bread baked with cheese', 3),
	(215, 'Mocha Frappuccino', 'Coffee with chocolate', 3),
	(100, 'Jolli-Fries', 'Lightly salted crispy fries', 4),
	(90, 'Jolli-Hotdog', 'Hotdog bun', 4),
	(135, 'Spicy Chicken', 'Signature chicken but spicy', 4),
	(90, 'Garlic Mayo', 'Chicken with garlic mayo sauce', 5),
	(90, 'Sriracha', 'Chicken with sriracha sauce', 5),
	(90, 'Teriyaki', 'Pork topped with teriyaki sauce', 5),
	(100, 'Iced Coffee', 'Signature iced coffee', 6),
	(120, 'Chocolate Chip', 'Coffee with chocolate', 6),
	(125, 'Americano', 'Black coffee', 6),
	(150, 'Pumpkin Spice', 'Limited edition', 7),
	(155, 'Strawberry Spice', 'Coffee topped with strawberries', 7),
	(100, 'Homemade cookies', 'In-house baked perfection', 7);

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