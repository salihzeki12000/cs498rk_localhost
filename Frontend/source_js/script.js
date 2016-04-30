var divs = document.getElementsByClassName('alert');
for(var i=0; i<divs.length; i++) {
  divs[i].addEventListener("click", highlightThis);
  /*
  divs[i].addEventListener("click", highlightThis, true);
  divs[i].addEventListener("click", highlightThis, false);*/
}

function highlightThis(event) {
    //event.stopPropagation();

    var backgroundColor = this.style.backgroundColor;
    this.style.backgroundColor='yellow';
    alert(this.className);
    this.style.backgroundColor=backgroundColor;
}

//NAVBAR size changes as the user scrolls down the page
navBarSize = (function () {
  $(window).scroll(function (event) {
    var window_top = $(window).scrollTop();
    if (window_top > 0) {
      $('.nav-button').removeClass('nav-btn-top');
      $('.navbar-brand').removeClass('brand-top');
      $('.navbar').removeClass('nav-top');
    }
    else {
      $('.nav-button').addClass('nav-btn-top');
      $('.navbar-brand').addClass('brand-top');
      $('.navbar').addClass('nav-top');
    }
    //if at the top, make large
    //if scrolled down, make small
  });
})();

/*MAP*/
var geocoder;
  var map;
  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
  }

  function codeAddress() {
    var address = document.getElementById("address").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
