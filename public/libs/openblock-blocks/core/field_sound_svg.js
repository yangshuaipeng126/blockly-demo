/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
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
 * @fileoverview Image field.  Used for pictures, icons, etc.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldSoundSvg');

goog.require('Blockly.Field');
goog.require('goog.dom');
goog.require('goog.math.Size');
goog.require('goog.userAgent');


/**
 * Class for an image on a block.
 * @param {string} src The URL of the image.
 * @param {number} width Width of the image.
 * @param {number} height Height of the image.
 * @param {string=} opt_alt Optional alt text for when block is collapsed.
 * @param {boolean} flip_rtl Whether to flip the icon in RTL
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldSoundSvg = function (value, width, height, opt_alt, flip_rtl) {
  this.sourceBlock_ = null;

  // Ensure height and width are numbers.  Strings are bad at math.
  this.height_ = Number(height);
  this.width_ = Number(width);
  this.size_ = new goog.math.Size(this.width_, this.height_);
  this.text_ = opt_alt || '';
  this.flipRTL_ = flip_rtl;
  this.setValue(value);
};
goog.inherits(Blockly.FieldSoundSvg, Blockly.Field);

/**
 * Construct a FieldSoundSvg from a JSON arg object,
 * dereferencing any string table references.
 * @param {!Object} options A JSON object with options (value, width, height, alt,
 *     and flipRtl/flip_rtl).
 * @returns {!Blockly.FieldSoundSvg} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldSoundSvg.fromJson = function (options) {
  var value = Blockly.utils.replaceMessageReferences(options['value']);
  var width = Number(Blockly.utils.replaceMessageReferences(options['width']));
  var height =
    Number(Blockly.utils.replaceMessageReferences(options['height']));
  var alt = Blockly.utils.replaceMessageReferences(options['alt']);
  var flip_rtl = !!options['flip_rtl'] || !!options['flipRtl'];
  return new Blockly.FieldSoundSvg(value, width, height, alt, flip_rtl);
};

/**
 * Editable fields are saved by the XML renderer, non-editable fields are not.
 */
Blockly.FieldSoundSvg.prototype.EDITABLE = false;

/**
 * Install this image on a block.
 */
Blockly.FieldSoundSvg.prototype.init = function () {
  if (this.fieldGroup_) {
    // Image has already been initialized once.
    return;
  }
  // Build the DOM.
  /** @type {SVGElement} */
  this.fieldGroup_ = Blockly.utils.createSvgElement('g', {
    transform: 'translate(16,12) scale(1 1)'
  }, null);
  if (!this.visible_) {
    this.fieldGroup_.style.display = 'none';
  }
  /** @type {SVGElement} */
  this.imageElement_ = Blockly.utils.createSvgElement(
    'image',
    {
      'height': this.height_ + 'px',
      'width': this.width_ + 'px',
    },
    this.fieldGroup_);
    this.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
      'xlink:href', this.svgToBase64_(this.getValue()) || '')
  // this.setValue(this.src_);
  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);

  // Configure the field to be transparent with respect to tooltips.
  this.setTooltip(this.sourceBlock_);
  Blockly.Tooltip.bindMouseEvents(this.imageElement_);
};

