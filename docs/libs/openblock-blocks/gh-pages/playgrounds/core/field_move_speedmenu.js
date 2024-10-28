/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Icon picker input field.
 * This is primarily for use in Scratch Horizontal blocks.
 * Pops open a drop-down with icons; when an icon is selected, it replaces
 * the icon (image field) in the original block.
 * @author tmickel@mit.edu (Tim Mickel)
 */
'use strict';

goog.provide('Blockly.FieldMoveSpeedMenu');

goog.require('Blockly.DropDownDiv');

/**
 * Class for an icon menu field.
 * @param {Object} icons List of icons. These take the same options as an Image Field.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldMoveSpeedMenu = function (icons, rotateIcon, ) {
  /** @type {object} */
  this.icons_ = icons;
  this.rotateIcon_ = rotateIcon;
  // Example:
  // [{src: '...', width: 20, height: 20, alt: '...', value: 'machine_value'}, ...]
  // First icon provides the default values.
  var defaultValue = icons[0].value;
  Blockly.FieldMoveSpeedMenu.superClass_.constructor.call(this, defaultValue);
  this.addArgType('iconmenu');
};
goog.inherits(Blockly.FieldMoveSpeedMenu, Blockly.Field);

/**
 * Construct a FieldMoveSpeedMenu from a JSON arg object.
 * @param {!Object} element A JSON object with options.
 * @returns {!Blockly.FieldMoveSpeedMenu} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldMoveSpeedMenu.fromJson = function (element) {
  return new Blockly.FieldMoveSpeedMenu(element['options']);
};

/**
 * Fixed width of the drop-down, in px. Icon buttons will flow inside this width.
 * @type {number}
 * @const
 */
Blockly.FieldMoveSpeedMenu.DROPDOWN_WIDTH = 230;
/**
 * Save the primary colour of the source block while the menu is open, for reset.
 * @type {number|string}
 * @private
 */
Blockly.FieldMoveSpeedMenu.savedPrimary_ = null;

/**
 * Called when the field is placed on a block.
 * @param {Block} block The owning block.
 */
Blockly.FieldMoveSpeedMenu.prototype.init = function (block) {
  if (this.fieldGroup_) {
    // Icon menu has already been initialized once.
    return;
  }
  // Render the arrow icon
  // Fixed sizes in px. Saved for creating the flip transform of the menu renders above the button.
  var arrowSize = 12;
  /** @type {Number} */
  this.arrowX_ = 18;
  /** @type {Number} */
  this.arrowY_ = 10;
  if (block.RTL) {
    // In RTL, the icon position is flipped and rendered from the right (offset by width)
    this.arrowX_ = -this.arrowX_ - arrowSize;
  }
  /** @type {Element} */
  this.arrowIcon_ = Blockly.utils.createSvgElement('image', {
    'height': arrowSize + 'px',
    'width': arrowSize + 'px',
    'transform': 'translate(' + this.arrowX_ + ',' + this.arrowY_ + ')'
  });
  this.arrowIcon_.setAttributeNS('http://www.w3.org/1999/xlink',
      'xlink:href', Blockly.mainWorkspace.options.pathToMedia + 'dropdown-arrow.svg');
  block.getSvgRoot().appendChild(this.arrowIcon_);
  Blockly.FieldMoveSpeedMenu.superClass_.init.call(this, block);
};

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 * @const
 */
Blockly.FieldMoveSpeedMenu.prototype.CURSOR = 'default';

/**
* Set the language-neutral value for this icon drop-down menu.
 * @param {?string} newValue New value.
 * @override
 */
Blockly.FieldMoveSpeedMenu.prototype.setValue = function (newValue) {
  if (newValue === null || newValue === this.value_) {
    return;  // No change
  }
  if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.Change(
      this.sourceBlock_, 'field', this.name, this.value_, newValue));
  }
  this.value_ = newValue;
  // Find the relevant icon in this.icons_ to get the image src.
  this.setParentFieldImage(this.getSrcForValue(this.value_));
};

/**
* Find the parent block's FieldImage and set its src.
 * @param {?string} src New src for the parent block FieldImage.
 * @private
 */
