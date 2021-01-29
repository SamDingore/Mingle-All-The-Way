
const mysql = require("mysql");
const express = require('express');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const checkAuth = require('../controllers/checkAuth');
const router = express.Router();
const store_db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_API

  });

exports.storedb = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_API

  });


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

  });


exports.sign_in = async (req, res) => {
  console.log(req.body);

    try {
        const { email, password } = req.body;

        if( !email || !password ) {
            return res.status(400).render('sign_in', {
                message: 'Please enter email and Password'
            })
        }


        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            console.log(results);
            if( !results || !(await bcrypt.compare(password, results[0].password))){
                 res.status(401).render('sign_in', {
                     message: 'Email or passsword is incorrect'
                 })
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });


                console.log("the token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now()  + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

              res.cookie('jwt', token, cookieOptions);

              res.status(200).redirect("/testing",);


            }

        })



    } catch (error) {
        console.log(error);
    }

}




exports.login = async (req, res) => {
    try {
        const { email, password, } = req.body;

        if( !email || !password ) {
            return res.status(400).render('sign_in', {
                message: 'Please enter email and Password'
            })
        }


        db.query('SELECT * FROM matw_users WHERE email = ?', [email], async (error, results) => {
            console.log(results);
            if( !results || !(await bcrypt.compare(password, results[0].password))){
                 res.status(401).render('sign_in', {
                     message: 'Email or passsword is incorrect'
                 })
            } else {
                const emailid = results[0].email;

                const token = jwt.sign({ emailid }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });


                console.log("the token is: " + token);
                const cookieOptions = {
                    expires: new Date(
                        Date.now()  + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

              res.cookie('jwt', token, cookieOptions);

              res.status(200).render('dashboard', {
                token:token
              });


            }

        })



    } catch (error) {
        console.log(error);
    }

}
let first = 2020;
let sec = 2022;
let okay = first + sec;
exports.num = okay;

exports.test = async (req, res) => {

  const ridematch ="share";
  const zipmatch ="97217";
  const gendermatch ="female";
  const food1 ="vegetarian";
  const food2 ="nonvegetarian";
  const okay = food1 + food2;
db.query('SELECT match_user FROM match_user WHERE ride=? AND my_zipcode=? AND my_gender=? AND my_food_type=?',[ridematch, zipmatch, gendermatch, food1], async(error, matchresults) => {

  if(error) {
      console.log(error);
  } else {
      console.log(matchresults);

      res.send(okay);

  }

} )
}








exports.search = async (req, res) => {
  const { token } = req.body;

      const decoded =jwt.decode(req.body.token, process.env.JWT_SECRET);
      const userdata =decoded;
      const user_email = userdata.emailid;
      console.log(userdata.emailid);

      db.query('SELECT * FROM matw_users WHERE email =?', [user_email], async(error, results) => {
        if(error){
            console.log(error);
        } else{
            console.log(results[0].zipcode);

            const image_loc ="/style/profile/";
            const image_name = results[0].email;
            const image_ex =".jpg";
            const avatar = image_loc + image_name + image_ex;



            store_db.query('SELECT * FROM store_db WHERE store_zipcode =?', [results[0].zipcode], async(error, resultsapi) => {
              if(error){
                  console.log(error);
              } else{

                console.log(resultsapi);
                  return res.render('search', {
                  token:token,  avatar:avatar, profile_name: results[0].username, title: resultsapi[0].store_name, value: resultsapi[0].store_email, title2: resultsapi[1].store_name, value2: resultsapi[1].store_email, useremail:user_email, title3: resultsapi[2].store_name, value3: resultsapi[2].store_email, title4: resultsapi[3].store_name, value4: resultsapi[3].store_email, title5: resultsapi[4].store_name, value5: resultsapi[4].store_email
                  })
              }
            })



        }
      })








}





exports.posts = async (req, res) => {
    db.query('SELECT gender FROM maw_users WHERE email = ?', ['renukadingore1234@gmail.com'], async(error, results) => {
        if(error){
            console.log(error);
            console.log("error");
        } else{
            console.log("result");
            return res.render('posts', {
                gender: gender
            })
        }
    })
}









exports.join = (req, res) => {
    console.log(req.body);



    const {  username, email, password, gender, month, day, year, food_type, address, zipcode, country, state, occupation, about_me} = req.body;

   console.log(month);

    db.query('SELECT email FROM matw_users WHERE email = ?', [email], async (error, results) =>{
        if(error){
            console.log(error);

        }

        if(results.length > 0){
            return res.render('join',{
                message: 'Email is already in use'
            })
        }

      /*  else if( password == passwordConfirm ){
            return res.render('join',{
                message: 'Password do not match!'
            });
        }*/


        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO matw_users SET ?', { username: username, email: email, password: hashedPassword, gender: gender, dob_mm: month, dob_dd: day, dob_yy: year, food_type: food_type, address: address, zipcode: zipcode, country: country, state: state, occupation: occupation, about: about_me }, (error, results) => {

            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('sign_in', {
                    success_message: 'Sign in And You\'ll be ready to Mingle.'

                })
            }

        })

    });



}



