
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

goog.provide('Blockly.FieldNumberMenu');

goog.require('Blockly.FieldNumber');

/**
 * Class for an number slider field.
 * @param {string|number=} opt_value The initial value of the field. Should
 *    cast to a number. Defaults to 0.
 * @param {Array} menuGenerator_ A function that is called to generate the menu items.
 * @param {?(string|number)=} opt_min Minimum value.
 * @param {?(string|number)=} opt_max Maximum value.
 * @param {?(string|number)=} opt_precision Precision for value.
 * @param {?Function=} opt_validator A function that is called to validate
 *    changes to the field's value. Takes in a number & returns a validated
 *    number, or null to abort the change.
 * @extends {Blockly.FieldNumber}
 * @constructor
 */
Blockly.FieldNumberMenu = function (opt_value, menuGenerator, opt_min, opt_max, opt_precision,
  opt_validator) {
  this.menuGenerator_ = menuGenerator;

  // Blockly.FieldNumberMenu.superClass_.constructor.call(
  //   this, opt_value, opt_min, opt_max, opt_precision, opt_validator);
  Blockly.FieldNumberMenu.superClass_.constructor.call(
    this, opt_value, (e) => {
      if (e !== '?') {
        if (opt_min !== undefined) {
          e = Math.max(e, opt_min);
        }
        if (opt_max !== undefined) {
          e = Math.min(e, opt_max);
        }
      }
      return e;
    });
  Blockly.FieldNumberMenu.superClass_.ERROR_COLOR = "#fff"
  // this.outputShape_ = Blockly.OUTPUT_SHAPE_ROUND;

};
goog.inherits(Blockly.FieldNumberMenu, Blockly.FieldTextInput);
/**
 * Constructs a FieldNumberMenu from a JSON arg object.
 * @param {!Object} options A JSON object with options (value, min, max, and
 *                          precision).
 * @return {!FieldNumberMenu} The new field instance.
 * @package
 */
Blockly.FieldNumberMenu.fromJson = function (options) {
  return new Blockly.FieldNumberMenu(options['value'],
    options['min'], options['max'], options['precision']);
};

Blockly.FieldNumberMenu.DROPDOWN_WIDTH = 200

Blockly.FieldNumberMenu.prototype.init = function () {
  Blockly.FieldRotateDropdown.superClass_.init.call(this);
  this.sourceBlock_.setColour('#fff')
  this.sourceBlock_.outputShape_ = Blockly.OUTPUT_SHAPE_ROUND;
}

