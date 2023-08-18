const defaultSetting = () => {
  let setting_options = document.querySelector('meta[name="setting_options"]');
  if (setting_options !== null && setting_options !== undefined) {
    setting_options = JSON.parse(setting_options.getAttribute("content"))?.setting;
  }
  else {
    setting_options = {
      theme_scheme: 'light',
      theme_scheme_direction: 'ltr',
      sidebar_color: '',
      sidebar_type: [],
      sidebar_menu_style: 'sidebar-default navs-rounded-all',
      app_name: 'Qompac UI',
      page_layout: 'container-fluid',
      theme_style_appearance: [],
      theme_font_size: 'theme-fs-md',
    }
  }
  return setting_options;
}

document.addEventListener('alpine:init', () => {
  Alpine.data('settingInit', () => ({
    copyText: 'Copy Config',
    storeLocal: 'sessionStorage',
    storeKey: 'quisetting-tailwind',
    setting: {
      theme_scheme: 'light',
      theme_scheme_direction: 'ltr',
      sidebar_color: '',
      sidebar_type: [],
      sidebar_menu_style: '',
      app_name: 'Qompac UI',
      page_layout: 'container-fluid',
      theme_style_appearance: [],
      theme_font_size: 'theme-fs-md',
    },
    init() {
      // Customizer Setting initialize

      this.getFromStorage()
      this.$watch('setting.theme_scheme', (e, oldValue) => this.fnWatch(e, 'theme_scheme', oldValue))
      this.$watch('setting.theme_scheme_direction', (e, oldValue) => this.fnWatch(e, 'theme_scheme_direction', oldValue))
      this.$watch('setting.sidebar_color', (e, oldValue) => this.fnWatch(e, 'sidebar_color', oldValue))
      this.$watch('setting.sidebar_type', (e, oldValue) => this.fnWatch(e, 'sidebar_type', oldValue))
      this.$watch('setting.sidebar_menu_style', (e, oldValue) => this.fnWatch(e, 'sidebar_menu_style', oldValue))
      this.$watch('setting.app_name', (e, oldValue) => this.fnWatch(e, 'app_name', oldValue))
      this.$watch('setting.page_layout', (e, oldValue) => this.fnWatch(e, 'page_layout', oldValue))
      this.$watch('setting.theme_style_appearance', (e, oldValue) => this.fnWatch(e, 'theme_style_appearance', oldValue))
      this.$watch('setting.theme_font_size', (e, oldValue) => this.fnWatch(e, 'theme_font_size', oldValue))
    },
    resize(e) {
      this.toggleMiniSidebar(true)
      if (window.innerWidth < 1199.98) {
        this.toggleMiniSidebar(false)
      }
    },
    fnWatch(value, key, currentValue) {
      const event = new CustomEvent(key, { detail: { value: value, name: key, currentValue: currentValue } });
      document.dispatchEvent(event);
      updateStorage(this.storeLocal, this.storeKey, this.setting)
    },
    getFromStorage() {
      this.setting = getStorage(this.storeKey)
    },
    resetSetting() {
      this.storeLocal = 'sessionStorage'
      this.setting = defaultSetting()
    },
    copyConfig() {
      const elem = document.createElement("textarea");
      document.querySelector("body").appendChild(elem);
      elem.value = JSON.stringify(this.setting, null, 4);
      elem.select();
      document.execCommand("copy");
      elem.remove();
      this.copyText = 'Copied'
    },
    sidebarMini() {
      if (this.setting.sidebar_type.includes('sidebar-mini')) {
        this.toggleMiniSidebar(true)
      } else {
        this.toggleMiniSidebar(false)
      }
    },
    toggleMiniSidebar(value) {
      if (value) {
        const indexOf = this.setting.sidebar_type.findIndex(x => x == 'sidebar-mini')
        this.setting.sidebar_type.splice(indexOf, 1)
      } else {
        this.setting.sidebar_type.push('sidebar-mini')
      }
    },
    changeFont() {

    }
  }))
})

function updateStorage(storage, key, value) {
  if (typeof value !== typeof undefined && typeof key !== typeof undefined) {
    switch (storage) {
      case 'localStorage':
        sessionStorage.removeItem(key)
        localStorage.setItem(key, JSON.stringify(value))
        break

      case 'sessionStorage':
        localStorage.removeItem(key)
        sessionStorage.setItem(key, JSON.stringify(value))
        break

      default:
        localStorage.removeItem(key)
        sessionStorage.removeItem(key)
        localStorage.setItem(key, 'none')
        sessionStorage.setItem(key, 'none')
        break
    }
  }
}

function getStorage(key) {
  if (localStorage.getItem(key) === 'none' || sessionStorage.getItem(key) === 'none') return 'none'
  if ((localStorage.getItem(key) !== null && localStorage.getItem(key) !== '') || (sessionStorage.getItem(key) !== null && sessionStorage.getItem(key) !== '')) {
    let value = localStorage.getItem(key)
    if (value === null) value = sessionStorage.getItem(key)
    if (value !== null) {
      try {
        return JSON.parse(value)
      } catch (e) {
        return value
      }
    }
  }
  return defaultSetting()
}
