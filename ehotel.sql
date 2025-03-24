 -- Create Hotel_Chain table
CREATE TABLE Hotel_Chain (
    name VARCHAR(255) PRIMARY KEY,
    address VARCHAR(255)
);

-- Create Phone_Number table
CREATE TABLE Phone_Number (
    value VARCHAR(255) PRIMARY KEY
);

-- Create Email table
CREATE TABLE Email (
    value VARCHAR(255) PRIMARY KEY
);

-- Create Chain_Phone table
CREATE TABLE Chain_Phone (
    hotel_chain_name VARCHAR(255),
    phone_value VARCHAR(255),
    PRIMARY KEY (hotel_chain_name, phone_value),
    FOREIGN KEY (hotel_chain_name) REFERENCES Hotel_Chain(name),
    FOREIGN KEY (phone_value) REFERENCES Phone_Number(value)
);

-- Create Chain_Email table
CREATE TABLE Chain_Email (
    hotel_chain_name VARCHAR(255),
    email_value VARCHAR(255),
    PRIMARY KEY (hotel_chain_name, email_value),
    FOREIGN KEY (hotel_chain_name) REFERENCES Hotel_Chain(name),
    FOREIGN KEY (email_value) REFERENCES Email(value)
);

-- Create Operates table
CREATE TABLE Operates (
    office_location VARCHAR(255) PRIMARY KEY,
    hotel_chain_name VARCHAR(255),
    PRIMARY KEY (office_location, hotel_chain_name),
    FOREIGN KEY (office_location) REFERENCES Office(location),
    FOREIGN KEY (hotel_chain_name) REFERENCES Hotel_Chain(name)
);

-- Create Hotel table
CREATE TABLE Hotel (
    name VARCHAR(255) PRIMARY KEY,
    hotel_chain_name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    category VARCHAR(255),
    manager_ssn VARCHAR(255) UNIQUE NOT NULL,
    email_value VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (hotel_chain_name) REFERENCES Hotel_Chain(name),
    FOREIGN KEY (email_value) REFERENCES Email(value)
);

-- Create Office table
CREATE TABLE Office (
    location VARCHAR(255) PRIMARY KEY
);

-- Create Person table
CREATE TABLE Person (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255)
);

-- Create Customer table
CREATE TABLE Customer (
    id INTEGER PRIMARY KEY,
    person_id INTEGER UNIQUE NOT NULL,
    registration_date TIMESTAMP,
    FOREIGN KEY (person_id) REFERENCES Person(id)
);

-- Create Employee table
CREATE TABLE Employee (
    ssn VARCHAR(255) PRIMARY KEY,
    person_id INTEGER UNIQUE NOT NULL,
    position VARCHAR(255),
    hotel_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (person_id) REFERENCES Person(id),
    FOREIGN KEY (hotel_name) REFERENCES Hotel(name)
);

-- Create Room table
CREATE TABLE Room (
    id INTEGER PRIMARY KEY,
    hotel_name VARCHAR(255) NOT NULL,
    hotel_chain_name VARCHAR(255),
    price DECIMAL(10, 2),
    capacity INTEGER,
    view VARCHAR(255),
    extension VARCHAR(255),
    FOREIGN KEY (hotel_name) REFERENCES Hotel(name),
    FOREIGN KEY (hotel_chain_name) REFERENCES Hotel_Chain(name)
);

-- Create Amenity table
CREATE TABLE Amenity (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(255) UNIQUE NOT NULL
);

-- Create Problem table
CREATE TABLE Problem (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    description TEXT
);

-- Create Has table
CREATE TABLE Has (
    amenity_id INTEGER,
    room_id INTEGER,
    PRIMARY KEY (amenity_id, room_id),
    FOREIGN KEY (amenity_id) REFERENCES Amenity(id),
    FOREIGN KEY (room_id) REFERENCES Room(id)
);

-- Create Manages table
CREATE TABLE Manages (
    manager_ssn VARCHAR(255),
    hotel_name VARCHAR(255),
    PRIMARY KEY (manager_ssn, hotel_name),
    FOREIGN KEY (manager_ssn) REFERENCES Employee(ssn),
    FOREIGN KEY (hotel_name) REFERENCES Hotel(name)
);

-- Create Employs table
CREATE TABLE Employs (
    employee_ssn VARCHAR(255),
    hotel_name VARCHAR(255),
    PRIMARY KEY (employee_ssn, hotel_name),
    FOREIGN KEY (employee_ssn) REFERENCES Employee(ssn),
    FOREIGN KEY (hotel_name) REFERENCES Hotel(name)
);

