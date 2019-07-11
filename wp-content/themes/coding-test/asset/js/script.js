$(document).ready(function () {
    $(".fa-search").on("click",function () {
        $(".inputBox").css("display","flex");
        $(".navbar.navbar-expand-lg").hide();
        $(".site-content").css("overflow","hidden");
    });

    $(".fa-times").on("click",function () {
        $(".inputBox").hide();
        $(".navbar.navbar-expand-lg").show();
        $(".site-content").css("overflow","initial");
    });
    
    $(".navbar-toggler").on("click",function () {
        $("#page").toggleClass("transformPage");
        $(".mobileMenu").toggle();
        $("body").toggleClass("pageActionOfSubmenu");
    });

    $("#homeMenu").on("click", function () {
        $(".homeMenu").show();
        $(".mobileMenu").hide();
    });

    $("#pageMenu").on("click", function () {
        $(".pageMenu").show();
        $(".mobileMenu").hide();
    });

    $("#blogMenu").on("click", function () {
        $(".blogMenu").show();
        $(".mobileMenu").hide();
    });

    $("#movieMenu").on("click", function () {
        $(".movieMenu").show();
        $(".mobileMenu").hide();
    });

    $(".backwards").on("click",function () {
        $(".pageMenu").hide();
        $(".blogMenu").hide();
        $(".homeMenu").hide();
        $(".movieMenu").hide();
        $(".mobileMenu").show();
    });

    $(document).on("click","i.star",function () {
        let index = ($("i.star").index(this));
        alert("You have marked the movie");
        localStorage.setItem("clicked" + moreMovieDetails.title,index+1+"");
        for(let i =0;i<index+1;i++){
            $("i.star").eq(i).removeClass("far");
            $("i.star").eq(i).addClass("fas");
        }
        for(let i=index+1; i<5;i++){
            $("i.star").eq(i).removeClass("fas");
            $("i.star").eq(i).addClass("far");
        }
    });
});;
const API_KEY = "1e448e0dfcdbb565f5d329820065b4d2";
const type = ["trending","movie","week"];
const genreList = ["genre","movie","list"];
let genreListContent = {};
let movieDetails = [];
let getGenres = function(){
    let data = "{}";
    let xhr = new XMLHttpRequest();
    let apiLink = init(genreList,API_KEY);
    xhr.open("GET", apiLink);
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let results = JSON.parse(this.responseText);
            results.genres.forEach((result) => {
                if(!genreListContent[result.id + '']){
                    genreListContent[result.id + ''] = result.name;
                }
            });
        }
    });
};

let getTrendingData = function(){
        let data = "{}";
        let xhr = new XMLHttpRequest();
        let apiLink = init(type,API_KEY);
        xhr.open("GET", apiLink);
        xhr.send(data);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                getMovieDetails(createElements,JSON.parse(this.responseText).results);
            }
        });
};

let getMovieDetails = function(callback,results){
    let id = "", title = "", overview = "", genres = "", vote_average = "", poster_path = "";
    for(let i =0;i<results.length;i++){
         id = results[i].id;
         if((typeof results[i].title) !== "undefined")
            title = results[i].title;
         else if((typeof results[i].name) !== "undefined")
             title = results[i].name;
         overview = results[i].overview;
         genres = results[i].genre_ids.map((id) => {
             return genreListContent[id + ''];
         });
         vote_average = results[i].vote_average;
         poster_path = "https://image.tmdb.org/t/p/original" + results[i].poster_path;
         movieDetails.push({id,title,overview,genres,vote_average,poster_path});
         localStorage.setItem(title,id);
    }
    callback();
};

let init = function(otherInformation,api){
    let partOfLink = "https://api.themoviedb.org/3";

    for(let i =0;i<otherInformation.length;i++){
        partOfLink += "/" + otherInformation[i];
    }
    partOfLink += "?api_key=" + api;

    return partOfLink;
};


