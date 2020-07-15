import { attachToggler } from './util.js';
import toggles from './constants/toggles.js';

toggles.forEach(([click, target]) => {
  attachToggler(click, target);
});
