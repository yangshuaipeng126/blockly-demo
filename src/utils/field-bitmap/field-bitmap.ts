/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

Blockly.Msg['BUTTON_LABEL_RANDOMIZE'] = 'Randomize';
Blockly.Msg['BUTTON_LABEL_CLEAR'] = 'Clear';

export const DEFAULT_HEIGHT = 5;
export const DEFAULT_WIDTH = 5;
const DEFAULT_PIXEL_SIZE = 15;

const DEFAULT_BUTTONS: Buttons = {
  randomize: true,
  clear: true,
};
const COLORS = ['#d42da3', '#b466e9', '#3f8eee', '#94e5fc', '#5cc863', '#4ba551', '#fae475', '#f0af3d', '#ea3327', '#ffffff', '#5020b9']
const DEFAULT_PIXEL_COLOURS: PixelColours = {
  empty: '#fff',
  filled: COLORS[0],
};
/**
 * Field for inputting a small bitmap image.
 * Includes a grid of clickable pixels that's exported as a bitmap.
 */
export class FieldBitmap extends Blockly.Field<any[][]> {
  private initialValue: any[][] | null = null;
  private imgHeight: number;
  private imgWidth: number;
  /**
   * Array holding info needed to unbind events.
   * Used for disposing.
   */
  private boundEvents: Blockly.browserEvents.Data[] = [];
  /** References to UI elements */
  private editorPixels: HTMLElement[][] | null = null;
  private blockDisplayPixels: SVGElement[][] | null = null;
  /** Stateful variables */
  private mouseIsDown = false;
  private valToPaintWith?: number;
  buttonOptions: Buttons;
  pixelSize: number;
  pixelColours: { empty: string; filled: string };
  fieldHeight?: number;
  private selectPixels: HTMLElement[][] | null = null;

  /**
   * Constructor for the bitmap field.
   *
   * @param value 2D rectangular array of 1s and 0s.
   * @param validator A function that is called to validate.
   * @param config Config A map of options used to configure the field.
   */
  constructor(
    value: any[][] | typeof Blockly.Field.SKIP_SETUP,
    validator?: Blockly.FieldValidator<any[][]>,
    config?: FieldBitmapFromJsonConfig,
  ) {
    super(value, validator, config);
    (this.value_ as any) = value;
    this.SERIALIZABLE = true;
    this.CURSOR = 'default';
    this.buttonOptions = { ...DEFAULT_BUTTONS, ...config?.buttons };
    this.pixelColours = { ...DEFAULT_PIXEL_COLOURS, ...config?.colours };
    // Configure value, height, and width
    const currentValue = this.getValue();
   
    if (currentValue !== null) {
      this.imgHeight = currentValue.length;
      this.imgWidth = currentValue[0].length || 0;
    } else {
      this.imgHeight = config?.height ?? DEFAULT_HEIGHT;
      this.imgWidth = config?.width ?? DEFAULT_WIDTH;
      // Set a default empty value
      this.setValue(this.getEmptyArray());
    }
    this.fieldHeight = config?.fieldHeight;
    if (this.fieldHeight) {
      this.pixelSize = this.fieldHeight / this.imgHeight;
    } else {
      this.pixelSize = DEFAULT_PIXEL_SIZE;
    }
  }

  /**
   * Constructs a FieldBitmap from a JSON arg object.
   *
   * @param options A JSON object with options.
   * @returns The new field instance.
   */
  static fromJson(options: FieldBitmapFromJsonConfig) {
    // `this` might be a subclass of FieldBitmap if that class doesn't override the static fromJson method.
    return new this(
      options.value ?? Blockly.Field.SKIP_SETUP,
      undefined,
      options,
    );
  }

  /**
   * Returns the width of the image in pixels.
   *
   * @returns The width in pixels.
   */
  getImageWidth() {
    return this.imgWidth;
  }

  /**
   * Returns the height of the image in pixels.
   *
   * @returns The height in pixels.
   */
  getImageHeight() {
    return this.imgHeight;
  }