//setting data to html and creating html element
let createElements = function () {
    let poster = "", sort = "", status="", id = "",
        title = "", rate = " / 10", overview = "";
    for(let i =0;i<movieDetails.length;i++){
        id = movieDetails[i].id;
        poster = movieDetails[i].poster_path;
        title = movieDetails[i].title;
        rate = movieDetails[i].vote_average + rate;
        for(let j=0;j<3;j++){
            if (movieDetails[i].genres[j] !== undefined)
                sort += movieDetails[i].genres[j] + ",";
        }
        sort = sort.substring(0,sort.length-1);
        overview = movieDetails[i].overview;
        if(i <=5){
            status = "element-active";
        }else{
            status = "element-hide";
        }
        $("#block").append("<div id=\"" + i + "\" class=\"col-lg-4 col-md-6 col-12 " + status + "\">\n" +
            "            <div class=\"boxContainer\">\n" +
            "                <img class=\"poster\" src= \"" + poster + "\"/>\n" +
            "                <div class=\"movieDetails container\">\n" +
            "                    <div class=\"play-btn\">\n" +
            "                        <a class=\"play-video\" href=\"#\">\n" +
            "                            <i class=\"play fa fa-play\"></i>\n" +
            "                        </a>\n" +
            "                    </div>\n" +
            "                    <h2 class=\"title\">" + title + "</h2>\n" +
            "                    <div>\n" +
            "                        <i class=\"star fas fa-star\"></i>\n" +
            "                        <span>" + rate + "</span>\n" +
            "                        <span class=\"sorts\">" + sort + "</span>\n" +
            "                    </div>\n" +
            "                    <p>" + overview + "</p>\n" +
            "                    <div class='informationBtn'><a href=\"http://localhost:8888/coding-test/single/?movie="+id + "\"" +" id='" + i + "s' class=\"btn main-btn\">details</a>" +
            "<span id=\"w" + id + "\" class='watched'>watched</span></div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "        </div>");
        poster = "";
        title = "";
        sort = "";
        rate = " / 10";
        overview = "";
        status = "";
    }
    pagination();
};


//pagination
let pagination = function(){
    let numberOfPagination = Math.ceil(movieDetails.length/6);
    let status = "";
    for(let i =0;i<numberOfPagination;i++){
        if(i === 0){
            status = " active";
        }else {
            status = "";
        }
        $(".pagination").append("<li id=\"page" + i +"\" class=\"page-item" + status + "\">" +
            "<a class=\"page-link\" href=\"#\">" + (i+1) +"</a></li>");
    }
    $(".pagination").prepend("<li id=\"prev\" class=\"page-item\">\n" +
        "                <a class=\"page-link\" href=\"#\" aria-label=\"Previous\">\n" +
        "                    <span aria-hidden=\"true\"><i class=\"fas fa-less-than\"></i></span>\n" +
        "                    <span class=\"sr-only\">Previous</span>\n" +
        "                </a>\n" +
        "            </li>");
    $(".pagination").append("<li id=\"next\" class=\"page-item\">\n" +
        "                <a class=\"page-link\" href=\"#\" aria-label=\"Next\">\n" +
        "                    <span aria-hidden=\"true\"><i class=\"fas fa-greater-than\"></i></span>\n" +
        "                    <span class=\"sr-only\">Next</span>\n" +
        "                </a>\n" +
        "            </li>");
    pageClicker(changeMarkStatus,numberOfPagination);
};

//trigger pagination button
let pageClicker = function(callback, number){
    let currentPage = "";
    $("li.page-item").on("click",function () {
        let pressArrow = false;
        let oldValue = $("li.page-item.active").attr("id");
        $("li.page-item.active").not(this).removeClass("active");
        currentPage = parseInt($(this).text());
        if (currentPage > 0)
            $(this).addClass("active");
        else if($(this).attr("id") === "prev"){
            currentPage = parseInt(oldValue.substring(oldValue.length-1))-1;
            $("#page" + currentPage).addClass("active");
            pressArrow = true;
        }else if($(this).attr("id") === "next"){
            currentPage = parseInt(oldValue.substring(oldValue.length-1))+1;
            $("#page" + currentPage).addClass("active");
            pressArrow = true;
        }
        if ($("li.page-item.active").text() !== "1"){
            $("#prev").css("visibility","visible");
        }else{
            $("#prev").css("visibility","hidden");
        }
        if ($("li.page-item.active").text() !== number + ""){
            $("#next").css("visibility","visible");
        }else{
            $("#next").css("visibility","hidden");
        }
        if(currentPage > 0 && !pressArrow){
            for(let i=0;i<movieDetails.length;i++){
                if(i > (currentPage*6 -7) && i < currentPage*6){
                    if($("#" + i).hasClass("element-hide")){
                        $("#" + i).addClass("element-active");
                        $("#" + i).removeClass("element-hide");
                    }
                }else{
                    if($("#" + i).hasClass("element-active")){
                        $("#" + i).removeClass("element-active");
                        $("#" + i).addClass("element-hide");
                    }
                }
            }
        }else{
            if($(this).attr("id") === "prev"){
                currentPage = parseInt(oldValue.substring(oldValue.length-1));
                for(let i=0;i<movieDetails.length;i++){
                    if(i > (currentPage*6 -7) && i < currentPage*6){
                        $("#" + i).addClass("element-active");
                        $("#" + i).removeClass("element-hide");
                    }else{
                        if($("#" + i).hasClass("element-active")){
                            $("#" + i).removeClass("element-active");
                            $("#" + i).addClass("element-hide");
                        }
                    }
                }
            }else if($(this).attr("id") === "next"){
                currentPage = parseInt(oldValue.substring(oldValue.length-1))+2;
                for(let i=0;i<movieDetails.length;i++){
                    if(i > (currentPage*6 -7) && i < currentPage*6){
                        $("#" + i).addClass("element-active");
                        $("#" + i).removeClass("element-hide");
                    }else{
                        if($("#" + i).hasClass("element-active")){
                            $("#" + i).removeClass("element-active");
                            $("#" + i).addClass("element-hide");
                        }
                    }
                }
            }
        }
    });
    callback();
};

let changeMarkStatus = function(){

    let keys = [];
    let ids = [];
    for(let key in localStorage){
        if (key.indexOf("clicked") > -1){
            keys.push(key.substring(7));
        }
    }
    for(let i = 0;i<keys.length;i++){
        if(localStorage.getItem(keys[i]) !== undefined){
            ids.push(localStorage.getItem(keys[i]));
        }
    }
    ids.forEach(function (element) {
        $("#w" + element).css("opacity",1);
    })
};


getGenres();
getTrendingData();
pageClicker();

;
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