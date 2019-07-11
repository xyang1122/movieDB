let movieId = window.location.href.split("?");
let realId = movieId[movieId.length-1].split("=");
let movieBlock = ["movie",realId[1]+""];
let creditBlock = ["movie",realId[1]+"","credits"];
let moreMovieDetails = {
    "title":"",
    "rate":"",
    "genres":"",
    "overview":"",
    "poster":"",
    "runtime": "",
    "date": "",
    "language":"",
    "company":"",
    "country":""
};
let movieCredits = {
    "director":"",
    "castNames": "",
    "castPics":""
};

let getMoreMovieDetails = function(){
    let data = "{}";
    let xhr = new XMLHttpRequest();
    let apiLink = init(movieBlock,API_KEY);
    xhr.open("GET", apiLink);
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            fetchMovieDetails(buildWebContent,JSON.parse(this.responseText));
        }
    });
};

let getCreditDetails = function(){
    let data = "{}";
    let xhr = new XMLHttpRequest();
    let apiLink = init(creditBlock,API_KEY);
    xhr.open("GET", apiLink);
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            fetchMovieCredits(getMoreMovieDetails,JSON.parse(this.responseText));
        }
    });
};

let fetchMovieDetails = function(callback,results){
    // console.log(results);
    let date, country = [], language = [], company = [], genre = [],
        releaseDate = results.release_date,
        genres = JSON.parse(JSON.stringify(results.genres)),
        originCountries = JSON.parse(JSON.stringify(results.production_countries)),
        languages = JSON.parse(JSON.stringify(results.spoken_languages)),
        originCompanies = JSON.parse(JSON.stringify(results.production_companies));

    date = changeDateFormat(releaseDate);

    originCountries.forEach(function (element) {
        if(element.name === "United States of America")
            country.push("USA");
        else if (element.name === "United Kingdom")
            country.push("UK");
        else
            country.push(element.name);
    });
    genres.forEach(function (element) {
        genre.push(element.name);
    });
    languages.forEach(function (element) {
        language.push(element.name);
    });
    originCompanies.forEach(function (element) {
        company.push(element.name);
    });

    moreMovieDetails.title = results.title;
    moreMovieDetails.overview = results.overview;
    moreMovieDetails.poster = "https://image.tmdb.org/t/p/original" + results.poster_path;
    moreMovieDetails.rate = results.vote_average;
    moreMovieDetails.runtime = results.runtime;
    moreMovieDetails.genres = genre;
    moreMovieDetails.date = date;
    moreMovieDetails.language = language;
    moreMovieDetails.company = company;
    moreMovieDetails.country = country;

    callback();
};


let fetchMovieCredits = function(callback,results){
    let castNames = [], castPics = [],
        casts = results.cast;
    if (casts.length > 0){
        casts.forEach(function (element) {
            if(castNames.length < 4)
                castNames.push(element.name);
            if(castPics.length < 4){
                castPics.push("https://image.tmdb.org/t/p/original" + element.profile_path);
            }
        });
    }

    movieCredits.director = results.crew[0].name;
    movieCredits.castNames = castNames;
    movieCredits.castPics = castPics;
    callback();
};

let changeDateFormat = function(date){
    let mydate = new Date(date);
    let month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"][mydate.getMonth()];
    return mydate.getDay() + ' ' + month + ' ' + mydate.getFullYear();
};

