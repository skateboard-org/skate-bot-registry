import * as Sentry from '@sentry/browser';

function init() {
  Sentry.init({
    dsn: 'https://623320da2d064292b2bf6b87fd709c0b@sentry.io/1547395',
    release: 'ping-me@0.1.0',
  });
}

export default { init };