exports.dashboard = (req, res) => {
  console.log(req.body);
  const { token } = req.body;
  const decoded =jwt.decode(req.body.token, process.env.JWT_SECRET);

  const userdata =decoded;
  const user_email = userdata.emailid;
  db.query('SELECT * FROM matw_users WHERE email =?', [user_email], async(error, results) => {
    if(error){
        console.log(error);
    } else{
        console.log(results[0].zipcode);
        let curr_year =2020;
        let my_birthyear = results[0].dob_yy;
        const my_age = (curr_year - my_birthyear);
        const front ="url("
        const image_loc ="/style/profile/";
        const image_name = results[0].email;
        const image_ex =".jpg";
        const rear =")"
        const image = front + image_loc + image_name + image_ex + rear;
        const avatar = image_loc + image_name + image_ex;
        return res.render('dashboard',{
         token:token,  profile_name: results[0].username, profile_gender: results[0].gender, profile_food_type: results[0].food_type, profile_age: my_age, profile_address: results[0].address, profile_zipcode: results[0].zipcode, profile_state: results[0].state, profile_occupation: results[0].occupation, profile_about_me: results[0].about, image: image, avatar: avatar
        })
    }

  });


}

exports.profile = (req, res) => {
  console.log(req.body);
  const { token } = req.body;
  const decoded =jwt.decode(req.body.token, process.env.JWT_SECRET);

  const userdata =decoded;
  const user_email = userdata.emailid;
  db.query('SELECT * FROM matw_users WHERE email =?', [user_email], async(error, results) => {
    if(error){
        console.log(error);
    } else{
        console.log(results[0].zipcode);
        let curr_year =2020;
        let my_birthyear = results[0].dob_yy;
        const my_age = (curr_year - my_birthyear);
        const front ="url("
        const image_loc ="/style/profile/";
        const image_name = results[0].email;
        const image_ex =".jpg";
        const rear =")"
        const image = front + image_loc + image_name + image_ex + rear;
        const avatar = image_loc + image_name + image_ex;
        return res.render('profile',{
        token:token,  profile_name: results[0].username, profile_gender: results[0].gender, profile_food_type: results[0].food_type, profile_age: my_age, profile_address: results[0].address, profile_zipcode: results[0].zipcode, profile_state: results[0].state, profile_occupation: results[0].occupation, profile_about_me: results[0].about, image: image, avatar: avatar
        })
    }

  });


}



exports.view_profile = (req, res) => {
  const {profile_token, token} =req.body;
  const decoded =jwt.decode(req.body.token, process.env.JWT_SECRET);

  const userdata =decoded;
  const user_email = userdata.emailid;
  db.query('SELECT * FROM matw_users WHERE email =?', [user_email], async(error, tokenresults) => {
    if(error){
        console.log(error);
    } else{
        const sendname = tokenresults[0].username;
        const image_loc ="/style/profile/";
        const image_name = tokenresults[0].email;
        const image_ex =".jpg";
        const avatar = image_loc + image_name + image_ex;
        db.query('SELECT * FROM matw_users WHERE email =?', [profile_token], async(error, results) => {
          if(error){
              console.log(error);
          } else{
              console.log(results[0].zipcode);
              let curr_year =2020;
              let my_birthyear = results[0].dob_yy;
              const my_age = (curr_year - my_birthyear);
              const front ="url("
              const image_loc ="/style/profile/";
              const image_name = results[0].email;
              const image_ex =".jpg";
              const rear =")"
              const image = front + image_loc + image_name + image_ex + rear;
              return res.render('view_profile',{
              token:token,  profile_name: results[0].username, profile_gender: results[0].gender, profile_food_type: results[0].food_type, profile_age: my_age, profile_address: results[0].address, profile_zipcode: results[0].zipcode, profile_state: results[0].state, profile_occupation: results[0].occupation, profile_about_me: results[0].about, image: image, avatar: avatar, sendname:sendname
              })
          }

        });

    }

  });


}







