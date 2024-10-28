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
 * @fileoverview matrix input field.
 * Displays an editable matrix for controlling LED arrays.
 * @author khanning@gmail.com (Kreg Hanning)
 */
'use strict';

goog.provide('Blockly.FieldHorizontalMatrix');

goog.require('Blockly.DropDownDiv');

/**
 * Class for a matrix field.
 * @param {number} matrix The default matrix value represented by a integer.
 * @param {(string|number)=} opt_width Number of x-axis node.
 * @param {(string|number)=} opt_height Number of y-axis node.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldHorizontalMatrix = function (matrix, opt_width, opt_height) {
  this.width_ = opt_width;
  this.height_ = opt_height;

  this.addArgType('matrix');
  // 创建颜色选项
  this.colors_ = [
    { r: 255, g: 255, b: 255 },
    { r: 236, g: 230, b: 248 },
    { r: 218, g: 205, b: 241 },
    { r: 199, g: 179, b: 234 },
    { r: 180, g: 154, b: 227 },
    { r: 162, g: 129, b: 221 },
    { r: 143, g: 104, b: 214 },
    { r: 124, g: 78, b: 207 },
    { r: 106, g: 53, b: 200 }
  ];
  this.currentColor = this.colorObjectToRgbString(this.colors_[0]);
  /**
   * Array of SVGElement<rect> for matrix thumbnail image on block field.
   * @type {!Array<SVGElement>}
   * @private
   */
  this.ledThumbNodes_ = [];
  /**
   * Array of SVGElement<rect> for matrix editor in dropdown menu.
   * @type {!Array<SVGElement>}
   * @private
   */
  this.ledButtons_ = [];
  /**
   * String for storing current matrix value.
   * @type {!String}
   * @private
   */
  const matrixObj = JSON.parse(matrix);
  matrixObj.forEach(item => {
    if(item.value === '1' && !item.color) {
      item.color = this.currentColor;
    }
  })
  this.matrix_ = JSON.stringify(matrixObj);
  /**
   * SVGElement for LED matrix in editor.
   * @type {?SVGElement}
   * @private
   */
  this.matrixStage_ = null;
  /**
   * SVG image for dropdown arrow.
   * @type {?SVGElement}
   * @private
   */
  this.arrow_ = null;
  /**
   * String indicating matrix paint style.
   * value can be [null, 'fill', 'clear'].
   * @type {?String}
   * @private
   */
  this.paintStyle_ = null;
  /**
   * Touch event wrapper.
   * Runs when the field is selected.
   * @type {!Array}
   * @private
   */
  this.mouseDownWrapper_ = null;
  /**
   * Touch event wrapper.
   * Runs when the clear button editor button is selected.
   * @type {!Array}
   * @private
   */
  this.clearButtonWrapper_ = null;
  /**
   * Touch event wrapper.
   * Runs when the fill button editor button is selected.
   * @type {!Array}
   * @private
   */
  this.fillButtonWrapper_ = null;
  /**
   * Touch event wrapper.
   * Runs when the matrix editor is touched.
   * @type {!Array}
   * @private
   */
  this.matrixTouchWrapper_ = null;
  /**
   * Touch event wrapper.
   * Runs when the matrix editor touch event moves.
   * @type {!Array}
   * @private
   */
  this.matrixMoveWrapper_ = null;
  /**
   * Touch event wrapper.
   * Runs when the matrix editor is released.
   * @type {!Array}
   * @private
   */
  this.matrixReleaseWrapper_ = null;

  /**
   * The size of the matrix thumbnail in the input field, in px.
   * @type {number}
   * @const
   */
  this.thumbnailSize_ = new goog.math.Size(0, 0);

  /**
   * String with x * y '0' chars.
   * Used for clearing a matrix or filling an LED node array.
   * @type {string]
   * @private
   */
  this.zeros_ = '0'.repeat(this.width_ * this.height_);

  /**
   * String with x * y '1' chars.
   * Used for filling a matrix.
   * @type {string}
   * @private
   */
  this.ones_ = '1'.repeat(this.width_ * this.height_);
  Blockly.FieldHorizontalMatrix.superClass_.constructor.call(this, matrix);
  this.size_ = {}
};
goog.inherits(Blockly.FieldHorizontalMatrix, Blockly.Field);

