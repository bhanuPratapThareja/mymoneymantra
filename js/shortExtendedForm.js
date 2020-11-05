$(".shortforms-container-buttons #next").click(function () {
    plusSlides(1);
})
$(".shortforms-container-buttons #previous").click(function () {
    plusSlides(-1);
})
//short forms slider
var slideIndex = 1;
showSlides(slideIndex);
// Next/previous control
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("sf-forms");
    if (n >= slides.length) {
        $("#button-text").text("Submit and view offers").css("color", "#89C142");
        $("#next").addClass("submit-short-form");

    } else {
        $("#button-text").text("Next").css("color", "#221F1F");
        $("#next").removeClass("submit-short-form");
    }
    if (n > slides.length) {
        //code of submission of form when the slides are above the number of forms

        // slides[i].style.display = "block";
        document.getElementsByClassName("submit-short-form").addEventListener("click", myFunction());
        function myFunction() {
            // window.location.href="#";
            location.reload();
        }
    }
    if (n < 1) {
        slideIndex = slides.length;
        $(".lets-find-forms-container").removeClass("moving-in")
        $(".lets-find").removeClass("moving-out")
        $(".lets-find-forms-container").addClass("moving-in-rev")
        $(".lets-find").addClass("moving-out-rev")
        $("#button-text").text("Next")
        $("#next").removeClass("submit-short-form");
        slideIndex = 1;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.add("opacity-in")
    var width = (slideIndex * (100 / slides.length)) + "%";
    console.log(width)
    $("#pages-count").text(slideIndex + " of " + slides.length);
    $(".progress-blue").width(width);
}
