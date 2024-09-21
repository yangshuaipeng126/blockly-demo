/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A field used to customize a turtle.
 * @author bekawestberg@gmail.com (Beka Westberg)
 */

import * as Blockly from 'blockly/core';

export class FieldTurtle extends Blockly.Field {
  // Since this field is editable we must also define serializable as true
  // (for backwards compatibility reasons serializable is false by default).
  SERIALIZABLE = true;

  // The cursor property defines what the mouse will look like when the user
  // hovers over the field. By default the cursor will be whatever
  // .blocklyDraggable's cursor is defined as (vis. grab). Most fields define
  // this property as 'default'.
  CURSOR = 'pointer';

  // How far to move the text to keep it to the right of the turtle.
  // May change if the turtle gets fancy enough.
  TEXT_OFFSET_X = 5;

  checkList = []
  /**
   * Array holding info needed to unbind events.
   * Used for disposing.
   * @type {!Array<!Blockly.browserEvents.Data>}
   * @private
   */
  boundEvents_ = [];

  // Generally field's values should be optional, and have logical defaults.
  // If this is not possible (for example image fields can't have logical
  // defaults) the field should throw a clear error when a value is not provided.
  // Editable fields also generally accept validators, so we will accept a
  // validator.
  constructor(opt_pattern, opt_hat, opt_turtleName, opt_validator) {
    // The turtle field contains an object as its value, so we need to compile
    // the parameters into an object.
    const value = {};
    value.turtleName = opt_turtleName || 'A';
    // A field constructor should always call its parent constructor, because
    // that helps keep the code organized and DRY.
    super(value, opt_validator);

    /**
     * The size of the area rendered by the field.
     * @type {Blockly.utils.Size}
     * @protected
     * @override
     */
    this.size_ = new Blockly.utils.Size(0, 0);
  }


  // This allows the field to be constructed using a JSON block definition.
  static fromJson(options) {
    // In this case we simply pass the JSON options along to the constructor,
    // but you can also use this to get message references, and other such things.
    // `this` might be a subclass of FieldTurtle if that class doesn't override
    // the static fromJson method.
    return new this(options['pattern'], options['hat'], options['turtleName']);
  }
  doClassValidation_(newValue) {
    if (newValue.turtleName == undefined) {
      newValue.turtleName = this.displayValue_ && this.displayValue_.turtleName;
    }

    // This is a strategy for dealing with defaults on multi-part values.
    // The class validator sets individual properties of the object to null
    // to indicate that they are invalid, and then caches that object to the
    // cachedValidatedValue_ property. This way the field can, for
    // example, properly handle an invalid pattern, combined with a valid hat.
    // This can also be done with local validators.
    this.cachedValidatedValue_ = newValue;

    // Always be sure to return!
    if (!newValue.turtleName) {
      return null;
    }
    return newValue;
  }

  // Saves the new field value. Called by the setValue function.
  doValueUpdate_(newValue) {
    // The default function sets this field's this.value_ property to the
    // newValue, and its this.isDirty_ property to true. The isDirty_ property
    // tells the setValue function whether the field needs to be re-rendered.
    super.doValueUpdate_(newValue);
    this.displayValue_ = newValue;
    // Since this field has custom UI for invalid values, we also want to make
    // sure it knows it is now valid.
    this.isValueInvalid_ = false;
  }

  // Notifies that the field that the new value was invalid. Called by
  // setValue function. Can either be triggered by the class validator, or the
  // local validator.
  doValueInvalid_(invalidValue) {
    // By default this function is no-op, meaning if the new value is invalid
    // the field simply won't be updated. This field has custom UI for invalid
    // values, so we override this function.
    // We want the value to be displayed like normal.
    // But we want to flag it as invalid, so the render_ function knows to
    // make the borderRect_ red.
    this.displayValue_ = invalidValue;
    this.isDirty_ = true;
    this.isValueInvalid_ = true;
  }
  // Used to create the DOM of our field.
  initView() {
    // Because we want to have both a borderRect_ (background) and a
    // textElement_ (text) we can call the super-function. If we only wanted
    // one or the other, we could call their individual createX functions.
    super.initView();

    // Note that the field group is created by the abstract field's init_
    // function. This means that *all elements* should be children of the
    // fieldGroup_.
    this.createView_();
  }

