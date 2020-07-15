const waitForSelector = async (selector, delayBetween = 1000) => {
  const select = () => document.querySelector(selector);
  let element = select();
  while (element === null) {
    await new Promise((resolve) => setTimeout(resolve, delayBetween));
    element = select();
  }
  return element;
};

const waitThenInsertFrom = async (url, selector, delayBetween = 1000) => {
  const legalesePromise = fetch(url);
  const element = await waitForSelector(selector, delayBetween);
  const legalese = await (await legalesePromise).text();
  element.append(legalese);
};

const togglePopup = async (selector) => {
  const element = await waitForSelector(selector);
  element.classList.toggle('show');
  element.parentElement.classList.toggle('show');
};

const attachPopupToggler = async (clickSelector, popupSelector) => {
  const clickyP = waitForSelector(clickSelector);

  const clicky = await clickyP;
  clicky.onclick = () => togglePopup(popupSelector);
};

waitThenInsertFrom(
  'https://delioth.github.io/spellblade-pathfinder-2e/LICENSE',
  '#legalese-popup'
);

attachPopupToggler('#clicky', '#legalese-popup');
attachPopupToggler('#legalese-popup-close', '#legalese-popup');
attachPopupToggler('#legalese-backdrop', '#legalese-popup');
