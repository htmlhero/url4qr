import QRCode from 'qrcode';
import { MAX_TEXT_SIZE } from './consts';

export class Img {
  constructor() {
     /**
     * @private
     * @type {HTMLElement}
     */
    this._el = document.getElementById('img-svg');
  }

  /**
   * @param {string} text
   * @returns {Promise<void>}
   */
  async setText(text) {
    if (text) {
      const trimmedText = text.substring(0, MAX_TEXT_SIZE);
      this._el.innerHTML = await QRCode.toString(trimmedText, {
        type: 'svg',
        margin: 0,
      });
    } else {
      this._el.innerHTML = '';
    }
  }
}
