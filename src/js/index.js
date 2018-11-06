// Constructor and Ajax functions

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

// Ajax function for buttons on footer

$('footer').on('click', 'button', function() {
    $('main').empty();
    let url = ('https://api.punkapi.com/v2/beers?page=' + $(this).text() + '&per_page=6')
    $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        let beers = [];
        for(i = 0; i < result.length; i++) {
            let $name = result[i].name;
            let $description = result[i].description;
            let $imageUrl = result[i].image_url;
            let $abv = result[i].abv;
            let $ibu = result[i].ibu;
            let $ph = result[i].ph;
            let $section = $('<section class="beers"></section>')
            let $ul = $('<ul></ul>')
            $section.append('<img src="'+$imageUrl+'" />')
            $section.append('<h1>'+$name+'</h1>')
            $section.append('<p>'+$description+'</p>')
            $ul.append('<li>ABV<span>'+$abv+'</span></li>')
            $ul.append('<li>IBU<span>'+$ibu+'</span></li>')
            $ul.append('<li>pH<span>'+$ph+'</span></li>')
            $section.append($ul)
            $('main').append($section)
        }

    }).fail(function(err) {
        throw err;

      });
});

// Ajax for bringing beers from API into webpage

$(function() {
    const url = 'https://api.punkapi.com/v2/beers?page=1&per_page=6';
    $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        let beers = [];
        for(i = 0; i < result.length; i++) {
            let $name = result[i].name;
            let $description = result[i].description;
            let $imageUrl = result[i].image_url;
            let $abv = result[i].abv;
            let $ibu = result[i].ibu;
            let $ph = result[i].ph;
            let $section = $('<section class="beers"></section>')
            let $ul = $('<ul></ul>')
            $section.append('<img src="'+$imageUrl+'" />')
            $section.append('<h1>'+$name+'</h1>')
            $section.append('<p>'+$description+'</p>')
            $ul.append('<li>ABV<span>'+$abv+'</span></li>')
            $ul.append('<li>IBU<span>'+$ibu+'</span></li>')
            $ul.append('<li>pH<span>'+$ph+'</span></li>')
            $section.append($ul)
            $('main').append($section)
        }

    }).fail(function(err) {
        throw err;

      });
}) 

// Ajax for Quick Find Beer


$('nav').on('click', '.quick-find', function() {
    const url = 'https://api.punkapi.com/v2/beers/random';
    $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        $('main').empty();
        let beers = [];
        for(i = 0; i < result.length; i++) {
            let $name = result[i].name;
            let $tagline = result[i].tagline;
            let $description = result[i].description;
            let $imageUrl = result[i].image_url;
            let $abv = result[i].abv;
            let $ibu = result[i].ibu;
            let $ph = result[i].ph;
            let $section = $('<section class="random-beer"></section>')
            let $ul = $('<ul></ul>')
            $section.append('<img src="'+$imageUrl+'" />')
            $section.append('<h1>'+$name+'</h1>')
            $section.append('<h2>'+$tagline+'</h2>')
            $section.append('<p>'+$description+'</p>')
            $ul.append('<li>ABV<span>'+$abv+'</span></li>')
            $ul.append('<li>IBU<span>'+$ibu+'</span></li>')
            $ul.append('<li>pH<span>'+$ph+'</span></li>')
            $section.append($ul)
            $ul.append('<button class="ingredients">Ingredients</button>')
            $('main').append($section)
        }

    }).fail(function(err) {
        throw err;

      })
    }); 