/**
 * Construct a FieldHorizontalMatrix from a JSON arg object.
 * @param {!Object} options A JSON object with options (matrix).
 * @returns {!Blockly.FieldHorizontalMatrix} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldHorizontalMatrix.fromJson = function (options) {
  return new Blockly.FieldHorizontalMatrix(options['matrix'], options['width'], options['height']);
};

/**
 * Fixed size of the matrix thumbnail in the input field, in px.
 * @type {number}
 * @const
 */
Blockly.FieldHorizontalMatrix.THUMBNAIL_SIZE = 26;

/**
 * Fixed size of each matrix thumbnail node, in px.
 * @type {number}
 * @const
 */
Blockly.FieldHorizontalMatrix.THUMBNAIL_NODE_SIZE = 4;

/**
 * Fixed size of each matrix thumbnail node, in px.
 * @type {number}
 * @const
 */
Blockly.FieldHorizontalMatrix.THUMBNAIL_NODE_PAD = 1;

/**
 * Fixed size of arrow icon in drop down menu, in px.
 * @type {number}
 * @const
 */
Blockly.FieldHorizontalMatrix.ARROW_SIZE = 12;

/**
 * Fixed size of each button inside the matrix, in px.
 * @type {number}
 * @const
 */
Blockly.FieldHorizontalMatrix.MATRIX_NODE_SIZE = 18;

/**
 * Fixed corner radius for matrix buttons, in px.
 * @type {number}
 * @const
 */
Blockly.FieldHorizontalMatrix.MATRIX_NODE_RADIUS = 4;

/**
 * Fixed padding for matrix buttons, in px.
 * @type {number}
 * @const
 */
Blockly.FieldHorizontalMatrix.MATRIX_NODE_PAD = 5;


/**
 * Called when the field is placed on a block.
 * @param {Block} block The owning block.
 */
