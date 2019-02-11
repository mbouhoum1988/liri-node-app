require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var name = process.argv.slice(3).join(" ");

switch (action) {

    case "concert-this":
       concertThis(name);
       break;

    case "spotify-this-song":
       spotifyThisSong(name);
       break;
    
    case "movie-this":
       movieThis(name);
       break; 
       
    case "do-what-it-says":
       doWhatItSays();
       break;    
}

function  spotifyThisSong(name) {

   var url = "https://api.spotify.com/v1/search?q=" + name + "&type=album&limit=1";
     spotify
        .request(url)
        .then(function(data) {
              console.log("");
              console.log("Artist name: " + data.albums.items[0].artists[0].name); 
              console.log("Song's name: " + data.albums.items[0].name);
              console.log("Link to Spotify: " + data.albums.items[0].external_urls.spotify);
              console.log("album: " + data.albums.items[0].album_type);
        })
           .catch(function(err) {
           console.error('Error occurred: ' + err); 
        });
  }

function concertThis(name){

    var queryURL = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(function(response){

        var location = response.data[0].venue.city + ", " + response.data[0].venue.country;
        var date = moment(response.data[0].datetime).format("MM/DD/YYYY");
        console.log("    ");
        console.log("Venue: " + response.data[0].venue.name);
        console.log("location: " + location);
        console.log("date: " + date);
})
}

function movieThis(name){

 if(name=== ""){
        
    var queryUrl1 = "http://www.omdbapi.com/?t=batman&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl1).then(function(response){

        console.log("    ");
        console.log("Title: " + response.data.Title);
        console.log("Year of release: " + response.data.Year);
        console.log("Rotten Tomatoes Rating: " + response.data.imdbRating);
        console.log("Rating: " + response.data.Rated);
        console.log("Where it was produced: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    });
}
else{

    var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";
    
    axios.get(queryUrl).then(function(response){
      console.log("    ");
        console.log("Title: " + response.data.Title);
        console.log("Year of release: " + response.data.Year);
        console.log("Rotten Tomatoes Rating: " + response.data.imdbRating);
        console.log("Rating: " + response.data.Rated);
        console.log("Where it was produced: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
   }); 
}
}

function doWhatItSays(){
   var arr = [];
  fs.readFile("random.txt", "utf8", function(err, data){
     if (err){
        console.log(err);
     }
     console.log(data);

     var dataArr = data.split(",");

     spotifyThisSong(dataArr[1]);
  });
}