  /**
   * Validates that a new value meets the requirements for a valid bitmap array.
   *
   * @param newValue The new value to be tested.
   * @returns The new value if it's valid, or null.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  
  protected override doClassValidation_(
    newValue?: any[][],
  ): any[][] | null | undefined {
    return newValue;
  }

  /**
   * Called when a new value has been validated and is about to be set.
   *
   * @param newValue The value that's about to be set.
   */
  // eslint-disable-next-line
  protected override doValueUpdate_(newValue: any[][]) {
    super.doValueUpdate_(newValue);
    if (newValue) {
      this.imgHeight = newValue.length;
      this.imgWidth = newValue[0] ? newValue[0].length : 0;
      // If the field height is static, adjust the pixel size to fit.
      if (this.fieldHeight) {
        this.pixelSize = this.fieldHeight / this.imgHeight;
      } else {
        this.pixelSize = DEFAULT_PIXEL_SIZE;
      }
    }
  }

  /**
   * Show the bitmap editor dialog.
   *
   * @param e Optional mouse event that triggered the field to open, or
   *    undefined if triggered programmatically.
   */
  // eslint-disable-next-line
  protected override showEditor_(e?: Event) {
    const editor = this.dropdownCreate();

    const colours = this.getColours();
    if (colours && colours.border) {
      Blockly.DropDownDiv.setColour(colours.primary, colours.border);
    }
    Blockly.DropDownDiv.getContentDiv().appendChild(editor);
    Blockly.DropDownDiv.showPositionedByField(
      this,
      this.dropdownDispose.bind(this),
    );
  }

  /**
   * Updates the block display and editor dropdown when the field re-renders.
   */
  // eslint-disable-next-line
  protected override render_() {
    super.render_();
    const value = this.getValue();
    if (!value) {
      return;
    }

    if (this.blockDisplayPixels) {
      this.forAllCells((r, c) => {
        const pixel = this.getPixel(r, c);
        if (this.blockDisplayPixels) {
          this.blockDisplayPixels[r][c].style.fill = pixel
            ? value[r][c].color
            : this.pixelColours.empty;
        }
        if (this.editorPixels) {
          this.editorPixels[r][c].style.background = pixel
            ? value[r][c].color
            : 'transparent';
        }
      });

    }
  }

  /**
   * Determines whether the field is editable.
   *
   * @returns True since it is always editable.
   */
  override updateEditable() {
    const editable = super.updateEditable();
    // Blockly.Field's implementation sets these classes as appropriate, but
    // since this field has no text they just mess up the rendering of the grid
    // lines.
    const svgRoot = this.getSvgRoot();
    if (svgRoot) {
      Blockly.utils.dom.removeClass(svgRoot, 'blocklyNonEditableText');
      Blockly.utils.dom.removeClass(svgRoot, 'blocklyEditableText');
    }
    return editable;
  }

  /**
   * Gets the rectangle built out of dimensions matching SVG's <g> element.
   *
   * @returns The newly created rectangle of same size as the SVG element.
   */
  override getScaledBBox() {
    const boundingBox = this.getSvgRoot()?.getBoundingClientRect();
    if (!boundingBox) {
      throw new Error('Tried to retrieve a bounding box without a rect');
    }
    return new Blockly.utils.Rect(
      boundingBox.top,
      boundingBox.bottom,
      boundingBox.left,
      boundingBox.right,
    );
  }

