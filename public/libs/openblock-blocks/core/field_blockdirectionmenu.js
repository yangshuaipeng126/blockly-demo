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

goog.provide('Blockly.FieldBlockDirectionMenu');

goog.require('Blockly.DropDownDiv');
const direction = ['left', 'right', 'up', 'down']

const centerImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iOTRweCIgaGVpZ2h0PSI2MHB4IiB2aWV3Qm94PSIwIDAgOTQgNjAiPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC41KSI+CiAgICA8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGO3N0cm9rZTojQzE4NDAyO3N0cm9rZS13aWR0aDoyOyIgZD0iTTg3LjIsMWMyLjYsMCw0LjcsMi4xLDQuNyw0Ljd2NDcuNiBjMCwyLjYtMi4xLDQuNy00LjcsNC43SDUuNWMtMi42LDAtNC43LTIuMS00LjctNC43VjUuN0MwLjgsMy4xLDIuOSwxLDUuNSwxSDg3LjJ6Ii8+CiAgICA8cGF0aCBzdHlsZT0iZmlsbDojRkZCNTE1O3N0cm9rZTojQzE4NDAyO3N0cm9rZS13aWR0aDoyOyIgZD0iTTEuNSwxNi40djM3YzAsMi44LDIuMiw1LDUsNWg3OWMyLjgsMCw1LTIuMiw1LTV2LTM3IEgxLjV6Ii8+CiAgICA8cGF0aCBzdHlsZT0iZmlsbDojQzE4NDAyO3N0cm9rZTojQzE4NDAyO3N0cm9rZS13aWR0aDoyOyIgZD0iTTM1LjUsNTcuNGgyMXYtNGMwLTMuMy0yLjctNi02LTZoLTljLTMuMywwLTYsMi43LTYsNiBWNTcuNHoiLz4KICAgIDxwYXRoIHN0eWxlPSJmaWxsOiNGRkI1MTU7IiBkPSJNNDAuNSw0OS45aDExYzAuNiwwLDEsMC40LDEsMWwwLDBjMCwwLjYtMC40LDEtMSwxaC0xMWMtMC42LDAtMS0wLjQtMS0xbDAsMCBDMzkuNSw1MC4zLDM5LjksNDkuOSw0MC41LDQ5Ljl6Ii8+CiAgICA8cGF0aCBzdHlsZT0iZmlsbDojRkZCNTE1OyIgZD0iTTQwLjUsNTIuOWgxMWMwLjYsMCwxLDAuNCwxLDFsMCwwYzAsMC42LTAuNCwxLTEsMWgtMTFjLTAuNiwwLTEtMC40LTEtMWwwLDAgQzM5LjUsNTMuMywzOS45LDUyLjksNDAuNSw1Mi45eiIvPgogICAgPHBhdGggc3R5bGU9ImZpbGw6I0MxODQwMjtzdHJva2U6I0MxODQwMjsiIGQ9Ik05MSwzNy45di02aC00Yy0xLjcsMC0zLDEuMy0zLDNjMCwxLjcsMS4zLDMsMywzSDkxeiIvPgogICAgPHBhdGggc3R5bGU9ImZpbGw6I0MxODQwMjtzdHJva2U6I0MxODQwMjsiIGQ9Ik0xLDM3Ljl2LTZoNGMxLjcsMCwzLDEuMywzLDNjMCwxLjctMS4zLDMtMywzSDF6Ii8+CiAgICA8cGF0aCBzdHlsZT0iZmlsbDojNERCNkZGO3N0cm9rZTojMDA5MEY1O3N0cm9rZS13aWR0aDoyOyIgZD0iTTQ5LDB2MTBjMCwwLjYtMC40LDEtMSwxaC0zYy0wLjYsMC0xLTAuNC0xLTFWMGwwLDAiLz4KICA8L2c+Cjwvc3ZnPg=='

const centerBottomImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iOTFweCIgaGVpZ2h0PSI3MHB4IiB2aWV3Qm94PSIwIDAgOTEgNzAiPgogIDxwYXRoIHN0eWxlPSJmaWxsOiNDMTg0MDI7c3Ryb2tlOiNDMTg0MDI7c3Ryb2tlLXdpZHRoOjI7IiBkPSJNOTAsNjlWNmMwLTIuOC0yLjItNS01LTVINkMzLjIsMSwxLDMuMiwxLDZ2NjNIOTB6Ii8+Cjwvc3ZnPg=='

const centerTopImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iOTFweCIgaGVpZ2h0PSI3MHB4IiB2aWV3Qm94PSIwIDAgOTEgNzAiPgogIDxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7c3Ryb2tlOiNDMTg0MDI7c3Ryb2tlLXdpZHRoOjI7IiBkPSJNOTAsNjlWNmMwLTIuOC0yLjItNS01LTVINkMzLjIsMSwxLDMuMiwxLDZ2NjNIOTB6Ii8+CiAgPHBhdGggc3R5bGU9ImZpbGw6IzREQjZGRjtzdHJva2U6IzAwOTBGNTtzdHJva2Utd2lkdGg6MjsiIGQ9Ik00My41LDcwdi05YzAtMC42LDAuNC0xLDEtMWgzYzAuNiwwLDEsMC40LDEsMXY5bDAsMCIvPgogIDxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7c3Ryb2tlOiNEQURBREE7c3Ryb2tlLXdpZHRoOjI7IiBkPSJNNDEsNDFjLTEuMSwwLTIsMC45LTIsMmwwLDB2OS43YzAsMS4xLDAuOSwyLDIsMmwwLDAgaDkuN2MxLjEsMCwyLTAuOSwyLTJsMCwwVjQzYzAtMS4xLTAuOS0yLTItMmwwLDBINDF6Ii8+Cjwvc3ZnPg=='

const centerShadow = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTA1cHgiIGhlaWdodD0iMTFweCIgdmlld0JveD0iMCAwIDEwNSAxMSI+CiAgPHBhdGggc3R5bGU9ImZpbGw6cmdiYSgwLDAsMCwwLjIpIiBkPSJNNC4zLDExaDk2LjZjMiwwLDMuNi0xLjYsMy42LTMuNmMwLTAuNy0wLjItMS40LTAuNi0xLjlsLTEuMi0xLjkgQzEwMS4zLDEuNCw5OC43LDAsOTYsMEg5LjdDNy4xLDAsNC44LDEuMiwzLjIsMy4yTDEuNiw1LjVDMC40LDcsMC44LDkuMiwyLjMsMTAuM0MyLjksMTAuOCwzLjYsMTEsNC4zLDExeiIvPgo8L3N2Zz4='
/**
 * Class for an icon menu field.
 * @param {Object} icons List of icons. These take the same options as an Image Field.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldBlockDirectionMenu = function (icons) {
  /** @type {object} */
  this.icons_ = icons;

  // Example:
  // [{src: '...', width: 20, height: 20, alt: '...', value: 'machine_value'}, ...]
  // First icon provides the default values.
  var defaultValue = icons[0].value;
  Blockly.FieldBlockDirectionMenu.superClass_.constructor.call(this, defaultValue);
  this.addArgType('blockdirectionkenu');
};
goog.inherits(Blockly.FieldBlockDirectionMenu, Blockly.Field);

/**
 * Construct a FieldBlockDirectionMenu from a JSON arg object.
 * @param {!Object} element A JSON object with options.
 * @returns {!Blockly.FieldBlockDirectionMenu} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldBlockDirectionMenu.fromJson = function (element) {
  return new Blockly.FieldBlockDirectionMenu(element['options']);
};

/**
 * Fixed width of the drop-down, in px. Icon buttons will flow inside this width.
 * @type {number}
 * @const
 */
Blockly.FieldBlockDirectionMenu.DROPDOWN_WIDTH = 225;

/**
 * Save the primary colour of the source block while the menu is open, for reset.
 * @type {number|string}
 * @private
 */
Blockly.FieldBlockDirectionMenu.savedPrimary_ = null;

/**
 * Called when the field is placed on a block.
 * @param {Block} block The owning block.
 */
Blockly.FieldBlockDirectionMenu.prototype.init = function (block) {
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
  Blockly.FieldBlockDirectionMenu.superClass_.init.call(this, block);
};

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 * @const
 */
