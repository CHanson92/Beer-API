class beers {
    constructor(name, description, imageUrl, abv, ibu, ph) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.abv = abv;
        this.ibu = ibu;
        this.ph = ph;
    }
}

$(function() {
    const url = 'https://api.punkapi.com/v2/beers?';
    $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        let beers = [];
        console.log(result);
        for(i = 0; i < 6; i++) {
            let $name = result[i].name;
            let $description = result[i].description;
            let $imageUrl = result[i].image_url;
            let $abv = result[i].abv;
            let $ibu = result[i].ibu;
            let $ph = result[i].ph;
            let $section = $('<section class="beers"></section>')
            let $ul = $('<ul></ul>')
            $section.append('<img src="'+$imageUrl+'" />')
            $section.append('<h1>"'+$name+'"</h1>')
            $section.append('<p>"'+$description+'"</p>')
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