  /**
   * Creates the bitmap editor and add event listeners.
   *
   * @returns The newly created dropdown menu.
   */
  private dropdownCreate() {
    const dropdownEditor = this.createElementWithClassname(
      'div',
      'dropdownEditor',
    );
    if (this.buttonOptions.randomize || this.buttonOptions.clear) {
      dropdownEditor.classList.add('has-buttons');
    }
    const pixelContainer = this.createElementWithClassname(
      'div',
      'pixelContainer',
    );
    const leftContainer = this.createElementWithClassname('div', 'leftContainer');
    const rightContainer = this.createElementWithClassname('div', 'rightContainer')
    const bottomContainer = this.createElementWithClassname('div', 'bottomContainer');
    const clearButton = this.createElementWithClassname('div', 'clearButton');
    const slectButton = this.createElementWithClassname('div', 'selectButton');
    const colorContainer = this.createElementWithClassname('div', 'colorContainer');

    dropdownEditor.appendChild(leftContainer);
    dropdownEditor.appendChild(rightContainer);
    leftContainer.appendChild(pixelContainer);
    leftContainer.appendChild(bottomContainer);

    rightContainer.appendChild(colorContainer);


    // This prevents the normal max-height from adding a scroll bar for large images.
    Blockly.DropDownDiv.getContentDiv().classList.add('contains-bitmap-editor');

    this.bindEvent(dropdownEditor, 'mouseup', this.onMouseUp);
    this.bindEvent(dropdownEditor, 'mouseleave', this.onMouseUp);
    this.bindEvent(dropdownEditor, 'dragstart', (e: Event) => {
      e.preventDefault();
    });
    this.editorPixels = [];
    this.selectPixels = []
    const value = this.getValue();
    for (let r = 0; r < this.imgHeight; r++) {
      this.editorPixels.push([]);
      this.selectPixels.push([]);
      const rowDiv = this.createElementWithClassname('div', 'pixelRow');
      const clearDiv = this.createElementWithClassname('div', 'clearDiv');
      const selectAll = this.createElementWithClassname('div', 'selectAll');
      for (let c = 0; c < this.imgWidth; c++) {
        // Add the button to the UI and save a reference to it
        const button = this.createElementWithClassname('div', 'pixelButton');
        const bottomButton = this.createElementWithClassname('div', 'bottomButton');
        const selectGird = this.createElementWithClassname('div', 'bottomButton');
        this.editorPixels[r].push(button);
        rowDiv.appendChild(button);
        clearDiv.appendChild(bottomButton);
        selectAll.appendChild(selectGird);
        this.selectPixels[r].push(selectGird);

        // Load the current pixel colour
        const isOn = this.getPixel(r, c);
        button.style.background = isOn ? value[r][c].color : this.pixelColours.empty;
       
        button.setAttribute('data-color', button.style.background);

        selectGird.style.background = this.pixelColours.filled


        // Handle clicking a pixel
        this.bindEvent(button, 'mousedown', () => {
          this.onMouseDownInPixel(r, c);
          return true;
        });

        // Handle dragging into a pixel when mouse is down
        this.bindEvent(button, 'mouseenter', () => {
          this.onMouseEnterPixel(r, c);
        });
      }
      pixelContainer.appendChild(rowDiv);
      clearButton.appendChild(clearDiv);

      slectButton.appendChild(selectAll);
    }


    for (let i = 0; i < COLORS.length; i++) {
      const element = this.createElementWithClassname('div', 'colorButton');
      element.style.background = COLORS[i];
      element.setAttribute('data-color', COLORS[i]);
      colorContainer.appendChild(element);
      this.bindEvent(element, 'click', (e) => {
        this.pixelColours.filled = (e.target as any).attributes['data-color'].value
        if (this.blockDisplayPixels) {
          this.forAllCells((r, c) => {
            if (this.selectPixels) {
              this.selectPixels[r][c].style.background = this.pixelColours.filled
            }
          });
        }
      });
    }

    // Add control buttons below the pixel grid
    if (this.buttonOptions.clear) {
      this.addControlButton(
        bottomContainer,
        clearButton,
        this.clearPixels,
      );
    }

    if (this.buttonOptions.randomize) {
      this.addControlButton(
        bottomContainer,
        slectButton,
        this.randomizePixels,
      );
    }


    if (this.blockDisplayPixels) {
      this.forAllCells((r, c) => {
        const pixel = this.getPixel(r, c);
        if (this.editorPixels) {
          this.editorPixels[r][c].style.background = pixel
            ? value[r][c].color
            : 'transparent'
        }
      });
    }

    // Store the initial value at the start of the edit.
    this.initialValue = this.getValue();
    console.log(this.initialValue);
    return dropdownEditor;
  }

  /**
   * Initializes the on-block display.
   */
  override initView() {
    this.blockDisplayPixels = [];
    for (let r = 0; r < this.imgHeight; r++) {
      const row = [];
      for (let c = 0; c < this.imgWidth; c++) {
        const square = Blockly.utils.dom.createSvgElement(
          'rect',
          {
            x: c * this.pixelSize,
            y: r * this.pixelSize,
            width: this.pixelSize,
            height: this.pixelSize,
            fill: this.pixelColours.empty,
            fill_opacity: 1, // eslint-disable-line
          },
          this.getSvgRoot(),
        );
        row.push(square);
      }
      this.blockDisplayPixels.push(row);
    }
  }

