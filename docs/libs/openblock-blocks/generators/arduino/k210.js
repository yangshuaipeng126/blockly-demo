/**
 * Visual Blocks Language
 *
 * Copyright 2021 openblock.cc.
 * https://github.com/openblockcc/openblock-blocks
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

goog.provide('Blockly.Arduino.k210');

goog.require('Blockly.Arduino');


Blockly.Arduino['arduino_pin_k210SetPwmOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

  Blockly.Arduino.setups_['k210SetPwmOutput'] = 'analogWriteFrequency(490);';
  var code = "analogWrite(" + arg0 + ", " + arg1 + ");\n";
  return code;
};

Blockly.Arduino['arduino_serial_k210MultiSerialBegin'] = function(block) {
  var no = block.getFieldValue('NO') || '0';
  var baud = block.getFieldValue('BAUD') || '9600';
  var txPin = block.getFieldValue('TX_PIN');
  var rxPin = block.getFieldValue('RX_PIN');

  var code;
  if(no === '0')
  {
    no = '';
  }
  code = 'Serial' + no + '.begin(' + baud + ', ' + rxPin + ', ' + txPin + ');\n';
  return code;
};
