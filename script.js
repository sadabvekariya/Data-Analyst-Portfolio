document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menu = document.getElementById("menu");

    const nav = document.getElementById("nav");

    const navLinks = document.querySelectorAll("#nav a");

    const topButton = document.getElementById("top");



    /* =====================================================
       OPEN MENU
    ===================================================== */

    function openMenu() {

        nav.classList.add("open");

        menu.classList.add("active");

        document.body.classList.add("menu-open");

        menu.setAttribute(
            "aria-expanded",
            "true"
        );

        menu.setAttribute(
            "aria-label",
            "Close navigation"
        );
    }



    /* =====================================================
       CLOSE MENU
    ===================================================== */

    function closeMenu() {

        nav.classList.remove("open");

        menu.classList.remove("active");

        document.body.classList.remove("menu-open");

        menu.setAttribute(
            "aria-expanded",
            "false"
        );

        menu.setAttribute(
            "aria-label",
            "Open navigation"
        );
    }



    /* =====================================================
       TOGGLE MENU
    ===================================================== */

    function toggleMenu() {

        if (nav.classList.contains("open")) {

            closeMenu();

        } else {

            openMenu();

        }
    }



    menu.addEventListener(
        "click",
        toggleMenu
    );



    /* =====================================================
       CLOSE MENU AFTER CLICK
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                closeMenu();

            }
        );

    });



    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    /* =====================================================
   AT A GLANCE - COUNTER ANIMATION
===================================================== */

const counters = document.querySelectorAll(".counter");

const statsSection = document.querySelector(".stats-section");


function animateCounter(counter) {

    const target = Number(
        counter.getAttribute("data-target")
    );

    const suffix =
        counter.getAttribute("data-suffix") || "";

    const duration = 1600;

    const startTime = performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);


        /*
        Smooth ease-out animation
        */

        const easeOut =
            1 - Math.pow(1 - progress, 3);


        const currentValue =
            Math.floor(target * easeOut);


        counter.textContent =
            currentValue + suffix;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.textContent =
                target + suffix;
        }

    }


    counter.classList.add("counted");

    requestAnimationFrame(
        updateCounter
    );
}


/*
=====================================================
START COUNTERS WHEN SECTION ENTERS VIEW
=====================================================
*/

const statsObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    counters.forEach(
                        (counter, index) => {

                            setTimeout(() => {

                                animateCounter(
                                    counter
                                );

                            }, index * 180);

                        }
                    );


                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.35
        }
    );


if (statsSection) {

    statsObserver.observe(
        statsSection
    );

}



    /* =====================================================
       BACK TO TOP BUTTON
    ===================================================== */

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                topButton.classList.add("show");

            } else {

                topButton.classList.remove("show");

            }

        }
    );



    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );



    /* =====================================================
       RESET MENU ON DESKTOP RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {

                closeMenu();

            }

        }
    );



    /* =====================================================
       EMPTY LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                }
            );

        });


});