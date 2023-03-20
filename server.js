const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require("https");
const socketio = require('socket.io');
const ejs = require('ejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

/*const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'quiz'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to database!');
  }
});*/


//const io = socketio(server);


// passport.use(new LocalStrategy((username, password, done) => {
//   connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
//     if (error) {
//       return done(error);
//     }
//     if (results.length === 0) {
//       return done(null, false, { message: 'Incorrect username.' });
//     }
//     const user = results[0];
//     if (user.password !== password) {
//       return done(null, false, { message: 'Incorrect password.' });
//     }
//     return done(null, user);
//   });
// }));


// $.ajax({
//     method: 'GET',
//     url: '/quizzes',
//     success: function(data) {
//       // Do something with the data, such as display a list of quizzes
//       var quizList = $('#quiz-list');
//       for (var i = 0; i < data.length; i++) {
//         var quiz = data[i];
//         var listItem = $('<li>').text(quiz.name);
//         quizList.append(listItem);
//       }
//     },
//     error: function() {
//       alert('Error fetching quizzes');
//     }
//   });
  
// app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));


const generateCode = require(__dirname + "/invite_code.js")
var code = generateCode(5);

//require("dotenv").config();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true }));

app.use(express.static(__dirname + '/Public'));


const PORT = process.env.PORT || 7676;
app.listen(PORT , () => {
    console.log("We are up for work !");
});


app.get('/contact_us' , (req,res) => {
    res.render(__dirname + "/views/query_form");
});

app.post('/contact_us' , (req,res) => {
    const Name = req.body.Name;
    const email = req.body.email;
    const Phone = req.body.PNo;
    const Query = req.body.Query;

    const data = {
        members: [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : Name,
                    PHONE : Phone,
                    ADDRESS : Query,

                }


            }
        ]
    };

    const jsonDATA = JSON.stringify(data);

    url = "https://us21.api.mailchimp.com/3.0/lists/d9e53e59b3"
   
    const options = {
        method : "POST",
        auth : "Qongo:dde584ae5adfd49d93ef1698906515df-us21",


    }

    const request = https.request(url , options,(response) =>{

        if (response.statusCode==200){
            res.send("Thank You For Contacting us , we'll get back to you soon!")

        };
        response.on("data" , (data) => {
            console.log(JSON.parse(data));

        });

    })

    request.write(jsonDATA);
    request.end();

})

app.get('/', (req,res) => {
    res.render(__dirname + "/views/index");
})

app.get('/login', (req,res) => {
    res.render(__dirname + "/views/singup");
})

app.get('/signup', (req,res) => {
    res.render(__dirname + "/views/signup");
})

app.get('/quizzes/joined', (req,res) => {
    res.render(__dirname + "/views/letsquiz");
})

app.get('/quizzes', (req,res) => {
    res.render(__dirname + "/views/quizzin");
})



// app.post('/login', (req, res) => {
//     let name = req.body.uname;
//     let password = req.body.pass;
//     let string = new String(password);
//     db.query('select * from users where status=0 AND username =' + db.escape(name) + ';',
//         (error, result, fields) => {
//             if (error) {
//                 return res.render('notclient');
//             }
//             else {
//                 let salt = new String(result[0].salt);
//                 string += salt;
//                 const hash = crypto.createHash('sha256').update(string).digest('base64');
//                 if (result[0] != undefined && result[0].password === hash) {
//                     let cookiec = random.generate(8);
//                     res.cookie("sessionID", cookiec, {
//                         maxAge: 12000000,
//                         httpOnly: true
//                     });
//                     db.query('update users set cookie=' + db.escape(cookiec) + ' where status=0 AND username =' + db.escape(name) + ';');
//                     return res.render('client', { uname: name });
//                 }
//                 else if (result[0].password == null)
//                     return res.send("Password field is empty");
//                 else {
//                     return res.render('notclient');
//                 }
//             }
//         });
// });



// app.post('/quizzes', function(req, res) {
//     // Generate a random code for the new quiz
//     var code = generateCode(6);
    
//     // Save the quiz data and code to the database
//     var quizData = req.body;
//     quizData.code = code;
//     db.query('INSERT INTO quizzes SET ?', quizData, function(err, result) {
//       if (err) {
//         res.status(500).send('Error creating quiz');
//       } else {
//         res.json({ code: code });
//       }
//     });
//   });
  


// CREATE TABLE groups (
//     group_id INT AUTO_INCREMENT PRIMARY KEY,
//     group_name VARCHAR(255) NOT NULL,
//     group_leader INT NOT NULL,
//     members TEXT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );


// app.get('/leaderboard', (req, res) => {
//     const sql = 'SELECT username, score FROM users ORDER BY score DESC LIMIT 10';
  
//     db.query(sql, (err, result) => {
//       if (err) throw err;
  
//       res.json(result);
//     });
//   });


// const leaderboard = {};
// // When a user answers a question correctly
// const username = 'John';
// const score = 10;

// if (leaderboard[username]) {
//   leaderboard[username] += score;
// } else {
//   leaderboard[username] = score;
// }

// // Send updated leaderboard to all connected clients
// io.emit('leaderboard', leaderboard);

// Send updated leaderboard to all connected clients
// io.emit('leaderboard', leaderboard);


// const socket = io();

// socket.on('leaderboard', (leaderboard) => {
//   // Update the leaderboard UI
// });
