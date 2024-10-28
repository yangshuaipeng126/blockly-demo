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
 * @fileoverview Wedo blocks for Scratch (Horizontal)
 * @author ascii@media.mit.edu <Andrew Sliwinski>
 */
'use strict';

goog.provide('Blockly.Blocks.wedo');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');

Blockly.Blocks['dropdown_wedo_setcolor'] = {
  /**
   * Block for set color drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldIconMenu(
        [
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_mystery.svg',
            value: 'mystery', width: 48, height: 48, alt: 'Mystery'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_yellow.svg',
            value: 'yellow', width: 48, height: 48, alt: 'Yellow'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_orange.svg',
            value: 'orange', width: 48, height: 48, alt: 'Orange'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_coral.svg',
            value: 'coral', width: 48, height: 48, alt: 'Coral'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_magenta.svg',
            value: 'magenta', width: 48, height: 48, alt: 'Magenta'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_purple.svg',
            value: 'purple', width: 48, height: 48, alt: 'Purple'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_blue.svg',
            value: 'blue', width: 48, height: 48, alt: 'Blue'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_green.svg',
            value: 'green', width: 48, height: 48, alt: 'Green'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_white.svg',
            value: 'white', width: 48, height: 48, alt: 'White'
          }
        ]), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.looks.primary,
      Blockly.Colours.looks.secondary,
      Blockly.Colours.looks.tertiary
    );
  }
};

Blockly.Blocks['wedo_setcolor'] = {
  /**
   * Block to set color of LED
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "wedo_setcolor",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/set-led_blue.svg",
          "width": 40,
          "height": 40,
          "alt": "Set LED Color"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.looks,
      "colour": Blockly.Colours.looks.primary,
      "colourSecondary": Blockly.Colours.looks.secondary,
      "colourTertiary": Blockly.Colours.looks.tertiary
    });
  }
};

Blockly.Blocks['wedo_motorclockwise'] = {
  /**
   * Block to spin motor clockwise.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "wedo_motorclockwise",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/wedo_motor-clockwise.svg",
          "width": 40,
          "height": 40,
          "alt": "Turn motor clockwise"
        },
        {
          "type": "input_value",
          "name": "DURATION",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.motion,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};

Blockly.Blocks['wedo_motorcounterclockwise'] = {
  /**
   * Block to spin motor counter-clockwise.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "wedo_motorcounterclockwise",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/wedo_motor-counterclockwise.svg",
          "width": 40,
          "height": 40,
          "alt": "Turn motor counter-clockwise"
        },
        {
          "type": "input_value",
          "name": "DURATION",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.motion,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};

Blockly.Blocks['dropdown_wedo_motorspeed'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldMotorSpeedMenu(
        [
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/MotorSpeed1.svg',
            value: 'slow', iconSrc: Blockly.mainWorkspace.options.pathToMedia + 'icons/AdornerSpeed1.svg', speed: '3.78', width: 45, height: 45, alt: 'Slow'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/MotorSpeed2.svg',
            value: 'normal', iconSrc: Blockly.mainWorkspace.options.pathToMedia + 'icons/AdornerSpeed2.svg', speed: '1.45', width: 45, height: 45, alt: 'Normal'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/MotorSpeed3.svg',
            value: 'medium', iconSrc: Blockly.mainWorkspace.options.pathToMedia + 'icons/AdornerSpeed3.svg', speed: '.83', width: 45, height: 45, alt: 'Medium'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/MotorSpeed4.svg',
            value: 'fast', iconSrc: Blockly.mainWorkspace.options.pathToMedia + 'icons/AdornerSpeed4.svg', speed: '.58', width: 45, height: 45, alt: 'Fast'
          }
        ], 
        {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/AdornerMotor.svg', width: 100, height: 100},
        [
          {
            icon: '',
            label: 'A',
            value: 'A'
          },
          {
            icon: '',
            label: 'B',
            value: 'B'
          },
          {
            icon: '',
            label: 'C',
            value: 'C'
          },
          {
            icon: '',
            label: 'D',
            value: 'D'
          },
          {
            icon: '',
            label: 'E',
            value: 'E'
          },
          {
            icon: '',
            label: 'F',
            value: 'F'
          }
        ]
      ),
        'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.motion.primary,
      Blockly.Colours.motion.secondary,
      Blockly.Colours.motion.tertiary
    );
  }
};

Blockly.Blocks['wedo_motorspeed'] = {
  /**
   * Block to set motor speed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "wedo_motorspeed",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/MotorSpeed1.svg",
          "width": 40,
          "height": 40,
          "alt": "Motor Speed"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.motion,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};

Blockly.Blocks['dropdown_wedo_whentilt'] = {
  /**
   * Block for when tilt drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldIconMenu(
        [
          { type: 'placeholder', width: 48, height: 48 },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/wedo_when-tilt-forward.svg',
            value: 'forward', width: 48, height: 48, alt: 'Tilt forward'
          },
          { type: 'placeholder', width: 48, height: 48 },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/wedo_when-tilt-left.svg',
            value: 'left', width: 48, height: 48, alt: 'Tilt left'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/wedo_when-tilt.svg',
            value: 'any', width: 48, height: 48, alt: 'Tilt any'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/wedo_when-tilt-right.svg',
            value: 'right', width: 48, height: 48, alt: 'Tilt right'
          },
          { type: 'placeholder', width: 48, height: 48 },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/wedo_when-tilt-backward.svg',
            value: 'backward', width: 48, height: 48, alt: 'Tilt backward'
          }
        ]), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.event.primary,
      Blockly.Colours.event.secondary,
      Blockly.Colours.event.tertiary
    );
  }
};

Blockly.Blocks['wedo_whentilt'] = {
  /**
   * Block for when tilted.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "wedo_whentilt",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/wedo_when-tilt.svg",
          "width": 40,
          "height": 40,
          "alt": "When tilted"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "nextStatement": null,
      "category": Blockly.Categories.event,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};

Blockly.Blocks['wedo_whendistanceclose'] = {
  /**
   * Block for when distance sensor is close.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "wedo_whendistanceclose",
      "message0": "%1",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/wedo_when-distance_close.svg",
          "width": 40,
          "height": 40,
          "alt": "When distance close"
        }
      ],
      "inputsInline": true,
      "nextStatement": null,
      "category": Blockly.Categories.event,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};

Blockly.Blocks['dropdown_wedo_rotate_left'] = {
  /**
   * Block for when tilt drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldRotateDropdown(-1, 1), 'CHOICE');
    this.setOutput(true);
    this.outputShape_ = Blockly.OUTPUT_SHAPE_ROUND;
    this.setColour(Blockly.Colours.textField,
      Blockly.Colours.textField,
      Blockly.Colours.textField
    );
  }
};

Blockly.Blocks['wedo_left'] = {
  /**
   * Block for when tilted.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "wedo_left",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/MotorLeft.svg",
          "width": 40,
          "height": 40,
          "alt": "Motor Left"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.motion,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};

Blockly.Blocks['dropdown_wedo_rotate_right'] = {
  /**
   * Block for when tilt drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldRotateDropdown(-1, 1), 'CHOICE');
    this.setOutput(true);
    this.outputShape_ = Blockly.OUTPUT_SHAPE_ROUND;
    this.setColour(Blockly.Colours.textField,
      Blockly.Colours.textField,
      Blockly.Colours.textField
    );
  }
};

Blockly.Blocks['wedo_right'] = {
  /**
   * Block for when tilted.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "wedo_right",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/MotorRight.svg",
          "width": 40,
          "height": 40,
          "alt": "Motor Left"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "nextStatement": null,
      "category": Blockly.Categories.motion,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};

Blockly.Blocks['wedo_stop'] = {
  /**
   * Block to set motor speed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "wedo_stop",
      "message0": "%1",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/MotorStop.svg",
          "width": 40,
          "height": 40,
          "alt": "Motor Stop"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.motion,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};