Blockly.FieldHorizontalMatrix.prototype.init = function (block) {
  this.thumbnailSize_.width = Blockly.FieldHorizontalMatrix.THUMBNAIL_NODE_SIZE * this.width_ +
    Blockly.FieldHorizontalMatrix.THUMBNAIL_NODE_PAD * (this.width_ + 1);
  this.thumbnailSize_.height = Blockly.FieldHorizontalMatrix.THUMBNAIL_NODE_SIZE * this.height_ +
    Blockly.FieldHorizontalMatrix.THUMBNAIL_NODE_PAD * (this.height_ + 1);

  if (this.fieldGroup_) {
    // Matrix menu has already been initialized once.
    return;
  }

  // Change the color to parent block color.
  if (this.sourceBlock_.getParent()) {
    var parentBlock = this.sourceBlock_.getParent();
    this.sourceBlock_.setColour(parentBlock.getColour(), parentBlock.getColourSecondary(),
      parentBlock.getColourTertiary());
  }

  // Build the DOM.
  this.fieldGroup_ = Blockly.utils.createSvgElement('g', {}, null);
  this.size_.height = this.thumbnailSize_.height + Blockly.BlockSvg.GRID_UNIT * 1.5;
  this.size_.width = this.thumbnailSize_.width + Blockly.FieldHorizontalMatrix.ARROW_SIZE +
    (this.size_.height / 2 - Blockly.BlockSvg.DROPDOWN_ARROW_PADDING * 1.5) * 2 + Blockly.BlockSvg.GRID_UNIT;
  // Blockly.BlockSvg.FIELD_HEIGHT Blockly.BlockSvg.FIELD_WIDTH 
  // var thumbX = this.size_.height / 2 - Blockly.BlockSvg.DROPDOWN_ARROW_PADDING * 1.5;
  // var thumbY = (this.size_.height - this.thumbnailSize_.height) / 2;
  var nodeSize = 5.7;
  var nodePad = 0.94;
  var thumbX = (72 - (nodeSize + nodePad) * this.width_ - nodePad) / 2;
  var thumbY = (64 - (nodeSize + nodePad) * this.height_ - nodePad) / 2;
  var thumbnail = Blockly.utils.createSvgElement('g', {
    transform: `translate(${thumbX},${thumbY}) scale(1 1)`,
    'pointer-events': 'bounding-box', 'cursor': 'pointer'
  }, this.fieldGroup_);
  this.ledThumbNodes_ = [];

  for (var i = 0; i < this.height_; i++) {
    for (var n = 0; n < this.width_; n++) {
      var attr = {
        'x': ((nodeSize + nodePad) * n) + nodePad,
        'y': ((nodeSize + nodePad) * i) + nodePad,
        'width': nodeSize, 'height': nodeSize,
        'rx': nodePad, 'ry': nodePad
      };
      this.ledThumbNodes_.push(
        Blockly.utils.createSvgElement('rect', attr, thumbnail)
      );
    }
    thumbnail.style.cursor = 'default';
    this.updateMatrix_();
  }
  this.sourceBlock_.parentBlock_.getSvgRoot().appendChild(this.fieldGroup_);

  if (!this.arrow_) {
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
    this.arrow_ = Blockly.utils.createSvgElement('image', {
      'height': arrowSize + 'px',
      'width': arrowSize + 'px',
      'transform': 'translate(' + this.arrowX_ + ',' + this.arrowY_ + ')'
    });
    this.arrow_.setAttributeNS('http://www.w3.org/1999/xlink',
      'xlink:href', Blockly.mainWorkspace.options.pathToMedia + 'dropdown-arrow.svg');
    block.getSvgRoot().appendChild(this.arrow_);
  }
  Blockly.FieldHorizontalMatrix.superClass_.init.call(this, block);
  this.mouseDownWrapper_ = Blockly.bindEventWithChecks_(
    this.getClickTarget_(), 'mousedown', this, this.onMouseDown_);
};



/**
 * Set the value for this matrix menu.
 * @param {string} matrix The new matrix value represented by a integer.
 * @override
 */
Blockly.FieldHorizontalMatrix.prototype.setValue = function (matrix) {
  if (!matrix) {
    return;  // No change
  }
 
  const matrixObj = JSON.parse(matrix);
  matrixObj.forEach(item => {
    if(item.value === '1' && !item.color) {
      item.color = this.currentColor;
    }
  })
  this.matrix_ = JSON.stringify(matrixObj);
  // matrix = matrix + this.zeros_.substr(0, this.width_ * this.height_ - matrix.length);
  if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.Change(
      this.sourceBlock_, 'field', this.name, this.matrix_, matrix));
    this.updateMatrix_();
  }
};

/**
 * Get the value from this matrix menu.
 * @return {string} Current matrix value.
 */
Blockly.FieldHorizontalMatrix.prototype.getValue = function () {
  return this.matrix_;
};

/**
 * Show the drop-down menu for editing this field.
 * @private
 */
