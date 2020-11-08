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
      } else {
        $(".monthly-earn").removeClass("extra-gap")
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






!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AOS=t():e.AOS=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="dist/",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=n(1),a=(o(r),n(6)),u=o(a),c=n(7),s=o(c),f=n(8),d=o(f),l=n(9),p=o(l),m=n(10),b=o(m),v=n(11),y=o(v),g=n(14),h=o(g),w=[],k=!1,x={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded",throttleDelay:99,debounceDelay:50,disableMutationObserver:!1},j=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e&&(k=!0),k)return w=(0,y.default)(w,x),(0,b.default)(w,x.once),w},O=function(){w=(0,h.default)(),j()},M=function(){w.forEach(function(e,t){e.node.removeAttribute("data-aos"),e.node.removeAttribute("data-aos-easing"),e.node.removeAttribute("data-aos-duration"),e.node.removeAttribute("data-aos-delay")})},S=function(e){return e===!0||"mobile"===e&&p.default.mobile()||"phone"===e&&p.default.phone()||"tablet"===e&&p.default.tablet()||"function"==typeof e&&e()===!0},_=function(e){x=i(x,e),w=(0,h.default)();var t=document.all&&!window.atob;return S(x.disable)||t?M():(x.disableMutationObserver||d.default.isSupported()||(console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '),x.disableMutationObserver=!0),document.querySelector("body").setAttribute("data-aos-easing",x.easing),document.querySelector("body").setAttribute("data-aos-duration",x.duration),document.querySelector("body").setAttribute("data-aos-delay",x.delay),"DOMContentLoaded"===x.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1?j(!0):"load"===x.startEvent?window.addEventListener(x.startEvent,function(){j(!0)}):document.addEventListener(x.startEvent,function(){j(!0)}),window.addEventListener("resize",(0,s.default)(j,x.debounceDelay,!0)),window.addEventListener("orientationchange",(0,s.default)(j,x.debounceDelay,!0)),window.addEventListener("scroll",(0,u.default)(function(){(0,b.default)(w,x.once)},x.throttleDelay)),x.disableMutationObserver||d.default.ready("[data-aos]",O),w)};e.exports={init:_,refresh:j,refreshHard:O}},function(e,t){},,,,,function(e,t){(function(t){"use strict";function n(e,t,n){function o(t){var n=b,o=v;return b=v=void 0,k=t,g=e.apply(o,n)}function r(e){return k=e,h=setTimeout(f,t),M?o(e):g}function a(e){var n=e-w,o=e-k,i=t-n;return S?j(i,y-o):i}function c(e){var n=e-w,o=e-k;return void 0===w||n>=t||n<0||S&&o>=y}function f(){var e=O();return c(e)?d(e):void(h=setTimeout(f,a(e)))}function d(e){return h=void 0,_&&b?o(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),k=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(O())}function m(){var e=O(),n=c(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(S)return h=setTimeout(f,t),o(w)}return void 0===h&&(h=setTimeout(f,t)),g}var b,v,y,g,h,w,k=0,M=!1,S=!1,_=!0;if("function"!=typeof e)throw new TypeError(s);return t=u(t)||0,i(n)&&(M=!!n.leading,S="maxWait"in n,y=S?x(u(n.maxWait)||0,t):y,_="trailing"in n?!!n.trailing:_),m.cancel=l,m.flush=p,m}function o(e,t,o){var r=!0,a=!0;if("function"!=typeof e)throw new TypeError(s);return i(o)&&(r="leading"in o?!!o.leading:r,a="trailing"in o?!!o.trailing:a),n(e,t,{leading:r,maxWait:t,trailing:a})}function i(e){var t="undefined"==typeof e?"undefined":c(e);return!!e&&("object"==t||"function"==t)}function r(e){return!!e&&"object"==("undefined"==typeof e?"undefined":c(e))}function a(e){return"symbol"==("undefined"==typeof e?"undefined":c(e))||r(e)&&k.call(e)==d}function u(e){if("number"==typeof e)return e;if(a(e))return f;if(i(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=i(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(l,"");var n=m.test(e);return n||b.test(e)?v(e.slice(2),n?2:8):p.test(e)?f:+e}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s="Expected a function",f=NaN,d="[object Symbol]",l=/^\s+|\s+$/g,p=/^[-+]0x[0-9a-f]+$/i,m=/^0b[01]+$/i,b=/^0o[0-7]+$/i,v=parseInt,y="object"==("undefined"==typeof t?"undefined":c(t))&&t&&t.Object===Object&&t,g="object"==("undefined"==typeof self?"undefined":c(self))&&self&&self.Object===Object&&self,h=y||g||Function("return this")(),w=Object.prototype,k=w.toString,x=Math.max,j=Math.min,O=function(){return h.Date.now()};e.exports=o}).call(t,function(){return this}())},function(e,t){(function(t){"use strict";function n(e,t,n){function i(t){var n=b,o=v;return b=v=void 0,O=t,g=e.apply(o,n)}function r(e){return O=e,h=setTimeout(f,t),M?i(e):g}function u(e){var n=e-w,o=e-O,i=t-n;return S?x(i,y-o):i}function s(e){var n=e-w,o=e-O;return void 0===w||n>=t||n<0||S&&o>=y}function f(){var e=j();return s(e)?d(e):void(h=setTimeout(f,u(e)))}function d(e){return h=void 0,_&&b?i(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),O=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(j())}function m(){var e=j(),n=s(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(S)return h=setTimeout(f,t),i(w)}return void 0===h&&(h=setTimeout(f,t)),g}var b,v,y,g,h,w,O=0,M=!1,S=!1,_=!0;if("function"!=typeof e)throw new TypeError(c);return t=a(t)||0,o(n)&&(M=!!n.leading,S="maxWait"in n,y=S?k(a(n.maxWait)||0,t):y,_="trailing"in n?!!n.trailing:_),m.cancel=l,m.flush=p,m}function o(e){var t="undefined"==typeof e?"undefined":u(e);return!!e&&("object"==t||"function"==t)}function i(e){return!!e&&"object"==("undefined"==typeof e?"undefined":u(e))}function r(e){return"symbol"==("undefined"==typeof e?"undefined":u(e))||i(e)&&w.call(e)==f}function a(e){if("number"==typeof e)return e;if(r(e))return s;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(d,"");var n=p.test(e);return n||m.test(e)?b(e.slice(2),n?2:8):l.test(e)?s:+e}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c="Expected a function",s=NaN,f="[object Symbol]",d=/^\s+|\s+$/g,l=/^[-+]0x[0-9a-f]+$/i,p=/^0b[01]+$/i,m=/^0o[0-7]+$/i,b=parseInt,v="object"==("undefined"==typeof t?"undefined":u(t))&&t&&t.Object===Object&&t,y="object"==("undefined"==typeof self?"undefined":u(self))&&self&&self.Object===Object&&self,g=v||y||Function("return this")(),h=Object.prototype,w=h.toString,k=Math.max,x=Math.min,j=function(){return g.Date.now()};e.exports=n}).call(t,function(){return this}())},function(e,t){"use strict";function n(e){var t=void 0,o=void 0,i=void 0;for(t=0;t<e.length;t+=1){if(o=e[t],o.dataset&&o.dataset.aos)return!0;if(i=o.children&&n(o.children))return!0}return!1}function o(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function i(){return!!o()}function r(e,t){var n=window.document,i=o(),r=new i(a);u=t,r.observe(n.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}function a(e){e&&e.forEach(function(e){var t=Array.prototype.slice.call(e.addedNodes),o=Array.prototype.slice.call(e.removedNodes),i=t.concat(o);if(n(i))return u()})}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){};t.default={isSupported:i,ready:r}},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,a=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,u=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,c=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,s=function(){function e(){n(this,e)}return i(e,[{key:"phone",value:function(){var e=o();return!(!r.test(e)&&!a.test(e.substr(0,4)))}},{key:"mobile",value:function(){var e=o();return!(!u.test(e)&&!c.test(e.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),e}();t.default=new s},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t,n){var o=e.node.getAttribute("data-aos-once");t>e.position?e.node.classList.add("aos-animate"):"undefined"!=typeof o&&("false"===o||!n&&"true"!==o)&&e.node.classList.remove("aos-animate")},o=function(e,t){var o=window.pageYOffset,i=window.innerHeight;e.forEach(function(e,r){n(e,i+o,t)})};t.default=o},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(12),r=o(i),a=function(e,t){return e.forEach(function(e,n){e.node.classList.add("aos-init"),e.position=(0,r.default)(e.node,t.offset)}),e};t.default=a},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(13),r=o(i),a=function(e,t){var n=0,o=0,i=window.innerHeight,a={offset:e.getAttribute("data-aos-offset"),anchor:e.getAttribute("data-aos-anchor"),anchorPlacement:e.getAttribute("data-aos-anchor-placement")};switch(a.offset&&!isNaN(a.offset)&&(o=parseInt(a.offset)),a.anchor&&document.querySelectorAll(a.anchor)&&(e=document.querySelectorAll(a.anchor)[0]),n=(0,r.default)(e).top,a.anchorPlacement){case"top-bottom":break;case"center-bottom":n+=e.offsetHeight/2;break;case"bottom-bottom":n+=e.offsetHeight;break;case"top-center":n+=i/2;break;case"bottom-center":n+=i/2+e.offsetHeight;break;case"center-center":n+=i/2+e.offsetHeight/2;break;case"top-top":n+=i;break;case"bottom-top":n+=e.offsetHeight+i;break;case"center-top":n+=e.offsetHeight/2+i}return a.anchorPlacement||a.offset||isNaN(t)||(o=t),n+o};t.default=a},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){for(var t=0,n=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!=e.tagName?e.scrollLeft:0),n+=e.offsetTop-("BODY"!=e.tagName?e.scrollTop:0),e=e.offsetParent;return{top:n,left:t}};t.default=n},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e=e||document.querySelectorAll("[data-aos]"),Array.prototype.map.call(e,function(e){return{node:e}})};t.default=n}])});

    // Requires jQuery

// Initialize slider:
$(document).ready(function() {
  $('.noUi-handle').on('click', function() {
    $(this).width(50);
  });
  var rangeSlider = document.getElementById('slider-range');
  var tenure = document.getElementById('tenure-range');
  var invest = document.getElementById('return-range');
  var loan = document.getElementById('loan-range');


  var moneyFormat = wNumb({
    decimals: 0,
    thousand: ',',
    prefix: '₹',
    tooltips: true,
  });
  
  noUiSlider.create(rangeSlider, {
    start: [2000, 3000],
    step: 1,
    range: {
      'min': [500],
      'max': [5000]
    },
    tooltips: true,
    format: moneyFormat,
    connect: true
  });

  noUiSlider.create(tenure, {
    start: [3, 8],
    step: 1,
    range: {
      'min': [1],
      'max': [10]
    },
    tooltips: true,
    format: {
      from: Number,
      to: function(value) {
          return (parseInt(value)+" yrs.");
      }
  },
    connect: true
  });

  noUiSlider.create(invest, {
    start: [2000, 3000],
    step: 1,
    range: {
      'min': [500],
      'max': [5000]
    },
    tooltips: true,
    format: moneyFormat,
    connect: true
  });

  noUiSlider.create(loan, {
    start: [3, 8],
    step: 1,
    range: {
      'min': [1],
      'max': [10]
    },
    tooltips: true,
    format: {
      from: Number,
      to: function(value) {
          return (parseInt(value)+" yrs.");
      }
  },
    connect: true
  });
  
  // Set visual min and max values and also update value hidden form inputs
  rangeSlider.noUiSlider.on('update', function(values, handle) {
    document.getElementsByClassName('slider-range-value1').innerHTML = values[0];
    document.getElementById('slider-range-value2').innerHTML = values[1];
    document.getElementsByName('min-value').value = moneyFormat.from(
      values[0]);
    document.getElementsByName('max-value').value = moneyFormat.from(
      values[1]);
  });

  tenure.noUiSlider.on('update', function(values, handle) {
    document.getElementsByClassName('slider-range-value1').innerHTML = values[0];
    document.getElementById('slider-range-value2').innerHTML = values[1];
    document.getElementsByName('min-value').value = moneyFormat.from(
      values[0]);
    document.getElementsByName('max-value').value = moneyFormat.from(
      values[1]);
  });

  invest.noUiSlider.on('update', function(values, handle) {
    document.getElementsByClassName('slider-range-value1').innerHTML = values[0];
    document.getElementById('slider-range-value2').innerHTML = values[1];
    document.getElementsByName('min-value').value = moneyFormat.from(
      values[0]);
    document.getElementsByName('max-value').value = moneyFormat.from(
      values[1]);
  });

  loan.noUiSlider.on('update', function(values, handle) {
    document.getElementsByClassName('slider-range-value1').innerHTML = values[0];
    document.getElementById('slider-range-value2').innerHTML = values[1];
    document.getElementsByName('min-value').value = moneyFormat.from(
      values[0]);
    document.getElementsByName('max-value').value = moneyFormat.from(
      values[1]);
  });
});



// https://refreshless.com/nouislider/
/*! nouislider - 8.3.0 - 2016-02-14 17:37:19 */
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory();
  } else {
    // Browser globals
    window.noUiSlider = factory();
  }
}(function() {
  'use strict';
  // Removes duplicates from an array.
  function unique(array) {
      return array.filter(function(a) {
        return !this[a] ? this[a] = true : false;
      }, {});
    }
    // Round a value to the closest 'to'.

  function closest(value, to) {
      return Math.round(value / to) * to;
    }
    // Current position of an element relative to the document.

  function offset(elem) {
      var rect = elem.getBoundingClientRect(),
        doc = elem.ownerDocument,
        docElem = doc.documentElement,
        pageOffset = getPageOffset();
      // getBoundingClientRect contains left scroll in Chrome on Android.
      // I haven't found a feature detection that proves this. Worst case
      // scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
      if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
        pageOffset.x = 0;
      }
      return {
        top: rect.top + pageOffset.y - docElem.clientTop,
        left: rect.left + pageOffset.x - docElem.clientLeft
      };
    }
    // Checks whether a value is numerical.

  function isNumeric(a) {
      return typeof a === 'number' && !isNaN(a) && isFinite(a);
    }
    // Rounds a number to 7 supported decimals.

  function accurateNumber(number) {
      var p = Math.pow(10, 7);
      return Number((Math.round(number * p) / p).toFixed(7));
    }
    // Sets a class and removes it after [duration] ms.

  function addClassFor(element, className, duration) {
      addClass(element, className);
      setTimeout(function() {
        removeClass(element, className);
      }, duration);
    }
    // Limits a value to 0 - 100

  function limit(a) {
      return Math.max(Math.min(a, 100), 0);
    }
    // Wraps a variable as an array, if it isn't one yet.

  function asArray(a) {
      return Array.isArray(a) ? a : [a];
    }
    // Counts decimals

  function countDecimals(numStr) {
      var pieces = numStr.split(".");
      return pieces.length > 1 ? pieces[1].length : 0;
    }
    // http://youmightnotneedjquery.com/#add_class

  function addClass(el, className) {
      if (el.classList) {
        el.classList.add(className);
      } else {
        el.className += ' ' + className;
      }
    }
    // http://youmightnotneedjquery.com/#remove_class

  function removeClass(el, className) {
      if (el.classList) {
        el.classList.remove(className);
      } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' +
          className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    }
    // https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/

  function hasClass(el, className) {
      return el.classList ? el.classList.contains(className) : new RegExp(
        '\\b' + className + '\\b').test(el.className);
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes

  function getPageOffset() {
      var supportPageOffset = window.pageXOffset !== undefined,
        isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"),
        x = supportPageOffset ? window.pageXOffset : isCSS1Compat ?
        document.documentElement.scrollLeft : document.body.scrollLeft,
        y = supportPageOffset ? window.pageYOffset : isCSS1Compat ?
        document.documentElement.scrollTop : document.body.scrollTop;
      return {
        x: x,
        y: y
      };
    }
    // Shorthand for stopPropagation so we don't have to create a dynamic method

  function stopPropagation(e) {
      e.stopPropagation();
    }
    // todo

  function addCssPrefix(cssPrefix) {
    return function(className) {
      return cssPrefix + className;
    };
  }
  var
  // Determine the events to bind. IE11 implements pointerEvents without
  // a prefix, which breaks compatibility with the IE10 implementation.
  /** @const */
    actions = window.navigator.pointerEnabled ? {
      start: 'pointerdown',
      move: 'pointermove',
      end: 'pointerup'
    } : window.navigator.msPointerEnabled ? {
      start: 'MSPointerDown',
      move: 'MSPointerMove',
      end: 'MSPointerUp'
    } : {
      start: 'mousedown touchstart',
      move: 'mousemove touchmove',
      end: 'mouseup touchend'
    },
    defaultCssPrefix = 'noUi-';
  // Value calculation
  // Determine the size of a sub-range in relation to a full range.
  function subRangeRatio(pa, pb) {
      return (100 / (pb - pa));
    }
    // (percentage) How many percent is this value of this range?

  function fromPercentage(range, value) {
      return (value * 100) / (range[1] - range[0]);
    }
    // (percentage) Where is this value on this range?

  function toPercentage(range, value) {
      return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) :
        value - range[0]);
    }
    // (value) How much is this percentage on this range?

  function isPercentage(range, value) {
      return ((value * (range[1] - range[0])) / 100) + range[0];
    }
    // Range conversion

  function getJ(value, arr) {
      var j = 1;
      while (value >= arr[j]) {
        j += 1;
      }
      return j;
    }
    // (percentage) Input a value, find where, on a scale of 0-100, it applies.

  function toStepping(xVal, xPct, value) {
      if (value >= xVal.slice(-1)[0]) {
        return 100;
      }
      var j = getJ(value, xVal),
        va, vb, pa, pb;
      va = xVal[j - 1];
      vb = xVal[j];
      pa = xPct[j - 1];
      pb = xPct[j];
      return pa + (toPercentage([va, vb], value) / subRangeRatio(pa, pb));
    }
    // (value) Input a percentage, find where it is on the specified range.

  function fromStepping(xVal, xPct, value) {
      // There is no range group that fits 100
      if (value >= 100) {
        return xVal.slice(-1)[0];
      }
      var j = getJ(value, xPct),
        va, vb, pa, pb;
      va = xVal[j - 1];
      vb = xVal[j];
      pa = xPct[j - 1];
      pb = xPct[j];
      return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb));
    }
    // (percentage) Get the step that applies at a certain value.

  function getStep(xPct, xSteps, snap, value) {
      if (value === 100) {
        return value;
      }
      var j = getJ(value, xPct),
        a, b;
      // If 'snap' is set, steps are used as fixed points on the slider.
      if (snap) {
        a = xPct[j - 1];
        b = xPct[j];
        // Find the closest position, a or b.
        if ((value - a) > ((b - a) / 2)) {
          return b;
        }
        return a;
      }
      if (!xSteps[j - 1]) {
        return value;
      }
      return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
    }
    // Entry parsing

  function handleEntryPoint(index, value, that) {
    var percentage;
    // Wrap numerical input in an array.
    if (typeof value === "number") {
      value = [value];
    }
    // Reject any invalid input, by testing whether value is an array.
    if (Object.prototype.toString.call(value) !== '[object Array]') {
      throw new Error("noUiSlider: 'range' contains invalid value.");
    }
    // Covert min/max syntax to 0 and 100.
    if (index === 'min') {
      percentage = 0;
    } else if (index === 'max') {
      percentage = 100;
    } else {
      percentage = parseFloat(index);
    }
    // Check for correct input.
    if (!isNumeric(percentage) || !isNumeric(value[0])) {
      throw new Error("noUiSlider: 'range' value isn't numeric.");
    }
    // Store values.
    that.xPct.push(percentage);
    that.xVal.push(value[0]);
    // NaN will evaluate to false too, but to keep
    // logging clear, set step explicitly. Make sure
    // not to override the 'step' setting with false.
    if (!percentage) {
      if (!isNaN(value[1])) {
        that.xSteps[0] = value[1];
      }
    } else {
      that.xSteps.push(isNaN(value[1]) ? false : value[1]);
    }
  }

  function handleStepPoint(i, n, that) {
      // Ignore 'false' stepping.
      if (!n) {
        return true;
      }
      // Factor to range ratio
      that.xSteps[i] = fromPercentage([
        that.xVal[i], that.xVal[i + 1]
      ], n) / subRangeRatio(that.xPct[i], that.xPct[i + 1]);
    }
    // Interface
    // The interface to Spectrum handles all direction-based
    // conversions, so the above values are unaware.

  function Spectrum(entry, snap, direction, singleStep) {
    this.xPct = [];
    this.xVal = [];
    this.xSteps = [singleStep || false];
    this.xNumSteps = [false];
    this.snap = snap;
    this.direction = direction;
    var index, ordered = [ /* [0, 'min'], [1, '50%'], [2, 'max'] */ ];
    // Map the object keys to an array.
    for (index in entry) {
      if (entry.hasOwnProperty(index)) {
        ordered.push([entry[index], index]);
      }
    }
    // Sort all entries by value (numeric sort).
    if (ordered.length && typeof ordered[0][0] === "object") {
      ordered.sort(function(a, b) {
        return a[0][0] - b[0][0];
      });
    } else {
      ordered.sort(function(a, b) {
        return a[0] - b[0];
      });
    }
    // Convert all entries to subranges.
    for (index = 0; index < ordered.length; index++) {
      handleEntryPoint(ordered[index][1], ordered[index][0], this);
    }
    // Store the actual step values.
    // xSteps is sorted in the same order as xPct and xVal.
    this.xNumSteps = this.xSteps.slice(0);
    // Convert all numeric steps to the percentage of the subrange they represent.
    for (index = 0; index < this.xNumSteps.length; index++) {
      handleStepPoint(index, this.xNumSteps[index], this);
    }
  }
  Spectrum.prototype.getMargin = function(value) {
    return this.xPct.length === 2 ? fromPercentage(this.xVal, value) :
      false;
  };
  Spectrum.prototype.toStepping = function(value) {
    value = toStepping(this.xVal, this.xPct, value);
    // Invert the value if this is a right-to-left slider.
    if (this.direction) {
      value = 100 - value;
    }
    return value;
  };
  Spectrum.prototype.fromStepping = function(value) {
    // Invert the value if this is a right-to-left slider.
    if (this.direction) {
      value = 100 - value;
    }
    return accurateNumber(fromStepping(this.xVal, this.xPct, value));
  };
  Spectrum.prototype.getStep = function(value) {
    // Find the proper step for rtl sliders by search in inverse direction.
    // Fixes issue #262.
    if (this.direction) {
      value = 100 - value;
    }
    value = getStep(this.xPct, this.xSteps, this.snap, value);
    if (this.direction) {
      value = 100 - value;
    }
    return value;
  };
  Spectrum.prototype.getApplicableStep = function(value) {
    // If the value is 100%, return the negative step twice.
    var j = getJ(value, this.xPct),
      offset = value === 100 ? 2 : 1;
    return [this.xNumSteps[j - 2], this.xVal[j - offset], this.xNumSteps[
      j - offset]];
  };
  // Outside testing
  Spectrum.prototype.convert = function(value) {
    return this.getStep(this.toStepping(value));
  };
  /*    Every input option is tested and parsed. This'll prevent
    endless validation in internal methods. These tests are
    structured with an item for every option available. An
    option can be marked as required by setting the 'r' flag.
    The testing function is provided with three arguments:
        - The provided value for the option;
        - A reference to the options object;
        - The name for the option;

    The testing function returns false when an error is detected,
    or true when everything is OK. It can also modify the option
    object, to make sure all values can be correctly looped elsewhere. */
  var defaultFormatter = {
    'to': function(value) {
      return value !== undefined && value.toFixed(2);
    },
    'from': Number
  };

  function testStep(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'step' is not numeric.");
    }
    // The step option can still be used to set stepping
    // for linear sliders. Overwritten if set in 'range'.
    parsed.singleStep = entry;
  }

  function testRange(parsed, entry) {
    // Filter incorrect input.
    if (typeof entry !== 'object' || Array.isArray(entry)) {
      throw new Error("noUiSlider: 'range' is not an object.");
    }
    // Catch missing start or end.
    if (entry.min === undefined || entry.max === undefined) {
      throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
    }
    // Catch equal start or end.
    if (entry.min === entry.max) {
      throw new Error(
        "noUiSlider: 'range' 'min' and 'max' cannot be equal.");
    }
    parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.dir, parsed
      .singleStep);
  }

  function testStart(parsed, entry) {
    entry = asArray(entry);
    // Validate input. Values aren't tested, as the public .val method
    // will always provide a valid location.
    if (!Array.isArray(entry) || !entry.length || entry.length > 2) {
      throw new Error("noUiSlider: 'start' option is incorrect.");
    }
    // Store the number of handles.
    parsed.handles = entry.length;
    // When the slider is initialized, the .val method will
    // be called with the start options.
    parsed.start = entry;
  }

  function testSnap(parsed, entry) {
    // Enforce 100% stepping within subranges.
    parsed.snap = entry;
    if (typeof entry !== 'boolean') {
      throw new Error("noUiSlider: 'snap' option must be a boolean.");
    }
  }

  function testAnimate(parsed, entry) {
    // Enforce 100% stepping within subranges.
    parsed.animate = entry;
    if (typeof entry !== 'boolean') {
      throw new Error("noUiSlider: 'animate' option must be a boolean.");
    }
  }

  function testConnect(parsed, entry) {
    if (entry === 'lower' && parsed.handles === 1) {
      parsed.connect = 1;
    } else if (entry === 'upper' && parsed.handles === 1) {
      parsed.connect = 2;
    } else if (entry === true && parsed.handles === 2) {
      parsed.connect = 3;
    } else if (entry === false) {
      parsed.connect = 0;
    } else {
      throw new Error(
        "noUiSlider: 'connect' option doesn't match handle count.");
    }
  }

  function testOrientation(parsed, entry) {
    // Set orientation to an a numerical value for easy
    // array selection.
    switch (entry) {
      case 'horizontal':
        parsed.ort = 0;
        break;
      case 'vertical':
        parsed.ort = 1;
        break;
      default:
        throw new Error("noUiSlider: 'orientation' option is invalid.");
    }
  }

  function testMargin(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'margin' option must be numeric.");
    }
    // Issue #582
    if (entry === 0) {
      return;
    }
    parsed.margin = parsed.spectrum.getMargin(entry);
    if (!parsed.margin) {
      throw new Error(
        "noUiSlider: 'margin' option is only supported on linear sliders."
      );
    }
  }

  function testLimit(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'limit' option must be numeric.");
    }
    parsed.limit = parsed.spectrum.getMargin(entry);
    if (!parsed.limit) {
      throw new Error(
        "noUiSlider: 'limit' option is only supported on linear sliders."
      );
    }
  }

  function testDirection(parsed, entry) {
    // Set direction as a numerical value for easy parsing.
    // Invert connection for RTL sliders, so that the proper
    // handles get the connect/background classes.
    switch (entry) {
      case 'ltr':
        parsed.dir = 0;
        break;
      case 'rtl':
        parsed.dir = 1;
        parsed.connect = [0, 2, 1, 3][parsed.connect];
        break;
      default:
        throw new Error(
          "noUiSlider: 'direction' option was not recognized.");
    }
  }

  function testBehaviour(parsed, entry) {
    // Make sure the input is a string.
    if (typeof entry !== 'string') {
      throw new Error(
        "noUiSlider: 'behaviour' must be a string containing options.");
    }
    // Check if the string contains any keywords.
    // None are required.
    var tap = entry.indexOf('tap') >= 0,
      drag = entry.indexOf('drag') >= 0,
      fixed = entry.indexOf('fixed') >= 0,
      snap = entry.indexOf('snap') >= 0,
      hover = entry.indexOf('hover') >= 0;
    // Fix #472
    if (drag && !parsed.connect) {
      throw new Error(
        "noUiSlider: 'drag' behaviour must be used with 'connect': true."
      );
    }
    parsed.events = {
      tap: tap || snap,
      drag: drag,
      fixed: fixed,
      snap: snap,
      hover: hover
    };
  }

  function testTooltips(parsed, entry) {
    var i;
    if (entry === false) {
      return;
    } else if (entry === true) {
      parsed.tooltips = [];
      for (i = 0; i < parsed.handles; i++) {
        parsed.tooltips.push(true);
      }
    } else {
      parsed.tooltips = asArray(entry);
      if (parsed.tooltips.length !== parsed.handles) {
        throw new Error(
          "noUiSlider: must pass a formatter for all handles.");
      }
      parsed.tooltips.forEach(function(formatter) {
        if (typeof formatter !== 'boolean' && (typeof formatter !==
          'object' || typeof formatter.to !== 'function')) {
          throw new Error(
            "noUiSlider: 'tooltips' must be passed a formatter or 'false'."
          );
        }
      });
    }
  }

  function testFormat(parsed, entry) {
    parsed.format = entry;
    // Any object with a to and from method is supported.
    if (typeof entry.to === 'function' && typeof entry.from ===
      'function') {
      return true;
    }
    throw new Error(
      "noUiSlider: 'format' requires 'to' and 'from' methods.");
  }

  function testCssPrefix(parsed, entry) {
      if (entry !== undefined && typeof entry !== 'string') {
        throw new Error("noUiSlider: 'cssPrefix' must be a string.");
      }
      parsed.cssPrefix = entry;
    }
    // Test all developer settings and parse to assumption-safe values.

  function testOptions(options) {
    // To prove a fix for #537, freeze options here.
    // If the object is modified, an error will be thrown.
    // Object.freeze(options);
    var parsed = {
        margin: 0,
        limit: 0,
        animate: true,
        format: defaultFormatter
      },
      tests;
    // Tests are executed in the order they are presented here.
    tests = {
      'step': {
        r: false,
        t: testStep
      },
      'start': {
        r: true,
        t: testStart
      },
      'connect': {
        r: true,
        t: testConnect
      },
      'direction': {
        r: true,
        t: testDirection
      },
      'snap': {
        r: false,
        t: testSnap
      },
      'animate': {
        r: false,
        t: testAnimate
      },
      'range': {
        r: true,
        t: testRange
      },
      'orientation': {
        r: false,
        t: testOrientation
      },
      'margin': {
        r: false,
        t: testMargin
      },
      'limit': {
        r: false,
        t: testLimit
      },
      'behaviour': {
        r: true,
        t: testBehaviour
      },
      'format': {
        r: false,
        t: testFormat
      },
      'tooltips': {
        r: false,
        t: testTooltips
      },
      'cssPrefix': {
        r: false,
        t: testCssPrefix
      }
    };
    var defaults = {
      'connect': false,
      'direction': 'ltr',
      'behaviour': 'tap',
      'orientation': 'horizontal'
    };
    // Run all options through a testing mechanism to ensure correct
    // input. It should be noted that options might get modified to
    // be handled properly. E.g. wrapping integers in arrays.
    Object.keys(tests).forEach(function(name) {
      // If the option isn't set, but it is required, throw an error.
      if (options[name] === undefined && defaults[name] === undefined) {
        if (tests[name].r) {
          throw new Error("noUiSlider: '" + name + "' is required.");
        }
        return true;
      }
      tests[name].t(parsed, options[name] === undefined ? defaults[
        name] : options[name]);
    });
    // Forward pips options
    parsed.pips = options.pips;
    // Pre-define the styles.
    parsed.style = parsed.ort ? 'top' : 'left';
    return parsed;
  }

  function closure(target, options) {
      // All variables local to 'closure' are prefixed with 'scope_'
      var scope_Target = target,
        scope_Locations = [-1, -1],
        scope_Base,
        scope_Handles,
        scope_Spectrum = options.spectrum,
        scope_Values = [],
        scope_Events = {},
        scope_Self;
      var cssClasses = [
        /*  0 */
        'target'
        /*  1 */
        , 'base'
        /*  2 */
        , 'origin'
        /*  3 */
        , 'handle'
        /*  4 */
        , 'horizontal'
        /*  5 */
        , 'vertical'
        /*  6 */
        , 'background'
        /*  7 */
        , 'connect'
        /*  8 */
        , 'ltr'
        /*  9 */
        , 'rtl'
        /* 10 */
        , 'draggable'
        /* 11 */
        , ''
        /* 12 */
        , 'state-drag'
        /* 13 */
        , ''
        /* 14 */
        , 'state-tap'
        /* 15 */
        , 'active'
        /* 16 */
        , ''
        /* 17 */
        , 'stacking'
        /* 18 */
        , 'tooltip'
        /* 19 */
        , ''
        /* 20 */
        , 'pips'
        /* 21 */
        , 'marker'
        /* 22 */
        , 'value'
      ].map(addCssPrefix(options.cssPrefix || defaultCssPrefix));
      // Delimit proposed values for handle positions.
      function getPositions(a, b, delimit) {
          // Add movement to current position.
          var c = a + b[0],
            d = a + b[1];
          // Only alter the other position on drag,
          // not on standard sliding.
          if (delimit) {
            if (c < 0) {
              d += Math.abs(c);
            }
            if (d > 100) {
              c -= (d - 100);
            }
            // Limit values to 0 and 100.
            return [limit(c), limit(d)];
          }
          return [c, d];
        }
        // Provide a clean event with standardized offset values.

      function fixEvent(e, pageOffset) {
          // Prevent scrolling and panning on touch events, while
          // attempting to slide. The tap event also depends on this.
          e.preventDefault();
          // Filter the event to register the type, which can be
          // touch, mouse or pointer. Offset changes need to be
          // made on an event specific basis.
          var touch = e.type.indexOf('touch') === 0,
            mouse = e.type.indexOf('mouse') === 0,
            pointer = e.type.indexOf('pointer') === 0,
            x, y, event = e;
          // IE10 implemented pointer events with a prefix;
          if (e.type.indexOf('MSPointer') === 0) {
            pointer = true;
          }
          if (touch) {
            // noUiSlider supports one movement at a time,
            // so we can select the first 'changedTouch'.
            x = e.changedTouches[0].pageX;
            y = e.changedTouches[0].pageY;
          }
          pageOffset = pageOffset || getPageOffset();
          if (mouse || pointer) {
            x = e.clientX + pageOffset.x;
            y = e.clientY + pageOffset.y;
          }
          event.pageOffset = pageOffset;
          event.points = [x, y];
          event.cursor = mouse || pointer; // Fix #435
          return event;
        }
        // Append a handle to the base.

      function addHandle(direction, index) {
          var origin = document.createElement('div'),
            handle = document.createElement('div'),
            additions = ['-lower', '-upper'];
          if (direction) {
            additions.reverse();
          }
          addClass(handle, cssClasses[3]);
          addClass(handle, cssClasses[3] + additions[index]);
          addClass(origin, cssClasses[2]);
          origin.appendChild(handle);
          return origin;
        }
        // Add the proper connection classes.

      function addConnection(connect, target, handles) {
          // Apply the required connection classes to the elements
          // that need them. Some classes are made up for several
          // segments listed in the class list, to allow easy
          // renaming and provide a minor compression benefit.
          switch (connect) {
            case 1:
              addClass(target, cssClasses[7]);
              addClass(handles[0], cssClasses[6]);
              break;
            case 3:
              addClass(handles[1], cssClasses[6]);
              /* falls through */
            case 2:
              addClass(handles[0], cssClasses[7]);
              /* falls through */
            case 0:
              addClass(target, cssClasses[6]);
              break;
          }
        }
        // Add handles to the slider base.

      function addHandles(nrHandles, direction, base) {
          var index, handles = [];
          // Append handles.
          for (index = 0; index < nrHandles; index += 1) {
            // Keep a list of all added handles.
            handles.push(base.appendChild(addHandle(direction, index)));
          }
          return handles;
        }
        // Initialize a single slider.

      function addSlider(direction, orientation, target) {
        // Apply classes and data to the target.
        addClass(target, cssClasses[0]);
        addClass(target, cssClasses[8 + direction]);
        addClass(target, cssClasses[4 + orientation]);
        var div = document.createElement('div');
        addClass(div, cssClasses[1]);
        target.appendChild(div);
        return div;
      }

      function addTooltip(handle, index) {
          if (!options.tooltips[index]) {
            return false;
          }
          var element = document.createElement('div');
          element.className = cssClasses[18];
          return handle.firstChild.appendChild(element);
        }
        // The tooltips option is a shorthand for using the 'update' event.

      function tooltips() {
        if (options.dir) {
          options.tooltips.reverse();
        }
        // Tooltips are added with options.tooltips in original order.
        var tips = scope_Handles.map(addTooltip);
        if (options.dir) {
          tips.reverse();
          options.tooltips.reverse();
        }
        bindEvent('update', function(f, o, r) {
          if (tips[o]) {
            tips[o].innerHTML = options.tooltips[o] === true ? f[o] :
              options.tooltips[o].to(r[o]);
          }
        });
      }

      function getGroup(mode, values, stepped) {
        // Use the range.
        if (mode === 'range' || mode === 'steps') {
          return scope_Spectrum.xVal;
        }
        if (mode === 'count') {
          // Divide 0 - 100 in 'count' parts.
          var spread = (100 / (values - 1)),
            v, i = 0;
          values = [];
          // List these parts and have them handled as 'positions'.
          while ((v = i++ * spread) <= 100) {
            values.push(v);
          }
          mode = 'positions';
        }
        if (mode === 'positions') {
          // Map all percentages to on-range values.
          return values.map(function(value) {
            return scope_Spectrum.fromStepping(stepped ?
              scope_Spectrum.getStep(value) : value);
          });
        }
        if (mode === 'values') {
          // If the value must be stepped, it needs to be converted to a percentage first.
          if (stepped) {
            return values.map(function(value) {
              // Convert to percentage, apply step, return to value.
              return scope_Spectrum.fromStepping(scope_Spectrum.getStep(
                scope_Spectrum.toStepping(value)));
            });
          }
          // Otherwise, we can simply use the values.
          return values;
        }
      }

      function generateSpread(density, mode, group) {
        function safeIncrement(value, increment) {
          // Avoid floating point variance by dropping the smallest decimal places.
          return (value + increment).toFixed(7) / 1;
        }
        var originalSpectrumDirection = scope_Spectrum.direction,
          indexes = {},
          firstInRange = scope_Spectrum.xVal[0],
          lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length -
            1],
          ignoreFirst = false,
          ignoreLast = false,
          prevPct = 0;
        // This function loops the spectrum in an ltr linear fashion,
        // while the toStepping method is direction aware. Trick it into
        // believing it is ltr.
        scope_Spectrum.direction = 0;
        // Create a copy of the group, sort it and filter away all duplicates.
        group = unique(group.slice().sort(function(a, b) {
          return a - b;
        }));
        // Make sure the range starts with the first element.
        if (group[0] !== firstInRange) {
          group.unshift(firstInRange);
          ignoreFirst = true;
        }
        // Likewise for the last one.
        if (group[group.length - 1] !== lastInRange) {
          group.push(lastInRange);
          ignoreLast = true;
        }
        group.forEach(function(current, index) {
          // Get the current step and the lower + upper positions.
          var step, i, q,
            low = current,
            high = group[index + 1],
            newPct, pctDifference, pctPos, type,
            steps, realSteps, stepsize;
          // When using 'steps' mode, use the provided steps.
          // Otherwise, we'll step on to the next subrange.
          if (mode === 'steps') {
            step = scope_Spectrum.xNumSteps[index];
          }
          // Default to a 'full' step.
          if (!step) {
            step = high - low;
          }
          // Low can be 0, so test for false. If high is undefined,
          // we are at the last subrange. Index 0 is already handled.
          if (low === false || high === undefined) {
            return;
          }
          // Find all steps in the subrange.
          for (i = low; i <= high; i = safeIncrement(i, step)) {
            // Get the percentage value for the current step,
            // calculate the size for the subrange.
            newPct = scope_Spectrum.toStepping(i);
            pctDifference = newPct - prevPct;
            steps = pctDifference / density;
            realSteps = Math.round(steps);
            // This ratio represents the ammount of percentage-space a point indicates.
            // For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
            // Round the percentage offset to an even number, then divide by two
            // to spread the offset on both sides of the range.
            stepsize = pctDifference / realSteps;
            // Divide all points evenly, adding the correct number to this subrange.
            // Run up to <= so that 100% gets a point, event if ignoreLast is set.
            for (q = 1; q <= realSteps; q += 1) {
              // The ratio between the rounded value and the actual size might be ~1% off.
              // Correct the percentage offset by the number of points
              // per subrange. density = 1 will result in 100 points on the
              // full range, 2 for 50, 4 for 25, etc.
              pctPos = prevPct + (q * stepsize);
              indexes[pctPos.toFixed(5)] = ['x', 0];
            }
            // Determine the point type.
            type = (group.indexOf(i) > -1) ? 1 : (mode === 'steps' ?
              2 : 0);
            // Enforce the 'ignoreFirst' option by overwriting the type for 0.
            if (!index && ignoreFirst) {
              type = 0;
            }
            if (!(i === high && ignoreLast)) {
              // Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
              indexes[newPct.toFixed(5)] = [i, type];
            }
            // Update the percentage count.
            prevPct = newPct;
          }
        });
        // Reset the spectrum.
        scope_Spectrum.direction = originalSpectrumDirection;
        return indexes;
      }

      function addMarking(spread, filterFunc, formatter) {
        var style = ['horizontal', 'vertical'][options.ort],
          element = document.createElement('div'),
          out = '';
        addClass(element, cssClasses[20]);
        addClass(element, cssClasses[20] + '-' + style);

        function getSize(type) {
          return ['-normal', '-large', '-sub'][type];
        }

        function getTags(offset, source, values) {
          return 'class="' + source + ' ' + source + '-' + style + ' ' +
            source + getSize(values[1]) + '" style="' + options.style +
            ': ' + offset + '%"';
        }

        function addSpread(offset, values) {
            if (scope_Spectrum.direction) {
              offset = 100 - offset;
            }
            // Apply the filter function, if it is set.
            values[1] = (values[1] && filterFunc) ? filterFunc(values[0],
              values[1]) : values[1];
            // Add a marker for every point
            out += '<div ' + getTags(offset, cssClasses[21], values) +
              '></div>';
            // Values are only appended for points marked '1' or '2'.
            if (values[1]) {
              out += '<div ' + getTags(offset, cssClasses[22], values) +
                '>' + formatter.to(values[0]) + '</div>';
            }
          }
          // Append all points.
        Object.keys(spread).forEach(function(a) {
          addSpread(a, spread[a]);
        });
        element.innerHTML = out;
        return element;
      }

      function pips(grid) {
          var mode = grid.mode,
            density = grid.density || 1,
            filter = grid.filter || false,
            values = grid.values || false,
            stepped = grid.stepped || false,
            group = getGroup(mode, values, stepped),
            spread = generateSpread(density, mode, group),
            format = grid.format || {
              to: Math.round
            };
          return scope_Target.appendChild(addMarking(spread, filter, format));
        }
        // Shorthand for base dimensions.

      function baseSize() {
          var rect = scope_Base.getBoundingClientRect(),
            alt = 'offset' + ['Width', 'Height'][options.ort];
          return options.ort === 0 ? (rect.width || scope_Base[alt]) : (
            rect.height || scope_Base[alt]);
        }
        // External event handling

      function fireEvent(event, handleNumber, tap) {
          if (handleNumber !== undefined && options.handles !== 1) {
            handleNumber = Math.abs(handleNumber - options.dir);
          }
          Object.keys(scope_Events).forEach(function(targetEvent) {
            var eventType = targetEvent.split('.')[0];
            if (event === eventType) {
              scope_Events[targetEvent].forEach(function(callback) {
                callback.call(
                  // Use the slider public API as the scope ('this')
                  scope_Self,
                  // Return values as array, so arg_1[arg_2] is always valid.
                  asArray(valueGet()),
                  // Handle index, 0 or 1
                  handleNumber,
                  // Unformatted slider values
                  asArray(inSliderOrder(Array.prototype.slice.call(
                    scope_Values))),
                  // Event is fired by tap, true or false
                  tap || false,
                  // Left offset of the handle, in relation to the slider
                  scope_Locations);
              });
            }
          });
        }
        // Returns the input array, respecting the slider direction configuration.

      function inSliderOrder(values) {
          // If only one handle is used, return a single value.
          if (values.length === 1) {
            return values[0];
          }
          if (options.dir) {
            return values.reverse();
          }
          return values;
        }
        // Handler for attaching events trough a proxy.

      function attach(events, element, callback, data) {
          // This function can be used to 'filter' events to the slider.
          // element is a node, not a nodeList
          var method = function(e) {
              if (scope_Target.hasAttribute('disabled')) {
                return false;
              }
              // Stop if an active 'tap' transition is taking place.
              if (hasClass(scope_Target, cssClasses[14])) {
                return false;
              }
              e = fixEvent(e, data.pageOffset);
              // Ignore right or middle clicks on start #454
              if (events === actions.start && e.buttons !== undefined && e.buttons >
                1) {
                return false;
              }
              // Ignore right or middle clicks on start #454
              if (data.hover && e.buttons) {
                return false;
              }
              e.calcPoint = e.points[options.ort];
              // Call the event handler with the event [ and additional data ].
              callback(e, data);
            },
            methods = [];
          // Bind a closure on the target for every event type.
          events.split(' ').forEach(function(eventName) {
            element.addEventListener(eventName, method, false);
            methods.push([eventName, method]);
          });
          return methods;
        }
        // Handle movement on document for handle and range drag.

      function move(event, data) {
          // Fix #498
          // Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
          // https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
          // IE9 has .buttons and .which zero on mousemove.
          // Firefox breaks the spec MDN defines.
          if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons ===
            0 && data.buttonsProperty !== 0) {
            return end(event, data);
          }
          var handles = data.handles || scope_Handles,
            positions, state = false,
            proposal = ((event.calcPoint - data.start) * 100) / data.baseSize,
            handleNumber = handles[0] === scope_Handles[0] ? 0 : 1,
            i;
          // Calculate relative positions for the handles.
          positions = getPositions(proposal, data.positions, handles.length >
            1);
          state = setHandle(handles[0], positions[handleNumber], handles.length ===
            1);
          if (handles.length > 1) {
            state = setHandle(handles[1], positions[handleNumber ? 0 : 1],
              false) || state;
            if (state) {
              // fire for both handles
              for (i = 0; i < data.handles.length; i++) {
                fireEvent('slide', i);
              }
            }
          } else if (state) {
            // Fire for a single handle
            fireEvent('slide', handleNumber);
          }
        }
        // Unbind move events on document, call callbacks.

      function end(event, data) {
          // The handle is no longer active, so remove the class.
          var active = scope_Base.querySelector('.' + cssClasses[15]),
            handleNumber = data.handles[0] === scope_Handles[0] ? 0 : 1;
          if (active !== null) {
            removeClass(active, cssClasses[15]);
          }
          // Remove cursor styles and text-selection events bound to the body.
          if (event.cursor) {
            document.body.style.cursor = '';
            document.body.removeEventListener('selectstart', document.body.noUiListener);
          }
          var d = document.documentElement;
          // Unbind the move and end events, which are added on 'start'.
          d.noUiListeners.forEach(function(c) {
            d.removeEventListener(c[0], c[1]);
          });
          // Remove dragging class.
          removeClass(scope_Target, cssClasses[12]);
          // Fire the change and set events.
          fireEvent('set', handleNumber);
          fireEvent('change', handleNumber);
          // If this is a standard handle movement, fire the end event.
          if (data.handleNumber !== undefined) {
            fireEvent('end', data.handleNumber);
          }
        }
        // Fire 'end' when a mouse or pen leaves the document.

      function documentLeave(event, data) {
          if (event.type === "mouseout" && event.target.nodeName === "HTML" &&
            event.relatedTarget === null) {
            end(event, data);
          }
        }
        // Bind move events on document.

      function start(event, data) {
          var d = document.documentElement;
          // Mark the handle as 'active' so it can be styled.
          if (data.handles.length === 1) {
            addClass(data.handles[0].children[0], cssClasses[15]);
            // Support 'disabled' handles
            if (data.handles[0].hasAttribute('disabled')) {
              return false;
            }
          }
          // Fix #551, where a handle gets selected instead of dragged.
          event.preventDefault();
          // A drag should never propagate up to the 'tap' event.
          event.stopPropagation();
          // Attach the move and end events.
          var moveEvent = attach(actions.move, d, move, {
              start: event.calcPoint,
              baseSize: baseSize(),
              pageOffset: event.pageOffset,
              handles: data.handles,
              handleNumber: data.handleNumber,
              buttonsProperty: event.buttons,
              positions: [
                scope_Locations[0],
                scope_Locations[scope_Handles.length - 1]
              ]
            }),
            endEvent = attach(actions.end, d, end, {
              handles: data.handles,
              handleNumber: data.handleNumber
            });
          var outEvent = attach("mouseout", d, documentLeave, {
            handles: data.handles,
            handleNumber: data.handleNumber
          });
          d.noUiListeners = moveEvent.concat(endEvent, outEvent);
          // Text selection isn't an issue on touch devices,
          // so adding cursor styles can be skipped.
          if (event.cursor) {
            // Prevent the 'I' cursor and extend the range-drag cursor.
            document.body.style.cursor = getComputedStyle(event.target).cursor;
            // Mark the target with a dragging state.
            if (scope_Handles.length > 1) {
              addClass(scope_Target, cssClasses[12]);
            }
            var f = function() {
              return false;
            };
            document.body.noUiListener = f;
            // Prevent text selection when dragging the handles.
            document.body.addEventListener('selectstart', f, false);
          }
          if (data.handleNumber !== undefined) {
            fireEvent('start', data.handleNumber);
          }
        }
        // Move closest handle to tapped location.

      function tap(event) {
          var location = event.calcPoint,
            total = 0,
            handleNumber, to;
          // The tap event shouldn't propagate up and cause 'edge' to run.
          event.stopPropagation();
          // Add up the handle offsets.
          scope_Handles.forEach(function(a) {
            total += offset(a)[options.style];
          });
          // Find the handle closest to the tapped position.
          handleNumber = (location < total / 2 || scope_Handles.length ===
            1) ? 0 : 1;
          // Check if handler is not disablet if yes set number to the next handler
          if (scope_Handles[handleNumber].hasAttribute('disabled')) {
            handleNumber = handleNumber ? 0 : 1;
          }
          location -= offset(scope_Base)[options.style];
          // Calculate the new position.
          to = (location * 100) / baseSize();
          if (!options.events.snap) {
            // Flag the slider as it is now in a transitional state.
            // Transition takes 300 ms, so re-enable the slider afterwards.
            addClassFor(scope_Target, cssClasses[14], 300);
          }
          // Support 'disabled' handles
          if (scope_Handles[handleNumber].hasAttribute('disabled')) {
            return false;
          }
          // Find the closest handle and calculate the tapped point.
          // The set handle to the new position.
          setHandle(scope_Handles[handleNumber], to);
          fireEvent('slide', handleNumber, true);
          fireEvent('set', handleNumber, true);
          fireEvent('change', handleNumber, true);
          if (options.events.snap) {
            start(event, {
              handles: [scope_Handles[handleNumber]]
            });
          }
        }
        // Fires a 'hover' event for a hovered mouse/pen position.

      function hover(event) {
          var location = event.calcPoint - offset(scope_Base)[options.style],
            to = scope_Spectrum.getStep((location * 100) / baseSize()),
            value = scope_Spectrum.fromStepping(to);
          Object.keys(scope_Events).forEach(function(targetEvent) {
            if ('hover' === targetEvent.split('.')[0]) {
              scope_Events[targetEvent].forEach(function(callback) {
                callback.call(scope_Self, value);
              });
            }
          });
        }
        // Attach events to several slider parts.

      function events(behaviour) {
          var i, drag;
          // Attach the standard drag event to the handles.
          if (!behaviour.fixed) {
            for (i = 0; i < scope_Handles.length; i += 1) {
              // These events are only bound to the visual handle
              // element, not the 'real' origin element.
              attach(actions.start, scope_Handles[i].children[0], start, {
                handles: [scope_Handles[i]],
                handleNumber: i
              });
            }
          }
          // Attach the tap event to the slider base.
          if (behaviour.tap) {
            attach(actions.start, scope_Base, tap, {
              handles: scope_Handles
            });
          }
          // Fire hover events
          if (behaviour.hover) {
            attach(actions.move, scope_Base, hover, {
              hover: true
            });
            for (i = 0; i < scope_Handles.length; i += 1) {
              ['mousemove MSPointerMove pointermove'].forEach(function(
                eventName) {
                scope_Handles[i].children[0].addEventListener(eventName,
                  stopPropagation, false);
              });
            }
          }
          // Make the range draggable.
          if (behaviour.drag) {
            drag = [scope_Base.querySelector('.' + cssClasses[7])];
            addClass(drag[0], cssClasses[10]);
            // When the range is fixed, the entire range can
            // be dragged by the handles. The handle in the first
            // origin will propagate the start event upward,
            // but it needs to be bound manually on the other.
            if (behaviour.fixed) {
              drag.push(scope_Handles[(drag[0] === scope_Handles[0] ? 1 : 0)]
                .children[0]);
            }
            drag.forEach(function(element) {
              attach(actions.start, element, start, {
                handles: scope_Handles
              });
            });
          }
        }
        // Test suggested values and apply margin, step.

      function setHandle(handle, to, noLimitOption) {
          var trigger = handle !== scope_Handles[0] ? 1 : 0,
            lowerMargin = scope_Locations[0] + options.margin,
            upperMargin = scope_Locations[1] - options.margin,
            lowerLimit = scope_Locations[0] + options.limit,
            upperLimit = scope_Locations[1] - options.limit;
          // For sliders with multiple handles,
          // limit movement to the other handle.
          // Apply the margin option by adding it to the handle positions.
          if (scope_Handles.length > 1) {
            to = trigger ? Math.max(to, lowerMargin) : Math.min(to,
              upperMargin);
          }
          // The limit option has the opposite effect, limiting handles to a
          // maximum distance from another. Limit must be > 0, as otherwise
          // handles would be unmoveable. 'noLimitOption' is set to 'false'
          // for the .val() method, except for pass 4/4.
          if (noLimitOption !== false && options.limit && scope_Handles.length >
            1) {
            to = trigger ? Math.min(to, lowerLimit) : Math.max(to,
              upperLimit);
          }
          // Handle the step option.
          to = scope_Spectrum.getStep(to);
          // Limit to 0/100 for .val input, trim anything beyond 7 digits, as
          // JavaScript has some issues in its floating point implementation.
          to = limit(parseFloat(to.toFixed(7)));
          // Return false if handle can't move
          if (to === scope_Locations[trigger]) {
            return false;
          }
          // Set the handle to the new position.
          // Use requestAnimationFrame for efficient painting.
          // No significant effect in Chrome, Edge sees dramatic
          // performace improvements.
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(function() {
              handle.style[options.style] = to + '%';
            });
          } else {
            handle.style[options.style] = to + '%';
          }
          // Force proper handle stacking
          if (!handle.previousSibling) {
            removeClass(handle, cssClasses[17]);
            if (to > 50) {
              addClass(handle, cssClasses[17]);
            }
          }
          // Update locations.
          scope_Locations[trigger] = to;
          // Convert the value to the slider stepping/range.
          scope_Values[trigger] = scope_Spectrum.fromStepping(to);
          fireEvent('update', trigger);
          return true;
        }
        // Loop values from value method and apply them.

      function setValues(count, values) {
          var i, trigger, to;
          // With the limit option, we'll need another limiting pass.
          if (options.limit) {
            count += 1;
          }
          // If there are multiple handles to be set run the setting
          // mechanism twice for the first handle, to make sure it
          // can be bounced of the second one properly.
          for (i = 0; i < count; i += 1) {
            trigger = i % 2;
            // Get the current argument from the array.
            to = values[trigger];
            // Setting with null indicates an 'ignore'.
            // Inputting 'false' is invalid.
            if (to !== null && to !== false) {
              // If a formatted number was passed, attemt to decode it.
              if (typeof to === 'number') {
                to = String(to);
              }
              to = options.format.from(to);
              // Request an update for all links if the value was invalid.
              // Do so too if setting the handle fails.
              if (to === false || isNaN(to) || setHandle(scope_Handles[
                trigger], scope_Spectrum.toStepping(to), i === (3 -
                options.dir)) === false) {
                fireEvent('update', trigger);
              }
            }
          }
        }
        // Set the slider value.

      function valueSet(input) {
          var count, values = asArray(input),
            i;
          // The RTL settings is implemented by reversing the front-end,
          // internal mechanisms are the same.
          if (options.dir && options.handles > 1) {
            values.reverse();
          }
          // Animation is optional.
          // Make sure the initial values where set before using animated placement.
          if (options.animate && scope_Locations[0] !== -1) {
            addClassFor(scope_Target, cssClasses[14], 300);
          }
          // Determine how often to set the handles.
          count = scope_Handles.length > 1 ? 3 : 1;
          if (values.length === 1) {
            count = 1;
          }
          setValues(count, values);
          // Fire the 'set' event for both handles.
          for (i = 0; i < scope_Handles.length; i++) {
            // Fire the event only for handles that received a new value, as per #579
            if (values[i] !== null) {
              fireEvent('set', i);
            }
          }
        }
        // Get the slider value.

      function valueGet() {
          var i, retour = [];
          // Get the value from all handles.
          for (i = 0; i < options.handles; i += 1) {
            retour[i] = options.format.to(scope_Values[i]);
          }
          return inSliderOrder(retour);
        }
        // Removes classes from the root and empties it.

      function destroy() {
          cssClasses.forEach(function(cls) {
            if (!cls) {
              return;
            } // Ignore empty classes
            removeClass(scope_Target, cls);
          });
          while (scope_Target.firstChild) {
            scope_Target.removeChild(scope_Target.firstChild);
          }
          delete scope_Target.noUiSlider;
        }
        // Get the current step size for the slider.

      function getCurrentStep() {
          // Check all locations, map them to their stepping point.
          // Get the step point, then find it in the input list.
          var retour = scope_Locations.map(function(location, index) {
            var step = scope_Spectrum.getApplicableStep(location),
              // As per #391, the comparison for the decrement step can have some rounding issues.
              // Round the value to the precision used in the step.
              stepDecimals = countDecimals(String(step[2])),
              // Get the current numeric value
              value = scope_Values[index],
              // To move the slider 'one step up', the current step value needs to be added.
              // Use null if we are at the maximum slider value.
              increment = location === 100 ? null : step[2],
              // Going 'one step down' might put the slider in a different sub-range, so we
              // need to switch between the current or the previous step.
              prev = Number((value - step[2]).toFixed(stepDecimals)),
              // If the value fits the step, return the current step value. Otherwise, use the
              // previous step. Return null if the slider is at its minimum value.
              decrement = location === 0 ? null : (prev >= step[1]) ?
              step[2] : (step[0] || false);
            return [decrement, increment];
          });
          // Return values in the proper order.
          return inSliderOrder(retour);
        }
        // Attach an event to this slider, possibly including a namespace

      function bindEvent(namespacedEvent, callback) {
          scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
          scope_Events[namespacedEvent].push(callback);
          // If the event bound is 'update,' fire it immediately for all handles.
          if (namespacedEvent.split('.')[0] === 'update') {
            scope_Handles.forEach(function(a, index) {
              fireEvent('update', index);
            });
          }
        }
        // Undo attachment of event

      function removeEvent(namespacedEvent) {
          var event = namespacedEvent.split('.')[0],
            namespace = namespacedEvent.substring(event.length);
          Object.keys(scope_Events).forEach(function(bind) {
            var tEvent = bind.split('.')[0],
              tNamespace = bind.substring(tEvent.length);
            if ((!event || event === tEvent) && (!namespace ||
              namespace === tNamespace)) {
              delete scope_Events[bind];
            }
          });
        }
        // Updateable: margin, limit, step, range, animate, snap

      function updateOptions(optionsToUpdate) {
          var v = valueGet(),
            i, newOptions = testOptions({
              start: [0, 0],
              margin: optionsToUpdate.margin,
              limit: optionsToUpdate.limit,
              step: optionsToUpdate.step,
              range: optionsToUpdate.range,
              animate: optionsToUpdate.animate,
              snap: optionsToUpdate.snap === undefined ? options.snap : optionsToUpdate
                .snap
            });
          ['margin', 'limit', 'step', 'range', 'animate'].forEach(function(
            name) {
            if (optionsToUpdate[name] !== undefined) {
              options[name] = optionsToUpdate[name];
            }
          });
          // Save current spectrum direction as testOptions in testRange call
          // doesn't rely on current direction
          newOptions.spectrum.direction = scope_Spectrum.direction;
          scope_Spectrum = newOptions.spectrum;
          // Invalidate the current positioning so valueSet forces an update.
          scope_Locations = [-1, -1];
          valueSet(v);
          for (i = 0; i < scope_Handles.length; i++) {
            fireEvent('update', i);
          }
        }
        // Throw an error if the slider was already initialized.
      if (scope_Target.noUiSlider) {
        throw new Error('Slider was already initialized.');
      }
      // Create the base element, initialise HTML and set classes.
      // Add handles and links.
      scope_Base = addSlider(options.dir, options.ort, scope_Target);
      scope_Handles = addHandles(options.handles, options.dir, scope_Base);
      // Set the connect classes.
      addConnection(options.connect, scope_Target, scope_Handles);
      if (options.pips) {
        pips(options.pips);
      }
      if (options.tooltips) {
        tooltips();
      }
      scope_Self = {
        destroy: destroy,
        steps: getCurrentStep,
        on: bindEvent,
        off: removeEvent,
        get: valueGet,
        set: valueSet,
        updateOptions: updateOptions,
        options: options, // Issue #600
        target: scope_Target, // Issue #597
        pips: pips // Issue #594
      };
      // Attach user events.
      events(options.events);
      return scope_Self;
    }
    // Run the standard initializer

  function initialize(target, originalOptions) {
      if (!target.nodeName) {
        throw new Error('noUiSlider.create requires a single element.');
      }
      // Test the options and create the slider environment;
      var options = testOptions(originalOptions, target),
        slider = closure(target, options);
      // Use the public value method to set the start values.
      slider.set(options.start);
      target.noUiSlider = slider;
      return slider;
    }
    // Use an object instead of a function for future expansibility;
  return {
    create: initialize
  };
}));
// wNumb number formatter: https://refreshless.com/wnumb/
(function() {
  'use strict';
  var
  /** @const */
    FormatOptions = ['decimals', 'thousand', 'mark', 'prefix', 'postfix',
    'encoder', 'decoder', 'negativeBefore', 'negative', 'edit', 'undo'
  ];
  // General
  // Reverse a string
  function strReverse(a) {
      return a.split('').reverse().join('');
    }
    // Check if a string starts with a specified prefix.

  function strStartsWith(input, match) {
      return input.substring(0, match.length) === match;
    }
    // Check is a string ends in a specified postfix.

  function strEndsWith(input, match) {
      return input.slice(-1 * match.length) === match;
    }
    // Throw an error if formatting options are incompatible.

  function throwEqualError(F, a, b) {
      if ((F[a] || F[b]) && (F[a] === F[b])) {
        throw new Error(a);
      }
    }
    // Check if a number is finite and not NaN

  function isValidNumber(input) {
      return typeof input === 'number' && isFinite(input);
    }
    // Provide rounding-accurate toFixed method.

  function toFixed(value, decimals) {
      var scale = Math.pow(10, decimals);
      return (Math.round(value * scale) / scale).toFixed(decimals);
    }
    // Formatting
    // Accept a number as input, output formatted string.

  function formatTo(decimals, thousand, mark, prefix, postfix, encoder,
      decoder, negativeBefore, negative, edit, undo, input) {
      var originalInput = input,
        inputIsNegative, inputPieces, inputBase, inputDecimals = '',
        output = '';
      // Apply user encoder to the input.
      // Expected outcome: number.
      if (encoder) {
        input = encoder(input);
      }
      // Stop if no valid number was provided, the number is infinite or NaN.
      if (!isValidNumber(input)) {
        return false;
      }
      // Rounding away decimals might cause a value of -0
      // when using very small ranges. Remove those cases.
      if (decimals !== false && parseFloat(input.toFixed(decimals)) === 0) {
        input = 0;
      }
      // Formatting is done on absolute numbers,
      // decorated by an optional negative symbol.
      if (input < 0) {
        inputIsNegative = true;
        input = Math.abs(input);
      }
      // Reduce the number of decimals to the specified option.
      if (decimals !== false) {
        input = toFixed(input, decimals);
      }
      // Transform the number into a string, so it can be split.
      input = input.toString();
      // Break the number on the decimal separator.
      if (input.indexOf('.') !== -1) {
        inputPieces = input.split('.');
        inputBase = inputPieces[0];
        if (mark) {
          inputDecimals = mark + inputPieces[1];
        }
      } else {
        // If it isn't split, the entire number will do.
        inputBase = input;
      }
      // Group numbers in sets of three.
      if (thousand) {
        inputBase = strReverse(inputBase).match(/.{1,3}/g);
        inputBase = strReverse(inputBase.join(strReverse(thousand)));
      }
      // If the number is negative, prefix with negation symbol.
      if (inputIsNegative && negativeBefore) {
        output += negativeBefore;
      }
      // Prefix the number
      if (prefix) {
        output += prefix;
      }
      // Normal negative option comes after the prefix. Defaults to '-'.
      if (inputIsNegative && negative) {
        output += negative;
      }
      // Append the actual number.
      output += inputBase;
      output += inputDecimals;
      // Apply the postfix.
      if (postfix) {
        output += postfix;
      }
      // Run the output through a user-specified post-formatter.
      if (edit) {
        output = edit(output, originalInput);
      }
      // All done.
      return output;
    }
    // Accept a sting as input, output decoded number.

  function formatFrom(decimals, thousand, mark, prefix, postfix, encoder,
      decoder, negativeBefore, negative, edit, undo, input) {
      var originalInput = input,
        inputIsNegative, output = '';
      // User defined pre-decoder. Result must be a non empty string.
      if (undo) {
        input = undo(input);
      }
      // Test the input. Can't be empty.
      if (!input || typeof input !== 'string') {
        return false;
      }
      // If the string starts with the negativeBefore value: remove it.
      // Remember is was there, the number is negative.
      if (negativeBefore && strStartsWith(input, negativeBefore)) {
        input = input.replace(negativeBefore, '');
        inputIsNegative = true;
      }
      // Repeat the same procedure for the prefix.
      if (prefix && strStartsWith(input, prefix)) {
        input = input.replace(prefix, '');
      }
      // And again for negative.
      if (negative && strStartsWith(input, negative)) {
        input = input.replace(negative, '');
        inputIsNegative = true;
      }
      // Remove the postfix.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
      if (postfix && strEndsWith(input, postfix)) {
        input = input.slice(0, -1 * postfix.length);
      }
      // Remove the thousand grouping.
      if (thousand) {
        input = input.split(thousand).join('');
      }
      // Set the decimal separator back to period.
      if (mark) {
        input = input.replace(mark, '.');
      }
      // Prepend the negative symbol.
      if (inputIsNegative) {
        output += '-';
      }
      // Add the number
      output += input;
      // Trim all non-numeric characters (allow '.' and '-');
      output = output.replace(/[^0-9\.\-.]/g, '');
      // The value contains no parse-able number.
      if (output === '') {
        return false;
      }
      // Covert to number.
      output = Number(output);
      // Run the user-specified post-decoder.
      if (decoder) {
        output = decoder(output);
      }
      // Check is the output is valid, otherwise: return false.
      if (!isValidNumber(output)) {
        return false;
      }
      return output;
    }
    // Framework
    // Validate formatting options

  function validate(inputOptions) {
      var i, optionName, optionValue,
        filteredOptions = {};
      for (i = 0; i < FormatOptions.length; i += 1) {
        optionName = FormatOptions[i];
        optionValue = inputOptions[optionName];
        if (optionValue === undefined) {
          // Only default if negativeBefore isn't set.
          if (optionName === 'negative' && !filteredOptions.negativeBefore) {
            filteredOptions[optionName] = '-';
            // Don't set a default for mark when 'thousand' is set.
          } else if (optionName === 'mark' && filteredOptions.thousand !==
            '.') {
            filteredOptions[optionName] = '.';
          } else {
            filteredOptions[optionName] = false;
          }
          // Floating points in JS are stable up to 7 decimals.
        } else if (optionName === 'decimals') {
          if (optionValue >= 0 && optionValue < 8) {
            filteredOptions[optionName] = optionValue;
          } else {
            throw new Error(optionName);
          }
          // These options, when provided, must be functions.
        } else if (optionName === 'encoder' || optionName === 'decoder' ||
          optionName === 'edit' || optionName === 'undo') {
          if (typeof optionValue === 'function') {
            filteredOptions[optionName] = optionValue;
          } else {
            throw new Error(optionName);
          }
          // Other options are strings.
        } else {
          if (typeof optionValue === 'string') {
            filteredOptions[optionName] = optionValue;
          } else {
            throw new Error(optionName);
          }
        }
      }
      // Some values can't be extracted from a
      // string if certain combinations are present.
      throwEqualError(filteredOptions, 'mark', 'thousand');
      throwEqualError(filteredOptions, 'prefix', 'negative');
      throwEqualError(filteredOptions, 'prefix', 'negativeBefore');
      return filteredOptions;
    }
    // Pass all options as function arguments

  function passAll(options, method, input) {
      var i, args = [];
      // Add all options in order of FormatOptions
      for (i = 0; i < FormatOptions.length; i += 1) {
        args.push(options[FormatOptions[i]]);
      }
      // Append the input, then call the method, presenting all
      // options as arguments.
      args.push(input);
      return method.apply('', args);
    }
    /** @constructor */

  function wNumb(options) {
      if (!(this instanceof wNumb)) {
        return new wNumb(options);
      }
      if (typeof options !== "object") {
        return;
      }
      options = validate(options);
      // Call 'formatTo' with proper arguments.
      this.to = function(input) {
        return passAll(options, formatTo, input);
      };
      // Call 'formatFrom' with proper arguments.
      this.from = function(input) {
        return passAll(options, formatFrom, input);
      };
    }
    /** @export */
  window.wNumb = wNumb;
}());

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                 ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this,
                numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                    return (val >= 0) && (val < _.slideCount);
                });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                   var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                   if ($('#' + ariaButtonControl).length) {
                     $(this).attr({
                         'aria-describedby': ariaButtonControl
                     });
                   }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });

            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
          if (_.options.focusOnChange) {
            _.$slides.eq(i).attr({'tabindex': '0'});
          } else {
            _.$slides.eq(i).removeAttr('tabindex');
          }
        }

        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {

                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet );

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes );
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet );

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes );
                    }
                }

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                    .removeClass('slick-active')
                    .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));
