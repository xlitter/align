import hljs from 'highlight.js/lib/highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import { select } from './util';
import Styler from './styler';


class Align {
  constructor(selector, {
    defaultText = 'Type here',
    styler = null,
  } = {}) {
    this.el = select(selector);
    this.options = {
      defaultText,
      styler
    };
    this.init();
  }

  /**
   * Get editor's content
   */
  get content() {
    return document.createTextNode(this.text.innerHTML);
  }

  static extend(name, extension) {
    Styler.extend(name, extension)
  }

  /**
   * Create all editor elements
   */
  init() {
    this.HTML = false;
    this.styler = new Styler(this, this.options.styler);
    this.initEditor();
    this.initEvents();
  }

  /**
   * Create the editor
   */
  initEditor() {
    this.text = document.createElement('div');
    this.paragraph = document.createElement('p');

    this.text.contentEditable = 'true';
    this.text.classList.add('align-text');
    this.paragraph.innerText = this.options.defaultText + '\n';

    this.el.appendChild(this.text);
    this.text.appendChild(this.paragraph);
  }

  /**
   * Add all events listeners
   */
  initEvents() {
    this.text.addEventListener('focus', () => {
      this.highlight();
    });

    this.text.addEventListener('mouseup', (event) => {
      this.styler.updateStylerStates();
    });

    window.addEventListener("keyup", (event) => {
      // Do nothing if the event was already processed
      if (event.defaultPrevented) {
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          // Do something for "down arrow" key press.
          break;
        case "ArrowUp":
          // Do something for "up arrow" key press.
          break;
        case "ArrowLeft":
          this.styler.updateStylerStates();
          break;
        case "ArrowRight":
          this.styler.updateStylerStates();
          break;
        case 'Tab':
          this.execute('indent');
          break;

        default:
          return;
      }

      // Cancel the default action to avoid it being handled twice
      // event.preventDefault();
    }, true);
  }

  /**
   * Hightlight code text
   */
  highlight() {
    const code = Array.from(this.text.querySelectorAll('pre'));

    code.forEach((block) => {
      hljs.highlightBlock(block);
    })
  }

  /**
   * Toggle on/off HTML represntation
   */
  toggleHTML() {
    this.HTML = !this.HTML;
    if (this.HTML) {
      const content = document.createTextNode(this.text.innerHTML);
      const pre = document.createElement("pre");

      this.text.innerHTML = "";
      this.text.contentEditable = false;
      pre.id = "content";
      pre.contentEditable = false;
      pre.appendChild(content);
      this.text.appendChild(pre);
      return;
    }
    this.text.innerHTML = this.text.innerText;
    this.text.contentEditable = true;
    this.text.focus();
  }
}

export default Align;