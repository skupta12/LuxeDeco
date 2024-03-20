/*
 * MIGOTHEMES Template Personal Portfolio
 * Created by: MIGOTHEMES
 * Version: 1
 */

/* INDEX OF CONTENTS JAVASCRIPT
==================================================

==================================================
*/

(function ($) {
  "use strict";

  var GOS = {};

  var plugin_path = "src/js/vendor/";
  $.fn.exists = function () {
    return this.length > 0;
  };

  // -----------------------
  // Owl Carousel
  // -----------------------

  GOS.Swiper = function () {
    var owlCarousel = $(".owl-carousel");
    if (owlCarousel.length > 0) {
      loadScript(plugin_path + "owl-carousel/owl.carousel.min.js", function () {
          owlCarousel.each(function () {
            var $this = $(this),
            $items = $this.data("items") ? $this.data("items") : 1,
            $loop = $this.attr("data-loop") ? $this.data("loop") : true,
            $navdots = $this.data("nav-dots") ? $this.data("nav-dots") : false,
            $navarrow = $this.data("nav-arrow") ? $this.data("nav-arrow") : false,
            $autoplay = $this.attr("data-autoplay") ? $this.data("autoplay") : true,
            $autospeed = $this.attr("data-autospeed") ? $this.data("autospeed") : 5000,
            $smartspeed = $this.attr("data-smartspeed") ? $this.data("smartspeed") : 1000,
            $autohgt = $this.data("autoheight") ? $this.data("autoheight") : false,
            $CenterSlider = $this.data("center") ? $this.data("center") : false,
            $space = $this.attr("data-space") ? $this.data("space") : 30;

            $(this).owlCarousel({
              loop: $loop,
              items: $items,
              responsive: {
                0: {
                  items: $this.data("xs-items") ? $this.data("xs-items") : 1,
                },
                640: {
                  items: $this.data("sm-items") ? $this.data("sm-items") : 1,
                },
                768: {
                  items: $this.data("md-items") ? $this.data("md-items") : 1,
                },
                1024: {
                  items: $this.data("lg-items") ? $this.data("lg-items") : 1,
                },
                1200: { items: $items },
              },

              dots: $navdots,
              autoplayTimeout: $autospeed,
              smartSpeed: $smartspeed,
              autoHeight: $autohgt,
              center: $CenterSlider,
              margin: $space,
              nav: $navarrow,
              autoplay: $autoplay,
              autoplayHoverPause: true,
            });
          });
        }
      );
    }
  };


   // -----------------------
  // Magnific Popup
  // -----------------------

  GOS.Gallery = function () {
    if ($(".lightbox-gallery").length > 0 || $(".popup-youtube, .popup-vimeo, .popup-gmaps").length > 0) {
      loadScript(plugin_path + "magnific/magnific-popup.min.js", function () {
          $(".lightbox-gallery").magnificPopup({
            delegate: ".gallery-link",
            // type: 'inline',
            // tLoading: "Loading image #%curr%...",
            mainClass: "mfp-fade",
            fixedContentPos: true,
            closeBtnInside: true,
            fixedBgPos: true,
            // removalDelay: 400,
            callbacks: {
              beforeOpen: function () {
                this.st.image.markup = this.st.image.markup.replace(
                  "mfp-figure",
                  "mfp-figure mfp-with-anim"
                );
                this.st.mainClass = this.st.el.attr("data-effect");
              },
            },
            // gallery: {
            //   enabled: true,
            //   preload: [0, 2],
            //   closeOnBgClick: true,
            //   navigateByImgClick: true,
            // },
          });
      });
    }
  };


  // -----------------------
  // Menu toggle
  // -----------------------

  const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
      for (let i = 0; i < elem.length; i++) {
        elem[i].addEventListener(type, callback);
      }
    } else {
      elem.addEventListener(type, callback);
    }
  }

  GOS.Menu_toggle = function () {
    const navbar = document.querySelector("[data-navbar]");
    const navTogglers = document.querySelectorAll("[data-nav-toggler]");
    const navLinks = document.querySelectorAll("[data-nav-link]");
    const overlay = document.querySelector("[data-overlay]");

    const toggleNavbar = function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    };

    addEventOnElem(navTogglers, "click", toggleNavbar);

    const closeNavbar = function () {
      navbar.classList.remove("active");
      overlay.classList.remove("active");
    };

    addEventOnElem(navLinks, "click", closeNavbar);

  };

  GOS.Header_change = function () {
    var header = $(".primary-header");

    if ($(window).scrollTop() >= 80) {
      header.addClass("header-onscroll");
    } else {
      header.removeClass("header-onscroll");
    }
  };
 
  // -----------------------
  // Counter
  // -----------------------

  GOS.Counter = function () {
    var counter = $(".counter");
    if (counter.length > 0) {
      counter.appear(function () {
          $(this).each(function () {
            $(this).prop("Counter", 0).animate({ Counter: $(this).text() },
                {
                  duration: 2000,
                  easing: "swing",
                  step: function (e) {
                    $(this).text(Math.ceil(e));
                  },
                }
              );
          });
        },
        {
          accX: 0,
          accY: -10,
        }
      );
    }
  };

  // -----------------------
  // Accordion
  // -----------------------

  GOS.Accordion = function () {
    const accordionBox = document.querySelector(".accordion-box");
  
    function toggleAccordion(event) {
      const header = event.target.closest(".accordion-header");
      if (!header) return;
  
      const accordion = header.parentElement;
      const body = header.nextElementSibling;
  
      accordion.classList.toggle("active");
  
      const maxHeight = accordion.classList.contains("active") ? `${body.scrollHeight}px` : 0;
      body.style.maxHeight = maxHeight;
  
      const iconButton = header.querySelector(".accordion-icon");
      if (iconButton) {
        iconButton.classList.toggle("active");
      }
    }
    accordionBox.addEventListener("click", toggleAccordion);
  };


  // -----------------------
  // Infinitive Scroller
  // -----------------------

  GOS.Scroller = function () {
    const scrollers = document.querySelectorAll(".scroller-box");

    // If a user hasn't opted in for recuded motion, then we add the animation
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller-list");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  };

   // -----------------------
  // ByteMuse Scroll it
  // -----------------------

  GOS.Scroll_it = function () {
    
    var $scrollIt = $(".scroll-it");
    if ($scrollIt.length > 0) {
      $scrollIt.each(function () {
        $.scrollIt({
          upKey: 38, // key code to navigate to the next section
          downKey: 40, // key code to navigate to the previous section
          easing: "linear", // the easing function for animation
          scrollTime: 600, // how long (in ms) the animation takes
          activeClass: "active", // class given to the active nav element
          onPageChange: null, // function(pageIndex) that is called when page is changed
          topOffset: -70 // offste (in px) for fixed top navigation
        });
      });
    }
  };


  // -----------------------
  // Isotope 
  // -----------------------

  GOS.Masonry = function () {
    var listing = $(".masonry-listing");
  
    if (listing.exists()) {
      loadScript(plugin_path + "isotope/jquery.isotope.min.js", function () {
        listing.isotope({
          itemSelector: ".masonry-item",
          layoutMode: "fitRows",
        });
        // layout Isotope after each image loads
        imagesLoaded(listing).on('progress', function () {
          listing.isotope('layout');
        });
        // bind filter button click
        $("#filters").on("click", "button", function () {
          $("#filters button").removeClass("is-checked");
          $(this).addClass("is-checked");
  
          var filterValue = $(this).attr("data-filter");
          listing.isotope({ filter: filterValue });
        });
      });
    }
  };
  
  // -----------------------
  // Scroll to top
  // -----------------------

  GOS.ScrolltoTop = function() {

    var scrollToTopButton = $(".scroll-to-top");

    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 500) {
        scrollToTopButton.fadeIn();
      } else {
        scrollToTopButton.fadeOut();
      }
    });
  }

  $(document).ready(function () {
    GOS.Scroll_it();
    GOS.Menu_toggle();
    GOS.ScrolltoTop();
    GOS.Counter();
    GOS.Scroller(); 
    GOS.Masonry();
    GOS.Header_change();
    GOS.Gallery();
    GOS.Swiper(); 
    GOS.Accordion();
  });

  $(window).on("scroll", function () {
    GOS.Header_change();
  });

  $(window).on("load", function () {
    $("#preloader").delay(600).fadeOut("slow");
  });

  // Window on Resize
  $(window).on("resize", function () {});

  var _arr = {};

  function loadScript(scriptName, callback) {
    if (!_arr[scriptName]) {
      _arr[scriptName] = true;
      var body = document.getElementsByTagName("body")[0];
      var script = document.createElement("script");
      script.src = scriptName;
      script.onload = callback;
      body.appendChild(script);
    } else if (callback) {
      callback();
    }
  }

})(jQuery);
