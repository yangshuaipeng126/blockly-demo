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

goog.provide('Blockly.ProgramMode');


/**
 * String representing the program mode
 * @const {string}
 */
Blockly.ProgramMode.REALTIME = 'realtime';

/**
 * String representing the program mode
 * @const {string}
 */
Blockly.ProgramMode.UPLOAD = 'upload';

/**
 * @type {string}
 * @protected
 */
Blockly.ProgramMode.programMode = Blockly.ProgramMode.REALTIME;

/**
 * Set current program mode.
 * @param {string} mode - Current program mode.
 */
Blockly.ProgramMode.setProgramMode = function(mode) {
  Blockly.ProgramMode.programMode = mode;
};

/**
 * Get current program mode.
 * @return {string} Current program mode.
 */
Blockly.ProgramMode.getProgramMode = function() {
  return Blockly.ProgramMode.programMode;
};