-- Create Books table
CREATE TABLE Books (
    customer_id INTEGER,
    room_id INTEGER,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    PRIMARY KEY (customer_id, room_id),
    FOREIGN KEY (customer_id) REFERENCES Customer(id),
    FOREIGN KEY (room_id) REFERENCES Room(id)
);

-- Create Happens table
CREATE TABLE Happens (
    room_id INTEGER,
    problem_id INTEGER,
    PRIMARY KEY (room_id, problem_id),
    FOREIGN KEY (room_id) REFERENCES Room(id),
    FOREIGN KEY (problem_id) REFERENCES Problem(id)
);

-- Create Hotel_Phone table
CREATE TABLE Hotel_Phone (
    hotel_name VARCHAR(255),
    hotel_address VARCHAR(255),
    hotel_chain_name VARCHAR(255),
    phone_number_value VARCHAR(255),
    PRIMARY KEY (hotel_name, hotel_address, hotel_chain_name, phone_number_value),
    FOREIGN KEY (hotel_name) REFERENCES Hotel(name),
    FOREIGN KEY (hotel_address) REFERENCES Hotel(address),
    FOREIGN KEY (hotel_chain_name) REFERENCES Hotel_Chain(name),
    FOREIGN KEY (phone_number_value) REFERENCES Phone_Number(value)
);


CREATE TABLE Rentals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    room_id INT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(id),
    FOREIGN KEY (room_id) REFERENCES Rooms(id)
);




INSERT INTO HotelChain (name) VALUES
('Fairmont Hotels & Resorts'),
('Marriott International'),
('Hilton Worldwide'),
('Hyatt Hotels'),
('Four Seasons Hotels and Resorts');

INSERT INTO Hotel (name, hotel_chain_name, address, category, manager_ssn, email_value) VALUES
('Fairmont Banff', 'Fairmont Hotels & Resorts', '405 Spray Avenue, Banff, Canada', 'Luxury', '111-22-3333', 'banff@fairmont.com'),
('Fairmont Quebec', 'Fairmont Hotels & Resorts', '1 Rue des Carrières, Quebec City, Canada', 'Luxury', '222-33-4444', 'quebec@fairmont.com'),
('Fairmont Montreal', 'Fairmont Hotels & Resorts', '900 René-Lévesque Blvd W, Montreal, Canada', 'Luxury', '333-44-5555', 'montreal@fairmont.com'),
('Fairmont Toronto', 'Fairmont Hotels & Resorts', '100 Front Street West, Toronto, Canada', 'Business', '444-55-6666', 'toronto@fairmont.com'),
('Fairmont Whistler', 'Fairmont Hotels & Resorts', '4591 Blackcomb Way, Whistler, Canada', 'Mid-Range', '555-66-7777', 'whistler@fairmont.com'),
('Fairmont Calgary', 'Fairmont Hotels & Resorts', '101 9th Avenue SE, Calgary, Canada', 'Business', '666-77-8888', 'calgary@fairmont.com'),
('Fairmont Vancouver', 'Fairmont Hotels & Resorts', '900 West Georgia Street, Vancouver, Canada', 'Luxury', '777-88-9999', 'vancouver@fairmont.com'),
('Fairmont Ottawa', 'Fairmont Hotels & Resorts', '1 Rideau Street, Ottawa, Canada', 'Luxury', '888-99-0000', 'ottawa@fairmont.com');


INSERT INTO Room (id, hotel_name, hotel_chain_name, price, capacity, view, extension) VALUES
(10014, 'Fairmont Banff', 'Fairmont Hotels & Resorts', 500.00, 2, 'Mountain View', 'true'),
(10015, 'Fairmont Banff', 'Fairmont Hotels & Resorts', 550.00, 3, 'Lake View', 'false'),
(10016, 'Fairmont Banff', 'Fairmont Hotels & Resorts', 600.00, 4, 'Mountain View', 'true'),
(10017, 'Fairmont Banff', 'Fairmont Hotels & Resorts', 650.00, 5, 'Valley View', 'false'),
(10018, 'Fairmont Banff', 'Fairmont Hotels & Resorts', 700.00, 6, 'Forest View', 'true'),
(10019, 'Fairmont Quebec', 'Fairmont Hotels & Resorts', 510.00, 2, 'City View', 'true'),
(10020, 'Fairmont Quebec', 'Fairmont Hotels & Resorts', 560.00, 3, 'River View', 'false'),
(10021, 'Fairmont Quebec', 'Fairmont Hotels & Resorts', 610.00, 4, 'City View', 'true'),
(10022, 'Fairmont Quebec', 'Fairmont Hotels & Resorts', 660.00, 5, 'Park View', 'false'),
(10023, 'Fairmont Quebec', 'Fairmont Hotels & Resorts', 710.00, 6, 'Lake View', 'true');