  // Updates how the field looks depending on if it is editable or not.
  updateEditable() {
    if (!this.fieldGroup_) {
      // Not initialized yet.
      return;
    }
    // The default functionality just makes it so the borderRect_ does not
    // highlight when hovered.
    super.updateEditable();
    // Things like this are best applied to the clickTarget_. By default the
    // click target is the same as getSvgRoot, which by default is the
    // fieldGroup_.
    const group = this.getClickTarget_();
    if (!this.isCurrentlyEditable()) {
      group.style.cursor = 'not-allowed';
    } else {
      group.style.cursor = this.CURSOR;
    }
  }

  // Updates the field's on-block display based on the current display value.
  render_() {
    const value = this.displayValue_;
    // Always do editor updates inside render. This makes sure the editor
    // always displays the correct value, even if a validator changes it.
    if (this.editor_) {
      this.renderEditor_();
    }


    // Always modify the textContent_ rather than the textElement_. This
    // allows fields to append DOM to the textElement (e.g. the angle field).
    this.textContent_.nodeValue = value.turtleName;

    if (this.isValueInvalid_) {
      this.borderRect_.style.fill = '#f99';
      this.borderRect_.style.fillOpacity = 1;
    } else {
      this.borderRect_.style.fill = '#fff';
      this.borderRect_.style.fillOpacity = 0.6;
    }

    this.updateSize_();
  }

  renderEditor_() {
    const value = this.displayValue_;
    // this.editor_.turtleNameText.textElement.nodeValue = value.turtleName;
  }

  // Used to update the size of the field. This function's logic could be simply
  // included inside render_ (it is not called anywhere else), but it is
  // usually separated to keep code more organized.
  updateSize_() {
    const bbox =this.textElement_.getBBox();
    console.log(bbox);
    let width = bbox.width;
    let height = bbox.height;
    if (this.borderRect_) {
      width += this.constants_.FIELD_BORDER_RECT_X_PADDING * 8;
      height += this.constants_.FIELD_BORDER_RECT_X_PADDING;
      this.borderRect_.setAttribute('width', width);
      this.borderRect_.setAttribute('height', height);
    }
    // Note how both the width and the height can be dynamic.
    this.size_.width = width;
    this.size_.height = height;
  }
  // Called when the field is clicked. It is usually used to show an editor,
  // but it can also be used for other things e.g. the checkbox field uses
  // this function to check/uncheck itself.
  showEditor_() {
    this.editor_ = this.dropdownCreate_();
    this.renderEditor_();
    Blockly.DropDownDiv.getContentDiv().appendChild(this.editor_);

    // These allow us to have the editor match the block's colour.
    const fillColour = this.sourceBlock_.getColour();
    Blockly.DropDownDiv.setColour(
      fillColour,
      this.sourceBlock_.style.colourTertiary,
    );

    // Always pass the dropdown div a dispose function so that you can clean
    // up event listeners when the editor closes.
    Blockly.DropDownDiv.showPositionedByField(
      this,
      this.dropdownDispose_.bind(this),
    );
  }

