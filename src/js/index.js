// Constructor and Ajax functions
homepage();

class beers {
    constructor(name, tagline, description, imageUrl, abv, ibu, ph, ingredients, malt, 
        hops, yeast) {
        this.name = name;
        this.tagline = tagline;
        this.description = description;
        this.imageUrl = imageUrl;
        this.abv = abv;
        this.ibu = ibu;
        this.ph = ph;
        this.ingredients = ingredients;
        this.malt = malt;
        this.hops = hops;
        this.yeast = yeast;
    }
}

//Function for clicking beers

$('nav').on('click', '.listofbeers', function() {
    homepage();
    });

// Ajax for bringing beers from API into webpage
function homepage() {
    $('aside').hide();
    $('main').show();
    $('footer').show();
    const url = 'https://api.punkapi.com/v2/beers?page=1&per_page=6';
    $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        $('main').empty();
        let beers = [];
        for(i = 0; i < result.length; i++) {
            let name = result[i].name;
            let description = result[i].description;
            let imageUrl = result[i].image_url;
            let abv = result[i].abv;
            let ibu = result[i].ibu;
            let ph = result[i].ph;
            let $section = $('<section class="beers"></section>')
            let $ul = $('<ul></ul>')
            let $pH = $('<li class="pH">pH<span>'+ph+'</span></li>')
            $section.append('<img src="'+imageUrl+'" />')
            $section.append('<h1>'+name+'</h1>')
            $section.append('<p>'+description+'</p>')
            $ul.append('<li>ABV<span>'+abv+'</span></li>')
            $ul.append('<li>IBU<span>'+ibu+'</span></li>')
            $ul.append($pH)
            if(ph > 1 && ph < 5){
                $pH.css('background-color','orange');
                } else if (ph > 5 && ph < 7){
                $pH.css('background-color','red');
                } else {$pH.css('background-color', 'blue');
                }
            $section.append($ul)
            $('main').append($section)
    }

    }).fail(function(err) {
        throw err;

      });
};

// Ajax function for buttons on footer

$('footer').on('click', 'button', function() {
    $('main').empty();
    $('aside').hide();
    $('main').show();
    $('footer').show();
    let url = ('https://api.punkapi.com/v2/beers?page=' + $(this).text() + '&per_page=6')
    $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        let beers = [];
        for(i = 0; i < result.length; i++) {
            let name = result[i].name;
            let description = result[i].description;
            let imageUrl = result[i].image_url;
            let abv = result[i].abv;
            let ibu = result[i].ibu;
            let ph = result[i].ph;
            let $section = $('<section class="beers"></section>')
            let $ul = $('<ul></ul>')
            let $pH = $('<li class="pH">pH<span>'+ph+'</span></li>')
            $section.append('<img src="'+imageUrl+'" />')
            $section.append('<h1>'+name+'</h1>')
            $section.append('<p>'+description+'</p>')
            $ul.append('<li>ABV<span>'+abv+'</span></li>')
            $ul.append('<li>IBU<span>'+ibu+'</span></li>')
            $ul.append($pH)
            if(ph > 1 && ph < 5){
            $pH.css('background-color','orange');
            } else if (ph > 5 && ph < 7){
            $pH.css('background-color','red');
            } else {$pH.css('background-color', 'blue');
            }
            $section.append($ul)
            $('main').append($section)
        }

    }).fail(function(err) {
        throw err;

      });
});

//Quick Find Button
$('nav').on('click', '.quick-find', function() {
    randombeer();
});

// Ajax for Quick Find Beer
ingredients();
function randombeer() {
    $('main').hide();
    $('aside').show();
    $('footer').hide();
    const url = 'https://api.punkapi.com/v2/beers/random';
    $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        $('main').empty();
        $('aside').empty();
        let beers = [];
        for(i = 0; i < result.length; i++) {
            let name = result[i].name;
            let tagline = result[i].tagline;
            let description = result[i].description;
            let imageUrl = result[i].image_url;
            let abv = result[i].abv;
            let ibu = result[i].ibu;
            let ph = result[i].ph;
            for (j=0; j < result.length; j++) {
                let malt = result[i].ingredients.malt[j]
                amount = result[j].amount
                unit = result[j].unit
                value = result[j].value };
            for (k=0; k < result.length; k++) {
                let hops = result[i].ingredients.hops[k]
                name2 = result[k].name;
                amount2 = result[k].amount };
            let yeast = result[i].ingredients.yeast[j];
            let $section = $('<section class="random-beer"></section>')
            let $section1 = $('<section class="randombeerinfo"></section>')
            let $section2 = $('<section class="givemeanotherbeer"></section>')
            let $ul = $('<ul></ul>')
            let $pH = $('<li class="pH">pH<span>'+ph+'</span></li>')
            let $modal = $('<div class="modal"></div>');
            let $modalcontent = $('<div class="modalcontent><span class= "close"></span></div>');
            let $ingredients = $('<div></div>')
            $section.append('<img src="'+imageUrl+'" />')
            $section1.append('<h1>'+name+'</h1>')
            $section1.append('<h2>'+tagline+'</h2>')
            $section1.append('<p>'+description+'</p>')
            $ul.append('<li>ABV<span>'+abv+'</span></li>')
            $ul.append('<li>IBU<span>'+ibu+'</span></li>')
            $ul.append($pH)
            if(ph > 1 && ph < 5) {
                $($pH).css('background-color','orange');
            } else if(ph > 5 && ph < 7) {
                $($pH).css('background-color', 'red');
            } else {
                $($pH).css('background-color', 'blue');
                }
            $section1.append($ul)
            $section1.append('<button class="ingredients">INGREDIENTS</button>')
            $section2.append('<button class="givemeanotherbeerbutton">GIVE ME ANOTHER BEER</button>')
            $('aside').append($section)
            $('aside').append($section1)
            $('aside').append($section2)
            $($ingredients).append(malt);
            $($ingredients).append(hops);
            $($ingredients).append(yeast);
            $($modalcontent).append($ingredients)
            $($modal).append($modalcontent);
            $('aside').append($modal);
            console.log(result[i]);
            }
        }

    ).fail(function(err) {
        throw err;

      })
    };
// Function for clicking 'Give me another beer' button

$('aside').on('click', '.givemeanotherbeerbutton', function() {
    randombeer();
});

// Function for Ingredients Modal

function ingredients() {
    $('aside').on('click', '.ingredients', function() {
        $('.modal').show();
    })
    $('aside').on('click', '.close', function() {
        $('.modal').hide();
    })
}