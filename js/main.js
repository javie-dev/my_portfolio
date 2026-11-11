 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();



   // Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#ftco-nav').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

			
			
		});

	};
	burgerMenu();


	var onePageClick = function() {


		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
	    event.preventDefault();

	    var href = $.attr(this, 'href');

	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top - 70
	    }, 500, function() {
	    	// window.location.hash = href;
	    });
		});

	};

	onePageClick();
	

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
	};
	carousel();

	var projectsCarousel = document.querySelector('#projects-carousel');
	if (projectsCarousel) {
		var projectsTrack = projectsCarousel.querySelector('.projects-carousel__track');
		var previousProjects = document.querySelector('.projects-carousel__previous');
		var nextProjects = document.querySelector('.projects-carousel__next');
		var updateProjectControls = function() {
			var maxScroll = projectsCarousel.scrollWidth - projectsCarousel.clientWidth;
			previousProjects.disabled = projectsCarousel.scrollLeft <= 1;
			nextProjects.disabled = projectsCarousel.scrollLeft >= maxScroll - 1;
		};
		var scrollProjects = function(direction) {
			var firstCard = projectsTrack.querySelector('.project-card');
			if (!firstCard) {
				return;
			}
			var trackStyles = window.getComputedStyle(projectsTrack);
			var gap = parseFloat(trackStyles.columnGap) || 0;
			var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			projectsCarousel.scrollBy({
				left: direction * (firstCard.getBoundingClientRect().width + gap),
				behavior: reducedMotion ? 'auto' : 'smooth'
			});
		};

		previousProjects.addEventListener('click', function() {
			scrollProjects(-1);
		});
		nextProjects.addEventListener('click', function() {
			scrollProjects(1);
		});
		projectsCarousel.addEventListener('scroll', updateProjectControls, { passive: true });
		window.addEventListener('resize', updateProjectControls);

		var pointerDown = false;
		var dragged = false;
		var suppressClick = false;
		var pointerStartX = 0;
		var scrollStart = 0;

		projectsCarousel.addEventListener('pointerdown', function(event) {
			if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('a, button')) {
				return;
			}
			pointerDown = true;
			dragged = false;
			pointerStartX = event.clientX;
			scrollStart = projectsCarousel.scrollLeft;
			projectsCarousel.classList.add('is-dragging');
			projectsCarousel.setPointerCapture(event.pointerId);
			event.preventDefault();
		});
		projectsCarousel.addEventListener('pointermove', function(event) {
			if (!pointerDown) {
				return;
			}
			var distance = event.clientX - pointerStartX;
			if (Math.abs(distance) > 3) {
				dragged = true;
			}
			projectsCarousel.scrollLeft = scrollStart - distance;
		});
		var endProjectDrag = function(event) {
			if (!pointerDown) {
				return;
			}
			pointerDown = false;
			projectsCarousel.classList.remove('is-dragging');
			if (projectsCarousel.hasPointerCapture(event.pointerId)) {
				projectsCarousel.releasePointerCapture(event.pointerId);
			}
			if (dragged) {
				suppressClick = true;
				window.setTimeout(function() {
					suppressClick = false;
				}, 0);
			}
		};
		projectsCarousel.addEventListener('pointerup', endProjectDrag);
		projectsCarousel.addEventListener('pointercancel', endProjectDrag);
		projectsCarousel.addEventListener('click', function(event) {
			if (suppressClick) {
				event.preventDefault();
				event.stopPropagation();
				suppressClick = false;
			}
		}, true);

		updateProjectControls();
	}

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	

	var counter = function() {
		
		$('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	var skillsSection = document.getElementById('skills-section');
	if (skillsSection) {
		var skillMeters = skillsSection.querySelectorAll('[data-skill-level]');
		skillMeters.forEach(function(meter) {
			var requestedLevel = Number(meter.getAttribute('data-skill-level'));
			var level = Number.isFinite(requestedLevel) ? Math.max(0, Math.min(100, requestedLevel)) : 0;
			var percentage = meter.parentNode.querySelector('.skill-percentage');

			meter.setAttribute('aria-valuenow', level);
			meter.style.setProperty('--skill-level', level + '%');
			if (percentage) {
				percentage.textContent = level + '%';
			}
		});

		if ('IntersectionObserver' in window) {
			var skillsObserver = new IntersectionObserver(function(entries, observer) {
				if (entries.some(function(entry) { return entry.isIntersecting; })) {
					skillsSection.classList.add('skills-visible');
					observer.disconnect();
				}
			}, { threshold: 0.1 });
			skillsObserver.observe(skillsSection.querySelector('.programming-skill-grid') || skillsSection);
		} else {
			skillsSection.classList.add('skills-visible');
		}
	}

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });





})(jQuery);