Blockly.FieldHorizontalMatrix.prototype.showEditor_ = function () {

  // If there is an existing drop-down someone else owns, hide it immediately and clear it.
  Blockly.DropDownDiv.hideWithoutAnimation();
  Blockly.DropDownDiv.clearContent();
  var div = Blockly.DropDownDiv.getContentDiv();
  div.setAttribute('role', 'menu');
  div.setAttribute('aria-haspopup', 'true');
  const container = document.createElement('div');
  container.className = 'lls-light-container';
  const gird = document.createElement('div');
  gird.className = 'lls-light';
  container.appendChild(gird);
  div.appendChild(container);


  // Build the SVG DOM.
  var matrixSize = new goog.math.Size(Blockly.FieldHorizontalMatrix.MATRIX_NODE_SIZE * this.width_ +
    Blockly.FieldHorizontalMatrix.MATRIX_NODE_PAD * (this.width_ + 1),
    Blockly.FieldHorizontalMatrix.MATRIX_NODE_SIZE * this.height_ + Blockly.FieldHorizontalMatrix.MATRIX_NODE_PAD * (this.height_ + 1));
  this.matrixStage_ = Blockly.utils.createSvgElement('svg', {
    'xmlns': 'http://www.w3.org/2000/svg',
    'xmlns:html': 'http://www.w3.org/1999/xhtml',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    'version': '1.1',
    'height': matrixSize.height + 'px',
    'width': matrixSize.width + 'px'
  }, gird);
  this.matrixStage_.setAttribute('class', 'lls-light__leds-wrapper')


  // 创建颜色滑块
  const colorSlider = document.createElement('div');
  colorSlider.className = 'lls-color-slider';
  colorSlider.style.width = '40px';
  colorSlider.style.height = '100%';
  colorSlider.style.borderColor = 'rgb(87, 28, 193)';



  this.colors_.forEach((color, index) => {
    const option = document.createElement('div');
    option.setAttribute('data-testid', `slider-color-rgb(${color.r}, ${color.g}, ${color.b})`);
    option.setAttribute('top', (100 / this.colors_.length) * index);
    option.className = `lls-color-slider__option${index === 0 ? ' lls-color-slider__option--first' : ''}${index === this.colors_.length - 1 ? ' lls-color-slider__option--last' : ''}`;
    option.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    option.addEventListener('click', (e) => {
      handle.style.top = `calc(${e.target.getAttribute('top')}% - 2px)`;
      
      this.currentColor = e.target.style.backgroundColor
      fillButtonDiv.removeChild(fillButtonDiv.firstChild);
      fillButtonDiv.appendChild(this.createButton_(this.currentColor));
    })
    colorSlider.appendChild(option);
  });

  // 创建滑块手柄
  const handle = document.createElement('div');
  handle.className = 'lls-color-slider__handle lls-color-slider__handle--not-pressed';
  handle.style.backgroundColor = 'rgb(236, 230, 248)';
  handle.style.height = 'calc(11.1111% + 4px)';
  handle.style.width = 'calc(100% + 10px)';
  handle.style.left = '-5px';
  handle.style.top = 'calc(0% - 2px)';

  colorSlider.appendChild(handle);
  gird.appendChild(colorSlider);

  // Create the matrix
  this.ledButtons_ = [];
  for (var i = 0; i < this.height_; i++) {
    for (var n = 0; n < this.width_; n++) {
      var x = (Blockly.FieldHorizontalMatrix.MATRIX_NODE_SIZE * n) +
        (Blockly.FieldHorizontalMatrix.MATRIX_NODE_PAD * (n + 1));
      var y = (Blockly.FieldHorizontalMatrix.MATRIX_NODE_SIZE * i) +
        (Blockly.FieldHorizontalMatrix.MATRIX_NODE_PAD * (i + 1));
      var attr = {
        'x': x + 'px', 'y': y + 'px',
        'width': Blockly.FieldHorizontalMatrix.MATRIX_NODE_SIZE,
        'height': Blockly.FieldHorizontalMatrix.MATRIX_NODE_SIZE,
        'rx': Blockly.FieldHorizontalMatrix.MATRIX_NODE_RADIUS,
        'ry': Blockly.FieldHorizontalMatrix.MATRIX_NODE_RADIUS,
        'data-index': (i * this.width_) + n,
      };
      var led = Blockly.utils.createSvgElement('rect', attr, this.matrixStage_);
      this.matrixStage_.appendChild(led);
      this.ledButtons_.push(led);
    }
  }
  // Div for lower button menu
  var buttonDiv = document.createElement('div');
  buttonDiv.className = 'lls-light__toggle'
  // Button to clear matrix
  var clearButtonDiv = document.createElement('div');
  clearButtonDiv.className = 'scratchMatrixButtonDiv';

  var clearButton = this.createButton_(this.sourceBlock_.colourSecondary_);
  clearButtonDiv.appendChild(clearButton);
  // Button to fill matrix
  var fillButtonDiv = document.createElement('div');
  fillButtonDiv.className = 'scratchMatrixButtonDiv';
  var fillButton = this.createButton_(this.currentColor);
  fillButtonDiv.appendChild(fillButton);

  buttonDiv.appendChild(clearButtonDiv);
  buttonDiv.appendChild(fillButtonDiv);
  gird.appendChild(buttonDiv);


  Blockly.DropDownDiv.setColour(this.sourceBlock_.getColour(),
    this.sourceBlock_.getColourTertiary());
  Blockly.DropDownDiv.setCategory(this.sourceBlock_.getCategory());
  Blockly.DropDownDiv.showPositionedByBlock(this, this.sourceBlock_);

  this.matrixTouchWrapper_ =
    Blockly.bindEvent_(this.matrixStage_, 'mousedown', this, this.onMouseDown);
  this.clearButtonWrapper_ =
    Blockly.bindEvent_(clearButton, 'click', this, this.clearMatrix_);
  this.fillButtonWrapper_ =
    Blockly.bindEvent_(fillButtonDiv, 'click', this, this.fillMatrix_);

  // Update the matrix for the current value
  this.updateMatrix_();

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
    this.arrow_.setAttribute('transform',
      'translate(' + arrowX + ',' + arrowY + ') rotate(180)');
  }
};



