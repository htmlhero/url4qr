import { MAX_HASH_SIZE, MAX_TEXT_SIZE } from './consts';

export class Hash {
  /**
   * @private
   * @param {string} text
   * @returns {string}
   */
  _encode(text) {
    const bytes = new TextEncoder().encode(text);
    const binString = String.fromCodePoint(...bytes);
    return window.btoa(binString);
  };

  /**
   * @private
   * @param {string} base64
   * @returns {string}
   */
  _decode(base64) {
    const binString = window.atob(base64);
    const bytes = Uint8Array.from(binString, (item) => item.codePointAt(0));
    return new TextDecoder().decode(bytes);
  };

  /**
   * @param {string} text
   */
  setText(text) {
    const trimmedText = text.substring(0, MAX_TEXT_SIZE);
    window.location.hash = '#' + this._encode(trimmedText);
  }

  /**
   * @returns {string}
   */
  getText() {
    const trimmedHash = window.location.hash.substring(1, MAX_HASH_SIZE + 1);
    return this._decode(trimmedHash);
  }
}