  /**
   * Updates the size of the block based on the size of the underlying image.
   */
  // eslint-disable-next-line
  protected override updateSize_() {
    {
      const newWidth = this.pixelSize * this.imgWidth;
      const newHeight = this.pixelSize * this.imgHeight;
      if (this.borderRect_) {
        this.borderRect_.setAttribute('width', String(newWidth));
        this.borderRect_.setAttribute('height', String(newHeight));
      }

      this.size_.width = newWidth;
      this.size_.height = newHeight;
    }
  }

  /**
   * Create control button.
   *
   * @param parent Parent HTML element to which control button will be added.
   * @param buttonText Text of the control button.
   * @param onClick Callback that will be attached to the control button.
   */
  private addControlButton(
    parent: HTMLElement,
    self: HTMLElement,
    onClick: () => void,
  ) {

    parent.appendChild(self);
    this.bindEvent(self, 'click', onClick);
  }

  /**
   * Disposes of events belonging to the bitmap editor.
   */
  private dropdownDispose() {
    if (
      this.getSourceBlock() &&
      this.initialValue !== null &&
      this.initialValue !== this.getValue()
    ) {
      Blockly.Events.fire(
        new (Blockly.Events.get(Blockly.Events.BLOCK_CHANGE))(
          this.sourceBlock_,
          'field',
          this.name || null,
          this.initialValue,
          this.getValue(),
        ),
      );
    }

    for (const event of this.boundEvents) {
      Blockly.browserEvents.unbind(event);
    }
    this.boundEvents.length = 0;
    this.editorPixels = null;
    // Set this.initialValue back to null.
    this.initialValue = null;
    Blockly.DropDownDiv.getContentDiv().classList.remove(
      'contains-bitmap-editor',
    );
  }

  /**
   * Constructs an array of zeros with the specified width and height.
   *
   * @returns The new value.
   */
  private getEmptyArray(): any[][] {
    const newVal: any[][] = [];
    for (let r = 0; r < this.imgHeight; r++) {
      newVal.push([]);
      for (let c = 0; c < this.imgWidth; c++) {
        newVal[r].push({ value: 1, color: 'transparent' });
      }
    }
    return newVal;
  }

  /**
   * Called when a mousedown event occurs within the bounds of a pixel.
   *
   * @param r Row number of grid.
   * @param c Column number of grid.
   */
  private onMouseDownInPixel(r: number, c: number) {
    // Toggle that pixel to the opposite of its value
    const newPixelValue = 1 - this.getPixel(r, c);
    this.setPixel(r, c, newPixelValue);
    this.mouseIsDown = true;
    this.valToPaintWith = newPixelValue;
  }

  /**
   * Called when the mouse drags over a pixel in the editor.
   *
   * @param r Row number of grid.
   * @param c Column number of grid.
   */
  private onMouseEnterPixel(r: number, c: number) {
    if (!this.mouseIsDown) {
      return;
    }
    if (
      this.valToPaintWith !== undefined &&
      this.getPixel(r, c) !== this.valToPaintWith
    ) {
      this.setPixel(r, c, this.valToPaintWith);
    }
  }

  /**
   * Resets mouse state (e.g. After either a mouseup event or if the mouse
   * leaves the editor area).
   */
  private onMouseUp() {
    this.mouseIsDown = false;
    this.valToPaintWith = undefined;
  }

  /**
   * Sets all the pixels in the image to a random value.
   */
  private randomizePixels() {
    // const getRandBinary = () => Math.floor(Math.random() * 2);
    this.forAllCells((r, c) => {
      this.setPixel(r, c, 1);
    });

  }

  /**
   * Sets all the pixels to 0.
   */
  private clearPixels() {
    const cleared = this.getEmptyArray();
    this.fireIntermediateChangeEvent(cleared);
    this.setValue(cleared, false);
  }

  /**
   * Sets the value of a particular pixel.
   *
   * @param r Row number of grid.
   * @param c Column number of grid.
   * @param newValue Value of the pixel.
   */
  private setPixel(r: number, c: number, newValue: number) {
    const newGrid = JSON.parse(JSON.stringify(this.getValue()));
    newGrid[r][c].value = newValue;
    newGrid[r][c].color = this.pixelColours.filled;
    this.fireIntermediateChangeEvent(newGrid);
    this.setValue(newGrid, false);
  }