/**
 * Make an svg object that resembles a 3x3 matrix to be used as a button.
 * @param {string} fill The color to fill the matrix nodes.
 * @return {SvgElement} The button svg element.
 */
Blockly.FieldHorizontalMatrix.prototype.createButton_ = function (fill) {
  var button = Blockly.utils.createSvgElement('svg', {
    'xmlns': 'http://www.w3.org/2000/svg',
    'xmlns:html': 'http://www.w3.org/1999/xhtml',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    'version': '1.1',
    'height': Blockly.FieldHorizontalMatrix.MATRIX_NODE_SIZE + 'px',
    'width': Blockly.FieldHorizontalMatrix.MATRIX_NODE_SIZE + 'px'
  });
  var nodeSize = Blockly.FieldHorizontalMatrix.MATRIX_NODE_SIZE / 4;
  var nodePad = Blockly.FieldHorizontalMatrix.MATRIX_NODE_SIZE / 16;
  for (var i = 0; i < 3; i++) {
    for (var n = 0; n < 3; n++) {
      Blockly.utils.createSvgElement('rect', {
        'x': ((nodeSize + nodePad) * n) + nodePad,
        'y': ((nodeSize + nodePad) * i) + nodePad,
        'width': nodeSize, 'height': nodeSize,
        'rx': nodePad, 'ry': nodePad,
        'fill': fill
      }, button);
    }
  }
  return button;
};

/**
 * Redraw the matrix with the current value.
 * @private
 */
Blockly.FieldHorizontalMatrix.prototype.updateMatrix_ = function () {
  const matrix = JSON.parse(this.matrix_);
  for (var i = 0; i < matrix.length; i++) {
    if (matrix[i].value === '0') {
      matrix[i].color = this.sourceBlock_.colourSecondary_;
      this.fillMatrixNode_(this.ledButtons_, i, this.sourceBlock_.colourSecondary_);
      this.fillMatrixNode_(this.ledThumbNodes_, i, this.sourceBlock_.colourSecondary_);
    } else {
      this.fillMatrixNode_(this.ledButtons_, i, matrix[i].color);
      this.fillMatrixNode_(this.ledThumbNodes_, i, matrix[i].color);
    }
  }
};

