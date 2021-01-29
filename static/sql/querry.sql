




/* create table for users to join*/
CREATE TABLE matw_users(
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

ALTER TABLE matw_users
ADD COLUMN occupation VARCHAR(500) NOT NULL

/* create table for users from store*/


CREATE TABLE store_db(
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

title: resultsapi[0].store_name, value:resultsapi[0].store_email title2: resultsapi[1].store_name, value2:resultsapi[1].store_email, useremail:user_email, title3: resultsapi[2].store_name, value3:resultsapi[2].store_email, title4: resultsapi[3].store_name, value4:resultsapi[3].store_email, title5: resultsapi[4].store_name, value5: resultsapi[4].store_email


profile_token:  matchfound[0].match_user,

 match_image: match_image,


     matchname:matchfound[0].my_name,

      matchdate:matchfound[0].search_day,

      matchmonth: matchfound[0].search_month,

       matchage:matchfound[0].my_age,

        matchgender:matchfound[0].my_gender,


             occupation: my_occupation

             const my_age1 = (curr_year - results[1].dob_yy);
             const my_age2 = (curr_year - results[2].dob_yy);
             const my_age3 = (curr_year - results[3].dob_yy);
             const my_age4 = (curr_year - results[4].dob_yy);



profile_token:  matchfound[0].match_user, profile_token1:  matchfound[1].match_user, profile_token2:  matchfound[2].match_user, profile_token3:  matchfound[3].match_user, profile_token4:  matchfound[4].match_user,  match_image: match_image, match_image1: match_image1,match_image2: match_image2, match_image3: match_image3, match_image4: match_image4, token:token,  profile_name: my_name, avatar:avatar, matchname:matchfound[0].my_name, matchname1:matchfound[1].my_name,   matchname2:matchfound[2].my_name, matchname3:matchfound[3].my_name, matchname4:matchfound[4].my_name, matchdate:matchfound[0].search_day, matchdate1:matchfound[1].search_day, matchdate2:matchfound[2].search_day, matchdate3:matchfound[3].search_day, matchdate4:matchfound[4].search_day, matchmonth: matchfound[0].search_month, matchmonth1: matchfound[1].search_month,  matchmonth2: matchfound[2].search_month,  matchmonth3: matchfound[3].search_month,  matchmonth4: matchfound[4].search_month, matchage:matchfound[0].my_age, matchage1:matchfound[1].my_age,  matchage2:matchfound[2].my_age,  matchage3:matchfound[3].my_age,  matchage4:matchfound[4].my_age,  matchgender:matchfound[0].my_gender, matchgender1:matchfound[1].my_gender, matchgender2:matchfound[2].my_gender, matchgender3:matchfound[3].my_gender, matchgender4:matchfound[4].my_gender, apistorename: apistore_name, apistoretype: apistore_type, apistorecontact: apistore_contact, apistorestreet: apistore_street, apistoreblock: apistore_block, apistorecity: apistore_city, apistorezipcode: apistore_zipcode, apistorestate: apistore_state, apistoredesc: apistore_desc, occupation: my_occupation,  occupation1: my_occupation1,  occupation2: my_occupation2,  occupation3: my_occupation3,  occupation4: my_occupation4



const my_occupation = matchfound[0].occupation;
const my_occupation1 = matchfound[1].occupation;
const my_occupation2 = matchfound[2].occupation;
const my_occupation3 = matchfound[3].occupation;
const my_occupation4 = matchfound[4].occupation;

const my_occupation1 = matchfound[1].occupation;

profile_token1:  matchresults[1].match_user;

match_image0 =  match_image_result0;
matchname0 = matchresults[0].my_name;
matchdate0 = matchresults[0].search_day;
matchmonth0 =  matchresults[0].search_month;
matchage0 = matchresults[0].my_age;
matchgender0 = matchresults[0].my_gender;


match_image1:match_image1,
matchname1: matchname1,
matchdate1: matchdate1,
matchmonth1: matchmonth1,
matchage1: matchage1,
matchgender1: matchgender1
occupation1: my_occupation1;
profile_token1: profile_token1

db.query('SELECT my_name FROM match_user WHERE match_user = ?', [match_user], async (error, deleteresults) =>{
      if(error){
          console.log(error);

      }

      if(deleteresults.length > 0){
        db.query('DELETE FROM match_user WHERE match_user=?',[match_user], async(error) =>{
          if (error) {
            console.log(error);
          }
        })
      }

    })

INSERT INTO
        store_db(
          store_name,
          store_type,
          store_address,
          store_zipcode,
          store_state,
          store_country,
          store_contact,
        )


        CREATE TABLE match_user(
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


        SELECT match_user FROM match_user WHERE ride='share' AND mye ='97217' AND my_gender='female' AND my_food_type in('vegetarian','nonvegetarian') ;


DELIMITER //
CREATE FUNCTION matchme (ride VARCHAR(10), my_zipcode VARCHAR(10))

RETURNS VARCHAR(100)

BEGIN

    DECLARE

DELIMITER $$

CREATE PROCEDURE matchme(
  IN ride VARCHAR(10),
  IN my_zipcode VARCHAR(10),
  OUT results VARCHAR(100),
)

BEGIN

     SELECT match_user
     INTO results
     FROM match_user
     WHERE ride = ride AND my_zipcode =my_zipcode;

END$$

DELIMITER;


DELIMITER //

CREATE PROCEDURE GetOfficeByCountry(
	IN countryName VARCHAR(255),
  IN my_zip VARCHAR(100),
)
BEGIN
	SELECT *
 	FROM match_user
	WHERE ride = countryName AND my_gender = my_zip;
END //

DELIMITER ;


ALTER TABLE match_user
ADD COLUMN my_name VARCHAR(50) NOT NULL;
