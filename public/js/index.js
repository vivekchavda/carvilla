var rangeSlider = function(){
    var slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');
      
    slider.each(function(){
  
      value.each(function(){
        var value = $(this).prev().attr('value');
        $(this).html(value);
      });
  
      range.on('input', function(){
        $(this).next(value).html(this.value);
      });
    });
  };
  
  rangeSlider();

settings = {
    //Model Popup
    objModalPopupBtn: ".modalButton",
    objModalCloseBtn: ".overlay, .closeBtn",
    objModalDataAttr: "data-popup"
}  
  $(settings.objModalPopupBtn).bind("click", function () {
        if ($(this).attr(settings.objModalDataAttr)) {

            var strDataPopupName = $(this).attr(settings.objModalDataAttr);

            
            //Fade In Modal Pop Up
            $(".overlay, #" + strDataPopupName).fadeIn();

        }
    });

    //On clicking the modal background
    $(settings.objModalCloseBtn).bind("click", function () {
        $(".modal").fadeOut();
    });
$(window).scroll(function () {
    var sc = $(window).scrollTop()
    if (sc > 100) {
        $("#header-sroll").addClass("small")
    } else {
        $("#header-sroll").removeClass("small")
    }
});



$(function(){
 
    $(document).on( 'scroll', function(){
 
        if ($(window).scrollTop() > 100) {
            $('.smoothscroll-top').addClass('show');
        } else {
            $('.smoothscroll-top').removeClass('show');
        }
    });
 
    $('.smoothscroll-top').on('click', scrollToTop);
});
 
function scrollToTop() {
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $('body');
    offset = element.offset();
    offsetTop = offset.top;
    $('html, body').animate({scrollTop: offsetTop}, 600, 'linear').animate({scrollTop:25},200).animate({scrollTop:0},150) .animate({scrollTop:0},50);
}

$(window).scroll(function () {
    if ($(this).scrollTop() >= 200) {
        $('header').css('background', '#cc0000');
    } else {
        $('header').css('background', '#2888d2');
    }
});






$(window).scroll(function () {
    var sc = $(window).scrollTop()
    if (sc > 100) {
        $("#header-sroll").addClass("small")
    } else {
        $("#header-sroll").removeClass("small")
    }
});



function initMap() {
            var uluru = {lat: -25.363, lng: 131.044};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: uluru
            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
        }






$(document).ready(function() {
    $('.maps').click(function () {
        $('.maps iframe').css("pointer-events", "auto");
    });
    
    $( ".maps" ).mouseleave(function() {
      $('.maps iframe').css("pointer-events", "none"); 
    });

   });
 




