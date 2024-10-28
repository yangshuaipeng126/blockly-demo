
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

goog.provide('Blockly.FieldInputNumber');

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
Blockly.FieldInputNumber = function (opt_value, opt_min, opt_max, opt_precision,
  opt_validator) {
  Blockly.FieldInputNumber.superClass_.constructor.call(
    this, opt_value, opt_min, opt_max, opt_precision, opt_validator);
  // this.outputShape_ = Blockly.OUTPUT_SHAPE_ROUND;

};
goog.inherits(Blockly.FieldInputNumber, Blockly.FieldNumber);
/**
 * Constructs a FieldInputNumber from a JSON arg object.
 * @param {!Object} options A JSON object with options (value, min, max, and
 *                          precision).
 * @return {!FieldInputNumber} The new field instance.
 * @package
 */
Blockly.FieldInputNumber.fromJson = function (options) {
  return new Blockly.FieldInputNumber(options['value'],
    options['min'], options['max'], options['precision']);
};


Blockly.FieldInputNumber.prototype.init = function () {
  Blockly.FieldRotateDropdown.superClass_.init.call(this);
  this.sourceBlock_.outputShape_ = Blockly.OUTPUT_SHAPE_ROUND;
}

Blockly.FieldInputNumber.prototype.maybeSaveEdit_ = function () {
  this.textElement_.innerHTML = this.getValue();
}


Blockly.Field.register('field_inputNumber', Blockly.FieldInputNumber);
