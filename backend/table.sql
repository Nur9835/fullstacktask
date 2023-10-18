create table user(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(250),
    email varchar(50),
    phone_number varchar(20),
    UNIQUE (email)
);


create table reservations(
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    branch_id INT,
    reservation_date DATETIME,
    note TEXT,
    statu ENUM('pending', 'approved', 'rejected')
);

create table branches(
    branch_id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT NOT NULL,
    name varchar(255) ,
    working_hours JSON,
    address varchar(255) 
);

CREATE TABLE restaurants (
    restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner_email VARCHAR(255) NOT NULL,
    -- phone_number VARCHAR(20) NOT NULL,
    -- address VARCHAR(255),
    -- other_details TEXT

);





-- CREATE TABLE logs (
--     log_id INT AUTO_INCREMENT PRIMARY KEY,
--     event_type VARCHAR(255),
--     event_description TEXT,
--     event_timestamp DATETIME
-- );
