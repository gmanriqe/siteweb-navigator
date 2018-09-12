// ajax marvel
var publicKey = "8e778a2cc3664ba60ccbe49cb152318f"; //requiere marvel api
var privateKey = "c6134b8a284434c02e7460b846d1194682a0ad85"; //requiere marvel api
var boxTable = $("#contentTable");

var ts = Date.now(); //timestamp
var hash = CryptoJS.MD5(ts + privateKey + publicKey);
var data =
  "http://gateway.marvel.com/v1/public/comics?ts=" +
  ts +
  "&apikey=" +
  publicKey +
  "&hash=" +
  hash;

$.ajax({
  url: data,
  type: "GET",
  dataType: "json"
})
  .done(function(data) {
    var dataResult = data.data.results;

    var elementHtml = "";
    $.each(dataResult, function(i, e) {
      newElementHtml = e.thumbnail.path.split("/");

      if (newElementHtml[10] !== "image_not_available") {
        elementHtml +=
          '<div class="col-12 col-sm-6 col-lg-4">' +
          '<div class="card_box">' +
          '<img class="img_responsive img_card" src=' +
          e.thumbnail.path +
          ".jpg" +
          ">" +
          "<p class='card_description'>" +
          e.title +
          "</p>" +
          '<div class="card_info">' +
          "<p>" +
          e.variantDescription +
          "</p>" +
          "</div>" +
          "</div>" +
          "</div>";
      } else {
        elementHtml +=
          '<div class="col-12 col-sm-6 col-lg-4">' +
          '<div class="card_box">' +
          '<img class="img_responsive img_card not_image" src=' +
          e.thumbnail.path +
          ".jpg" +
          ">" +
          "<p class='card_description'>" +
          e.title +
          "</p>" +
          '<div class="card_info">' +
          "<p>" +
          e.variantDescription +
          "</p>" +
          "</div>" +
          "</div>" +
          "</div>";
      }
    });
    boxTable.html(elementHtml);
    boxTable
      .parent()
      .next()
      .fadeOut("3000");
  })
  .fail(function() {
    console.log("error");
  });

//search ajax
$("#btnSearch").on("click", function() {
  var searchInput = $("#searchMarvel").val();
  //   console.log(searchInput);

  $.ajax({
    url: data,
    type: "GET",
    dataType: "json"
  })
    .done(function(data) {
      var dataResult = data.data.results;

      var elementHtml = "";
      $.each(dataResult, function(i, e) {
        debugger;
        var titulosBuscar = e.title;

        if (searchInput == "") {
          newElementHtml = e.thumbnail.path.split("/");

          if (newElementHtml[10] !== "image_not_available") {
            elementHtml +=
              '<div class="col-12 col-sm-6 col-lg-4">' +
              '<div class="card_box">' +
              '<img class="img_responsive img_card" src=' +
              e.thumbnail.path +
              ".jpg" +
              ">" +
              "<p class='card_description'>" +
              e.title +
              "</p>" +
              '<div class="card_info">' +
              "<p>" +
              e.variantDescription +
              "</p>" +
              "</div>" +
              "</div>" +
              "</div>";
          } else {
            elementHtml +=
              '<div class="col-12 col-sm-6 col-lg-4">' +
              '<div class="card_box">' +
              '<img class="img_responsive img_card not_image" src=' +
              e.thumbnail.path +
              ".jpg" +
              ">" +
              "<p class='card_description'>" +
              e.title +
              "</p>" +
              '<div class="card_info">' +
              "<p>" +
              e.variantDescription +
              "</p>" +
              "</div>" +
              "</div>" +
              "</div>";
          }
          //   console.log(this);
          //   elementHtml +=
          //     '<div class="col-12 col-sm-6 col-lg-4">' +
          //     '<div class="card_box">' +
          //     '<img class="img_responsive img_card not_image" src=' +
          //     this.thumbnail.path +
          //     ".jpg" +
          //     ">" +
          //     "<p class='card_description'>" +
          //     this.title +
          //     "</p>" +
          //     '<div class="card_info">' +
          //     "<p>" +
          //     this.variantDescription +
          //     "</p>" +
          //     "</div>" +
          //     "</div>" +
          //     "</div>";
        } else {
          if (titulosBuscar === searchInput) {
            console.log(this);
            elementHtml +=
              '<div class="col-12 col-sm-6 col-lg-4">' +
              '<div class="card_box">' +
              '<img class="img_responsive img_card not_image" src=' +
              this.thumbnail.path +
              ".jpg" +
              ">" +
              "<p class='card_description'>" +
              this.title +
              "</p>" +
              '<div class="card_info">' +
              "<p>" +
              this.variantDescription +
              "</p>" +
              "</div>" +
              "</div>" +
              "</div>";
          }
        }
      });
      boxTable.html(elementHtml);
    })
    .fail(function() {
      console.log("error");
    });
});