  // Creates the UI of the editor, and adds event listeners to it.
  dropdownCreate_() {
    const createRow = function (table) {
      const row = table.appendChild(document.createElement('tr'));
      row.className = 'row';
      return row;
    };

    const createTextNode = function (row, text) {
      const cell = document.createElement('div');
      cell.className = 'text';
      const textElem = document.createTextNode(text);
      cell.appendChild(textElem);
      cell.textElement = textElem;
      row.appendChild(cell);
      return cell;
    };

    const addButtonListener = (e) => {
      if(e.target.className.includes('selected')) {
        e.target.parentElement.className = e.target.parentElement.className.replace(' sensor-port-pair--selected', '')
        e.target.style.color = '#000000'
        e.target.className = e.target.className.replace(' selected', '')
        const spliceIndex = this.checkList.findIndex((item) => item === e.target.attributes['data-testid'].value)
        console.log(spliceIndex);
        spliceIndex > -1 ? this.checkList.splice(spliceIndex, 1) : null
      } else {
        e.target.parentElement.className += ' sensor-port-pair--selected'
        e.target.style.color = this.sourceBlock_.getColour();
        e.target.className += ' selected'
        this.textContent_.nodeValue = e.target.attributes['data-testid'].value
        this.checkList.push(e.target.attributes['data-testid'].value)
      }
      console.log(this.checkList);
      if(this.checkList.length === 2) {
        selectAllButton.parentElement.className += ' sensor-port-pair--selected'
        selectAllButton.style.color = this.sourceBlock_.getColour();
        selectAllButton.className += ' selected'
        this.textContent_.nodeValue = 'A + B'
      } else  {
        selectAllButton.parentElement.className = selectAllButton.parentElement.className.replace(' sensor-port-pair--selected', '')
        selectAllButton.style.color = '#000000'
        selectAllButton.className = selectAllButton.className.replace(' selected', '')
        this.textContent_.nodeValue = this.checkList[0]

      }

    }

    const widget = document.createElement('div');
    widget.className = 'customFieldsTurtleWidget blocklyNonSelectable';

    const topContainer = document.createElement('div');
    topContainer.className = 'lls-port-selector__hub-wrapper';
    widget.appendChild(topContainer);

    const selector__hub = document.createElement('div');
    selector__hub.className = 'lls-port-selector__hub';
    topContainer.appendChild(selector__hub);

    const left_hub = document.createElement('div');
    left_hub.className = 'lls-port-selector__sensors lls-port-selector__sensors--left';

    const left_item = document.createElement('div');
    left_item.className = 'sensor-port-pair sensor-port-pair--dimmed';
    left_hub.appendChild(left_item);
    selector__hub.appendChild(left_hub);

    const Abutton = document.createElement('div');
    Abutton.className = 'button sensor-port-pair__port-button';
    Abutton.textContent = 'A';
    Abutton.setAttribute('data-testid', 'A')
    Abutton.addEventListener('click', addButtonListener);
    left_item.appendChild(Abutton);

    const right_hub = document.createElement('div');
    right_hub.className = 'lls-port-selector__sensors lls-port-selector__sensors--right';

    const right_item = document.createElement('div');
    right_item.className = 'sensor-port-pair sensor-port-pair--dimmed';
    right_hub.appendChild(right_item);

    const Bbutton = document.createElement('div');
    Bbutton.className = 'button sensor-port-pair__port-button';
    Bbutton.textContent = 'B';
    Bbutton.setAttribute('data-testid', 'B')
    Bbutton.addEventListener('click', addButtonListener);
    right_item.appendChild(Bbutton);
    selector__hub.appendChild(right_hub);




    // let row = createRow(table);
    // leftArrow = createLeftArrow(row);
    // widget.turtleNameText = createTextNode(row, this.displayValue_.turtleName);
    // rightArrow = createRightArrow(row);
    // this.boundEvents_.push(
    //   Blockly.browserEvents.bind(
    //     leftArrow,
    //     'mouseup',
    //     this,
    //     createArrowListener('turtleName', FieldTurtle.NAMES, -1),
    //   ),
    // );
    // this.boundEvents_.push(
    //   Blockly.browserEvents.bind(
    //     rightArrow,
    //     'mouseup',
    //     this,
    //     createArrowListener('turtleName', FieldTurtle.NAMES, 1),
    //   ),
    // );

    const selectAllHandler = (e, Abutton, Bbutton) => {
      if(e.target.className.includes('selected')) {
        e.target.parentElement.className = e.target.parentElement.className.replace(' sensor-port-pair--selected', '')
        e.target.style.color = '#000000'
        e.target.className = e.target.className.replace(' selected', '')

        Abutton.parentElement.className = Abutton.parentElement.className.replace(' sensor-port-pair--selected', '')
        Abutton.style.color = '#000000'
        Abutton.className = Abutton.className.replace(' selected', '')

        Bbutton.parentElement.className = Bbutton.parentElement.className.replace(' sensor-port-pair--selected', '')
        Bbutton.style.color = '#000000'
        Bbutton.className = Bbutton.className.replace(' selected', '')
        this.checkList = []
        this.textContent_.nodeValue = 'A'
      } else {
        e.target.parentElement.className += ' sensor-port-pair--selected'
        e.target.style.color = this.sourceBlock_.getColour();
        e.target.className += ' selected'
        this.textContent_.nodeValue = 'A + B'

        Abutton.parentElement.className += ' sensor-port-pair--selected'
        Abutton.style.color = this.sourceBlock_.getColour();
        Abutton.className += ' selected'

        Bbutton.parentElement.className += ' sensor-port-pair--selected'
        Bbutton.style.color = this.sourceBlock_.getColour();
        Bbutton.className += ' selected'

        this.checkList = ['A', 'B']
        
      }
    }

    const bottomContainer = document.createElement('div');
    bottomContainer.className = 'lls-port-selector__multiple-actions';
    const selectAllButton = document.createElement('div');
    selectAllButton.className = 'button lls-port-selector__button-all';
    selectAllButton.textContent = '所有';
    selectAllButton.setAttribute('data-testid', 'all')
    selectAllButton.addEventListener('click', (e) => selectAllHandler(e, Abutton, Bbutton));
    bottomContainer.appendChild(selectAllButton);
    // this.boundEvents_.push(
    //   Blockly.browserEvents.bind(selectAllButton, 'mouseup', this, function () {
    //     const value = {};

    //     this.setValue(value);
    //   }),
    // );
    widget.appendChild(bottomContainer);

    return widget;
  }