Blockly.FieldHorizontalMatrix.prototype.updateOneMatrix_ = function (i) {
  if (i !== null) {
    const matrix = JSON.parse(this.matrix_)[i];
    if (matrix === '0') {
      this.fillMatrixNode_(this.ledButtons_, i, this.sourceBlock_.colourSecondary_);
      this.fillMatrixNode_(this.ledThumbNodes_, i, this.sourceBlock_.colourSecondary_);
    } else {
      this.fillMatrixNode_(this.ledButtons_, i, this.currentColor);
      this.fillMatrixNode_(this.ledThumbNodes_, i, this.currentColor);
    }
  } else {
    this.updateMatrix_();
  }

};

/**
 * Clear the matrix.
 * @param {!Event} e Mouse event.
 */
Blockly.FieldHorizontalMatrix.prototype.clearMatrix_ = function (e) {
  if (e.button != 0) return;
  const arr = JSON.parse(this.matrix_).map((item) => {
    return {
      value: '0',
      color: item.color
    };
  })
  this.setValue(JSON.stringify(arr));
};

/**
 * Fill the matrix.
 * @param {!Event} e Mouse event.
 */
Blockly.FieldHorizontalMatrix.prototype.fillMatrix_ = function (e) {
  if (e.button != 0) return;

  const arr = JSON.parse(this.matrix_).map((item) => {
    return {
      value: '1',
      color: this.currentColor
    };
  })
  this.setValue(JSON.stringify(arr));
};

/**
 * Fill matrix node with specified colour.
 * @param {!Array<SVGElement>} node The array of matrix nodes.
 * @param {!number} index The index of the matrix node.
 * @param {!string} fill The fill colour in '#rrggbb' format.
 */
Blockly.FieldHorizontalMatrix.prototype.fillMatrixNode_ = function (node, index, fill) {
  if (!node || !node[index] || !fill) return;
  node[index].setAttribute('fill', fill);
};

Blockly.FieldHorizontalMatrix.prototype.setLEDNode_ = function (led, state) {
  if (led < 0 || led > (this.width_ * this.height_ - 1)) return;
  const arr = JSON.parse(this.matrix_);
  arr[led].value = state;
  this.setValue(JSON.stringify(arr));
};

Blockly.FieldHorizontalMatrix.prototype.fillLEDNode_ = function (led) {
  if (led < 0 || led > (this.width_ * this.height_ - 1)) return;
  this.setLEDNode_(led, '1');
};

Blockly.FieldHorizontalMatrix.prototype.clearLEDNode_ = function (led) {
  if (led < 0 || led > (this.width_ * this.height_ - 1)) return;
  this.setLEDNode_(led, '0');
};

Blockly.FieldHorizontalMatrix.prototype.toggleLEDNode_ = function (led) {
  if (led < 0 || led > (this.width_ * this.height_ - 1)) return;
  const arr = JSON.parse(this.matrix_);
  if (arr[led].value === '0') {
    this.setLEDNode_(led, '1');
    
  } else {
    this.setLEDNode_(led, '0');
  }

};

/**
 * Toggle matrix nodes on and off.
 * @param {!Event} e Mouse event.
 */
Blockly.FieldHorizontalMatrix.prototype.onMouseDown = function (e) {
  // this.matrixMoveWrapper_ =
  //   Blockly.bindEvent_(document.body, 'mousemove', this, this.onMouseMove);
  // this.matrixReleaseWrapper_ =
  //   Blockly.bindEvent_(document.body, 'mouseup', this, this.onMouseUp);
  var ledHit = this.checkForLED_(e);
  if (ledHit > -1) {
    if (this.matrix_.charAt(ledHit) === '0') {
      this.paintStyle_ = 'fill';
    } else {
      this.paintStyle_ = 'clear';
    }
    this.toggleLEDNode_(ledHit);
    // this.updateMatrix_();
    // this.updateOneMatrix_(e.target.getAttribute('data-index'));
  } else {
    this.paintStyle_ = null;
  }
};

/**
 * Unbind mouse move event and clear the paint style.
 * @param {!Event} e Mouse move event.
 */
