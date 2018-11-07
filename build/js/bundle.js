(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Constructor and Ajax functions
homepage();

class beers {
    constructor(name, tagline, description, imageUrl, abv, ibu, ph) {
        this.name = name;
        this.tagline = tagline;
        this.description = description;
        this.imageUrl = imageUrl;
        this.abv = abv;
        this.ibu = ibu;
        this.ph = ph;
    }
}

//Function for clicking beers

$('nav').on('click', '.listofbeers', function () {
    homepage();
});

// Ajax for bringing beers from API into webpage
function homepage() {
    const url = 'https://api.punkapi.com/v2/beers?page=1&per_page=6';
    $.ajax({
        url: url,
        method: 'GET'
    }).done(function (result) {
        $('main').empty();
        let beers = [];
        for (i = 0; i < result.length; i++) {
            let $name = result[i].name;
            let $description = result[i].description;
            let $imageUrl = result[i].image_url;
            let $abv = result[i].abv;
            let $ibu = result[i].ibu;
            let $ph = result[i].ph;
            let $section = $('<section class="beers"></section>');
            let $ul = $('<ul></ul>');
            $section.append('<img src="' + $imageUrl + '" />');
            $section.append('<h1>' + $name + '</h1>');
            $section.append('<p>' + $description + '</p>');
            $ul.append('<li>ABV<span>' + $abv + '</span></li>');
            $ul.append('<li>IBU<span>' + $ibu + '</span></li>');
            $ul.append('<li class="pH">pH<span>' + $ph + '</span></li>');
            $section.append($ul);
            $('main').append($section);

            if ($ph > 1 && $ph < 5) {
                $(".pH").css('background-color', 'orange');
            } else if ($ph > 5 && $ph < 7) {
                $(".pH").css('background-color', 'red');
            } else {
                $(".pH").css('background-color', 'blue');
            }
        }
    }).fail(function (err) {
        throw err;
    });
};

// Ajax function for buttons on footer

$('footer').on('click', 'button', function () {
    $('main').empty();
    let url = 'https://api.punkapi.com/v2/beers?page=' + $(this).text() + '&per_page=6';
    $.ajax({
        url: url,
        method: 'GET'
    }).done(function (result) {
        let beers = [];
        for (i = 0; i < result.length; i++) {
            let $name = result[i].name;
            let $description = result[i].description;
            let $imageUrl = result[i].image_url;
            let $abv = result[i].abv;
            let $ibu = result[i].ibu;
            let $ph = result[i].ph;
            let $section = $('<section class="beers"></section>');
            let $ul = $('<ul></ul>');
            $section.append('<img src="' + $imageUrl + '" />');
            $section.append('<h1>' + $name + '</h1>');
            $section.append('<p>' + $description + '</p>');
            $ul.append('<li>ABV<span>' + $abv + '</span></li>');
            $ul.append('<li>IBU<span>' + $ibu + '</span></li>');
            $ul.append('<li class="pH">pH<span>' + $ph + '</span></li>');
            $section.append($ul);
            $('main').append($section);

            if ($ph > 1 && $ph < 5) {
                $(".pH").css('background-color', 'orange');
            } else if ($ph > 6 && $ph < 7) {
                $(".pH").css('background-color', 'red');
            } else {
                $(".pH").css('background-color', 'blue');
            }
        }
    }).fail(function (err) {
        throw err;
    });
});

// Ajax for Quick Find Beer


$('nav').on('click', '.quick-find', function () {
    const url = 'https://api.punkapi.com/v2/beers/random';
    $.ajax({
        url: url,
        method: 'GET'
    }).done(function (result) {
        $('main').empty();
        let beers = [];
        for (i = 0; i < result.length; i++) {
            let $name = result[i].name;
            let $tagline = result[i].tagline;
            let $description = result[i].description;
            let $imageUrl = result[i].image_url;
            let $abv = result[i].abv;
            let $ibu = result[i].ibu;
            let $ph = result[i].ph;
            let $section = $('<section class="random-beer"></section>');
            let $section1 = $('<section class="findmeanotherbeer"></section>');
            let $section2 = $('<section class="givemeanotherbeer"></section>');
            let $ul = $('<ul></ul>');
            $section.append('<img src="' + $imageUrl + '" />');
            $section1.append('<h1>' + $name + '</h1>');
            $section1.append('<h2>' + $tagline + '</h2>');
            $section1.append('<p>' + $description + '</p>');
            $ul.append('<li>ABV<span>' + $abv + '</span></li>');
            $ul.append('<li>IBU<span>' + $ibu + '</span></li>');
            $ul.append('<li class="pH">pH<span>' + $ph + '</span></li>');
            $section1.append($ul);
            $section1.append('<button class="ingredients">INGREDIENTS</button>');
            $section2.append('<button class="givemeanotherbeerbutton">GIVE ME ANOTHER BEER</button>');
            $('footer').remove();
            $('main').append($section);
            $('main').append($section1);
            $('main').append($section2);

            if ($ph > 1 && $ph < 5) {
                $(".pH").css('background-color', 'orange');
            } else if ($ph > 5 && $ph < 7) {
                $(".pH").css('background-color', 'red');
            } else {
                $(".pH").css('background-color', 'blue');
            }
        }
    }).fail(function (err) {
        throw err;
    });
});

},{}]},{},[1]);
