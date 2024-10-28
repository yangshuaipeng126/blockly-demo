
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

goog.provide('Blockly.FieldSlider');

goog.require('Blockly.FieldNumber');

/**
 * Class for an number slider field.
 * @param {string|number=} opt_value The initial value of the field. Should
 *    cast to a number. Defaults to 0.
 * @param {?(string|number)=} opt_min Minimum value.
 * @param {?(string|number)=} opt_max Maximum value.
 * @param {?(string|number)=} opt_precision Precision for value.
 * @param {?Function=} opt_validator A function that is called to validate
 *    changes to the field's value. Takes in a number & returns a validated
 *    number, or null to abort the change.
 * @extends {Blockly.FieldNumber}
 * @constructor
 */
Blockly.FieldSlider = function(opt_value, opt_min, opt_max, opt_precision,
    opt_validator) {
  Blockly.FieldSlider.superClass_.constructor.call(
      this, opt_value, opt_min, opt_max, opt_precision, opt_validator);

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
};
goog.inherits(Blockly.FieldSlider, Blockly.FieldNumber);

/**
 * Constructs a FieldSlider from a JSON arg object.
 * @param {!Object} options A JSON object with options (value, min, max, and
 *                          precision).
 * @return {!FieldSlider} The new field instance.
 * @package
 */
Blockly.FieldSlider.fromJson = function(options) {
  return new Blockly.FieldSlider(options['value'],
      options['min'], options['max'], options['precision']);
};

/**
 * Clean up this FieldAngle, as well as the inherited FieldTextInput.
 * @return {!Function} Closure to call on destruction of the WidgetDiv.
 * @private
 */
Blockly.FieldSlider.prototype.dispose_ = function() {
  return function() {
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
Blockly.FieldSlider.prototype.showEditor_ = function() {
  Blockly.FieldSlider.superClass_.showEditor_.call(this, this.useTouchInteraction_);

  // Build the DOM.
  var editor = document.createElement('div');
  editor.className = 'scratchSliderDiv';
  var sliderInput = document.createElement('input');
  sliderInput.setAttribute('type', 'range');
  sliderInput.setAttribute('min', this.min_);
  sliderInput.setAttribute('max', this.max_);
  sliderInput.setAttribute('step', this.precision_);
  sliderInput.setAttribute('value', this.getValue());
  sliderInput.className = 'scratchFieldSlider';
  sliderInput.style.setProperty('--trackColor', this.sourceBlock_.parentBlock_.getColourTertiary());
  editor.appendChild(sliderInput);
  this.sliderInput_ = sliderInput;

  Blockly.DropDownDiv.getContentDiv().appendChild(editor);
  Blockly.DropDownDiv.setColour(this.sourceBlock_.parentBlock_.getColour(),
      this.sourceBlock_.getColourTertiary());
  Blockly.DropDownDiv.setCategory(this.sourceBlock_.parentBlock_.getCategory());
  Blockly.DropDownDiv.showPositionedByBlock(this, this.sourceBlock_);

  this.boundEvents_.push(Blockly.bindEvent_(
      sliderInput, 'input', this, this.onSliderChange_));

  this.boundEvents_.push(Blockly.bindEventWithChecks_(
      Blockly.FieldTextInput.htmlInput_, 'keyup', this, this.updateSlider_));

  this.boundEvents_.push(Blockly.bindEventWithChecks_(
      Blockly.FieldTextInput.htmlInput_, 'keypress', this, this.updateSlider_));
};

/**
 * Sets the text to match the slider's position.
 * @private
 */
Blockly.FieldSlider.prototype.onSliderChange_ = function() {
  Blockly.FieldTextInput.htmlInput_.value = this.sliderInput_.value;
  this.setValue(this.sliderInput_.value);
  this.validate_();
  this.resizeEditor_();
};

/**
 * Updates the slider when the field rerenders.
 * @private
 */
Blockly.FieldSlider.prototype.updateSlider_ = function() {
  if (!this.sliderInput_) {
    return;
  }
  this.sliderInput_.setAttribute('value', this.getValue());
};


Blockly.Field.register('field_slider', Blockly.FieldSlider);
