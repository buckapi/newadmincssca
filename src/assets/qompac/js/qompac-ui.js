document.addEventListener('alpine:init', () => {

  /**************** Core Elements Start Here ************************/
  // Offcanvas Functions
  Alpine.data('offcanvas', () => ({
    open: false,
    position: 'start',
    positions() {
      switch (this.position) {
        case 'start':
          return {
            ['class']: 'left-0',
            ['x-transition:enter']: 'transform transition-transform duration-700',
            ['x-transition:enter-start']: "-translate-x-full",
            ['x-transition:enter-end']: "-translate-x-0",
            ['x-transition:leave']: 'transform transition-transform duration-700',
            ['x-transition:leave-start']: "-translate-x-0",
            ['x-transition:leave-end']: "-translate-x-full",
          }
          break;
        case 'end':
          return {
            ['class']: 'right-0',
            ['x-transition:enter']: 'transform transition-transform duration-700',
            ['x-transition:enter-start']: "translate-x-full",
            ['x-transition:enter-end']: "translate-x-0",
            ['x-transition:leave']: 'transform transition-transform duration-700',
            ['x-transition:leave-start']: "translate-x-0",
            ['x-transition:leave-end']: "translate-x-full",
          }
          break;
        case 'top':

          break;
        case 'bottom':

          break;
      }
    },
    toggle() {
      this.open = !this.open
    },
    checkPosition() {
      setTimeout(() => {
        this.position = this.position == 'end' ? 'start' : 'end'
      }, 500)
    }
  }))

  // Tabpen Functions
  Alpine.data('tabpan', () => ({
    selected: '',
    type: '',
    tabActiveClass: 'bg-primary-500 text-white',
    tabClass: 'text-primary-500',
    checkTabclass(value) {
      switch (this.type) {
        case 'bordered-tab':
          this.tabActiveClass = 'border-primary-500  text-primary-500 ',
            this.tabClass = 'text-secondary-500'
          break;
        case 'icon-tab':
          this.tabActiveClass = 'bg-primary-500 text-white',
            this.tabClass = 'text-slate-400 bg-secondary-200'
          break;
        case 'simple-tab':
          this.tabActiveClass = 'text-primary-500',
            this.tabClass = 'text-black'
          break;
        default:
          this.tabActiveClass = 'bg-primary-500 text-white',
            this.tabClass = 'text-primary-500'
          break;
      }
      if (this.checkActive(value)) {
        return {
          ['class']: this.tabActiveClass
        }
      } else {
        return {
          ['class']: this.tabClass
        }
      }
    },
    tabPanelBind() {
      return {
        ['x-transition:enter-start']: 'opacity-0 translate-y-2.5',
        ['x-transition:enter-end']: 'opacity-100',
        ['x-transition:leave-start']: 'opacity-100 -translate-y-2.5',
        ['x-transition:leave-end']: 'opacity-0 translate-y-0'
      }
    },
    changeTab(value) {
      this.selected = value
    },
    checkActive(value) {
      return value === this.selected ? true : false
    }
  }))

  //Dropdown Functions
  Alpine.data("dropdown", () => ({
    open: false,
    toggle() {
      this.open = !this.open;
    },
    dropdownTransition: {
      'class': 'origin-top-right',
      'x-transition:enter': 'transition ease-out duration-100',
      'x-transition:enter-start': 'transform opacity-0 scale-95 ',
      'x-transition:enter-end': 'transform opacity-100 scale-100',
      'x-transition:leave': 'transition ease-in duration-75',
      'x-transition:leave-start': 'transform opacity-100 scale-100',
      'x-transition:leave-end': 'transform opacity-0 scale-95',
    },
    checkArrow() {
      // console.log(this.open)
      if(this.open){
       return {
        ['class']:  'duraion-500 transition-transform rotate-180',
        }
      }
      else{
        return{
          ['class']: 'duraion-500 transition-transform rotate-0',                                   
        }
      }
    },
  }))

  //Modal Function
  Alpine.data('modal', () => ({
    open: false,
    toggle() {
      this.open = !this.open
    },
    backdropTransition: {
      'x-transition:enter': 'transition ease-out duration-500',
      'x-transition:enter-start': ' opacity-25 ',
      'x-transition:enter-end': 'opacity-100',
      'x-transition:leave': 'transition ease-in duration-500',
      'x-transition:leave-start': 'opacity-100',
      'x-transition:leave-end': 'opacity-25',
    },
    modalFadeInUpTransition: {
      'x-transition:enter': 'transition ease-out duration-500',
      'x-transition:enter-start': ' transform opacity-25 -translate-y-4',
      'x-transition:enter-end': 'transform opacity-100 translate-y-0',
      'x-transition:leave': 'transition ease-in duration-500',
      'x-transition:leave-start': 'transform opacity-100 translate-y-0',
      'x-transition:leave-end': 'transform opacity-25 -translate-y-4',
    },
  }))

  //Alert Function
  Alpine.data("alert", () => ({
    open: true,
    dismiss() {
      this.open = false;
    },
    show() {
      this.open = true; 
    },
    fadeTransition: {
      'class' : 'transition-opacity duration-400 linear',
      'x-transition:leave-start': 'opacity-100',
      'x-transition:leave-end': 'opacity-0',
    },

  }))

  /**************** Core Elements End Here ************************/

  // Sidebar Functions
  Alpine.data('sidebar', () => ({
    selected: '',
    toggle(value) {
      if (value === this.selected && value.includes('.')) {
        const menu = this.selected.split('.')
        return this.selected = menu[menu.length - 2]
      }
      if (value !== this.selected && this.selected.includes(value)) {
        return this.selected = ''
      }
      if (value !== this.selected) {
        return this.selected = value
      }
      if (value === this.selected) {
        return this.selected = ''
      }
      return this.selected = ''
    },
    init() {
      if (document.querySelector('.sidebar-main-menu .active') !== null) {
        const active = document.querySelector('.sidebar-main-menu .active').dataset.sidebarParent
        if (active !== undefined) {
          this.selected = active
        }
      }
    }
  }))

  // Fullscreen Functions
  Alpine.data('fullscreen', () => ({
    fullscreen: '',
    toggle() {
      this.fullscreen = !this.fullscreen
      if (!document.fullscreenElement &&
        !document.mozFullScreenElement && // Mozilla
        !document.webkitFullscreenElement && // Webkit-Browser
        !document.msFullscreenElement) { // MS IE ab version 11

        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
  }))
})


/* ---------------------------------------------------------------------
 carousel
  ---------------------------------------------------------------------*/
if (document.querySelectorAll('.mySwiper').length > 0) {
  if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper('.mySwiper', {
      spaceBetween: 10,
      centeredSlides: true,
      loop:true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}

function toggleNavbar(cID, sID) {
  document.getElementById(cID).classList.toggle("hidden");
  document.getElementById(cID).classList.toggle("block");
  document.getElementById(sID).classList.toggle("hidden");
  document.getElementById(sID).classList.toggle("block");
}

/*---------------------------------------------------------------------
              LoaderInit
-----------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', (event) => {
  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 200);
});

/* ---------------------------------------------------------------------
 scrollbar
  ---------------------------------------------------------------------*/
{
  let Scrollbar
if (typeof Scrollbar !== typeof null) {
  if (document.querySelectorAll(".data-scrollbar").length) {
    Scrollbar = window.Scrollbar

    Scrollbar.init(document.querySelector('.data-scrollbar'), {
      continuousScrolling: false,
    })
  }
}
}

/*---------------------------------------------------------------------
Circle Progress
-----------------------------------------------------------------------*/

{
  const progressBar = document.getElementsByClassName('circle-progress')
if (typeof progressBar !== typeof undefined) {
  Array.from(progressBar, (elem) => {
    const minValue = elem.getAttribute('data-min-value')
    const maxValue = elem.getAttribute('data-max-value')
    const value = elem.getAttribute('data-value')
    const type = elem.getAttribute('data-type')
    if (elem.getAttribute('id') !== '' && elem.getAttribute('id') !== null) {
      new CircleProgress('#' + elem.getAttribute('id'), {
        min: minValue,
        max: maxValue,
        value: value,
        textFormat: type,
      });
    }
  })
}
}

/*---------------------------------------------------------------------
              CounterUp 2 Plugin
-----------------------------------------------------------------------*/
if (window.counterUp !== undefined) {
  const counterUp = window.counterUp["default"];
  const counterUp2 = document.querySelectorAll('.counter')
  Array.from(counterUp2, (el) => {
    if (typeof Waypoint !== typeof undefined) {
      const waypoint = new Waypoint({
        element: el,
        handler: function () {
          counterUp(el, {
            duration: 1000,
            delay: 10,
          });
          this.destroy();
        },
        offset: "bottom-in-view",
      });
    }
  })
}

/*---------------------------------------------------------------------
Flatpickr
-----------------------------------------------------------------------*/
{
  const date_flatpickr = document.querySelectorAll('.date_flatpicker')
Array.from(date_flatpickr, (elem) => {
  // console.log(elem, flatpickr);
  if (typeof flatpickr !== typeof undefined) {
    flatpickr(elem, {
      minDate: "today",
      dateFormat: "Y-m-d",
    })
  }
})
}

/*---------------------------------------------------------------------
Range Flatpickr
-----------------------------------------------------------------------*/
{
  const range_flatpicker = document.querySelectorAll('.range_flatpicker')
Array.from(range_flatpicker, (elem) => {
  if (typeof flatpickr !== typeof undefined) {
    flatpickr(elem, {
      mode: "range",
      minDate: "today",
      dateFormat: "Y-m-d",
    })
  }
})
}

/*------------Wrap Flatpickr---------------*/
{
  const wrap_flatpicker = document.querySelectorAll('.wrap_flatpicker')
Array.from(wrap_flatpicker, (elem) => {
  if (typeof flatpickr !== typeof undefined) {
    flatpickr(elem, {
      minDate: "today",
      dateFormat: "Y-m-d",
    })
  }
})
}

/*-------------Time Flatpickr---------------*/
{
  const time_flatpickr = document.querySelectorAll('.time_flatpicker')
Array.from(time_flatpickr, (elem) => {
  if (typeof flatpickr !== typeof undefined) {
    flatpickr(elem, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
    })
  }
})
}

/*---------------------------------------------------------------------
Inline Flatpickr
-----------------------------------------------------------------------*/
{
  const inline_flatpickr = document.querySelectorAll('.inline_flatpickr')
Array.from(inline_flatpickr, (elem) => {
  if (typeof flatpickr !== typeof undefined) {
    flatpickr(elem, {
      inline: true,
      minDate: "today",
      dateFormat: "Y-m-d",
    })
  }
})
}


function scrolldisable() {
  document.body.classList.add("pr-4");
  document.body.classList.add("overflow-y-hidden");
}
function scrollenable() {
  document.body.classList.remove("overflow-y-hidden");
  document.body.classList.remove("pr-4");
}

// header overflow-hidden dropdowns

function headersm() {
  document.getElementById('headsm').classList.remove("overflow-hidden");
}

function headerms() {
  document.getElementById('headsm').classList.add("overflow-hidden");
}

/*---------------noUiSlider-------------------*/
{
  const rangeSlider = document.querySelectorAll('.range-slider');
Array.from(rangeSlider, (elem) => {
  if (typeof noUiSlider !== typeof undefined) {
    if (elem.getAttribute('id') !== '' && elem.getAttribute('id') !== null) {
      window[elem.getAttribute('id')] = createSlider(elem)
    } else {choice
      createSlider(elem)
    }
  }
})
function createSlider(elem) {
  return noUiSlider.create(elem, {
    start: [50, 2000],
    connect: true,
    range: {
      'min': 0,
      '10%': [50, 50],
      'max': 2000
    }
  })
}
const slider = document.querySelectorAll('.slider');
Array.from(slider, (elem) => {
  if (typeof noUiSlider !== typeof undefined) {
    noUiSlider.create(elem, {
      start: 50,
      connect: [true, false],
      range: {
        'min': 0,
        'max': 100
      }
    })
  }
})
}

/*------------Copy To Clipboard---------------*/
{
  const copy = document.querySelectorAll('[data-toggle="copy"]')
if (typeof copy !== typeof undefined) {
  Array.from(copy, (elem) => {
    elem.addEventListener('click', (e) => {
      const target = elem.getAttribute("data-copy-target");
      let value = elem.getAttribute("data-copy-value");
      const container = document.querySelector(target);
      if (container !== undefined && container !== null) {
        if (container.value !== undefined && container.value !== null) {
          value = container.value;
        } else
        {
          value = container.innerHTML;
        }
      }
      if (value !== null) {
        const elem = document.createElement("textarea");
        document.querySelector("body").appendChild(elem);
        elem.value = value;
        elem.select();
        document.execCommand("copy");
        elem.remove();
      }
      elem.setAttribute('data-tw-original-title', 'Copied!');
      let btn_tooltip = bootstrap.Tooltip.getInstance(elem);
      btn_tooltip.show();
      // reset the tooltip title
      elem.setAttribute('data-tw-original-title', 'Copy');
      setTimeout(() => {
        btn_tooltip.hide();
      }, 500)
    })
  });
}
}

// tooltip
{
  const tooltipElems = document.querySelectorAll('[data-tp-toggle="tooltip"]') 
Array.from(tooltipElems, (elem) => {
  const positon = elem.getAttribute('data-tp-placement') || 'bottom'
  const title = elem.getAttribute('data-tp-title') || '' 
  tippy(elem, {
    content: title,
    placement: positon
  
  });
})
}

// popover
{
  const popoverElems  = document.querySelectorAll('[data-ts-toggle="popover"]') 
  Array.from(popoverElems, (elem) => {
    const positon = elem.getAttribute('data-ts-placement') || 'bottom'
    const title = elem.getAttribute('data-tp-title') || ''
    const content = elem.getAttribute('data-tp-content') || ''
    const headerTitle = (title !== null && title !== undefined && title !== '' ? '<div class="bg-secondary-400 px-4 py-2">' + title + '</div>' : '')
    const mainContent =  `<div> ${headerTitle} <div class="px-4 py-2">${content}</div> </div>`
    tippy(elem, {
      theme: 'light',
      content: mainContent, 
      placement: positon,
      trigger: 'click',
      allowHTML: true
     
    });
  })
}
