use master
go

IF EXISTS(select * from sys.databases where name='DVDdbDmitryS')
	DROP DATABASE DVDdbDmitryS



create database DVDdbDmitryS
go


use DVDdbDmitryS
go

create table DVDtable (
	DVDID int identity(1,1) primary key,
	DVDtitle nvarchar(50) not null,
	DVDartist nvarchar(50) not null,
	DVDrating int not null,
	DVDprice money not null,
	DVDimg varchar(250) not null,
	DVDyear int,
	DVDdecription nvarchar(max)
)
go

CREATE TABLE Customers(
	CustomerID int IDENTITY(1,1) primary key,
	FirstName nvarchar(50) NOT NULL,
	LastName nvarchar(50) NOT NULL,
)
GO

CREATE TABLE Orders(
	OrderID int IDENTITY(1,1) primary key,
	CustomerID int NOT NULL REFERENCES Customers(CustomerID),
)
GO

CREATE TABLE DVDsOrdered(
	DVDsOrderedID int IDENTITY(1,1),
	OrderID int NOT NULL,
	DVDID int NOT NULL,
	CONSTRAINT PK_DVDsOrdered PRIMARY KEY CLUSTERED (DVDsOrderedID)
               WITH (IGNORE_DUP_KEY = OFF),
	CONSTRAINT FK_DVDsOrdered_Orders FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
	CONSTRAINT FK_DVDsOrdered_DVDID FOREIGN KEY (DVDID) REFERENCES DVDtable(DVDID)
)

GO



insert into DVDtable(DVDtitle, DVDartist, DVDrating, DVDprice,DVDimg,DVDyear,DVDdecription)
values ('Every Man Should Know', 'Harry Connick Jr.', 5, 10.79, 'http://img1.imagesbn.com/p/888837292924_p0_v1_s600.JPG',2012,N'Following the Mardi Gras-influenced funk excursion that was Smokey Mary, Every Man Should Know finds Harry Connick, Jr. in cathartic mood. This, his 30th album, is the seventh on which he has written and arranged every single track. Guest musicians featured include both Wynton and Branford Marsalis as well as the Nashville-based guitarist Bryan Sutton.'),
	   ('Life Is But A Dream', 'Beyonce', 4, 16.88, 'http://i.walmartimages.com/i/p/00/88/84/30/08/0088843008659_300X300.jpg',2004,N'Another year, another Beyoncé DVD. While fans across the world await her much-anticipated fifth studio album, the superstar announces the release of her documentary/concert DVD Life is But a Dream. The new release includes her documentary of the same name, which premiered on HBO this past February, and her comeback concert in Atlantic City at Revel. Fans can pre-order the DVD now on amazon.com, it will officially land in stores on November 25.'),
	   ('The Greatest Hits', 'Whitney Houston ', 5, 11.0, 'http://i.walmartimages.com/i/p/00/07/82/21/57/0007822157469_300X300.jpg',2011,N'It should come as no surprise that a woman who counts Dionne Warwick as a cousin, Aretha Franklin as a family friend, and whose mother was a legendary session and gospel singer, became a phenomenally successful R&B act. Perhaps more surprising is that it took 17 years after first signing with Arista for Whitney Houston to produce her first greatest hits album.'),
	   ('All the Way', 'Celine Dion', 4, 11.97,'http://i.walmartimages.com/i/p/00/07/46/45/02/0007464502299_300X300.jpg',2002,N'All the Way… A Decade of Song is the first English-language greatest hits album by Canadian recording artist Celine Dion. Released by Sony Music Entertainment on November 12, 1999, it features nine previously released and seven new recordings. Dion worked on new songs mainly with David Foster, other producers include: Max Martin, Kristian Lundin, Robert John "Mutt" Lange, James Horner and Matt Serletic.'),
	   ('Vivaldi: The Four Seasons', 'Sarah Chang', 5, 16.98, 'http://ecx.images-amazon.com/images/I/71tRXkWQUWL._SL1417_.jpg',2001,N'Vivaldi''s Four Seasons movie was released Nov 21, 2006 by the Kultur Films Inc. studio. This special visualization of this most famous Vivaldi concerto, The Four Seasons, is shot in Venice, where the composer conceived the work. Vivaldi''s Four Seasons video It captures the atmosphere of this stunningly beautiful city in all its varied moods and aspects throughout the year: in spring, when sunlight starts to sparkle on the water, the city awakens and romance is in the air; in summer when the tourists arrive, adding new life and energy to this teeming city as they wander through narrow alleyways, visiting Venice''s beautiful squares and churches.')

go


Select DVDtitle, DVDartist, DVDrating, FORMAT(DVDprice, 'C', 'en-us') AS 'DVDprice',DVDimg from DVDtable
select * from  DVDtable

/*

use master
go

drop database DVDdbDmitryS
go

*/