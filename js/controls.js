'use strict';

/*
***********************************************************************************
***********************************************************************************
***
***                         ВЗАИМОДЕЙСТВИЯ С ПОЛЬЗОВАТЕЛЕМ
***
***********************************************************************************
***********************************************************************************
*/

(function () {

  var ESC_KEYCODE = 27;

  var LANGUAGE_DASHBOARD = document.querySelector('.additional-nav__settings-item-dashboard--language');
  var LANGUAGE_LIST = document.querySelector('.additional-nav__languages-list');
  var LANGUAGE_LIST_ACTIVITY_MODIFIER = 'additional-nav__languages-list--active';

  var CURRENCIES_DASHBOARD = document.querySelector('.additional-nav__settings-item-dashboard--currency');
  var CURRENCIES_LIST = document.querySelector('.additional-nav__currencies-list');
  var CURRENCIES_LIST_ACTIVITY_MODIFIER = 'additional-nav__currencies-list--active';

  var SEARCH_LINK = document.querySelector('.main-nav__user-controls-link--search');
  var SEARCH_MODAL = document.querySelector('.main-nav__search-modal');
  var SEARCH_MODAL_ACTIVITY_MODIFIER = 'main-nav__search-modal--active';
  var SEARCH_MODAL_CLOSE_BUTTON = document.querySelector('.main-nav__search-close-button');

  var CART_DASHBOARD = document.querySelector('.main-nav__user-controls-cart-dashboard');
  var ADD_TO_CART_LINKS = document.querySelectorAll('.product__popup-link--cart');

  // Навешивание хендлеров, отлавливающих нажатие кнопок с настройками
  LANGUAGE_DASHBOARD.addEventListener('click', onSettingsDashboardClick);
  CURRENCIES_DASHBOARD.addEventListener('click', onSettingsDashboardClick);

  /**
    * Отображение/сокрытие меню выбора языка и валюты.
    *
    * Навешивание на window хендлера, отслеживающего клик вне
    * открытого меню настроек и по такому клику закрывающее меню.
    *
    * @function onSettingsDashboardClick
    * @param {object} evt — объект события
    */
  function onSettingsDashboardClick(evt) {
    if (evt.target === LANGUAGE_DASHBOARD) {
      LANGUAGE_LIST.classList.toggle(LANGUAGE_LIST_ACTIVITY_MODIFIER);
    } else if (evt.target === CURRENCIES_DASHBOARD) {
      CURRENCIES_LIST.classList.toggle(CURRENCIES_LIST_ACTIVITY_MODIFIER);
    }

    window.addEventListener('click', onWindowClick);
  }

  /**
   * Хендлер, отслеживающий клики вне открытого меню
   * настроек, и по такому клику закрывающее меню.
   *
   * Когда все меню закрыты — хендлер деактивируется.
   *
   * @function onWindowClick
   * @param {object} evt — объект события
   */
  function onWindowClick(evt) {
    if (LANGUAGE_LIST.classList.contains(LANGUAGE_LIST_ACTIVITY_MODIFIER) &&
        evt.target !== LANGUAGE_LIST && evt.target !== LANGUAGE_DASHBOARD) {
      LANGUAGE_LIST.classList.remove(LANGUAGE_LIST_ACTIVITY_MODIFIER);
    } else if (CURRENCIES_LIST.classList.contains(CURRENCIES_LIST_ACTIVITY_MODIFIER) &&
        evt.target !== CURRENCIES_LIST && evt.target !== CURRENCIES_DASHBOARD) {
      CURRENCIES_LIST.classList.remove(CURRENCIES_LIST_ACTIVITY_MODIFIER);
    } else if (!LANGUAGE_LIST.classList.contains(LANGUAGE_LIST_ACTIVITY_MODIFIER) &&
        !CURRENCIES_LIST.classList.contains(CURRENCIES_LIST_ACTIVITY_MODIFIER)) {
      window.removeEventListener('click', onWindowClick);
    }
  }

  // При клике на кнопку-иконку поиска — открытие/закрытие полноценного модального окна.
  // С открытием модального окна активируются хендлеры его дальнейшего закрытия.
  SEARCH_LINK.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (!SEARCH_MODAL.classList.contains(SEARCH_MODAL_ACTIVITY_MODIFIER)) {
      SEARCH_MODAL.classList.add(SEARCH_MODAL_ACTIVITY_MODIFIER);
      SEARCH_MODAL_CLOSE_BUTTON.addEventListener('click', onSearchModalCloseButtonPress);
      window.addEventListener('keydown', onWindowEscPress);
    } else {
      closeSearchModal();
    }
  });

  /**
  * Синхронизация количества выбранных товаров со счетчиком в header.
  *
  * @function syncSelectedProductsWithCartDashboard
  */
  (function syncSelectedProductsWithCartDashboard() {
    for (var i = 0; i < ADD_TO_CART_LINKS.length; i++) {
      ADD_TO_CART_LINKS[i].addEventListener('click', function (evt) {
        evt.preventDefault();

        var cartCurrentValue = Number(CART_DASHBOARD.textContent);
        CART_DASHBOARD.textContent = ++cartCurrentValue;
      });
    }
  })();

  /**
   * Хендлер, закрывающий модальное окно поиска, и
   * деактивирующий связанные с ним ненужные хендлеры.
   *
   * Закрытие происходит по нажатию на кнопку "Close".
   *
   * @function onSearchModalCloseButtonPress
   */
  function onSearchModalCloseButtonPress() {
    closeSearchModal();
  }

  /**
   * Хендлер, закрывающий модальное окно поиска, и
   * деактивирующий связанные с ним ненужные хендлеры.
   *
   * Закрытие происходит по нажатию на ESC, когда окно активно.
   *
   * @function onSearchModalCloseButtonPress
   * @param {object} evt — объект события
   */
  function onWindowEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSearchModal();
    }
  }

  /**
   * Закрытие модального окна поиска, деактивация
   * связанных с ним ненужных хендлеров.
   *
   * @function closeSearchModal
   */
  function closeSearchModal() {
    SEARCH_MODAL.classList.remove(SEARCH_MODAL_ACTIVITY_MODIFIER);
    SEARCH_MODAL_CLOSE_BUTTON.removeEventListener('click', onSearchModalCloseButtonPress);
    window.removeEventListener('keydown', onWindowEscPress);
  }

})();
