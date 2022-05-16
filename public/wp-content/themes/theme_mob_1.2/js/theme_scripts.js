jQuery(document).ready(function(jQuery){
    
    function handleFirstTab(e) {
        if (e.keyCode === 9) { // the "I am a keyboard user" key
            document.body.classList.add('user-is-tabbing');
            $('#header').addClass('forceopaque');
            window.removeEventListener('keydown', handleFirstTab);
        }
    }
    
    window.addEventListener('keydown', handleFirstTab);

   // -----------------------------------------------------------------
   // Make greensock and smooth scroll work together
   // -----------------------------------------------------------------
   gsap.registerPlugin(ScrollTrigger);

   // Setup
   const scroller = document.getElementById("wrapper");
   const bodyScrollBar = Scrollbar.init(scroller, { damping: 0.1, delegateTo: document, alwaysShowTracks: true });
   ScrollTrigger.scrollerProxy("#wrapper", {
     scrollTop: function(value) {
       if (arguments.length) {
         bodyScrollBar.scrollTop = value;
       }
       return bodyScrollBar.scrollTop;
     }
   });

   bodyScrollBar.addListener(ScrollTrigger.update);
   ScrollTrigger.defaults({ scroller: scroller });


   

   // -----------------------------------------------------------------
   // Greensock - Timelines and scroll trigger pairs
   // -----------------------------------------------------------------

    // sticky header ----------------------------------------------
    const headerTimeline = gsap.timeline({duration: 1, delay: 0, ease: "Power3.easeInOut", paused: true})
    headerTimeline
    .to("#header", {yPercent: -100})

    var prevOffset = 0;
    var currentOffset = 0;
    var prevDirection = '';
    var currentDirection = '';
    bodyScrollBar.addListener(function(status) {
         currentOffset = status.offset.y;
 
         if (currentOffset > prevOffset) {
            currentDirection = 'down';
            if (prevDirection = 'up') {
                headerTimeline.play();
                jQuery('#header').removeClass('forceopaque');
            }
         } else if ( currentOffset < prevOffset) {
            currentDirection = 'up';
            if (prevDirection = 'down') {
                headerTimeline.reverse();
                jQuery('#header').addClass('forceopaque');
            }
         }
         prevDirection = currentDirection;
         prevOffset = currentOffset;
 
         
         
     });





   // layer hero timeline ----------------------------------------------
   const heroTimeline = gsap.timeline({duration: .4, ease: "Power4.out", paused: true})
   heroTimeline
   .to(".layer-hero img", {opacity: 1,  duration: 1, stagger: 0.05})

   .from([".siteLogo.mask","#header nav > ul > li > a","#payBillButton","#searchButton", "#menuButton"], {yPercent:0, opacity: 0, duration: 0.25, stagger: 0.025},"-=1")

   .from(".layer-hero #split-me span", {yPercent:150, duration: 0.5},"-=0.5")
   .from(".layer-hero .mask .text", {yPercent:100, duration: 0.8, stagger: 0.25},"-=0.35")
   .from(".layer-hero .mask .button", {opacity: 0},"-=0.25")

   heroTimeline.play();


   // layer three-col ----------------------------------------------
   const threecolTimeline = gsap.timeline({duration: .2, ease: "Power3.out", paused: true})
   threecolTimeline
   .from(".layer-three-col .three-col .col", {opacity: 0, stagger: 0.15})
    ScrollTrigger.create({
    trigger: ".layer-three-col",
    // markers: true,
    start: "top center+=250",
    animation: threecolTimeline
    });

   // layer strip ----------------------------------------------
   /*
   const stripParallax = gsap.timeline({paused: true})
   stripParallax
   .fromTo(".layer-image-strip img", {top: "30%"}, {top: "70%" })
   ScrollTrigger.create({
   trigger: ".layer-image-strip",
   animation: stripParallax,
   //markers: true,
   start: "top bottom",
   end: "bottom top-=100",
   scrub: 0
   });
   */

   // layer three-col ----------------------------------------------
   const testimonialTimeline = gsap.timeline({duration: .15, ease: "Power3.out", paused: true})
   testimonialTimeline
   .from(".testimonial p", {y: 30, opacity: 0, stagger: 0.10})
   ScrollTrigger.create({
   trigger: ".layer-testimonials",
   animation: testimonialTimeline,
   //markers: true,
   start: "top center+=250"
   });

   // layer three-col ----------------------------------------------
   const newsTimeline = gsap.timeline({duration: .2, ease: "Power3.out", paused: true})
   newsTimeline
   .from([".story"], {yPercent: 10, opacity: 0, stagger: 0.15})
   ScrollTrigger.create({
    trigger: ".layer-news",
   animation: newsTimeline,
   //markers: true,
   start: "top center+=250"
   });

   // find a lawyer ----------------------------------------------
   const findTimeline = gsap.timeline({duration: .1, ease: "Power3.out", paused: true})
   findTimeline
   .from(".layer-find-a-lawyer .mask .text", {yPercent: 100, opacity: 0},"-=0.15")
   .from(".layer-find-a-lawyer p", {yPercent: 100, opacity: 0},"-=0.15")
   .from(".layer-find-a-lawyer img", {y: 30, opacity: 0},"-=0.15")
   //.from(".layer-find-a-lawyer .mask .text em", {yPercent: 100, opacity: 0},"-=0.15")
   .from(".layer-find-a-lawyer .button", {yPercent: 100, opacity: 0},"-=0.30")
   
   ScrollTrigger.create({
   trigger: ".layer-find-a-lawyer",
   animation: findTimeline,
   //markers: true,
   start: "top center+=250"
   });

   // -----------------------------------------------------------------
// services-page url hash
// -----------------------------------------------------------------

const params = new URLSearchParams(window.location.search);

if (params.has('type')) {
    hash = params.get('type');
    
    console.log(hash);

    if ( hash == 'practice-areas') {

        $('#practice-areas .where-to-next a').removeAttr("tabindex");
        $('#industries .where-to-next a').attr('tabindex', '-1');

        $('#practice-areas .header').removeAttr("tabindex");
        $('#industries .header').attr('tabindex', '-1');

        // scrolling is tightly integrated with smooth scroll!
        setTimeout(function(){ 
            var childPos = $('#layer-services-header').offset();
            var parentPos = $('#layer-services-header').parent().offset();
            var childOffset = childPos.top - parentPos.top -120;
            bodyScrollBar.scrollTo(0, childOffset -100, 1500, { });
        }, 1000);
        

    } else if (hash == 'industries') {

        $('#practice-areas .where-to-next a').attr('tabindex', '-1');
        $('#industries .where-to-next a').removeAttr("tabindex");

        $('#practice-areas .header').attr('tabindex', '-1');
        $('#industries .header').removeAttr("tabindex");

        jQuery('#practice-area-control').removeClass('active');
        jQuery('#practice-area-control').addClass('inactive');

        jQuery('#industries-control').removeClass('inactive');
        jQuery('#industries-control').addClass('active');

        jQuery('#industries').addClass('active');
        jQuery('#industries').removeClass('inactive');

        jQuery('#practice-areas').addClass('inactive');
        jQuery('#practice-areas').removeClass('active');

        // scrolling is tightly integrated with smooth scroll!
        setTimeout(function(){ 
            var childPos = $('#layer-services-header').offset();
            var parentPos = $('#layer-services-header').parent().offset();
            var childOffset = childPos.top - parentPos.top -120;
            bodyScrollBar.scrollTo(0, childOffset -100, 1500,   { });
        }, 1000);

    }
}

    // -----------------------------------------------------------------
    // simpleexpand - people section accordions
    // -----------------------------------------------------------------
    $('.expander').simpleexpand();

    // -----------------------------------------------------------------
    // isotope - people filter/search mechanism
    // -----------------------------------------------------------------

    // isotope - quick search value
    var qsRegex;

    // isotope - initialize
    var $grid = $('.lawyers-isotope').isotope({
        hiddenStyle: {
        opacity: 0
        },
        visibleStyle: {
        opacity: 1
        },
        itemSelector: '.lawyer-tile',
        layoutMode: 'fitRows',
        filter: function() {
            console.log($(this).text().match( qsRegex ));
          return qsRegex ? $(this).text().match( qsRegex ) : true;
        }
    });

    // isotope - page loads prefiltered to lawyer-status people
    $grid.isotope({ filter: '.lawyer, .partner, .managing-partner, .counsel, .senior-counsel, .articling-student' });

    // isotope - filter items on button click
    $('.people-types').on( 'click', 'button', function() {
        $('.people-types button').removeClass('active');
        $(this).addClass('active');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });

        var  practiceAreaSelectState = $(this).attr('data-target-class');
        $('#staffNav-practice').removeClass('inactive');
        $('#staffNav-practice').addClass(practiceAreaSelectState);
         
    });


    // isotope - filter items on practice-area slect
    $('#practiceAreaSelect').on( 'change',  function() {
        // var filterValue = $(this).attr('data-filter');
        var filterValue = this.value;
        // use filterFn if matches value
        // filterValue = filterFns[ filterValue ] || filterValue;
        $grid.isotope({ filter: filterValue });

        $('#staffNav-practice').removeClass('inactive');
        $('.people-types button').removeClass('active');
        $('.people-types button').removeClass('inactive');
        $('#ptLawyers').addClass('active');
    });

    // isotope - filter items via search field
    var $quicksearch = $('#quicksearch').keyup( debounce( searchFilter ) );
    function searchFilter() {
        qsRegex = new RegExp( $quicksearch.val(), 'gi' );
        $grid.isotope({
            filter: function() {
            return qsRegex ? $(this).text().match( qsRegex ) : true;
            }
        });
    }

    // isotope - search filter function
    function searchFilter() {
        qsRegex = new RegExp( $quicksearch.val(), 'gi' );
        $grid.isotope({
          filter: function() {
           return qsRegex ? $(this).text().match( qsRegex ) : true;
          }
        });
    }

    // isotope - debounce, limit search refresh rate
    function debounce( fn, threshold ) {
        var timeout;
        threshold = threshold || 100;
        return function debounced() {
            clearTimeout( timeout );
            var args = arguments;
            var _this = this;
            function delayed() {
            fn.apply( _this, args );
            }
            timeout = setTimeout( delayed, threshold );
        };
    }

    // -----------------------------------------------------------------
    // isotope - search 
    // -----------------------------------------------------------------

    // isotope - initialize
    var $grid2 = $('.search-isotope').isotope({
        hiddenStyle: {
        opacity: 0,
        transform: 'scaley(0.001)'
        },
        visibleStyle: {
        opacity: 1,
        transform: 'scaley(1)'
        },
        itemSelector: '.search-tile-wrap',
        layoutMode: 'fitRows'
    });

    $('#search-types').on( 'click', 'button', function() {
        $('#search-types button').removeClass('active'); 
        $(this).addClass('active');
        var filterValue = $(this).attr('data-filter');
        $grid2.isotope({ filter: filterValue });
    });


    // -----------------------------------------------------------------
    // slick.js - lawyers
    // -----------------------------------------------------------------
    $('.laywer-slideshow').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    });

    // -----------------------------------------------------------------
    // slick.js - testimonials
    // -----------------------------------------------------------------
    $('.testimonials').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,        
        responsive: [
          {
            breakpoint: 1024,
            settings: {
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1
            }
          },
          {
            breakpoint: 550,
            settings: {
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
    });

    // -----------------------------------------------------------------
    // mobile menu
    // -----------------------------------------------------------------
    function toggle_mobilemenu() {
        if (jQuery('body').hasClass('expand')) {
            jQuery('body').removeClass('expand');
        } else {
            jQuery('body').addClass('expand');
        }
    }

    jQuery('#menuButton').click(function(e) {
        toggle_mobilemenu();
        $('#message-bar').toggle();
        e.preventDefault();
        setTimeout(function(){ 
        $('#menu-item-204 a').focus();
        }, 100); 
        
    }); 

    jQuery('#searchButton').click(function() {
        if (jQuery('#header').hasClass('show-search')) {
            jQuery('#s').blur();
            jQuery('#header').removeClass('show-search');
        } else {
            jQuery('#header').addClass('show-search');
            setTimeout(function(){ 
                jQuery('#s').focus();
             }, 100);    
        }
    }); 
    jQuery('#searchagain').click(function() {
        if (jQuery('#header').hasClass('show-search')) {
            jQuery('#s').blur();
            jQuery('#header').removeClass('show-search');
        } else {
            jQuery('#header').addClass('show-search');
            setTimeout(function(){ 
                jQuery('#s').focus();
             }, 100);    
        }
    });
    jQuery('#transcript-link').click(function() {
        jQuery('#layer-transcript').addClass('show');
        jQuery('#transcript-link').removeClass('show');
        
        var childPosSearch = $('#layer-transcript').offset();
        var parentPosSearch = $('#layer-transcript').parent().offset();
        var childOffsetSearch = childPosSearch.top - parentPosSearch.top;
        bodyScrollBar.scrollTo(0, childOffsetSearch -100, 1000, {
            // easing: easing.easeInOutCubic
        });
    });

    jQuery('#transcript-close').click(function() {
        jQuery('#layer-transcript').removeClass('show');
        jQuery('#transcript-link').addClass('show');
    
    });
    // -----------------------------------------------------------------
    // mobile menu dano
    // -----------------------------------------------------------------

    //mobile nav expanders
    $('#menu-main-menu > li.menu-item-has-children').append("<span class='showChildren'>&nbsp;</span>");
    $('#menu-main-menu > li.menu-item-has-children .sub-menu').append("<span class='exitSubMenu'>&nbsp;</span>");


	$('#menu-main-menu > li.menu-item-has-children .exitSubMenu').click(function() {
        $('#header nav').removeClass('opendrawer');
		$(this).parent().toggleClass("show");
    });



    
	$('#menu-main-menu > li.menu-item-has-children .showChildren').click(function() {
        if ($('#header nav').hasClass('opendrawer')) {
            $('#header nav').removeClass('opendrawer');
        } else {
            $('#header nav').addClass('opendrawer');
        }

        if ($(this).hasClass('show')) {
            $(this).removeClass('show');
        } else {
            $(this).addClass('show');
        }
		
		$(this).siblings('ul').toggleClass("show");
    });
    
    $('#menu-main-menu > li > a').focus(function(){
        $(this).parent().parent().children('li').removeClass('accessible-focus');
    });
    $('#menu-main-menu > li.menu-item-has-children > a').focus(function(){
        $(this).parent().parent().children('li').removeClass('accessible-focus');
        $(this).parent().addClass('accessible-focus');
    });
    $('#payBillButton').focus(function(){
        $('#menu-main-menu .accessible-focus').removeClass('accessible-focus');
    }); 


    // -----------------------------------------------------------------
    // practice area and industry toggles
    // -----------------------------------------------------------------
    $('#practice-area-control').click(function(e) {
        console.log('clicked');
        e.preventDefault();
        
        if ($('#practice-area-control').hasClass('active') ) {
            /*
            $('#practice-areas .header').attr('tabindex', '-1');
            $('#industries .header').removeAttr("tabindex");

            $('#practice-area-control').removeClass('active');
            $('#practice-area-control').addClass('inactive');

            $('#industries-control').addClass('active');
            $('#industries-control').removeClass('inactive');
            */
        } else {

            params.set('type', 'practice-areas');
            // window.history.replaceState({}, '', `${location.pathname}?${params}`)

            $('#practice-areas .where-to-next a').removeAttr("tabindex");
            $('#industries .where-to-next a').attr('tabindex', '-1');

            $('#practice-areas .header').removeAttr("tabindex");
            $('#industries .header').attr('tabindex', '-1');

            $('#practice-area-control').addClass('active');
            $('#practice-area-control').removeClass('inactive');

            $('#industries-control').removeClass('active');
            $('#industries-control').addClass('inactive');

            $('#practice-areas').removeClass('inactive');
            $('#practice-areas').addClass('active');

            $('#industries').addClass('inactive');
            $('#industries').removeClass('active');
        }
    }); 

    $('#industries-control').click(function(e) {
        console.log('clicked');
        e.preventDefault();
        if ($('#industries-control').hasClass('active') ) {
            /*
            $('#industries .header').attr('tabindex', '-1');
            $('#practice-areas .header').removeAttr("tabindex");

            $('#industries-control').removeClass('active');
            $('#industries-control').addClass('inactive');
            $('#practice-area-control').addClass('active');
            $('#practice-area-control').removeClass('inactive'); 
            */
        } else {

            params.set('type', 'industries');
            // window.history.replaceState({}, '', `${location.pathname}?${params}`)

            $('#practice-areas .where-to-next a').attr('tabindex', '-1');
            $('#industries .where-to-next a').removeAttr("tabindex");


            $('#industries .header').removeAttr("tabindex");
            $('#practice-areas .header').attr('tabindex', '-1');

            $('#industries-control').addClass('active');
            $('#industries-control').removeClass('inactive');

            $('#practice-area-control').removeClass('active');
            $('#practice-area-control').addClass('inactive');

            $('#industries').addClass('active');
            $('#industries').removeClass('inactive');

            $('#practice-areas').addClass('inactive');
            $('#practice-areas').removeClass('active');
        }
    }); 

    

});