/* Match Algorithm*/













let tse ="";
let my_occupation0 = "";
let my_occupation1 = "";
let my_occupation2 = "";
let my_occupation3 = "";
let my_occupation4 = "";
let profile_token0 = "";
let profile_token1 = "";
let profile_token2 = "";
let profile_token3 = "";
let profile_token4 = "";
let match_image0 = "";
let match_image1 = "";
let match_image2 = "";
let match_image3 = "";
let match_image4 = ""
let matchname0 = "";
let matchname1 = "";
let matchname2 = "";
let matchname3 = "";
let matchname4 = "";
let matchdate0 = "";
let matchdate1 = "";
let matchdate2 = "";
let matchdate3 = "";
let matchdate4 = "";
let matchmonth0 = "";
let matchmonth1 = "";
let matchmonth2 = "";
let matchmonth3 = "";
let matchmonth4 = "";
let matchage0 = "";
let matchage1 = "";
let matchage2 = "";
let matchage3 = "";
let matchage4 = "";
let matchgender0 = "";
let matchgender1 = "";
let matchgender2 = "";
let matchgender3 = "";
let matchgender4 = "";


exports.match = (req, res) => {
    console.log(req.body);
    const {  match_user, token, match_store, ride, search_day, search_month, match_age, match_gender} = req.body;
    const image_loc ="/style/profile/";
    const image_name = match_user;
    const image_ex =".jpg";
    const avatar = image_loc + image_name + image_ex;
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

    db.query('SELECT * FROM matw_users WHERE email =?', [match_user], async(error, results) => {
      if(error){
          console.log(error);
      } else{
          console.log(results);
          let curr_year =2020;
          let my_birthyear = results[0].dob_yy;
          const my_age = (curr_year - my_birthyear);
          const my_gender = results[0].gender;
          const my_zipcode = results[0].zipcode;
          const my_food_type = results[0].food_type;
          const my_country = results[0].country;
          const my_state = results[0].state;
          const my_name = results[0].username;
          const my_occupation = results[0].occupation;

          console.log(my_state);


          db.query('INSERT INTO match_user SET ?', { match_user: match_user, match_store: match_store, ride: ride, search_day: search_day, search_month: search_month, match_age: match_age, match_gender: match_gender, my_gender: my_gender, my_age: my_age, my_zipcode: my_zipcode, my_food_type: my_food_type, my_country: my_country, my_state: my_state, my_name: my_name, occupation: my_occupation}, (error, results) => {

              if(error) {
                  console.log(error);
              } else {
                  console.log(results);


              }

          })

store_db.query('SELECT * FROM store_db WHERE store_email=?',[match_store], async(error, storeapiresults) => {
  if (error) {
    console.log(error);

  } else {

   console.log(storeapiresults);
   const apistore_name = storeapiresults[0].store_name;
   const apistore_type = storeapiresults[0].store_type;
   const apistore_street = storeapiresults[0].store_street;
   const apistore_block = storeapiresults[0].store_block;
   const apistore_city = storeapiresults[0].store_city;
   const apistore_zipcode = storeapiresults[0].store_zipcode;
   const apistore_state = storeapiresults[0].store_state;
   const apistore_contact = storeapiresults[0].store_contact;
   const apistore_desc = storeapiresults[0].store_desc;

    db.query('SELECT * FROM match_user WHERE match_user=?', [match_user], async(error, myresult) => {
      if (error) {
        console.log(error);

      } else {
        console.log(myresult);
        const ridematch =myresult[0].ride;
        const zipmatch =myresult[0].my_zipcode;
        const gendermatch =myresult[0].match_gender;
        const food1 =myresult[0].my_food_type;
        const store = myresult[0].match_store;
        const my_gender1 = myresult[0].my_gender;

    db.query('SELECT * FROM match_user WHERE my_name!=? AND ride=? AND my_zipcode=? AND my_gender=? AND match_gender=? AND my_food_type=? AND match_store=?',[my_name, ridematch, zipmatch, gendermatch, my_gender1, food1, store], async(error, matchresults) => {

      if(error) {
        console.log(error);
            res.send('error1');
      } else {
          console.log(matchresults);
          try {

            if (matchresults[0].match_user) {
              tse = matchresults[0].match_user;
              my_occupation0 = matchresults[0].occupation;
              profile_token0 = matchresults[0].match_user;
              const image_loc ="/style/profile/";
              const image_name = matchresults[0].match_user;
              const image_ex =".jpg";
              const match_image_result0 = image_loc + image_name + image_ex;
              match_image0 =  match_image_result0;
              matchname0 = matchresults[0].my_name;
              matchdate0 = matchresults[0].search_day;
              matchmonth0 =  matchresults[0].search_month;
              matchage0 = matchresults[0].my_age;
              matchgender0 = matchresults[0].my_gender;


            }

            if (matchresults[1].match_user) {
              tse = matchresults[1].match_user;
              my_occupation1 = matchresults[1].occupation;
              profile_token1 = matchresults[1].match_user;
              const image_loc ="/style/profile/";
              const image_name = matchresults[1].match_user;
              const image_ex =".jpg";
              const match_image_result1 = image_loc + image_name + image_ex;

              match_image1 =  match_image_result1;
              matchname1 = matchresults[1].my_name;
              matchdate1 = matchresults[1].search_day;
              matchmonth1 =  matchresults[1].search_month;
              matchage1 = matchresults[1].my_age;
              matchgender1 = matchresults[1].my_gender;

            }

            if (matchresults[2].match_user) {
              tse = matchresults[2].match_user;
              my_occupation2 = matchresults[2].occupation;
              profile_token2 = matchresults[2].match_user;
              const image_loc ="/style/profile/";
              const image_name = matchresults[2].match_user;
              const image_ex =".jpg";
              const match_image_result2 = image_loc + image_name + image_ex;
              match_image2 =  match_image_result2;
              matchname2 = matchresults[2].my_name;
              matchdate2 = matchresults[2].search_day;
              matchmonth2 =  matchresults[2].search_month;
              matchage2 = matchresults[2].my_age;
              matchgender2 = matchresults[2].my_gender;


            }

            if (matchresults[3].match_user) {
              tse = matchresults[3].match_user;
              my_occupation3 = matchresults[3].occupation;
              profile_token3 = matchresults[3].match_user;
              const image_loc ="/style/profile/";
              const image_name = matchresults[3].match_user;
              const image_ex =".jpg";
              const match_image_result3 = image_loc + image_name + image_ex;
              match_image3 =  match_image_result3;
              matchname3 = matchresults[3].my_name;
              matchdate3 = matchresults[3].search_day;
              matchmonth3 =  matchresults[3].search_month;
              matchage3 = matchresults[3].my_age;
              matchgender3 = matchresults[3].my_gender;


            }

            if (matchresults[4].match_user) {
              tse = matchresults[4].match_user;
              my_occupation4 = matchresults[4].occupation;
              profile_token4 = matchresults[4].match_user;
              const image_loc ="/style/profile/";
              const image_name = matchresults[4].match_user;
              const image_ex =".jpg";
              const match_image_result4 = image_loc + image_name + image_ex;
              match_image4 =  match_image_result4;
              matchname4 = matchresults[4].my_name;
              matchdate4 = matchresults[4].search_day;
              matchmonth4 =  matchresults[4].search_month;
              matchage4 = matchresults[4].my_age;
              matchgender4 = matchresults[4].my_gender;


            }









          } catch (error) {

          }

        try {
          const resmatchuser = matchresults[0].match_user;
         db.query('SELECT * FROM match_user WHERE match_user=?',[resmatchuser], async(error, matchfound) => {

           if(error) {
               console.log(error);
               res.send('error2');
           } else {
               console.log(matchfound);
               const image_loc ="/style/profile/";
               const image_name = matchfound[0].match_user;
               const image_ex =".jpg";
               const match_image = image_loc + image_name + image_ex;
               const my_occupation0 = matchfound[0].occupation;

               console.log(matchage1);

               res.render('results',{
                 profile_token:  matchfound[0].match_user,
                 profile_token1: profile_token1,

                 match_image: match_image,
                 token:token,
                 profile_name: my_name,
                 avatar:avatar,
                 matchname:matchfound[0].my_name,
                 matchdate:matchfound[0].search_day,
                 matchmonth: matchfound[0].search_month,
                 matchage:matchfound[0].my_age,
                 matchgender:matchfound[0].my_gender,
                 apistorename: apistore_name,
                 apistoretype: apistore_type,
                 apistorecontact: apistore_contact,
                 apistorestreet: apistore_street,
                 apistoreblock: apistore_block,
                 apistorecity: apistore_city,
                 apistorezipcode: apistore_zipcode,
                 apistorestate: apistore_state,
                 apistoredesc: apistore_desc,
                 occupation: my_occupation,
                 match_image1:match_image1,
                 matchname1: matchname1,
                 matchdate1: matchdate1,
                 matchmonth1: matchmonth1,
                 matchage1: matchage1,
                 matchgender1: matchgender1,
                 occupation1: my_occupation1,
                 match_image2:match_image2,
                 matchname2: matchname2,
                 matchdate2: matchdate2,
                 matchmonth2: matchmonth2,
                 matchage2: matchage2,
                 matchgender2: matchgender2,
                 occupation2: my_occupation2,
                 profile_token2: profile_token2
               });

           }

         } )

       } catch (error) {



         store_db.query('SELECT * FROM store_db WHERE store_email=?',[match_store], async(error, storeapiresults) => {
           if (error) {
             console.log(error);

           } else {

            console.log(storeapiresults);
            const apistore_name = storeapiresults[0].store_name;
            const apistore_type = storeapiresults[0].store_type;
            const apistore_street = storeapiresults[0].store_street;
            const apistore_block = storeapiresults[0].store_block;
            const apistore_city = storeapiresults[0].store_city;
            const apistore_zipcode = storeapiresults[0].store_zipcode;
            const apistore_state = storeapiresults[0].store_state;
            const apistore_contact = storeapiresults[0].store_contact;
            const apistore_desc = storeapiresults[0].store_desc;

            res.render('results',{
             token:token,  profile_name: my_name,  avatar:avatar,  error:'No match Found! Check back later :)', apistorename: apistore_name, apistoretype: apistore_type, apistorecontact: apistore_contact, apistorestreet: apistore_street, apistoreblock: apistore_block, apistorecity: apistore_city, apistorezipcode: apistore_zipcode, apistorestate: apistore_state, apistoredesc: apistore_desc
            })

          }

        })




        }






      }

    } )

      }
    })



  }
})









/*ijt*/

      }
    })





    console.log("you did it ");
    let tse ="";
    let my_occupation0 = "";
    let my_occupation1 = "";
    let my_occupation2 = "";
    let my_occupation3 = "";
    let my_occupation4 = "";
    let profile_token0 = "";
    let profile_token1 = "";
    let profile_token2 = "";
    let profile_token3 = "";
    let profile_token4 = "";
    let match_image0 = "";
    let match_image1 = "";
    let match_image2 = "";
    let match_image3 = "";
    let match_image4 = ""
    let matchname0 = "";
    let matchname1 = "";
    let matchname2 = "";
    let matchname3 = "";
    let matchname4 = "";
    let matchdate0 = "";
    let matchdate1 = "";
    let matchdate2 = "";
    let matchdate3 = "";
    let matchdate4 = "";
    let matchmonth0 = "";
    let matchmonth1 = "";
    let matchmonth2 = "";
    let matchmonth3 = "";
    let matchmonth4 = "";
    let matchage0 = "";
    let matchage1 = "";
    let matchage2 = "";
    let matchage3 = "";
    let matchage4 = "";
    let matchgender0 = "";
    let matchgender1 = "";
    let matchgender2 = "";
    let matchgender3 = "";
    let matchgender4 = "";






}