Blockly.FieldMoveSpeedMenu.prototype.setParentFieldImage = function (src) {

  // Only attempt if we have a set sourceBlock_ and parentBlock_
  // It's possible that this function could be called before
  // a parent block is set; in that case, fail silently.

  if (this.sourceBlock_ && this.sourceBlock_.parentBlock_) {
    var parentBlock = this.sourceBlock_.parentBlock_;
    // Loop through all inputs' fields to find the first FieldImage
    for (var i = 0, input; input = parentBlock.inputList[i]; i++) {
      for (var j = 0, field; field = input.fieldRow[j]; j++) {
        if (field instanceof Blockly.FieldImage) {
          // Src for a FieldImage is stored in its value.
          field.setValue(src);
          return;
        }
      }
    }
  }
};

/**
 * Get the language-neutral value from this drop-down menu.
 * @return {string} Current language-neutral value.
 */
Blockly.FieldMoveSpeedMenu.prototype.getValue = function () {
  return this.value_;
};


/**
 * For a language-neutral value, get the src for the image that represents it.
 * @param {string} value Language-neutral value to look up.
 * @return {string} Src to image representing value
 */
Blockly.FieldMoveSpeedMenu.prototype.getSrcForValue = function (value) {
  for (var i = 0, icon; icon = this.icons_[i]; i++) {
    if (icon.value === value) {
      return icon.src;
    }
  }
};

/**
 * Show the drop-down menu for editing this field.
 * @private
 */
