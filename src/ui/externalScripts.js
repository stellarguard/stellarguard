import config from './config';

function loadRecaptcha() {
  const src = `https://www.google.com/recaptcha/api.js?render=${
    config.recaptchaSiteKey
  }`;
  loadScript(src);
}

function loadScript(src) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = src;
  var insertPoint = document.getElementsByTagName('script')[0];
  insertPoint.parentNode.insertBefore(script, insertPoint);
}

export default { loadRecaptcha };
