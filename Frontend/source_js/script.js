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

$(document).ready(function(){
    $(".dropdown").hover(
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideDown("fast");
            $(this).toggleClass('open');
        },
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideUp("fast");
            $(this).toggleClass('open');
        }
    );
});
