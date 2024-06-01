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