Blockly.FieldBlockDirectionMenu.prototype.CURSOR = 'default';

/**
* Set the language-neutral value for this icon drop-down menu.
 * @param {?string} newValue New value.
 * @override
 */
Blockly.FieldBlockDirectionMenu.prototype.setValue = function (newValue) {
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
Blockly.FieldBlockDirectionMenu.prototype.setParentFieldImage = function (src) {
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
Blockly.FieldBlockDirectionMenu.prototype.getValue = function () {
  return this.value_;
};

/**
 * For a language-neutral value, get the src for the image that represents it.
 * @param {string} value Language-neutral value to look up.
 * @return {string} Src to image representing value
 */
Blockly.FieldBlockDirectionMenu.prototype.getSrcForValue = function (value) {
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
Blockly.FieldBlockDirectionMenu.prototype.showEditor_ = function () {
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

  const createBtn = (icon, i) => {
    var button = document.createElement('button');
    button.setAttribute('id', ':' + i); // For aria-activedescendant
    button.setAttribute('role', 'menuitem');
    button.setAttribute('class', 'blocklyDropDownButton');
    button.title = icon.alt;
    button.style.width = icon.width + 'px';
    button.style.height = icon.height + 'px';
    var backgroundColor = this.sourceBlock_.getColour();
    if (icon.value == this.getValue()) {
      backgroundColor = this.sourceBlock_.getColourTertiary();
      button.setAttribute('aria-selected', 'true');
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
    var buttonImg = document.createElement('img');
    buttonImg.src = icon.icon;
    buttonImg.style.width = 'auto';
    buttonImg.style.height = 'auto'
    //buttonImg.alt = icon.alt;
    // Upon click/touch, we will be able to get the clicked element as e.target
    // Store a data attribute on all possible click targets so we can match it to the icon.
    button.setAttribute('data-value', icon.value);
    buttonImg.setAttribute('data-value', icon.value);
    button.appendChild(buttonImg);
    this.icons_[i].el = button;
    return button;
  }

  // top
  const topRow = document.createElement('div');
  topRow.style.display = 'flex';
  topRow.style.flexDirection = 'row';
  topRow.appendChild(createBtn(this.icons_[0], 0));
  const topMidddleDiv = document.createElement('div');
  topMidddleDiv.style.display = 'flex';
  topMidddleDiv.style.flexGrow = 1;
  topMidddleDiv.style.justifyContent = 'center';
  topMidddleDiv.style.alignItems = 'center';
  const topMidddleBtn = createBtn(this.icons_[1], 1)
  topMidddleBtn.style.borderRadius = '50%'
  topMidddleDiv.appendChild(topMidddleBtn);
  topRow.appendChild(topMidddleDiv);
  topRow.appendChild(createBtn(this.icons_[2], 2));

  // moddle
  const middleRow = document.createElement('div');
  middleRow.style.display = 'flex';
  middleRow.style.alignItems = 'center'

  const buttonLeft = createBtn(this.icons_[3], 3)
  buttonLeft.style.borderRadius = '50%'
  middleRow.appendChild(buttonLeft);

  const center = document.createElement('div');
  const scene = document.createElement('div');
  center.appendChild(scene);
  middleRow.appendChild(center);
  scene.setAttribute('class', 'gecko-tilt-animation-scene')
  const hub = document.createElement('div');
  hub.setAttribute('class', 'gecko-tilt-animation-scene--hub ' + this.getValue())
  hub.setAttribute('id', 'hub')

  const shadow = document.createElement('div');
  shadow.setAttribute('class', 'gecko-tilt-animation-scene--shadow')
  const shadowImg = document.createElement('img');
  shadowImg.src = centerShadow
  shadow.appendChild(shadowImg);

  const hubFront = document.createElement('div');
  hubFront.setAttribute('class', 'gecko-tilt-animation-scene--hub__front')
  const img1 = document.createElement('img');
  img1.src = centerImg
  hub.appendChild(hubFront);
  hubFront.appendChild(img1);

  const hubBottom = document.createElement('div');
  hubBottom.setAttribute('class', 'gecko-tilt-animation-scene--hub__bottom')
  const img2 = document.createElement('img');
  img2.src = centerBottomImg
  hub.appendChild(hubBottom);
  hubBottom.appendChild(img2);

  const hubTop = document.createElement('div');
  hubTop.setAttribute('class', 'gecko-tilt-animation-scene--hub__top')
  const img3 = document.createElement('img');
  img3.src = centerTopImg
  hub.appendChild(hubTop);
  hubTop.appendChild(img3);



  scene.appendChild(hub);
  scene.appendChild(shadow);

  const buttonRight = createBtn(this.icons_[4], 4)
  buttonRight.style.borderRadius = '50%'

  middleRow.appendChild(buttonRight);

  const bottomRow = document.createElement('div');
  bottomRow.style.display = 'flex';
  bottomRow.style.justifyContent = 'center';
  const bottomMiddleBtn = createBtn(this.icons_[5], 5)
  bottomMiddleBtn.style.borderRadius = '50%'
  bottomRow.appendChild(bottomMiddleBtn);

  contentDiv.appendChild(topRow);
  contentDiv.appendChild(middleRow);
  contentDiv.appendChild(bottomRow);
  contentDiv.style.width = Blockly.FieldBlockDirectionMenu.DROPDOWN_WIDTH + 'px';

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
  var renderedPrimary = Blockly.DropDownDiv.showPositionedByBlock(
    this, this.sourceBlock_, this.onHide_.bind(this), secondaryYOffset);
  if (!renderedPrimary) {
    // Adjust for rotation
    var arrowX = this.arrowX_ + Blockly.DropDownDiv.ARROW_SIZE / 1.5 + 1;
    var arrowY = this.arrowY_ + Blockly.DropDownDiv.ARROW_SIZE / 1.5;
    // Flip the arrow on the button
    this.arrowIcon_.setAttribute('transform',
      'translate(' + arrowX + ',' + arrowY + ') rotate(180)');
  }
};

/**
 * Callback for when a button is clicked inside the drop-down.
 * Should be bound to the FieldBlockDirectionMenu.
 * @param {Event} e DOM event for the click/touch
 * @private
 */
Blockly.FieldBlockDirectionMenu.prototype.buttonClick_ = function (e) {

  if (this.sourceBlock_) {
    this.sourceBlock_.setColour(this.savedPrimary_,
      this.sourceBlock_.getColourSecondary(),
      this.sourceBlock_.getColourTertiary());
  }
  Blockly.DropDownDiv.content_.removeAttribute('role');
  Blockly.DropDownDiv.content_.removeAttribute('aria-haspopup');
  Blockly.DropDownDiv.content_.removeAttribute('aria-activedescendant');
  var value = e.target.getAttribute('data-value');
  var backgroundColor = this.sourceBlock_.getColour();
  const borderColor = this.sourceBlock_.getColourTertiary()
  this.icons_.forEach(item => {
    if(item.el) {
      item.el.removeAttribute('aria-selected');
      item.el.style.backgroundColor = backgroundColor;
      item.el.style.borderColor = borderColor
    }
  })
  this.setValue(value);
  backgroundColor = this.sourceBlock_.getColourTertiary();
  if (e.target.nodeName === 'IMG') {
    e.target.parentElement.style.backgroundColor = backgroundColor;
    e.target.parentElement.style.borderColor = borderColor
    e.target.parentElement.setAttribute('aria-selected', 'true');
  } else if (e.target.nodeName === 'BUTTON') {
    e.target.style.backgroundColor = backgroundColor;
    e.target.style.borderColor = borderColor
    e.target.setAttribute('aria-selected', 'true');
  }
  document.getElementById('hub').setAttribute('class', 'gecko-tilt-animation-scene--hub ' + this.getValue())
  // Blockly.DropDownDiv.hide();

};

/**
 * Callback for when the drop-down is hidden.
 */
Blockly.FieldBlockDirectionMenu.prototype.onHide_ = function () {
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
  // Unflip the arrow if appropriate
  this.arrowIcon_.setAttribute('transform', 'translate(' + this.arrowX_ + ',' + this.arrowY_ + ')');
};



Blockly.Field.register('field_blockdirectionmenu', Blockly.FieldBlockDirectionMenu);