Blockly.FieldNumberMenu.prototype.showEditor_ = function () {
  Blockly.FieldNumberMenu.superClass_.showEditor_.call(this, this.useTouchInteraction_);
  Blockly.FieldTextInput.htmlInput_.style.backgroundColor = '#fff'

  // Populate the drop-down with the icons for this field.
  var contentDiv = Blockly.DropDownDiv.getContentDiv();
  // Accessibility properties
  contentDiv.setAttribute('role', 'menu');
  contentDiv.setAttribute('aria-haspopup', 'true');

  const container = document.createElement('div');
  container.setAttribute('class', 'lls-sound-selector');
  const gird = document.createElement('div');
  gird.setAttribute('class', 'lls-sound-selector__colors');
  container.style.boxSizing = 'border-box'
  container.style.height = '100%'
  gird.style.boxSizing = 'border-box'
  gird.style.height = '100%'

  container.appendChild(gird);

  for (var i = 0, icon; icon = this.menuGenerator_[i]; i++) {
    // Icons with the type property placeholder take up space but don't have any functionality
    // Use for special-case layouts
    if (icon.type == 'placeholder') {
      var placeholder = document.createElement('span');
      placeholder.setAttribute('class', 'blocklyDropDownPlaceholder');
      placeholder.style.width = icon.width + 'px';
      placeholder.style.height = icon.height + 'px';
      contentDiv.appendChild(placeholder);
      continue;
    }
    var content = document.createElement('div');
    content.setAttribute('id', ':' + i); // For aria-activedescendant
    content.setAttribute('role', 'menuitem');
    content.setAttribute('class', 'lls-sound-selector__color')
    // var backgroundColor = '';
    if (icon.value == this.getValue()) {
      // This icon is selected, show it in a different colour
      // backgroundColor = this.sourceBlock_.getColourTertiary();
      content.classList.add('lls-sound-selector__color--selected')
      content.setAttribute('aria-selected', 'true');
    }
    // content.style.backgroundColor = backgroundColor;
    Blockly.bindEvent_(content, 'click', this, this.buttonClick_);
    // Blockly.bindEvent_(content, 'mouseup', this, this.buttonClick_);
    var item = document.createElement('div');
    if (icon.value !== 'random') {
      item.innerHTML = icon.label;
    } else {
      item = Blockly.utils.createSvgElement('svg', {
        'width': '40px',
        'height': '40px',
      })
      const randomIcon = Blockly.mainWorkspace.options.pathToMedia + 'icons/AdornerRandom.svg'
      const rotateUseIcon = Blockly.utils.createSvgElement('use', {
        'href': randomIcon + '#dsmIcon',
      })
      rotateUseIcon.setAttributeNS('http://www.w3.org/1999/xlink',
        'xlink:href', randomIcon + '#dsmIcon')
      rotateUseIcon.setAttribute('data-value', icon.value);
      item.appendChild(rotateUseIcon)
    }
    item.setAttribute('class', 'lls-sound-selector__color__inner');
    content.setAttribute('data-value', icon.value);
    item.setAttribute('data-value', icon.value);
    content.appendChild(item);
    gird.appendChild(content);
    icon.el = content
  }
  contentDiv.appendChild(container);
  if (this.menuGenerator_.length > 3) {
    contentDiv.style.width = Blockly.FieldNumberMenu.DROPDOWN_WIDTH + 'px';
  } else {
    contentDiv.style.width = 'auto';
  }
  // contentDiv.style.height = '170px';
  Blockly.DropDownDiv.setColour(this.sourceBlock_.parentBlock_.getColour(),
    this.sourceBlock_.getColourTertiary());
  Blockly.DropDownDiv.setCategory(this.sourceBlock_.parentBlock_.getCategory());
  Blockly.DropDownDiv.showPositionedByBlock(this, this.sourceBlock_);
  // Set bounds to workspace; show the drop-down.
  Blockly.DropDownDiv.setBoundsElement(this.sourceBlock_.workspace.getParentSvg().parentNode);
  var scale = this.sourceBlock_.workspace.scale;
  // Offset for icon-type horizontal blocks.
  var secondaryYOffset = (
    -(Blockly.BlockSvg.MIN_BLOCK_Y * scale) - (Blockly.BlockSvg.FIELD_Y_OFFSET * scale)
  );
  Blockly.DropDownDiv.showPositionedByBlock(
    this, this.sourceBlock_, this.onHide_.bind(this), secondaryYOffset);
}
/**
 * Callback for when a button is clicked inside the drop-down.
 * Should be bound to the FieldImageMenu.
 * @param {Event} e DOM event for the click/touch
 * @private
 */
Blockly.FieldNumberMenu.prototype.buttonClick_ = function (e) {
  var value = e.target.getAttribute('data-value');
  this.menuGenerator_.forEach((item, index) => {
    if (item.value == value) {
      item.el.classList.add('lls-sound-selector__color--selected')
      item.el.setAttribute('aria-selected', 'true');
      Blockly.FieldTextInput.htmlInput_.value = item.label;
      this.setValue(item.label);
      this.textElement_.innerHTML = this.getValue();
      // 重新渲染块
      this.render_();
    } else {
      item.el.classList.remove('lls-sound-selector__color--selected')
      item.el.removeAttribute('aria-selected');
    }
  }
  )

};


Blockly.FieldNumberMenu.prototype.onHide_ = function () {
  this.setValue(this.classValidator(this.getValue()))
  this.textElement_.innerHTML = this.text_;

}


Blockly.Field.register('field_numbermenu', Blockly.FieldNumberMenu);