-- Insert hotels for Marriott International
INSERT INTO Hotel (name, hotel_chain_name, address, category, manager_ssn, email_value) VALUES
('Marriott New York', 'Marriott International', '1535 Broadway, New York, USA', 'Luxury', '111-22-3333', 'nyc@marriott.com'),
('Marriott Miami', 'Marriott International', '1201 Brickell Avenue, Miami, USA', 'Luxury', '222-33-4444', 'miami@marriott.com'),
('Marriott Los Angeles', 'Marriott International', '333 South Figueroa Street, Los Angeles, USA', 'Business', '333-44-5555', 'la@marriott.com'),
('Marriott Chicago', 'Marriott International', '540 North Michigan Avenue, Chicago, USA', 'Mid-Range', '444-55-6666', 'chicago@marriott.com'),
('Marriott Montreal', 'Marriott International', '1255 Jeanne-Mance Street, Montreal, Canada', 'Mid-Range', '555-66-7777', 'montreal@marriott.com'),
('Marriott Toronto', 'Marriott International', '123 Toronto St, Toronto, Canada', 'Business', '666-77-8888', 'toronto@marriott.com'),
('Marriott Vancouver', 'Marriott International', '1128 West Hastings Street, Vancouver, Canada', 'Business', '777-88-9999', 'vancouver@marriott.com'),
('Marriott Calgary', 'Marriott International', '110 9th Avenue SE, Calgary, Canada', 'Business', '888-99-0000', 'calgary@marriott.com');

-- Insert rooms for Marriott International
INSERT INTO Room (id, hotel_name, hotel_chain_name, price, capacity, view, extension) VALUES
(10024, 'Marriott New York', 'Marriott International', 450.00, 2, 'City View', 'true'),
(10025, 'Marriott New York', 'Marriott International', 500.00, 3, 'Park View', 'false'),
(10026, 'Marriott New York', 'Marriott International', 550.00, 4, 'City View', 'true'),
(10027, 'Marriott New York', 'Marriott International', 600.00, 5, 'Harbor View', 'false'),
(10028, 'Marriott New York', 'Marriott International', 650.00, 6, 'Ocean View', 'true'),
(10029, 'Marriott Miami', 'Marriott International', 460.00, 2, 'Ocean View', 'true'),
(10030, 'Marriott Miami', 'Marriott International', 510.00, 3, 'City View', 'false'),
(10031, 'Marriott Miami', 'Marriott International', 560.00, 4, 'Ocean View', 'true'),
(10032, 'Marriott Miami', 'Marriott International', 610.00, 5, 'Park View', 'false'),
(10033, 'Marriott Miami', 'Marriott International', 660.00, 6, 'Beach View', 'true');


-- Insert hotels for Hilton Worldwide
INSERT INTO Hotel (name, hotel_chain_name, address, category, manager_ssn, email_value) VALUES
('Hilton New York', 'Hilton Worldwide', '1335 6th Avenue, New York, USA', 'Luxury', '111-22-3333', 'nyc@hilton.com'),
('Hilton Miami', 'Hilton Worldwide', '1601 Collins Avenue, Miami, USA', 'Luxury', '222-33-4444', 'miami@hilton.com'),
('Hilton Los Angeles', 'Hilton Worldwide', '555 Universal Hollywood Drive, Los Angeles, USA', 'Business', '333-44-5555', 'la@hilton.com'),
('Hilton Chicago', 'Hilton Worldwide', '720 South Michigan Avenue, Chicago, USA', 'Mid-Range', '444-55-6666', 'chicago@hilton.com'),
('Hilton Montreal', 'Hilton Worldwide', '1255 Jeanne-Mance Street, Montreal, Canada', 'Mid-Range', '555-66-7777', 'montreal@hilton.com'),
('Hilton Toronto', 'Hilton Worldwide', '145 Richmond Street West, Toronto, Canada', 'Business', '666-77-8888', 'toronto@hilton.com'),
('Hilton Vancouver', 'Hilton Worldwide', '433 Robson Street, Vancouver, Canada', 'Business', '777-88-9999', 'vancouver@hilton.com'),
('Hilton Calgary', 'Hilton Worldwide', '711 4th Street SE, Calgary, Canada', 'Business', '888-99-0000', 'calgary@hilton.com');