  private getPixel(row: number, column: number): number {
    const value = this.getValue();
    if (!value) {
      throw new Error(
        'Attempted to retrieve a pixel value when no value is set',
      );
    }

    return (value[row][column] as any).value;
  }

  /**
   * Calls a given function for all cells in the image, with the cell
   * coordinates as the arguments.
   *
   * @param func A function to be applied.
   */
  private forAllCells(func: (row: number, col: number) => void) {
    for (let r = 0; r < this.imgHeight; r++) {
      for (let c = 0; c < this.imgWidth; c++) {
        func(r, c);
      }
    }
  }

  /**
   * Creates a new element with the specified type and class.
   *
   * @param elementType Type of html element.
   * @param className ClassName of html element.
   * @returns The created element.
   */
  private createElementWithClassname(elementType: string, className: string) {
    const newElt = document.createElement(elementType);
    newElt.className = className;
    return newElt;
  }

  /**
   * Binds an event listener to the specified element.
   *
   * @param element Specified element.
   * @param eventName Name of the event to bind.
   * @param callback Function to be called on specified event.
   */
  private bindEvent(
    element: HTMLElement,
    eventName: string,
    callback: (e: Event) => void,
  ) {
    this.boundEvents.push(
      Blockly.browserEvents.conditionalBind(element, eventName, this, callback),
    );
  }

  private fireIntermediateChangeEvent(newValue: any[][]) {
    if (this.getSourceBlock()) {
      Blockly.Events.fire(
        new (Blockly.Events.get(
          Blockly.Events.BLOCK_FIELD_INTERMEDIATE_CHANGE,
        ))(this.getSourceBlock(), this.name || null, this.getValue(), newValue),
      );
    }
  }
  private getColours() {
    const sourceBlock = this.getSourceBlock();
    if (!(sourceBlock instanceof Blockly.BlockSvg)) return;

    const colourSource = sourceBlock.isShadow()
      ? sourceBlock.getParent()
      : sourceBlock;
    if (!colourSource) return;

    return {
      primary: colourSource.getColour(),
      border:  colourSource.getColourTertiary(),
    };
  }

}

interface Buttons {
  readonly randomize: boolean;
  readonly clear: boolean;
}
interface PixelColours {
  readonly empty: string;
  readonly filled: string;
}

export interface FieldBitmapFromJsonConfig extends Blockly.FieldConfig {
  value?: any[][];
  width?: number;
  height?: number;
  buttons?: Buttons;
  fieldHeight?: number;
  colours?: PixelColours;
}

Blockly.fieldRegistry.register('field_bitmap', FieldBitmap);

/**
 * CSS for bitmap field.
 */
Blockly.Css.register(`

.dropdownEditor {
  align-items: center;
  display: flex;
  justify-content: center;
}
.leftContainer {
  align-items: center;
  flex-direction: column;
  display: flex;
  justify-content: center;
  mlargin-right: 10px;
}
.rightContainer {
  // height: 100%;
  height: 218px;
}
.dropdownEditor.has-buttons {
  margin-bottom: 20px;
}
.pixelContainer {
  max-height: 400px;
}
.pixelRow {
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
  height: ${DEFAULT_PIXEL_SIZE}
}
.pixelButton {
  width: ${DEFAULT_PIXEL_SIZE * 2}px;
  height: ${DEFAULT_PIXEL_SIZE * 2}px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 4px;
  border-radius: 4px;
}
.bottomButton {
  width: 5px;
  height: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1px;
} 
.pixelDisplay {
  white-space:pre-wrap;
}
.controlButton {
  margin: 5px 0;
}
.blocklyDropDownContent.contains-bitmap-editor {
  max-height: none;
}
.bottomContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  mtargin-top: 10px;
}
.bottomContainer > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
}
  .colorContainer {
    width: 50px;
    height: 100%;
    border-color: rgb(87, 28, 193);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .colorButton {
    flex: 1 1;
    width: 100%;
    cursor: pointer;
  }
`);