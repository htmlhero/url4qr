export class TextArea {
  /**
   * @param {() => void} onInput
   */
  constructor(onInput) {
     /**
     * @private
     * @type {HTMLElement}
     */
    this._el = document.getElementById('text');

    this._el.addEventListener('input', () => {
      onInput(this.getText());
    });
  }

  /**
   * @returns {string}
   */
  getText() {
    return this._el.value;
  }

  /**
   * @param {string} text
   */
  setText(text) {
    this._el.value = text;
  }
}
