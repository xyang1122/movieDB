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

