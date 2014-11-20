create database imageGallery;

use imageGallery;

create table image (
	id int not null auto_increment primary key,
	imagename varchar(255) not null
);

create table aboutimage (
	id int not null,
	imagename varchar(255) not null,
	imagetype varchar(15) not null,
	imagesize int not null,
	imagewidth int not null,
	imageheight int not null,
	FOREIGN KEY (id) REFERENCES image(id)
);
