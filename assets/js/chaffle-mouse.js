import Chaffle from 'chaffle'

const elements = document.querySelectorAll('[data-chaffle]');
Array.prototype.forEach.call(elements, function (el) {
  const chaffle = new Chaffle(el, { /* options */ });
  el.addEventListener('mouseover', function () {
    chaffle.init();
  });
});
