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

goog.provide('Blockly.FieldMotorSpeedMenu');

goog.require('Blockly.DropDownDiv');

/**
 * Class for an icon menu field.
 * @param {Object} icons List of icons. These take the same options as an Image Field.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldMotorSpeedMenu = function (icons, rotateIcon, selectOption) {
  /** @type {object} */
  this.icons_ = icons;
  this.rotateIcon_ = rotateIcon;
  this.selectOption_ = selectOption || [];
  this.selectModel = 'radio' // multiple | radio
  this.selectValues = ['A'];
  // Example:
  // [{src: '...', width: 20, height: 20, alt: '...', value: 'machine_value'}, ...]
  // First icon provides the default values.
  var defaultValue = icons[0].value;
  Blockly.FieldMotorSpeedMenu.superClass_.constructor.call(this, defaultValue);
  this.addArgType('iconmenu');
};
goog.inherits(Blockly.FieldMotorSpeedMenu, Blockly.Field);

/**
 * Construct a FieldMotorSpeedMenu from a JSON arg object.
 * @param {!Object} element A JSON object with options.
 * @returns {!Blockly.FieldMotorSpeedMenu} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldMotorSpeedMenu.fromJson = function (element) {
  return new Blockly.FieldMotorSpeedMenu(element['options']);
};

/**
 * Fixed width of the drop-down, in px. Icon buttons will flow inside this width.
 * @type {number}
 * @const
 */
Blockly.FieldMotorSpeedMenu.DROPDOWN_WIDTH = 290;
/**
 * Save the primary colour of the source block while the menu is open, for reset.
 * @type {number|string}
 * @private
 */
Blockly.FieldMotorSpeedMenu.savedPrimary_ = null;

/**
 * Called when the field is placed on a block.
 * @param {Block} block The owning block.
 */
Blockly.FieldMotorSpeedMenu.prototype.init = function (block) {
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
  Blockly.FieldMotorSpeedMenu.superClass_.init.call(this, block);
};

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 * @const
 */
Blockly.FieldMotorSpeedMenu.prototype.CURSOR = 'default';

/**
* Set the language-neutral value for this icon drop-down menu.
 * @param {?string} newValue New value.
 * @override
 */