-- Insert rooms for Hilton Worldwide
INSERT INTO Room (id, hotel_name, hotel_chain_name, price, capacity, view, extension) VALUES
(10034, 'Hilton New York', 'Hilton Worldwide', 470.00, 2, 'City View', 'true'),
(10035, 'Hilton New York', 'Hilton Worldwide', 520.00, 3, 'Park View', 'false'),
(10036, 'Hilton New York', 'Hilton Worldwide', 570.00, 4, 'City View', 'true'),
(10037, 'Hilton New York', 'Hilton Worldwide', 620.00, 5, 'Harbor View', 'false'),
(10038, 'Hilton New York', 'Hilton Worldwide', 670.00, 6, 'Ocean View', 'true'),
(10039, 'Hilton Miami', 'Hilton Worldwide', 480.00, 2, 'Ocean View', 'true'),
(10040, 'Hilton Miami', 'Hilton Worldwide', 530.00, 3, 'City View', 'false'),
(10041, 'Hilton Miami', 'Hilton Worldwide', 580.00, 4, 'Ocean View', 'true'),
(10042, 'Hilton Miami', 'Hilton Worldwide', 630.00, 5, 'Park View', 'false'),
(10043, 'Hilton Miami', 'Hilton Worldwide', 680.00, 6, 'Beach View', 'true');


-- Insert hotels for Hyatt Hotels
INSERT INTO Hotel (name, hotel_chain_name, address, category, manager_ssn, email_value) VALUES
('Hyatt New York', 'Hyatt Hotels', '109 East 42nd Street, New York, USA', 'Luxury', '111-22-3333', 'nyc@hyatt.com'),
('Hyatt Miami', 'Hyatt Hotels', '400 SE 2nd Avenue, Miami, USA', 'Luxury', '222-33-4444', 'miami@hyatt.com'),
('Hyatt Los Angeles', 'Hyatt Hotels', '2025 Avenue of the Stars, Los Angeles, USA', 'Business', '333-44-5555', 'la@hyatt.com'),
('Hyatt Chicago', 'Hyatt Hotels', '151 East Wacker Drive, Chicago, USA', 'Mid-Range', '444-55-6666', 'chicago@hyatt.com'),
('Hyatt Montreal', 'Hyatt Hotels', '1255 Jeanne-Mance Street, Montreal, Canada', 'Mid-Range', '555-66-7777', 'montreal@hyatt.com'),
('Hyatt Toronto', 'Hyatt Hotels', '370 King Street West, Toronto, Canada', 'Business', '666-77-8888', 'toronto@hyatt.com'),
('Hyatt Vancouver', 'Hyatt Hotels', '655 Burrard Street, Vancouver, Canada', 'Business', '777-88-9999', 'vancouver@hyatt.com'),
('Hyatt Calgary', 'Hyatt Hotels', '700 Centre Street SE, Calgary, Canada', 'Business', '888-99-0000', 'calgary@hyatt.com');

-- Insert rooms for Hyatt Hotels
INSERT INTO Room (id, hotel_name, hotel_chain_name, price, capacity, view, extension) VALUES
(10044, 'Hyatt New York', 'Hyatt Hotels', 490.00, 2, 'City View', 'true'),
(10045, 'Hyatt New York', 'Hyatt Hotels', 540.00, 3, 'Park View', 'false'),
(10046, 'Hyatt New York', 'Hyatt Hotels', 590.00, 4, 'City View', 'true'),
(10047, 'Hyatt New York', 'Hyatt Hotels', 640.00, 5, 'Harbor View', 'false'),
(10048, 'Hyatt New York', 'Hyatt Hotels', 690.00, 6, 'Ocean View', 'true'),
(10049, 'Hyatt Miami', 'Hyatt Hotels', 500.00, 2, 'Ocean View', 'true'),
(10050, 'Hyatt Miami', 'Hyatt Hotels', 550.00, 3, 'City View', 'false'),
(10051, 'Hyatt Miami', 'Hyatt Hotels', 600.00, 4, 'Ocean View', 'true'),
(10052, 'Hyatt Miami', 'Hyatt Hotels', 650.00, 5, 'Park View', 'false'),
(10053, 'Hyatt Miami', 'Hyatt Hotels', 700.00, 6, 'Beach View', 'true');


