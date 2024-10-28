
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Number slider input field.
 * @author kozbial@google.com (Monica Kozbial)
 */

'use strict';

goog.provide('Blockly.FieldInputDropdown');

goog.require('Blockly.FieldTextInput');

Blockly.FieldInputDropdown = function (opt_value, opt_validator, opt_restrictor) {
  Blockly.FieldInputDropdown.superClass_.constructor.call(
    this, opt_value, opt_validator, opt_restrictor);

  /**
 * Array holding info needed to unbind events.
 * Used for disposing.
 * Ex: [[node, name, func], [node, name, func]].
 * @type {!Array.<Array<?>>}
 * @private
 */
  this.boundEvents_ = [];

  /**
 * The HTML range input element.
 * @type {?HTMLInputElement}
 * @private
 */
  this.sliderInput_ = null;
  this.shadowElement_ = null
};
goog.inherits(Blockly.FieldInputDropdown, Blockly.Field);

Blockly.FieldInputDropdown.DROPDOWN_WIDTH = 244;

Blockly.FieldInputDropdown.prototype.init = function () {
  Blockly.FieldRotateDropdown.superClass_.init.call(this);
  this.sourceBlock_.outputShape_ = Blockly.OUTPUT_SHAPE_ROUND;
}
/**
 * Constructs a FieldInputDropdown from a JSON arg object.
 * @param {!Object} options A JSON object with options (value, min, max, and
 *                          precision).
 * @return {!FieldInputDropdown} The new field instance.
 * @package
 */
Blockly.FieldInputDropdown.fromJson = function (options) {
  return new Blockly.FieldInputDropdown(options['value'],
    options['validator'], options['restrictor']);
};

/**
 * Clean up this FieldAngle, as well as the inherited FieldTextInput.
 * @return {!Function} Closure to call on destruction of the WidgetDiv.
 * @private
 */
Blockly.FieldInputDropdown.prototype.dispose_ = function () {
  return function () {
    for (var event in this.boundEvents_) {
      Blockly.unbindEvent_(event);
    }
    this.sliderInput_ = null;
  };
};

/**
 * Show the inline free-text editor on top of the text along with the slider
 *    editor.
 * @protected
 * @override
 */
Blockly.FieldInputDropdown.prototype.showEditor_ = function () {

  Blockly.DropDownDiv.hideWithoutAnimation();
  Blockly.DropDownDiv.clearContent();
  var contentDiv = Blockly.DropDownDiv.getContentDiv();
  // Accessibility properties
  contentDiv.setAttribute('role', 'menu');
  contentDiv.setAttribute('aria-haspopup', 'true');
  // Build the DOM.
  var editor = document.createElement('div');
  editor.className = 'lls-text-selector';
  var sliderInput = document.createElement('input');
  sliderInput.setAttribute('value', this.getValue());
  sliderInput.className = 'lls-text-selector__input';
  const p = document.createElement('p');
  p.style.margin = '0';
  p.style.padding = '0';

  p.innerHTML = this.getValue();
  p.className = 'lls-text-selector__shadow-text'

  editor.appendChild(sliderInput);
  editor.appendChild(p);
  this.sliderInput_ = sliderInput;
  this.shadowElement_ = p;
  contentDiv.style.width = Blockly.FieldInputDropdown.DROPDOWN_WIDTH + 'px';
  contentDiv.appendChild(editor);
  Blockly.DropDownDiv.setColour(this.sourceBlock_.parentBlock_.getColour(),
    this.sourceBlock_.getColourTertiary());
  Blockly.DropDownDiv.setCategory(this.sourceBlock_.parentBlock_.getCategory());
  Blockly.DropDownDiv.showPositionedByBlock(this, this.sourceBlock_);

  this.boundEvents_.push(Blockly.bindEvent_(
    sliderInput, 'input', this, this.onSliderChange_));


  
};

/**
 * Sets the text to match the slider's position.
 * @private
 */
Blockly.FieldInputDropdown.prototype.onSliderChange_ = function () {
  this.textElement_.innerHTML = this.sliderInput_.value;
  this.setValue(this.sliderInput_.value);
};



Blockly.Field.register('field_inputdropdown', Blockly.FieldInputDropdown);
