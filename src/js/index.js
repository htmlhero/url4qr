import { Hash } from './hash';
import { TextArea } from './text-area';
import { Img } from './img';
import { Buttons } from './buttons';

(async () => {

  const hash = new Hash();
  const initialText = hash.getText();

  const img = new Img();
  await img.setText(initialText);

  const buttons = new Buttons();
  buttons.setText(initialText);

  const textArea = new TextArea(async (input) => {
    hash.setText(input);
    buttons.setText(input);
    await img.setText(input);
  });
  textArea.setText(initialText);

})();