Blockly.FieldMotorSpeedMenu.prototype.setValue = function (newValue) {
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
Blockly.FieldMotorSpeedMenu.prototype.setParentFieldImage = function (src) {

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
Blockly.FieldMotorSpeedMenu.prototype.getValue = function () {
  return this.value_;
};


/**
 * For a language-neutral value, get the src for the image that represents it.
 * @param {string} value Language-neutral value to look up.
 * @return {string} Src to image representing value
 */
Blockly.FieldMotorSpeedMenu.prototype.getSrcForValue = function (value) {
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
Blockly.FieldMotorSpeedMenu.prototype.showEditor_ = function () {
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
  this.rotateIcon_.el.setAttribute('class', 'spinningWheel__speed-selector-module-spin spinningWheel__speed-selector-module');
  this.rotateIcon_.el.style.animationPlayState = 'running';
  const rotateUseIcon = Blockly.utils.createSvgElement('use', {
    'href': this.rotateIcon_.src + '#dsmIcon',
  })
  rotateUseIcon.setAttributeNS('http://www.w3.org/1999/xlink',
    'xlink:href', this.rotateIcon_.src + '#dsmIcon')
  this.rotateIcon_.el.appendChild(rotateUseIcon);
  baseDiv.appendChild(this.rotateIcon_.el);

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
    var buttonSvg = Blockly.utils.createSvgElement('svg', {
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
    contentDiv.style.width = Blockly.FieldMotorSpeedMenu.DROPDOWN_WIDTH + 'px';
  } else {
    contentDiv.style.width = 'auto';
  }
  if(this.selectOption_.length) {
    contentDiv.appendChild(this.createSelect())

  }

  Blockly.DropDownDiv.setColour(this.sourceBlock_.getColour(), this.sourceBlock_.getColourTertiary());
  Blockly.DropDownDiv.setCategory(this.sourceBlock_.parentBlock_.getCategory());

  // Update source block colour to look selected
  this.savedPrimary_ = this.sourceBlock_.getColour();
  this.sourceBlock_.setColour(this.sourceBlock_.getColourSecondary(),
    this.sourceBlock_.getColourSecondary(),
    this.sourceBlock_.getColourTertiary());

    var scale = this.sourceBlock_.workspace.scale;
    // Offset for icon-type horizontal blocks.
    var secondaryYOffset = (
      -(Blockly.BlockSvg.MIN_BLOCK_Y * scale) - (Blockly.BlockSvg.FIELD_Y_OFFSET * scale)
    );
    Blockly.DropDownDiv.showPositionedByBlock(
      this, this.sourceBlock_, this.onHide_.bind(this), secondaryYOffset);
};

/**
 * Callback for when a button is clicked inside the drop-down.
 * Should be bound to the FieldMotorSpeedMenu.
 * @param {Event} e DOM event for the click/touch
 * @private
 */
Blockly.FieldMotorSpeedMenu.prototype.buttonClick_ = function (e) {
  var value = e.target.getAttribute('data-value');
  this.setValue(value);
  const speed = e.target.getAttribute('speed-value');
  this.rotateIcon_.el.style.animationDuration = speed + 's';

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
Blockly.FieldMotorSpeedMenu.prototype.onHide_ = function () {
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

Blockly.FieldMotorSpeedMenu.prototype.selectEvent_ = function (e) {
  const target = e.target;
  const parentElement = target.parentElement;

  const toggleSelection = (isSelected) => {
    if (isSelected) {
      parentElement.classList.add('sensor-port-pair--selected');
      target.classList.add('selected');
      parentElement.style.color = 'rgb(0, 144, 245)';
      target.style.color = 'rgb(0, 144, 245)';
      this.selectValues.push(target.getAttribute('data-testid'));
    } else {
      parentElement.classList.remove('sensor-port-pair--selected');
      target.classList.remove('selected');
      parentElement.style.color = '#000';
      target.style.color = '#000';
      this.selectValues = this.selectValues.filter(item => item !== target.getAttribute('data-testid'));
    }
  };

  if (this.selectModel === 'radio') {
    this.selectOption_.forEach(item => {
      if (item.el) {
        item.el.classList.remove('selected');
        item.el.parentElement.classList.remove('sensor-port-pair--selected');
        item.el.parentElement.style.color = '#000';
        item.el.style.color = '#000';
      }
    });
    toggleSelection(true);
  } else {
    const isSelected = target.classList.contains('selected');
    toggleSelection(!isSelected);
  }
};

Blockly.FieldMotorSpeedMenu.prototype.setSleceValue = function () {
  console.log(this.selectValues);

}

Blockly.FieldMotorSpeedMenu.prototype.createSelect = function () {
  // 创建主容器
  const mainDiv = document.createElement('div');
  mainDiv.className = 'lls-port-selector lls-port-selector--type-flipper lls-port-selector--no-motors lls-port-selector--multiple-selection';

  // 创建内部结构
  const hubWrapper = document.createElement('div');
  hubWrapper.className = 'lls-port-selector__hub-wrapper';

  const hub = document.createElement('div');
  hub.className = 'lls-port-selector__hub';

  const sensorsLeft = document.createElement('div');
  sensorsLeft.className = 'lls-port-selector__sensors lls-port-selector__sensors--left';
  const sensorsRight = document.createElement('div');
  sensorsRight.className = 'lls-port-selector__sensors lls-port-selector__sensors--right';

  // 添加传感器端口
  this.selectOption_.forEach((option, index) => {
    const sensorPortPair = document.createElement('div');
    sensorPortPair.className = 'sensor-port-pair sensor-port-pair--dimmed';
    sensorPortPair.style.color = 'rgb(0, 120, 204)';

    const portButton = document.createElement('div');
    portButton.setAttribute('role', 'button');
    portButton.className = 'button sensor-port-pair__port-button';
    portButton.setAttribute('data-testid', `${option.value}`);
    portButton.textContent = option.label;
    portButton.addEventListener('click', this.selectEvent_.bind(this));
    sensorPortPair.appendChild(portButton);

    if(this.selectValues.includes(option.value)) {
      portButton.classList.add('selected');
      sensorPortPair.classList.add('sensor-port-pair--selected');
      sensorPortPair.style.color = 'rgb(0, 144, 245)';
      portButton.style.color = 'rgb(0, 144, 245)';
    }

    if (index % 2 === 0) {
      sensorsLeft.appendChild(sensorPortPair);
    } else {
      sensorsRight.appendChild(sensorPortPair);
    }

    option.el = portButton;
  });

  // 将左右传感器添加到 hub
  hub.appendChild(sensorsLeft);
  hub.appendChild(sensorsRight);

  // 将 hub 添加到 hub wrapper
  hubWrapper.appendChild(hub);

  // 创建多个动作按钮
  const btnHandler = (e) => {
    const target = e.target;
    const parentElement = target.parentElement;

    const toggleSelectionModel = (isMultiple) => {
      if (isMultiple) {
        this.selectModel = 'multiple';
        target.classList.add('selected');
        parentElement.classList.add('sensor-port-pair--selected');
        parentElement.style.color = 'rgb(0, 144, 245)';
        target.style.color = 'rgb(0, 144, 245)';
      } else {
        this.selectModel = 'radio';
        target.classList.remove('selected');
        parentElement.classList.remove('sensor-port-pair--selected');
        parentElement.style.color = '#000';
        target.style.color = '#000';
        this.selectOption_.forEach(item => {
          if (item.value !== this.selectValues[0]) {
            item.el.style.color = '#000'
            item.el.classList.remove('selected')
            item.el.parentElement.classList.remove('sensor-port-pair--selected')
            item.el.parentElement.color = '#000'
          }
        });
        this.selectValues = [this.selectValues[0]];
      }
    };

    if (target.classList.contains('selected')) {
      toggleSelectionModel(false);
    } else {
      toggleSelectionModel(true);
    }
  };

  const multipleActions = document.createElement('div');
  multipleActions.className = 'lls-port-selector__multiple-actions';

  const multipleButton = document.createElement('div');
  multipleButton.setAttribute('role', 'button');
  multipleButton.className = 'button lls-port-selector__button-multiple';
  multipleButton.setAttribute('data-testid', 'multiple');
  multipleButton.textContent = '多个';
  multipleButton.addEventListener('click', btnHandler);

  const allButton = document.createElement('div');
  allButton.setAttribute('role', 'button');
  allButton.className = 'button lls-port-selector__button-all';
  allButton.setAttribute('data-testid', 'all');
  allButton.textContent = '所有';
  allButton.addEventListener('click', (e) => {
    const target = e.target;
    const parentElement = target.parentElement;

    const toggleAllSelection = (isAllSelected) => {
      if (isAllSelected) {
        this.selectModel = 'multiple';
        target.classList.add('selected');
        parentElement.classList.add('sensor-port-pair--selected');
        parentElement.style.color = 'rgb(0, 144, 245)';
        target.style.color = 'rgb(0, 144, 245)';
        multipleButton.classList.add('selected')
        multipleActions.classList.add('sensor-port-pair--selected')
        multipleActions.style.color = 'rgb(0, 144, 245)'
        multipleButton.style.color = 'rgb(0, 144, 245)'


        this.selectOption_.forEach(item => {
          if (item.el) {
            item.el.style.color = 'rgb(0, 144, 245)';
            item.el.classList.add('selected');
            item.el.parentElement.classList.add('sensor-port-pair--selected');
            item.el.parentElement.style.color = 'rgb(0, 144, 245)';
          }
        });
        this.selectValues = this.selectOption_.map(item => item.value);
      } else {
        this.selectModel = 'radio';
        target.classList.remove('selected');
        parentElement.classList.remove('sensor-port-pair--selected');
        parentElement.style.color = '#000';
        target.style.color = '#000';

        multipleButton.classList.remove('selected')
        multipleActions.classList.remove('sensor-port-pair--selected')
        multipleActions.style.color = '#000'
        multipleButton.style.color = '#000'

        this.selectOption_.forEach(item => {
          if (item.el) {
            item.el.style.color = '#000';
            item.el.classList.remove('selected');
            item.el.parentElement.classList.remove('sensor-port-pair--selected');
            item.el.parentElement.style.color = '#000';
          }
        });
        this.selectValues = [];
      }
    };

    if (target.classList.contains('selected')) {
      toggleAllSelection(false);
    } else {
      toggleAllSelection(true);
    }
  });

  // 将按钮添加到多个动作区域
  multipleActions.appendChild(multipleButton);
  multipleActions.appendChild(allButton);

  // 将所有部分添加到主容器
  mainDiv.appendChild(hubWrapper);
  mainDiv.appendChild(multipleActions);

  return mainDiv;
};
Blockly.Field.register('field_motor_speedmenu', Blockly.FieldMotorSpeedMenu);
