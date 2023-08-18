document.addEventListener('alpine:init', () => {
  Alpine.data('SwiperSlider', () => ({
    swiper: null,
    init() {
      this.swiperInit()
    },
    swiperInit () {
      this.swiper = new Swiper(this.$refs.container, {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        },
      })
    }
  })
  )
})