Blockly.FieldMoveSpeedMenu.prototype.showEditor_ = function () {
  // If there is an existing drop-down we own, this is a request to hide the drop-down.
  if (Blockly.DropDownDiv.hideIfOwner(this)) {
    return;
  }
  // If there is an existing drop-down someone else owns, hide it immediately and clear it.
  Blockly.DropDownDiv.hideWithoutAnimation();
  Blockly.DropDownDiv.clearContent();
  // Populate the drop-down with the icons for this field.
  var contentDiv = Blockly.DropDownDiv.getContentDiv();
  // Accessibility properties
  contentDiv.setAttribute('role', 'menu');
  contentDiv.setAttribute('aria-haspopup', 'true');

  const baseDiv = document.createElement('div');
  baseDiv.setAttribute('class', 'base__peed-selector-module');
  baseDiv.style.width = '100%'
  this.rotateIcon_.el = Blockly.utils.createSvgElement('svg', {
    'width': this.rotateIcon_.width + 'px',
    'height': this.rotateIcon_.height + 'px',    
  })
  this.rotateIcon_.el.style.position =  'absolute'
  this.rotateIcon_.el.style.zIndex = '1'
  this.rotateIcon_.el.style.marginLeft = '45px'
  this.rotateIcon_.el.setAttribute('class', 'spinningWheel__speed-selector-module-spin spinningWheel__speed-selector-module');
  this.rotateIcon_.el.style.animationPlayState = 'running';
  const rotateUseIcon = Blockly.utils.createSvgElement('use', {
    'href': this.rotateIcon_.src + '#dsmIcon',
  })
  rotateUseIcon.setAttributeNS('http://www.w3.org/1999/xlink',
    'xlink:href', this.rotateIcon_.src + '#dsmIcon')
  this.rotateIcon_.el.appendChild(rotateUseIcon);
  

  this.rotateIcon_.el1 = Blockly.utils.createSvgElement('svg', {
    'width': this.rotateIcon_.width - 10 + 'px',
    'height': this.rotateIcon_.height - 10 + 'px',
  })
  this.rotateIcon_.el1.style.marginLeft = '-45px'
  this.rotateIcon_.el1.style.marginTop = '20px'
  this.rotateIcon_.el1.setAttribute('class', 'spinningWheel__speed-selector-module-spin spinningWheel__speed-selector-module');
  this.rotateIcon_.el1.style.animationPlayState = 'running';
  const rotateUseIcon1 = Blockly.utils.createSvgElement('use', {
    'href': this.rotateIcon_.src + '#dsmIcon',
  })
  rotateUseIcon1.setAttributeNS('http://www.w3.org/1999/xlink',
    'xlink:href', this.rotateIcon_.src + '#dsmIcon')
  this.rotateIcon_.el1.appendChild(rotateUseIcon1);

  baseDiv.appendChild(this.rotateIcon_.el);
  baseDiv.appendChild(this.rotateIcon_.el1);

  
  const buttonsDiv = document.createElement('div');
  buttonsDiv.setAttribute('class', 'buttons__speed-selector-module');

  for (var i = 0, icon; icon = this.icons_[i]; i++) {
    // Icons with the type property placeholder take up space but don't have any functionality
    // Use for special-case layouts
    if (icon.type == 'placeholder') {
      var placeholder = document.createElement('span');
      placeholder.setAttribute('class', 'blocklyDropDownPlaceholder');
      placeholder.style.width = '50px';
      placeholder.style.height = '50px';
      contentDiv.appendChild(placeholder);
      continue;
    }
    var button = document.createElement('button');
    button.setAttribute('id', ':' + i); // For aria-activedescendant
    button.setAttribute('role', 'menuitem');
    button.setAttribute('class', 'blocklyDropDownButton');
    button.style.margin = '0px'
    button.title = icon.alt;
    button.style.width = '50px';
    button.style.height = '50px';
    var backgroundColor = this.sourceBlock_.getColour();
    if (icon.value == this.getValue()) {
      // This icon is selected, show it in a different colour
      backgroundColor = this.sourceBlock_.getColourTertiary();
      button.setAttribute('aria-selected', 'true');
      this.rotateIcon_.el.style.animationDuration = icon.speed + 's';
      this.rotateIcon_.el1.style.animationDuration = icon.speed + 's';
    }
    button.style.backgroundColor = backgroundColor;
    button.style.borderColor = this.sourceBlock_.getColourTertiary();
    Blockly.bindEvent_(button, 'click', this, this.buttonClick_);
    Blockly.bindEvent_(button, 'mouseup', this, this.buttonClick_);
    // These are applied manually instead of using the :hover pseudoclass
    // because Android has a bad long press "helper" menu and green highlight
    // that we must prevent with ontouchstart preventDefault
    Blockly.bindEvent_(button, 'mousedown', button, function (e) {
      this.setAttribute('class', 'blocklyDropDownButton blocklyDropDownButtonHover');
      e.preventDefault();
    });
    Blockly.bindEvent_(button, 'mouseover', button, function () {
      this.setAttribute('class', 'blocklyDropDownButton blocklyDropDownButtonHover');
      contentDiv.setAttribute('aria-activedescendant', this.id);
    });
    Blockly.bindEvent_(button, 'mouseout', button, function () {
      this.setAttribute('class', 'blocklyDropDownButton');
      contentDiv.removeAttribute('aria-activedescendant');
    });
    const buttonSvg = Blockly.utils.createSvgElement('svg', {
      'height': icon.height + 'px',
      'width': icon.width + 'px',
    });
    const use = Blockly.utils.createSvgElement('use', {
      'href': icon.iconSrc + '#dsmIcon',
    })
    use.setAttributeNS('http://www.w3.org/1999/xlink',
      'xlink:href', icon.iconSrc + '#dsmIcon')
    buttonSvg.appendChild(use);

    // buttonImg.src = icon.src;
    //buttonImg.alt = icon.alt;
    // Upon click/touch, we will be able to get the clicked element as e.target
    // Store a data attribute on all possible click targets so we can match it to the icon.
    button.setAttribute('data-value', icon.value);
    button.setAttribute('speed-value', icon.speed);
    buttonSvg.setAttribute('data-value', icon.value);
    buttonSvg.setAttribute('speed-value', icon.speed);
    use.setAttribute('data-value', icon.value);
    use.setAttribute('speed-value', icon.speed);
    button.appendChild(buttonSvg);
    buttonsDiv.appendChild(button);
    icon.el = button;

  }
  baseDiv.appendChild(buttonsDiv);
  contentDiv.appendChild(baseDiv);

  if (this.icons_.length > 3) {
    contentDiv.style.width = Blockly.FieldMoveSpeedMenu.DROPDOWN_WIDTH + 'px';
  } else {
    contentDiv.style.width = 'auto';
  }

  Blockly.DropDownDiv.setColour(this.sourceBlock_.getColour(), this.sourceBlock_.getColourTertiary());
  Blockly.DropDownDiv.setCategory(this.sourceBlock_.parentBlock_.getCategory());

  // Update source block colour to look selected
  this.savedPrimary_ = this.sourceBlock_.getColour();
  this.sourceBlock_.setColour(this.sourceBlock_.getColourSecondary(),
    this.sourceBlock_.getColourSecondary(),
    this.sourceBlock_.getColourTertiary());

 
  // Calculate positioning based on the field position.
  var scale = this.sourceBlock_.workspace.scale;
  var bBox = {width: this.size_.width, height: this.size_.height};
  bBox.width *= scale;
  bBox.height *= scale;
  var position = this.fieldGroup_.getBoundingClientRect();
  var primaryX = position.left + bBox.width / 2;
  var primaryY = position.top + bBox.height;
  var secondaryX = primaryX;
  var secondaryY = position.top;
  // Set bounds to workspace; show the drop-down.
  Blockly.DropDownDiv.setBoundsElement(this.sourceBlock_.workspace.getParentSvg().parentNode);
  Blockly.DropDownDiv.show(
      this, primaryX, primaryY, secondaryX, secondaryY, this.onHide_.bind(this));
};

