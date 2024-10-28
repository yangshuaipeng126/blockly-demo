/**
 * Visual Blocks Editor
 *
 * Copyright 2021 openblock.cc.
 * https://github.com/openblockcc/openblock-blocks
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
 * @fileoverview Core JavaScript library for Blockly.
 * @author arthurzheng@openblock.cc
 */
'use strict';

goog.provide('Blockly.Device');


/**
 * @type {string}
 * @protected
 */
Blockly.Device.deviceId = null;
/**
 * @type {string}
 * @protected
 */
Blockly.Device.deviceType = null;

/**
 * Set current device id and type.
 * @param {string} deviceId - The id of device.
 * @param {string} deviceType - The type of device.
 */
Blockly.Device.setDevice = function(deviceId, deviceType) {
  Blockly.Device.deviceId = deviceId;
  Blockly.Device.deviceType = deviceType;
};

/**
 * Get current device id.
 * @return {string} Current device id.
 */
Blockly.Device.getDeviceId = function() {
  return Blockly.Device.deviceId;
};

/**
 * Get current device type.
 * @return {string} Current device type.
 */
Blockly.Device.getDeviceType = function() {
  return Blockly.Device.deviceType;
};

/**
 * Get device pin options by block type.
 * @param {Node|string} type Type of block.
 * @return {!Array.<!Array>} Array of option tuples:
 *     (human-readable text or image, language-neutral name).
 */
Blockly.Device.getPinOptions = function(type) {
  return Blockly.getMainWorkspace().getFlyout()
      .getFlyoutItems()
      .find(function(block) { return block.type === type; })
      .getField('PIN')
      .getOptions();
};
