import config from '../config';

export function executeRecaptcha(action) {
  if (!config.recaptchaSiteKey) {
    return 'disabled';
  }

  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(config.recaptchaSiteKey, {
          action
        });
        resolve(token);
      } catch (e) {
        reject(e);
      }
    });
  });
}
