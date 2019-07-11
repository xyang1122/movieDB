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
});