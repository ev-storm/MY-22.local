var uslugiSwiper = new Swiper(".uslugi-swiper", {
  direction: "vertical",
  autoplay: {
    delay: 2500,
  },
  mousewheel: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiperBrend = new Swiper(".swiper-brend", {
  slidesPerView: 5,
  loop: true,
  spaceBetween: 30,
  autoplay: {
    delay: 2000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