Blockly.FieldSoundSvg.prototype.svgToBase64_ = function (value) {
  // 使用DOMParser将HTML字符串转换成DOM元素
  var parser = new DOMParser();
  var htmlString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="dsmIcon"><g id="Icon/Essential/sounds-record" stroke-width="1" fill-rule="nonzero"><path d="M24 6.6c2.337 0 4.379.846 6.041 2.503 1.583 1.577 2.428 3.5 2.505 5.692l.006.33-.002 6.969a2.589 2.589 0 011.434-.425c.695 0 1.336.26 1.842.75.453.444.718 1 .766 1.607l.008.205v2.43c0 3.126-1.091 5.895-3.235 8.207-1.697 1.832-3.746 3.059-6.096 3.655l-.394.093-.26.053v.007h3.625c.557 0 1.077.168 1.52.484l.162.126.154.14a2.49 2.49 0 01.78 1.812c0 .69-.272 1.322-.778 1.815a2.598 2.598 0 01-1.63.74l-.208.007H17.76c-.696 0-1.336-.26-1.836-.747a2.491 2.491 0 01-.78-1.815c0-.688.273-1.32.778-1.813a2.601 2.601 0 011.631-.741l.207-.008h3.625v-.006l-.26-.053a12.258 12.258 0 01-5.925-3.174l-.293-.29-.272-.285c-2.058-2.22-3.146-4.86-3.23-7.834l-.005-.374v-2.43c0-.686.27-1.318.775-1.81a2.607 2.607 0 011.84-.751c.521 0 1.01.146 1.434.424v-6.967c0-2.33.848-4.367 2.51-6.023C19.62 7.446 21.663 6.6 24 6.6z" id="Path" fill="#642E7F"/><path d="M33.984 22.869c.383 0 .725.139 1.005.41.233.228.369.5.403.8l.008.152v2.43l-.006.366c-.08 2.671-1.055 5.025-2.909 7.025-1.7 1.834-3.771 2.992-6.18 3.457l-.384.067-.505.081v2.22h4.824l.161.008c.317.034.6.169.84.4.275.269.415.592.415.953 0 .363-.14.686-.414.954a1.398 1.398 0 01-.84.4l-.162.008H17.76l-.162-.008a1.392 1.392 0 01-.838-.4 1.293 1.293 0 01-.416-.954c0-.361.14-.685.414-.952.24-.232.524-.367.84-.401l.162-.009h4.826V37.66l-.505-.081-.384-.068c-2.411-.466-4.482-1.624-6.182-3.458-1.854-2-2.828-4.354-2.91-7.025l-.005-.367v-2.43l.008-.152c.034-.3.17-.57.404-.799.28-.27.62-.41 1.004-.41.381 0 .722.139 1 .409.236.228.373.5.407.8l.008.153v2.43l.006.328c.075 2.173.906 4.013 2.515 5.58 1.685 1.642 3.677 2.448 6.048 2.448 2.37 0 4.363-.806 6.048-2.448 1.609-1.565 2.44-3.407 2.515-5.58l.006-.329v-2.43l.008-.152a1.3 1.3 0 01.405-.799c.28-.271.62-.41 1.002-.41zM24 7.8c2.019 0 3.756.72 5.194 2.153 1.36 1.356 2.08 2.981 2.152 4.858l.006.315v11.292l-.006.315c-.072 1.877-.791 3.502-2.152 4.86-1.438 1.431-3.176 2.151-5.194 2.151s-3.756-.72-5.194-2.152c-1.36-1.357-2.08-2.982-2.152-4.859l-.006-.315V15.126l.006-.315c.072-1.877.791-3.502 2.152-4.858C20.244 8.52 21.98 7.8 24 7.8z" id="Shape" fill="#FFF"/><path d="M47.84 36.86c-.148 5.504-4.656 9.919-10.195 9.919-5.634 0-10.201-4.567-10.201-10.2 0-5.634 4.567-10.2 10.2-10.2 5.54 0 10.048 4.415 10.196 9.919l.004.28-.004.281z" id="Path" fill="#642E7F"/><path d="M46.64 36.313a9 9 0 00-8.995-8.734 9 9 0 100 18 9 9 0 008.995-8.735l.004-.266-.004-.265z" id="Path" fill="#AF52DE"/><text x="37.5" y="41" text-anchor="middle" style="font: 12px sans-serif; fill: rgb(255, 255, 255);">${value}</text></g></svg>`;
  var doc = parser.parseFromString(htmlString, 'image/svg+xml');
  // 获取SVG元素
  var svgElement = doc.documentElement;
  // 将SVG数据转换为UTF-8编码的字符串
  const svgString = new XMLSerializer().serializeToString(svgElement);

  // 使用btoa进行Base64编码
  const base64 = btoa(encodeURIComponent(svgString).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));

  // 构造MIME类型的数据URL
  const dataUrl = "data:image/svg+xml;base64," + base64;

  return dataUrl;
}

/**
 * Dispose of all DOM objects belonging to this text.
 */
Blockly.FieldSoundSvg.prototype.dispose = function () {
  goog.dom.removeNode(this.fieldGroup_);
  this.fieldGroup_ = null;
  this.imageElement_ = null;
};

/**
 * Change the tooltip text for this field.
 * @param {string|!Element} newTip Text for tooltip or a parent element to
 *     link to for its tooltip.
 */
Blockly.FieldSoundSvg.prototype.setTooltip = function (newTip) {
  this.imageElement_.tooltip = newTip;
};

/**
 * Get the source URL of this image.
 * @return {string} Current text.
 * @override
 */
Blockly.FieldSoundSvg.prototype.getValue = function () {
  return this.value_;
};

/**
 * Set the source URL of this image.
 * @param {?string} src New source.
 * @override
 */
Blockly.FieldSoundSvg.prototype.setValue = function (value) {
  if (value === null) {
    // No change if null.
    return;
  }
  this.value_ = value;
};

/**
 * Get whether to flip this image in RTL
 * @return {boolean} True if we should flip in RTL.
 */
Blockly.FieldSoundSvg.prototype.getFlipRTL = function () {
  return this.flipRTL_;
};

/**
 * Set the alt text of this image.
 * @param {?string} alt New alt text.
 * @override
 */
Blockly.FieldSoundSvg.prototype.setText = function (alt) {
  if (alt === null) {
    // No change if null.
    return;
  }
  this.text_ = alt;
};

/**
 * Images are fixed width, no need to render.
 * @private
 */
Blockly.FieldSoundSvg.prototype.render_ = function () {
  // NOP
};

/**
 * Images are fixed width, no need to update.
 * @private
 */
Blockly.FieldSoundSvg.prototype.updateWidth = function () {
  // NOP
};

Blockly.Field.register('field_sound_svg', Blockly.FieldSoundSvg);
