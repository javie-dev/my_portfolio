(function () {
  'use strict';

  var themes = ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'dracula'];
  var toggle = document.getElementById('theme-toggle');
  var menu = document.getElementById('theme-menu');
  var options = document.querySelectorAll('[data-theme-option]');

  if (!toggle || !menu) {
    return;
  }

  function setMenuOpen(isOpen) {
    toggle.setAttribute('aria-expanded', String(isOpen));
    menu.hidden = !isOpen;
  }

  function setTheme(theme) {
    if (themes.indexOf(theme) === -1) {
      return;
    }

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);

    options.forEach(function (option) {
      option.setAttribute('aria-checked', String(option.getAttribute('data-theme-option') === theme));
    });
  }

  toggle.addEventListener('click', function () {
    setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  options.forEach(function (option) {
    option.addEventListener('click', function () {
      setTheme(option.getAttribute('data-theme-option'));
      setMenuOpen(false);
      toggle.focus();
    });
  });

  menu.addEventListener('keydown', function (event) {
    var optionList = Array.prototype.slice.call(options);
    var currentIndex = optionList.indexOf(document.activeElement);
    var nextIndex = currentIndex;

    if (event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % optionList.length;
    } else if (event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + optionList.length) % optionList.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = optionList.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    optionList[nextIndex].focus();
  });

  document.addEventListener('click', function (event) {
    if (!toggle.parentNode.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
})();
