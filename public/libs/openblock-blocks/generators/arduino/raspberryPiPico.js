/**
 * Visual Blocks Language
 *
 * Copyright 2022 openblock.cc.
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
'use strict';

goog.provide('Blockly.Arduino.raspberryPiPico');

goog.require('Blockly.Arduino');

Blockly.Arduino['arduino_serial_raspberryPiPicoMultiSerialBegin'] = function(block) {
  var arg0 = block.getFieldValue('NO') || '0';
  var arg1 = block.getFieldValue('VALUE') || '9600';

  var code = '';
  if(arg0 === '0')
  {
    arg0 = '';
  } else if (arg0 === '2') {
    code += 'Serial2.setTX(4);\nSerial2.setRX(5);\n';
  }
  code += 'Serial' + arg0 + '.begin(' + arg1 + ');\n';
  return code;
};
