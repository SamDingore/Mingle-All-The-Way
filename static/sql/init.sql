USE matw_store;

-- Create `matw_users` table
CREATE TABLE matw_users (
  user_id INT AUTO_INCREMENT NOT NULL,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  gender VARCHAR(50),
  dob_mm INT NOT NULL,
  dob_dd INT NOT NULL,
  dob_yy INT NOT NULL,
  food_type VARCHAR(20),
  address VARCHAR(500),
  zipcode VARCHAR(10),
  country VARCHAR(50),
  state VARCHAR(50),
  PRIMARY KEY (user_id)
);

-- Add column `occupation` to `matw_users`
ALTER TABLE matw_users
ADD COLUMN occupation VARCHAR(500) NOT NULL;

-- Create `store_db` table
CREATE TABLE store_db (
  store_id INT AUTO_INCREMENT NOT NULL,
  store_name VARCHAR(50) NOT NULL,
  store_email VARCHAR(50) NOT NULL,
  store_password VARCHAR(255) NOT NULL,
  store_type VARCHAR(50),
  store_street VARCHAR(50) NOT NULL,
  store_block VARCHAR(50) NOT NULL,
  store_city VARCHAR(100) NOT NULL,
  store_zipcode VARCHAR(10) NOT NULL,
  store_state VARCHAR(50) NOT NULL,
  store_country VARCHAR(50) NOT NULL,
  store_contact INT,
  store_desc VARCHAR(500),
  store_license_no VARCHAR(50) NOT NULL,
  PRIMARY KEY (store_id)
);

-- Create `match_user` table
CREATE TABLE match_user (
  match_id INT AUTO_INCREMENT NOT NULL,
  match_user VARCHAR(100) NOT NULL,
  match_store VARCHAR(100) NOT NULL,
  ride VARCHAR(20) NOT NULL,
  search_day INT NOT NULL,
  search_month INT NOT NULL,
  match_age VARCHAR(10) NOT NULL,
  match_gender VARCHAR(30) NOT NULL,
  my_gender VARCHAR(30) NOT NULL,
  my_age INT NOT NULL,
  my_zipcode VARCHAR(10) NOT NULL,
  my_food_type VARCHAR(20) NOT NULL,
  my_country VARCHAR(60) NOT NULL,
  my_state VARCHAR(60) NOT NULL,
  PRIMARY KEY (match_id)
);

-- Add column `my_name` to `match_user`
ALTER TABLE match_user
ADD COLUMN my_name VARCHAR(50) NOT NULL;

-- Create `matchme` procedure
DELIMITER //
CREATE PROCEDURE matchme(
  IN ride_param VARCHAR(10),
  IN my_zipcode_param VARCHAR(10),
  OUT result VARCHAR(100)
)
BEGIN
  SELECT match_user
  INTO result
  FROM match_user
  WHERE ride = ride_param AND my_zipcode = my_zipcode_param;
END //
DELIMITER ;

-- Create `GetOfficeByCountry` procedure
DELIMITER //
CREATE PROCEDURE GetOfficeByCountry(
  IN countryName VARCHAR(255),
  IN my_zip VARCHAR(100)
)
BEGIN
  SELECT *
  FROM match_user
  WHERE my_country = countryName AND my_zipcode = my_zip;
END //
DELIMITER ;
