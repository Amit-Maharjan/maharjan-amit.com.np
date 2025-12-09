$(document).ready(function () {
    // Toggle mobile menu
    $('#mobile-menu').on('click', function () {
        $(this).toggleClass('open');
        $('#navbar-links').toggleClass('show');
    });

    // Smooth scroll for navigation links
    $('.nav-link').on('click', function (e) {
        const target = $(this).attr('href');
        if (target && target.startsWith('#')) {
            e.preventDefault();
            const $targetEl = $(target);
            if ($targetEl.length) {
                $('html, body').animate(
                    { scrollTop: $targetEl.offset().top - 80 },
                    600
                );
            }
            $('#navbar-links').removeClass('show');
            $('#mobile-menu').removeClass('open');
        }
    });

    // Scrollspy-style active nav + navbar shrink
    const sections = $('section');
    const navLinks = $('.nav-link');

    function onScroll() {
        const scrollPos = $(document).scrollTop();
        const offsetBuffer = 140;

        sections.each(function () {
            const top = $(this).offset().top - offsetBuffer;
            const bottom = top + $(this).outerHeight();
            const id = $(this).attr('id');

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.removeClass('active');
                $('.nav-link[href="#' + id + '"]').addClass('active');
            }
        });

        if (scrollPos > 40) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    }

    $(document).on('scroll', onScroll);
    onScroll();
});