let buildWebContent = function(){
    $("#single").append("<section class=\"brief container\">\n" +
        "        <div class=\"row\">\n" +
        "            <div class=\"col-md-4 col-12\">\n" +
        "                <img height=\"444\" width=\"300\" src=\""+ moreMovieDetails.poster +"\">\n" +
        "            </div>\n" +
        "            <div class=\"col-md-8 col-12\">\n" +
        "                <h3>" + moreMovieDetails.title + "</h3>\n" +
        "                <div>\n" +
        "                    <span> "+ moreMovieDetails.runtime + " min |</span>\n" +
        "                    <span> "+ moreMovieDetails.genres +" |</span>\n" +
        "                    <span> "+ moreMovieDetails.date + "<span>("+ moreMovieDetails.country +")</span></span>\n" +
        "                </div>\n" +
        "                <div>\n" +
        "                    <a href=\"#\" class=\"btn main-btn\">trailer</a>\n" +
        "                    <a href=\"#\" class=\"btn main-btn\">details</a>\n" +
        "                </div>\n" +
        "                <div>\n" +
        "                    <i class=\"star far fa-star\"></i>\n" +
        "                    <i class=\"star far fa-star\"></i>\n" +
        "                    <i class=\"star far fa-star\"></i>\n" +
        "                    <i class=\"star far fa-star\"></i>\n" +
        "                    <i class=\"star far fa-star\"></i>\n" +
        "                    <span>"+ moreMovieDetails.rate +" / 10</span>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </section>\n" +
        "    <section class=\"contentContainer container\">\n" +
        "        <div class=\"row\">\n" +
        "            <div class=\"leftContent col-md-8 col-12\">\n" +
        "                <div>\n" +
        "                    <h3>StoryLine</h3>\n" +
        "                    <p class='overview'>"+ moreMovieDetails.overview +" </p>\n" +
        "                </div>\n" +
                        "<div class=\"inputGroup\">\n" +
                        "    <h3>Leave a reply</h3>\n" +
                        "    <form>\n" +
                        "        <p class='hintWord'>Your email address will not be published. Required fields are marked *</p>\n" +
                        "        <p class=\"commentInput\">\n" +
                        "            <textarea placeholder=\"Comment\" id=\"comment\" name=\"comment\" cols=\"45\" rows=\"8\" maxlength=\"65525\" required=\"required\">\n" +
                        "            </textarea>\n" +
                        "        </p>\n" +
                        "        <p class=\"nameInput\">\n" +
                        "            <input placeholder=\"Name * \" id=\"author\" name=\"author\" type=\"text\" value=\"\" size=\"30\" maxlength=\"245\" required=\"required\">\n" +
                        "        </p>\n" +
                        "        <p class=\"emailInput\">\n" +
                        "            <input placeholder=\"Email * \" id=\"author\" name=\"author\" type=\"text\" value=\"\" size=\"30\" maxlength=\"245\" required=\"required\">\n" +
                        "        </p>\n" +
                        "        <p class=\"websiteInput\">\n" +
                        "            <input placeholder=\"Website\" id=\"author\" name=\"author\" type=\"text\" value=\"\" size=\"30\" maxlength=\"245\" required=\"required\">\n" +
                        "        </p>\n" +
                        "        <p class=\"submitBtn\">\n" +
                        "            <input name=\"submit\" type=\"submit\" id=\"submit\" class=\"submit\" value=\"Post Comment\">\n" +
                        "        </p>\n" +
                        "    </form>\n" +
                        "</div>\n" +
        "            </div>\n" +
        "            <div class=\"col-md-4 col-12\">\n" +
        "                <div class=\"singlePageDetails\">\n" +
        "                    <h3>Details</h3>\n" +
        "                    <p>Release date: <span> "+ moreMovieDetails.date + "</span></p>\n" +
        "                    <p>Director: <span> "+ movieCredits.director + "</span></p>\n" +
        "                    <p>Imdb Rating: <span> "+ moreMovieDetails.rate +"</span></p>\n" +
        "                    <p>Country: <span> "+ moreMovieDetails.country + "" +"</span></p>\n" +
        "                    <p>Language: <span> "+ moreMovieDetails.language + "" +"</span></p>\n" +
        "                    <p>Production Co: <span> "+ moreMovieDetails.company[0] + "" +"</span></p>\n" +
        "                </div>\n" +
        "                <div class=\"singlePageCast\">\n" +
        "                    <h3>Cast</h3>\n" +
        "                    <div class='cast'>\n" +
        "                        <img src=\""+ movieCredits.castPics[0]+"\"/>\n" +
        "                        <p>"+ movieCredits.castNames[0]+"</p>\n" +
        "                    </div>\n" +
        "                    <div class='cast'>\n" +
        "                        <img src=\""+ movieCredits.castPics[1]+"\"/>\n" +
        "                        <p>"+ movieCredits.castNames[1]+"</p>\n" +
        "                    </div>\n" +
        "                    <div class='cast'>\n" +
        "                        <img src=\""+movieCredits.castPics[2]+"\"/>\n" +
        "                        <p>"+ movieCredits.castNames[2]+"</p>\n" +
        "                    </div>\n" +
        "                    <div class='cast'>\n" +
        "                        <img src=\""+movieCredits.castPics[3]+"\"/>\n" +
        "                        <p>"+ movieCredits.castNames[3]+"</p>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </section>");

    if(localStorage.getItem("clicked"+ moreMovieDetails.title) !== undefined){
        for(let i =0;i<parseInt(localStorage.getItem("clicked"+ moreMovieDetails.title));i++){
            $("i.star").eq(i).addClass("fas");
            $("i.star").eq(i).removeClass("far");
        }
    }
};


getCreditDetails();