-- Insert hotels for Four Seasons Hotels and Resorts
INSERT INTO Hotel (name, hotel_chain_name, address, category, manager_ssn, email_value) VALUES
('Four Seasons New York', 'Four Seasons Hotels and Resorts', '57 East 57th Street, New York, USA', 'Luxury', '111-22-3333', 'nyc@fourseasons.com'),
('Four Seasons Miami', 'Four Seasons Hotels and Resorts', '1435 Brickell Avenue, Miami, USA', 'Luxury', '222-33-4444', 'miami@fourseasons.com'),
('Four Seasons Los Angeles', 'Four Seasons Hotels and Resorts', '300 South Doheny Drive, Los Angeles, USA', 'Business', '333-44-5555', 'la@fourseasons.com'),
('Four Seasons Chicago', 'Four Seasons Hotels and Resorts', '120 East Delaware Place, Chicago, USA', 'Mid-Range', '444-55-6666', 'chicago@fourseasons.com'),
('Four Seasons Montreal', 'Four Seasons Hotels and Resorts', '1440 Rue de la Montagne, Montreal, Canada', 'Mid-Range', '555-66-7777', 'montreal@fourseasons.com'),
('Four Seasons Toronto', 'Four Seasons Hotels and Resorts', '60 Yorkville Avenue, Toronto, Canada', 'Business', '666-77-8888', 'toronto@fourseasons.com'),
('Four Seasons Vancouver', 'Four Seasons Hotels and Resorts', '791 West Georgia Street, Vancouver, Canada', 'Business', '777-88-9999', 'vancouver@fourseasons.com'),
('Four Seasons Calgary', 'Four Seasons Hotels and Resorts', '101 9th Avenue SE, Calgary, Canada', 'Business', '888-99-0000', 'calgary@fourseasons.com');

-- Insert rooms for Four Seasons Hotels and Resorts
INSERT INTO Room (id, hotel_name, hotel_chain_name, price, capacity, view, extension) VALUES
(10054, 'Four Seasons New York', 'Four Seasons Hotels and Resorts', 550.00, 2, 'City View', 'true'),
(10055, 'Four Seasons New York', 'Four Seasons Hotels and Resorts', 600.00, 3, 'Park View', 'false'),
(10056, 'Four Seasons New York', 'Four Seasons Hotels and Resorts', 650.00, 4, 'City View', 'true'),
(10057, 'Four Seasons New York', 'Four Seasons Hotels and Resorts', 700.00, 5, 'Harbor View', 'false'),
(10058, 'Four Seasons New York', 'Four Seasons Hotels and Resorts', 750.00, 6, 'Ocean View', 'true'),
(10059, 'Four Seasons Miami', 'Four Seasons Hotels and Resorts', 560.00, 2, 'Ocean View', 'true'),
(10060, 'Four Seasons Miami', 'Four Seasons Hotels and Resorts', 610.00, 3, 'City View', 'false'),
(10061, 'Four Seasons Miami', 'Four Seasons Hotels and Resorts', 660.00, 4, 'Ocean View', 'true'),
(10062, 'Four Seasons Miami', 'Four Seasons Hotels and Resorts', 710.00, 5, 'Park View', 'false'),
(10063, 'Four Seasons Miami', 'Four Seasons Hotels and Resorts', 760.00, 6, 'Beach View', 'true');

--agregation query
SELECT 
  hotel_chain_name, 
  AVG(price) AS average_price
FROM 
  Room
GROUP BY 
  hotel_chain_name;


--nestedquery

SELECT 
  hotel_name, 
  hotel_chain_name, 
  price
FROM 
  Room
WHERE 
  price > (SELECT AVG(price) FROM Room);


--query with join

SELECT 
  Room.id, 
  Room.hotel_name, 
  Room.price, 
  Room.capacity, 
  Room.view, 
  Room.extension, 
  Hotel.address
FROM 
  Room
JOIN 
  Hotel ON Room.hotel_name = Hotel.name;

--query with group by and having

SELECT 
  hotel_chain_name, 
  COUNT(*) AS total_rooms
FROM 
  Room
GROUP BY 
  hotel_chain_name
HAVING 
  COUNT(*) > 10;



--trigger prevent deleting rooms with active rooms
DELIMITER $$

