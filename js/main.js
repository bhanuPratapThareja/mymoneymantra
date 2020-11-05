$(document).ready(function () {

  // if ($(window).width() > 786) {
    $(window).scroll(function () {
      var sticky = $('header'),
      scroll = $(window).scrollTop();

      if (scroll >= 100) sticky.addClass('scrolled');
      else sticky.removeClass('scrolled');
    });
  // }

  //active input
  $('input').blur(function () {
    $('input').closest(".form__group").removeClass("active-input");
    if ($(this).val().length != 0) {
      $(this).closest(".form__group").addClass('filled-input');
      $(this).closest(".file-type").addClass("file-type-back")
    }else {
      $(this).closest(".file-type").removeClass("file-type-back");
      $(this).closest(".form__group").removeClass('filled-input');
    }
  })
  .focus(function () {
    $(this).closest(".form__group").removeClass('filled-input');
    $(this).closest(".form__group").addClass("active-input");
  });

  //learn more toggle
  $(".learn-more-wrapper-content .question").click(function () {
    $("#" + this.id + "-ans").slideToggle("ease-in-out");
    $("#" + this.id).find("svg").toggleClass("question-active");
    $("#" + this.id).toggleClass("question-open")
  })

  //inputs with dropdown
  $('input').blur(function () {
    $('input').closest("div").removeClass("active-input");
    $("#" + this.id + "-drop").hide("slow");

  })
  .focus(function () {
    $(this).closest(".form__group").removeClass('filled-input');
    $(this).closest(".form__group").addClass("active-input");
    $("#" + this.id + "-drop").show("slow");

  });

  //selection of dropdown
  // $(function(){
  //   $('.dropdown-content-links a').click(function(){
  //     var drop_val= $(this).text() 
  //     $(this).find(".form__group-wrapper").closest("input").val(drop_val);
  //     console.log("hello")
  //   });
  // });
  



  //short forms on credit flow
  $("#lets-go").click(function () {
    $(".lets-find-forms-container").removeClass("moving-in-rev")
    $(".lets-find").removeClass("moving-out-rev")
    $(".lets-find-forms-container").addClass("moving-in")
    $(".lets-find").addClass("moving-out")
  })


  //convert number to word
  function numberToWords(number) {
    var digit = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var elevenSeries = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    var countingByTens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    var shortScale = ['', 'thousand', 'million', 'billion', 'trillion'];

    number = number.toString(); number = number.replace(/[\, ]/g, ''); if (number != parseFloat(number)) return ''; var x = number.indexOf('.'); if (x == -1) x = number.length; if (x > 15) return 'too big'; var n = number.split(''); var str = ''; var sk = 0; for (var i = 0; i < x; i++) { if ((x - i) % 3 == 2) { if (n[i] == '1') { str += elevenSeries[Number(n[i + 1])] + ' '; i++; sk = 1; } else if (n[i] != 0) { str += countingByTens[n[i] - 2] + ' '; sk = 1; } } else if (n[i] != 0) { str += digit[n[i]] + ' '; if ((x - i) % 3 == 0) str += 'hundred '; sk = 1; } if ((x - i) % 3 == 1) { if (sk) str += shortScale[(x - i - 1) / 3] + ' '; sk = 0; } } if (x != number.length) { var y = number.length; str += 'point '; for (var i = x + 1; i < y; i++) str += digit[n[i]] + ' '; } str = str.replace(/\number+/g, ' '); return str.trim() + " rupees";

  }

  function number() {
    var x = document.getElementById("m-income").value;
    // numberToWords(x)
    console.log(numberToWords(x))

  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  $("#m-income").on('change', function () {
    var selValue = $(this).val();
    var word = numberToWords(selValue)
    var new_word = capitalizeFirstLetter(word)
    $("#word-number").text(new_word)
    addgap(selValue);
  });

  if ($(window).width() < 786) {

    function addgap(newselValue) {
      if (newselValue != '') {
        $(".monthly-earn").addClass("extra-gap")
        console.log("yes")
      } else {
        $(".monthly-earn").removeClass("extra-gap")
        console.log("no")
      }
    }
  }




  //file upload
  function fileInfo(id) {
    var fileName = document.getElementById(id).files[0].name;
    $("#" + id + "-show").val(fileName);

    if ($("#" + id).val()) {
      $("#" + id).parent('.file-type').find(".file-upload-icon").addClass("file-upload-hidden");
      $("#" + id).parent('.file-type').find(".file-upload-attach").addClass("file-upload-visible");
      $("#" + id).parent('.file-type').find(".file-upload-cross").addClass("file-upload-visible");
      $("#" + id).parent('.file-type').find("h5").addClass("file-upload-hidden");


    }
    else {
      $("#" + id).parent('.file-type').find(".file-upload-icon").removeClass("file-upload-hidden");
      $("#" + id).parent('.file-type').find(".file-upload-attach").removeClass("file-upload-visible");
      $("#" + id).parent('.file-type').find(".file-upload-cross").removeClass("file-upload-visible");
      $("#" + id).parent('.file-type').find("h5").removeClass("file-upload-hidden");

    }
  }

  $(".file-upload-cross").click(function () {
    $(this).parent(".file-type").find('input').val("");
    $(this).parent(".file-type").find(".file-upload-icon").removeClass("file-upload-hidden");
    $(this).parent(".file-type").find(".file-upload-attach").removeClass("file-upload-visible");
    $(this).parent(".file-type").find(".file-upload-cross").removeClass("file-upload-visible");
    $(this).parent('.file-type').find("h5").removeClass("file-upload-hidden");
    $(this).closest(".file-type").removeClass("filled-input");
    $(this).closest(".form__group").addClass("file-type");
    $(this).closest(".form__group").removeClass("file-type-back");
  })

  $(".upload-real").change(function () {
    var new_id = this.id;
    fileInfo(new_id);
  })

  //filter modal
  $(".filter-option").click(function(){
    $("#" + this.id + "-show").slideToggle("300");
    $('body', "html").css("overflow", "hidden")
  })
  $(".filter-cross").click(function(){
    $(".filter-cross").closest(".mm-modal").slideToggle(300);
    $('body', "html").css("overflow", "scroll")
  })

  //menu toggle
  $("#menu-icon").click(function(){
    $(".menu-login").show("slide");
    $('body', "html").css("overflow", "hidden")
  })
  $(".menu-close").click(function(){
    $(".menu-login").hide("slide");
    $('body', "html").css("overflow", "scroll")
  })
  $(".data-expand").click(function(){
    $(this).find(".sub-data").slideToggle("slow");
    $(this).find("svg").toggleClass("rotate-menu-icons")
  })

  




  $('#popular-cards-sec, #trending-offers-sec').slick({
    centerMode: true,
    slidesToShow: 3,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    speed: 1000,
    variableWidth: true,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        dots: false,
        variableWidth: true,
        arrows: false
      }
    },
    {
      breakpoint: 1023,
      settings: {
        arrows: false,
        centerMode: false,
        centerPadding: '0px',
        slidesToShow: 1,
        variableWidth: true,
        infinite: false,
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: false,
        centerPadding: '0px',
        slidesToShow: 1,
        variableWidth: true,
        infinite: false,
      },
    },
    ]
  });


  $('.banks-slider').slick({
    infinite: false,
    slidesToShow: 4,
    dots: false,
    slidesToScroll: 1,
    cssEase: 'linear',
    pauseOnHover: true,
    focusOnSelect: true,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        infinite: false,
        variableWidth: true,
        dots: false,
        arrows: false
      }
    },
    
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 3,
        variableWidth: true,
        infinite: false,
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        slidesToShow: 3,
        infinite: false,
        variableWidth: true,
        cellPadding: '12px'
      }
    }
    ]
  });

  // $('.banks-slider').slick("refresh");



  if ($(window).width() < 1186) {
    $('#slider_blogs').slick({
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      pauseOnHover: true,
      responsive: [
      {
        breakpoint: 1186,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          infinite: false,
        }
      }
      ]
    });
  } else {
    $('#slider_blogs').unslick();
  }

});





