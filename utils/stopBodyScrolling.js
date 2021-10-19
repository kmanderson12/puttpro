/* This excellent solution provided by Ben Frain:
https://benfrain.com/preventing-body-scroll-for-modals-in-ios/ */

function stopBodyScrolling(bool) {
  if (bool === true) {
    document.body.addEventListener('touchmove', freezeVp, false);
    document.body.style.top = `-${window.scrollY}px`;
  } else {
    document.body.removeEventListener('touchmove', freezeVp, false);
    document.body.style.top = '';
  }
}

var freezeVp = function(e) {
  const isIphone = /iP(hone|od|ad)/.test(navigator.platform);
  const v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
  const ver = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  if (isIphone && ver[0] >= 11 && ver[1] >= 1) {
    e.preventDefault();
  }
};

export default stopBodyScrolling;
