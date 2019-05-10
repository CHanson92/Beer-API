//Function for clicking beers

$("nav").on("click", ".listofbeers", function() {
  homepage();
});

// Ajax for bringing beers from API into webpage
function homepage() {
  $("aside").hide();
  $("main").show();
  const url = "https://api.punkapi.com/v2/beers?page=1&per_page=6";
  $.ajax({
    url: url,
    method: "GET"
  })
    .done(function(result) {
      $("main").empty();
      for (i = 0; i < result.length; i++) {
        let name = result[i].name;
        let description = result[i].description;
        let imageUrl = result[i].image_url;
        let abv = result[i].abv;
        let ibu = result[i].ibu;
        let ph = result[i].ph;
        let $section = $('<section class="beers"></section>');
        let $ul = $("<ul></ul>");
        let $pH = $('<li class="pH">pH<span>' + ph + "</span></li>");
        $section.append('<img src="' + imageUrl + '" />');
        $section.append("<h1>" + name + "</h1>");
        $section.append("<p>" + description + "</p>");
        $ul.append("<li>ABV<span>" + abv + "</span></li>");
        $ul.append("<li>IBU<span>" + ibu + "</span></li>");
        $ul.append($pH);
        if (ph > 1 && ph < 5) {
          $pH.css("background-color", "orange");
        } else if (ph > 5 && ph < 7) {
          $pH.css("background-color", "red");
        } else {
          $pH.css("background-color", "blue");
        }
        $section.append($ul);
        $("main")
          .append($section)
          .hide()
          .fadeIn(500);
        $("button")
          .hide()
          .fadeIn(500);
      }
    })
    .fail(function(err) {
      throw err;
    });
}

// Ajax function for buttons on footer

$("footer").on("click", "button", function() {
  $("main").empty();
  $("aside").hide();
  $("main").show();
  $("footer").show();
  let url =
    "https://api.punkapi.com/v2/beers?page=" + $(this).text() + "&per_page=6";
  $.ajax({
    url: url,
    method: "GET"
  })
    .done(function(result) {
      for (i = 0; i < result.length; i++) {
        let name = result[i].name;
        let description = result[i].description;
        let imageUrl = result[i].image_url;
        let abv = result[i].abv;
        let ibu = result[i].ibu;
        let ph = result[i].ph;
        let $section = $('<section class="beers"></section>');
        let $ul = $("<ul></ul>");
        let $pH = $('<li class="pH">pH<span>' + ph + "</span></li>");
        $section.append('<img src="' + imageUrl + '" />');
        $section.append("<h1>" + name + "</h1>");
        $section.append("<p>" + description + "</p>");
        $ul.append("<li>ABV<span>" + abv + "</span></li>");
        $ul.append("<li>IBU<span>" + ibu + "</span></li>");
        $ul.append($pH);
        if (ph > 1 && ph < 5) {
          $pH.css("background-color", "orange");
        } else if (ph > 5 && ph < 7) {
          $pH.css("background-color", "red");
        } else {
          $pH.css("background-color", "blue");
        }
        $section.append($ul);
        $("main")
          .append($section)
          .hide()
          .fadeIn(500);
        $("button")
          .hide()
          .fadeIn(500);
      }
    })
    .fail(function(err) {
      throw err;
    });
});

//Quick Find Button
$("nav").on("click", ".quick-find", function() {
  randombeer();
});

// Ajax for Quick Find Beer
function randombeer() {
  $("main").hide();
  $("aside").show();
  $("footer").hide();
  const url = "https://api.punkapi.com/v2/beers/random";
  $.ajax({
    url: url,
    method: "GET"
  })
    .done(function(result) {
      $("main").empty();
      $("aside").empty();
      for (i = 0; i < result.length; i++) {
        let name = result[i].name;
        let tagline = result[i].tagline;
        let description = result[i].description;
        let imageUrl = result[i].image_url;
        let abv = result[i].abv;
        let ibu = result[i].ibu;
        let ph = result[i].ph;
        let $section = $('<section class="random-beer"></section>');
        let $section1 = $('<section class="randombeerinfo"></section>');
        let $section2 = $('<section class="givemeanotherbeer"></section>');
        let $ul = $("<ul></ul>");
        let $pH = $('<li class="pH">pH<span>' + ph + "</span></li>");
        if (imageUrl === null) {
          $section.append("<p>Unfortunately there is no image!</p>");
        } else {
          $section.append('<img src="' + imageUrl + '" />');
        }
        $section1.append("<h1>" + name + "</h1>");
        $section1.append("<h2>" + tagline + "</h2>");
        $section1.append("<p>" + description + "</p>");
        $ul.append("<li>ABV<span>" + abv + "</span></li>");
        $ul.append("<li>IBU<span>" + ibu + "</span></li>");
        $ul.append($pH);
        if (ph > 1 && ph < 5) {
          $($pH).css("background-color", "orange");
        } else if (ph > 5 && ph < 7) {
          $($pH).css("background-color", "red");
        } else {
          $($pH).css("background-color", "blue");
        }
        $section1.append($ul);
        $section2.append(
          '<button class="givemeanotherbeerbutton">GIVE ME ANOTHER BEER</button>'
        );
        $("aside").append($section);
        $("aside").append($section1);
        $("aside").append($section2);
        $("aside")
          .hide()
          .slideDown(1000);
      }
    })
    .fail(function(err) {
      throw err;
    });
}
// Function for clicking 'Give me another beer' button

$("aside").on("click", ".givemeanotherbeerbutton", function() {
  randombeer();
});
