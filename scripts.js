$(document).ready(function () {
    const $navLinks = $('.nav-link');
    const sections = Array.from(document.querySelectorAll('section'));
    const NAV_OFFSET = 80; // approximate navbar height

    // helper to set active link by href
    function setActiveByHref(href) {
        $navLinks.removeClass('active');
        $('.nav-link[href="' + href + '"]').addClass('active');
    }

    // ===== Mobile menu toggle =====
    $('#mobile-menu').on('click', function () {
        $(this).toggleClass('open');
        $('#navbar-links').toggleClass('show');
    });

    // ===== Smooth scroll on nav click =====
    $navLinks.on('click', function (e) {
        const target = $(this).attr('href');

        if (target && target.startsWith('#')) {
            e.preventDefault();
            const $targetEl = $(target);

            if ($targetEl.length) {
                const targetTop = $targetEl.offset().top - NAV_OFFSET;

                // set active immediately on click
                setActiveByHref(target);

                $('html, body').stop().animate(
                    { scrollTop: targetTop },
                    500,
                    function () {
                        // ensure correct active after scroll finishes
                        setActiveByHref(target);
                    }
                );
            }

            // close mobile menu on click
            $('#navbar-links').removeClass('show');
            $('#mobile-menu').removeClass('open');
        }
    });

    // ===== Scrollspy: use point inside viewport =====
    function updateActiveNav() {
        const scrollY = window.scrollY || window.pageYOffset;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        // probe line ~1/3 from top of viewport
        const probeY = scrollY + viewportHeight / 3;

        let currentId = null;

        sections.forEach((sec) => {
            const secTop = sec.offsetTop - NAV_OFFSET;
            const secBottom = secTop + sec.offsetHeight;

            if (probeY >= secTop && probeY < secBottom) {
                currentId = sec.id;
            }
        });

        if (currentId) {
            setActiveByHref('#' + currentId);
        }

        // Navbar shrink visual
        if (scrollY > 40) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    }

    // run on scroll and on load
    $(window).on('scroll', updateActiveNav);
    updateActiveNav();
});