Blockly.FieldHorizontalMatrix.prototype.onMouseUp = function () {
  Blockly.unbindEvent_(this.matrixMoveWrapper_);
  Blockly.unbindEvent_(this.matrixReleaseWrapper_);
  this.paintStyle_ = null;
};

/**
 * Toggle matrix nodes on and off by dragging mouse.
 * @param {!Event} e Mouse move event.
 */
Blockly.FieldHorizontalMatrix.prototype.onMouseMove = function (e) {
  e.preventDefault();
  if (this.paintStyle_) {
    var led = this.checkForLED_(e);
    if (led < 0) return;
    if (this.paintStyle_ === 'clear') {
      this.clearLEDNode_(led);
    } else if (this.paintStyle_ === 'fill') {
      this.fillLEDNode_(led);
    }
  }
};

/**
 * Check if mouse coordinates collide with a matrix node.
 * @param {!Event} e Mouse move event.
 * @return {number} The matching matrix node or -1 for none.
 */
Blockly.FieldHorizontalMatrix.prototype.checkForLED_ = function (e) {
  var bBox = this.matrixStage_.getBoundingClientRect();
  var nodeSize = Blockly.FieldHorizontalMatrix.MATRIX_NODE_SIZE;
  var nodePad = Blockly.FieldHorizontalMatrix.MATRIX_NODE_PAD;
  var dx = e.clientX - bBox.left;
  var dy = e.clientY - bBox.top;
  var min = nodePad / 2;
  var max = bBox.width - (nodePad / 2);
  if (dx < min || dx > max || dy < min || dy > max) {
    return -1;
  }
  var xDiv = Math.trunc((dx - nodePad / 2) / (nodeSize + nodePad));
  var yDiv = Math.trunc((dy - nodePad / 2) / (nodeSize + nodePad));
  return xDiv + (yDiv * this.width_);
};

/**
 * Clean up this FieldHorizontalMatrix, as well as the inherited Field.
 * @return {!Function} Closure to call on destruction of the WidgetDiv.
 * @private
 */
Blockly.FieldHorizontalMatrix.prototype.dispose_ = function () {
  var thisField = this;
  return function () {
    Blockly.FieldHorizontalMatrix.superClass_.dispose_.call(thisField)();
    thisField.matrixStage_ = null;
    if (thisField.mouseDownWrapper_) {
      Blockly.unbindEvent_(thisField.mouseDownWrapper_);
    }
    if (thisField.matrixTouchWrapper_) {
      Blockly.unbindEvent_(thisField.matrixTouchWrapper_);
    }
    if (thisField.matrixReleaseWrapper_) {
      Blockly.unbindEvent_(thisField.matrixReleaseWrapper_);
    }
    if (thisField.matrixMoveWrapper_) {
      Blockly.unbindEvent_(thisField.matrixMoveWrapper_);
    }
    if (thisField.clearButtonWrapper_) {
      Blockly.unbindEvent_(thisField.clearButtonWrapper_);
    }
    if (thisField.fillButtonWrapper_) {
      Blockly.unbindEvent_(thisField.fillButtonWrapper_);
    }
  };
};
/**
 * Callback for when the drop-down is hidden.
 */
Blockly.FieldHorizontalMatrix.prototype.onHide_ = function () {
  Blockly.DropDownDiv.content_.removeAttribute('role');
  Blockly.DropDownDiv.content_.removeAttribute('aria-haspopup');
  Blockly.DropDownDiv.content_.removeAttribute('aria-activedescendant');
  // Unflip the arrow if appropriate
  this.arrow_.setAttribute('transform', 'translate(' + this.arrowX_ + ',' + this.arrowY_ + ')');
};

Blockly.FieldHorizontalMatrix.prototype.colorObjectToRgbString = function (color) {
  return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
}
Blockly.Field.register('field_horizontal_matrix', Blockly.FieldHorizontalMatrix);