  // Cleans up any event listeners that were attached to the now hidden editor.
  dropdownDispose_() {
    for (const event of this.boundEvents_) {
      Blockly.browserEvents.unbind(event);
    }
    this.boundEvents_.length = 0;
  }

  // Updates the field's colour based on the colour of the block. Called by
  // block.applyColour.
  applyColour() {
    if (!this.sourceBlock_) {
      return;
    }

  }


  // Called by initView to create all of the SVGs. This is just used to keep
  // the code more organized.
  createView_() {
    this.movableGroup_ = Blockly.utils.dom.createSvgElement(
      'g',
      {
        transform: 'translate(0,5)',
      },
      this.fieldGroup_,
    );

    this.defs_ = Blockly.utils.dom.createSvgElement(
      'defs',
      {},
      this.fieldGroup_,
    );

    this.movableGroup_.appendChild(this.textElement_);
    this.textElement_.setAttribute(
      'transform',
      'translate(' + this.TEXT_OFFSET_X + ',15)',
    );

  }
}

// Blockly needs to know the JSON name of this field. Usually this is
// registered at the bottom of the field class.
Blockly.fieldRegistry.register('field_turtle', FieldTurtle);

/**
 * CSS for bitmap field.
 */
Blockly.Css.register(`
  .customFieldsTurtleWidget {
    height: 287px;
    width: 290px;
  }
  .lls-port-selector__hub-wrapper {
    padding-bottom: 52px;
    display: flex;
    justify-content: space-evenly;
  }
  .lls-port-selector__hub {
    position: relative;
    margin-top: 34px;
    height: 144px;
    width: 186px;
    border: 2px solid #000;
    border-radius: 5px;
    box-sizing: content-box;
    overflow: hidden;
  }
  .lls-port-selector__hub::after {
    content: "";
    border: 2px solid #000;
    position: absolute;
    top: 15px;
    height: 30px;
    width: 30px;
    left: 78px;
    border-radius: 4px;
    opacity: .6;
  }
  .sensor-port-pair {
    display: flex;
    flex-direction: column;
    width: initial;
    height: 72px;
    justify-content: space-between;
    align-items: center;
    border-color: #000;
  }
  .sensor-port-pair--dimmed {
    opacity: .6;
  }
  .sensor-port-pair--selected {
   opacity: 1;
  }
  .button {
    cursor: pointer;
    color: #000;
    border-style: solid;
    border-color: #000;
    border-width: 2px;
    border-radius: 5px;
    text-transform: uppercase;
    text-align: center;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.6px;
    font-weight: 700;
  }
  .selected {
    background: #000;
  }
  .sensor-port-pair__port-button {
    display: flex;
    justify-content: center;
    border: #000;
    border-style: solid;
    border-radius: 2px;
    border-width: 2px;
    vertical-align: middle;
    text-align: center;
    align-items: center;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.6px;
    font-weight: 700;
    width: 40px;
    height: 33px;
    line-height: 29px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .lls-port-selector__sensors--left {
    left: 6px;
  } 
  .lls-port-selector__sensors {
    height: initial;
    top: initial;
    bottom: -41px;
    width: 72px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
  .lls-port-selector__sensors--right {
    right: 6px;
    left: initial;
  }
  .lls-port-selector__multiple-actions {
    display: flex;
    justify-content: center;
  }
    .lls-port-selector__multiple-actions .button {
    line-height: 27px;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.5px;
    font-weight: 700;
    min-width: 76px;
    margin: 0 5px;
    padding: 0 5px;
}
  .lls-port-selector__button-all {

  }
`)