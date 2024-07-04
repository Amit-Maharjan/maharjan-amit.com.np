$(document).ready(function () {
    // Toggle mobile menu
    $('#mobile-menu').click(function () {
        $(this).toggleClass('open');
        $('#navbar-links').toggleClass('show');
    });

    // Smooth scroll for navigation links
    $('.navbar-links a').click(function (e) {
        e.preventDefault();
        const target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top - 50
        }, 1000);
        $('#navbar-links').removeClass('show');
        $('#mobile-menu').removeClass('open');
    });
});