CREATE TRIGGER prevent_hotel_delete
BEFORE DELETE ON Hotel
FOR EACH ROW
BEGIN
  DECLARE room_count INT;

  -- Check if the hotel has any rooms
  SELECT COUNT(*) INTO room_count
  FROM Room
  WHERE hotel_name = OLD.name;

  -- If rooms exist, prevent deletion
  IF room_count > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Cannot delete hotel: Rooms still exist for this hotel.';
  END IF;
END$$

DELIMITER ;


-- enforce minimum room price

DELIMITER $$

CREATE TRIGGER enforce_min_room_price
BEFORE INSERT ON Room
FOR EACH ROW
BEGIN
  IF NEW.price < 100 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Room price cannot be less than $100.';
  END IF;
END$$

DELIMITER ;

--Update Hotel Chain Name in Rooms When Hotel Chain is Updated
DELIMITER $$

CREATE TRIGGER update_hotel_chain_name
AFTER UPDATE ON Hotel
FOR EACH ROW
BEGIN
  -- Update the hotel_chain_name in the Room table
  UPDATE Room
  SET hotel_chain_name = NEW.hotel_chain_name
  WHERE hotel_name = NEW.name;
END$$

DELIMITER ;

--Prevent Inserting Duplicate Room IDs

DELIMITER $$

CREATE TRIGGER prevent_duplicate_room_id
BEFORE INSERT ON Room
FOR EACH ROW
BEGIN
  DECLARE room_id_count INT;

  -- Check if the room ID already exists
  SELECT COUNT(*) INTO room_id_count
  FROM Room
  WHERE id = NEW.id;

  -- If the room ID exists, prevent insertion
  IF room_id_count > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Duplicate room ID: Room ID already exists.';
  END IF;
END$$

DELIMITER ;



-- index 1: 1. Index on Room(hotel_name)
--Justification:
--Purpose: The hotel_name column is frequently used in JOIN operations between the Room and Hotel tables, as well as in WHERE clauses to filter rooms by hotel.
SELECT * FROM Room WHERE hotel_name = 'Fairmont Vancouver';
SELECT * FROM Room JOIN Hotel ON Room.hotel_name = Hotel.name;
CREATE INDEX idx_room_hotel_name ON Room(hotel_name);

--index 2 Index on Hotel(hotel_chain_name)
--Justification:
--Purpose: The hotel_chain_name column is often used in queries to filter hotels by their chain or to aggregate data (e.g., average room price per chain).

SELECT * FROM Hotel WHERE hotel_chain_name = 'Fairmont Hotels & Resorts';
SELECT hotel_chain_name, AVG(price) FROM Room GROUP BY hotel_chain_name;
--Data Updates: Frequent inserts, updates, and deletes of hotels within specific chains.
--Benefit: This index speeds up queries that filter or group by the hotel_chain_name column.

CREATE INDEX idx_hotel_chain_name ON Hotel(hotel_chain_name);

--index 3 Justification:
--Purpose: The price column is frequently used in queries to filter rooms by price range or to find the most/least expensive rooms.

SELECT * FROM Room WHERE price BETWEEN 200 AND 400;
SELECT * FROM Room ORDER BY price DESC LIMIT 10;
--Data Updates: Frequent updates to room prices (e.g., during promotions or seasonal changes).
--Benefit: This index speeds up queries that filter or sort by the price column.
CREATE INDEX idx_room_price ON Room(price);



--View 1:
CREATE VIEW Available_Rooms_Per_Area AS
SELECT 
  SUBSTRING_INDEX(Hotel.address, ',', 1) AS area, 
  COUNT(Room.id) AS available_rooms
FROM 
  Room
JOIN 
  Hotel ON Room.hotel_name = Hotel.name
GROUP BY 
  area;

SELECT * FROM Available_Rooms_Per_Area;

-- View 2: Aggregated Capacity of All Rooms in a Specific Hotel
--This view calculates the total capacity of all rooms in a specific hotel.
CREATE VIEW Hotel_Capacity AS
SELECT 
  hotel_name, 
  SUM(capacity) AS total_capacity
FROM 
  Room
GROUP BY 
  hotel_name;

--View 3: Average Room Price per Hotel Chain
--This view calculates the average room price for each hotel chain.

CREATE VIEW Average_Price_Per_Chain AS
SELECT 
  hotel_chain_name, 
  AVG(price) AS average_price
FROM 
  Room
GROUP BY 
  hotel_chain_name;

--Explanation:
--AVG(price): Calculates the average room price for each hotel chain.
--The view groups the results by hotel_chain_name.
SELECT * FROM Average_Price_Per_Chain;