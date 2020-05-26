import ReactGA from 'react-ga';

function init() {
  ReactGA.initialize('UA-145894771-1', {
    debug: false,
    titleCase: false,
  });
}

export default { init };
