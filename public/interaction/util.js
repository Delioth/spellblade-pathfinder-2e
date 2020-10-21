const waitForSelector = async (selector, delayBetween = 1000) => {
  const select = () => document.querySelector(selector);
  let element = select();
  while (element === null) {
    await new Promise((resolve) => setTimeout(resolve, delayBetween));
    element = select();
  }
  return element;
};

const toggleElement = async (selector) => {
  const element = await waitForSelector(selector);
  element.classList.toggle('hide');
};

export const attachToggler = async (clickSelector, hideSelector) => {
  const clickyP = waitForSelector(clickSelector);

  const clicky = await clickyP;
  clicky.onclick = () => toggleElement(hideSelector);
};
