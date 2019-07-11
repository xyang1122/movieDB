<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since 1.0.0
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="profile" href="https://gmpg.org/xfn/11" />
    <link href="https://fonts.googleapis.com/css?family=Quicksand&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div class="secondMenu">
    <section class="mobileMenu">
        <h4 class="items subMenu">Menu</h4>
        <ul>
            <li class="items">Home<i id="homeMenu" class="forwards fas fa-greater-than"></i></li>
            <li class="items">Pages<i id="pageMenu" class="forwards fas fa-greater-than"></i></li>
            <li class="items">Movies & TV shows<i id="movieMenu" class="forwards fas fa-greater-than"></i></li>
            <li class="items">Blog<i id="blogMenu" class="forwards fas fa-greater-than"></i></li>
            <li class="items">Contact Us</li>
        </ul>
    </section>
    <section class="homeMenu">
        <h4 class="items subMenu"><i class="backwards fas fa-less-than"></i>Home</h4>
        <ul>
            <li class="items">Home Version 1</li>
            <li class="items">Home Version 2</li>
            <li class="items">Home Version 3</li>
            <li class="items">Home Version 4</li>
        </ul>
    </section>
    <section class="pageMenu">
        <h4 class="items subMenu"><i class="backwards fas fa-less-than"></i>Page</h4>
        <ul>
            <li class="items">404 Page</li>
            <li class="items">Contact Us</li>
            <li class="items">Coming soon</li>
            <li class="items">Pricing Plan</li>
            <li class="items">Login Register</li>
        </ul>
    </section>
    <section class="movieMenu">
        <h4 class="items subMenu"><i class="backwards fas fa-less-than"></i>Movie & TV show</h4>
        <ul>
            <li class="items">Movie List 1</li>
            <li class="items">Movie List 2</li>
            <li class="items">Movie List 3</li>
            <li class="items">Movie List 4</li>
            <li class="items">Movie List 5</li>
            <li class="items">Movie List 6</li>
        </ul>
    </section>
    <section class="blogMenu">
        <h4 class="items subMenu"><i class="backwards fas fa-less-than"></i>Blog</h4>
        <ul>
            <li class="items">Post with Youtube</li>
            <li class="items">Post with music</li>
            <li class="items">Post with Gallery</li>
        </ul>
    </section>
</div>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'twentynineteen' ); ?></a>
        <nav class="navbar navbar-expand-lg navbar-light">
                <a class="navbar-brand" href="#">
                    <img class="logo" src="http://localhost:8888/coding-test/wp-content/uploads/2019/07/logo.png" alt="Smiley face" height="52" width="205">
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                Home
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown1">
                                <a class="dropdown-item" href="#">Home Version 1</a>
                                <a class="dropdown-item" href="#">Home Version 2</a>
                                <a class="dropdown-item" href="#">Home Version 3</a>
                                <a class="dropdown-item" href="#">Home Version 4</a>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                Pages
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown2">
                                <a class="dropdown-item" href="#">404 Page</a>
                                <a class="dropdown-item" href="#">Contact Us</a>
                                <a class="dropdown-item" href="#">Coming soon</a>
                                <a class="dropdown-item" href="#">Pricing Plan</a>
                                <a class="dropdown-item" href="#">Login Register</a>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Movie & TV Shows
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown3">
                                <a class="dropdown-item" href="#">Movie List 1</a>
                                <a class="dropdown-item" href="#">Movie List 2</a>
                                <a class="dropdown-item" href="#">Movie List 3</a>
                                <a class="dropdown-item" href="#">Movie List 4</a>
                                <a class="dropdown-item" href="#">Movie List 5</a>
                                <a class="dropdown-item" href="#">Movie List 6</a>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown4" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Blog
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown4">
                                <a class="dropdown-item" href="#">Post with Youtube</a>
                                <a class="dropdown-item" href="#">Post with Music</a>
                                <a class="dropdown-item" href="#">Post with Gallery</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">Contact Us</a>
                        </li>
                    </ul>
                    <i class="fas fa-search"></i>
                    <a href="#" class="btn main-btn"><i class="far fa-user"></i>Login</a>
                </div>
            </nav>
    <div class="inputBox">
        <input type="text" class="form-control" placeholder="Type and hit enter..." aria-label="Username" aria-describedby="basic-addon1">
        <span><i class="fas fa-times"></i></span>
    </div>
	<div id="content" class="site-content">
