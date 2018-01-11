'use strict';

/*
***********************************************************************************
***********************************************************************************
***
***                            Пользовательское управление
***
***********************************************************************************
***********************************************************************************
*/

(function () {
  var ESC_KEYCODE = 27;

  var LANGUAGE_DASHBOARD = document.querySelector('.additional-nav__settings-item-dashboard--language');
  var LANGUAGE_LIST = document.querySelector('.additional-nav__languages-list');
  var LANGUAGE_LIST_ACTIVITY_MODIFIER = 'additional-nav__languages-list--active';
  var LANGUAGE_SELECT = document.querySelector('select#language');

  var CURRENCIES_DASHBOARD = document.querySelector('.additional-nav__settings-item-dashboard--currency');
  var CURRENCIES_LIST = document.querySelector('.additional-nav__currencies-list');
  var CURRENCIES_LIST_ACTIVITY_MODIFIER = 'additional-nav__currencies-list--active';
  var CURRENCIES_SELECT = document.querySelector('select#currencies');

  var SEARCH_LINK = document.querySelector('.main-nav__user-controls-link--search');
  var SEARCH_MODAL = document.querySelector('.main-nav__search-modal');
  var SEARCH_MODAL_ACTIVITY_MODIFIER = 'main-nav__search-modal--active';
  var SEARCH_MODAL_CLOSE_BUTTON = document.querySelector('.main-nav__search-close-button');

  LANGUAGE_DASHBOARD.addEventListener('click', onSettingsDashboardClick);
  CURRENCIES_DASHBOARD.addEventListener('click', onSettingsDashboardClick);

  function onSettingsDashboardClick(evt) {
    if (evt.target === LANGUAGE_DASHBOARD) {
      LANGUAGE_LIST.classList.toggle(LANGUAGE_LIST_ACTIVITY_MODIFIER);
      CURRENCIES_LIST.classList.remove(CURRENCIES_LIST_ACTIVITY_MODIFIER);
    } else if (evt.target === CURRENCIES_DASHBOARD) {
      CURRENCIES_LIST.classList.toggle(CURRENCIES_LIST_ACTIVITY_MODIFIER);
      LANGUAGE_LIST.classList.remove(LANGUAGE_LIST_ACTIVITY_MODIFIER);
    }
  }

  SEARCH_LINK.addEventListener('click', function (evt) {
    evt.preventDefault();
    CURRENCIES_LIST.classList.remove(CURRENCIES_LIST_ACTIVITY_MODIFIER);
    LANGUAGE_LIST.classList.remove(LANGUAGE_LIST_ACTIVITY_MODIFIER);

    if (!SEARCH_MODAL.classList.contains(SEARCH_MODAL_ACTIVITY_MODIFIER)) {
      SEARCH_MODAL.classList.add(SEARCH_MODAL_ACTIVITY_MODIFIER);
      SEARCH_MODAL_CLOSE_BUTTON.addEventListener('click', onSearchModalCloseButtonPress);
      window.addEventListener('keydown', onWindowEscPress);
    } else {
      closeSearchModal();
    }
  });

  function onSearchModalCloseButtonPress() {
    closeSearchModal();
  }

  function onWindowEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSearchModal();
    }
  }

  function closeSearchModal() {
    SEARCH_MODAL.classList.remove(SEARCH_MODAL_ACTIVITY_MODIFIER);
    SEARCH_MODAL_CLOSE_BUTTON.removeEventListener('click', onSearchModalCloseButtonPress);
    window.removeEventListener('keydown', onWindowEscPress);
  }

})();
