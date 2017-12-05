 // Dependencies
// ============================================================= 
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
// var PORT = process.env.PORT || 3000;
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use('/', express.static('public')); //May not be functioning properly!!!!!!!!!
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var users = [
  {
    name: "Salvador Dali",
    photoUrl: "http://spanish-trails.com/wp-content/uploads/2016/09/salvador-dali-e1474370711992.jpg",
  	scores: [],
  	total: 75
  },
  {
    name: "Neve Campbell",
    photoUrl: "https://www.biography.com/.image/t_share/MTE1ODA0OTcxOTA3NTE1OTE3/neve-campbell-16599896-1-402.jpg",
  	scores: [],
  	total: 45
  },
   {
    name: "Predator",
    photoUrl: "https://www.geek.com/wp-content/uploads/2016/03/predator-625x350.jpg",
    scores: [],
    total: 20
  },
  {
    name: "Lil Wayne aka Weezy",
    photoUrl: "https://yt3.ggpht.com/-UnYQfqfdfts/AAAAAAAAAAI/AAAAAAAAAAA/aeJj-lizNSA/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
    scores: [],
    total: 10
  },
   {
    name: "Vern Troyer",
    photoUrl: "http://i.dailymail.co.uk/i/pix/2015/03/22/00/26E15B9D00000578-3006039-image-m-15_1426985101999.jpg",
    scores: [],
    total: 15 
  },
   {
    name: "Glenn Danzig",
    photoUrl: "https://i.pinimg.com/736x/87/8d/ee/878dee46bc7d0fcd310e92b56f4f7d98--glen-danzig-misfits.jpg",
    scores: [],
    total: 30
  }
];

// ===================================================
//               HOME PAGE
// ===================================================
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/home.html"));
});

// ===================================================
//               SURVEY PAGE
// ===================================================
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "public/survey.html"));
});

// ===================================================
//             NEW USER
// ===================================================
app.post("/api/new", function(req, res) {
	var newUser = req.body;
  //console.log("Req.Body " + req.body );
	users.push(newUser);
	// console.log("Users: " + newUser);
	console.log("Users: " + JSON.stringify(users, null, 2));
	res.json(newUser);
 });

// ===================================================
//               API
// ===================================================
app.get("/api", function(req, res) {
  res.send(users);
});


// ===================================================
//               FIND FRIENDS
// ===================================================
app.get("/findfriend", function(req, res){
  var newUser = users[users.length -1];
  var userTotal = parseInt(newUser.total);
  var smallestDiff = 1000;
  var matchIndex;
  
  for(i = 0; i < users.length -1; i++){
    var currentUserTotal = parseInt(users[i].total);
    var currentDiff = userTotal - currentUserTotal;
    if(currentDiff < 0){
      currentDiff = currentDiff * -1;
    }

    if(currentDiff < smallestDiff){
      smallestDiff = currentDiff;
      matchIndex = i;
    }
  }

  var match = users[matchIndex].name;
  console.log("Found a match: " + match);
  res.send(match);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});



// app.get("/findfriend", function(req, res){
//   var newUser = users[users.length - 1];
//   var newUserTotal = parseInt(newUser.total);
//   console.log("Your Total: " + newUserTotal);
//   var matchedUser;
//   var matchedUserIndex;
//   var difference = 100;
//   var allTotals = [];

//   for(i = 0; i < users.length; i++){
//     var currentDiff = newUserTotal - users[i].total;
//     if(currentDiff < 0){
//       currentDiff = currentDiff * -1;
//     }
//     allTotals.push(currentDiff);
//   }
//   console.log("All Totals: " + allTotals);

//   for(i = 0; i < allTotals.length; i++){
//     console.log(allTotals[i], newUserTotal)
//     if(newUserTotal - allTotals[i] < difference){
//       difference = newUserTotal - allTotals[i];
//       matchedUserIndex = i;
//       console.log(users[matchedUserIndex].name);
//     }
//   }

//   res.send(users[matchedUserIndex].name);
// });


