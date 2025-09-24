'use strict'

//------------Slider------------------
// Selectors
//------------Slider------------------

// Selectors
const sliders = function () {
  const slides = document.querySelectorAll('.slide');
  let curSlide = 0;
  const maxSlide = slides.length; // Length of the slides nodelist
  const dotContainer = document.querySelector('.dots'); // Dots
  // const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  // slider.style.transform = 'scale(0.6)';
  // slider.style.overflow = 'visible';

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      // Create as much dots as there is .slide elements
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>` // Create a dot button for each slide element
      );
    });
  };

  //The active dot will appear as dark grey
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  // Function that shows the asked slide
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  goToSlide(0);
  // Show next slide, alson check if the next slide exist, if not, begin from the start.
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();
  //Event handlers
  //Next slide
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide(); //Short circuiting, return last value when
    //all elements are true
  });

  //Event listener for dots using parent delegation (event attached to the parent)
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset; //Destructuring object
      console.log(e.target.dataset);
      console.log(slide);
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
sliders();