/**
 * Callback for when a button is clicked inside the drop-down.
 * Should be bound to the FieldMoveSpeedMenu.
 * @param {Event} e DOM event for the click/touch
 * @private
 */
Blockly.FieldMoveSpeedMenu.prototype.buttonClick_ = function (e) {
  var value = e.target.getAttribute('data-value');
  this.setValue(value);
  const speed = e.target.getAttribute('speed-value');
  this.rotateIcon_.el.style.animationDuration = speed + 's';
  this.rotateIcon_.el1.style.animationDuration = speed + 's';

  if (this.sourceBlock_) {
    this.sourceBlock_.setColour(this.savedPrimary_,
      this.sourceBlock_.getColourSecondary(),
      this.sourceBlock_.getColourTertiary());
  }
  Blockly.DropDownDiv.content_.removeAttribute('role');
  Blockly.DropDownDiv.content_.removeAttribute('aria-haspopup');
  Blockly.DropDownDiv.content_.removeAttribute('aria-activedescendant');
  var backgroundColor = this.sourceBlock_.getColour();
  const borderColor = this.sourceBlock_.getColourTertiary()
  this.icons_.forEach(item => {
    if (item.el) {
      item.el.removeAttribute('aria-selected');
      item.el.style.backgroundColor = backgroundColor;
      item.el.style.borderColor = borderColor
    }
  })
  backgroundColor = this.selectedBgColor_ || this.sourceBlock_.getColourTertiary();
  let target = e.target;
  if (e.target.nodeName === 'svg') {
    target = e.target.parentElement
  } else if (e.target.nodeName === 'use') {
    target = e.target.parentElement.parentElement
  }
  target.style.backgroundColor = backgroundColor;
  target.style.borderColor = borderColor
  target.setAttribute('aria-selected', 'true');
};

/**
 * Callback for when the drop-down is hidden.
 */
Blockly.FieldMoveSpeedMenu.prototype.onHide_ = function () {
  // Reset the button colour and clear accessibility properties
  // Only attempt to do this reset if sourceBlock_ is not disposed.
  // It could become disposed before an onHide_, for example,
  // when a block is dragged from the flyout.
  if (this.sourceBlock_) {
    this.sourceBlock_.setColour(this.savedPrimary_,
      this.sourceBlock_.getColourSecondary(),
      this.sourceBlock_.getColourTertiary());
  }
  Blockly.DropDownDiv.content_.removeAttribute('role');
  Blockly.DropDownDiv.content_.removeAttribute('aria-haspopup');
  Blockly.DropDownDiv.content_.removeAttribute('aria-activedescendant');
  // // Unflip the arrow if appropriate
  // this.arrowIcon_.setAttribute('transform', 'translate(' + this.arrowX_ + ',' + this.arrowY_ + ')');
};


Blockly.Field.register('field_move_speedmenu', Blockly.FieldMoveSpeedMenu);
