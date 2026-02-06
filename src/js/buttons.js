import QRCode from 'qrcode';
import { MAX_TEXT_SIZE } from './consts';

export class Buttons {
  constructor() {
     /**
     * @private
     * @type {HTMLElement}
     */
    this._copyUrlEl = document.getElementById('copy-url');

     /**
     * @private
     * @type {HTMLElement}
     */
    this._copyTextEl = document.getElementById('copy-text');

     /**
     * @private
     * @type {HTMLElement}
     */
    this._downloadQrEl = document.getElementById('download-qr');

     /**
     * @private
     * @type {string}
     */
    this._text = '';

    this._copyUrlEl.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
    });

    this._copyTextEl.addEventListener('click', () => {
      navigator.clipboard.writeText(this._text);
    });

    this._downloadQrEl.addEventListener('click', async () => {
      this._download();
    });
  }

  /**
   * @private
   */
  async _download() {
    if (this._text) {
      const trimmedText = this._text.substring(0, MAX_TEXT_SIZE);
      const anchor = document.createElement('a');
      anchor.href = await QRCode.toDataURL(trimmedText, {
        width: 500,
      });
      anchor.download = 'qr-code.png';
      anchor.click();
    }
  }

  /**
   * @param {string} text
   */
  setText(text) {
    this._text = text;

    if (text) {
      this._copyUrlEl.removeAttribute('disabled');
      this._copyTextEl.removeAttribute('disabled');
      this._downloadQrEl.removeAttribute('disabled');
    } else {
      this._copyUrlEl.setAttribute('disabled', 'disabled');
      this._copyTextEl.setAttribute('disabled', 'disabled');
      this._downloadQrEl.setAttribute('disabled', 'disabled');
    }
  }
}
