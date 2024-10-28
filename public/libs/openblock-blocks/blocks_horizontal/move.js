'use strict';

goog.provide('Blockly.Blocks.move');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');

Blockly.Blocks['dropdown_move_speed'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldMoveSpeedMenu(
        [
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/MoveSpeed1.svg',
            value: 'slow', iconSrc: Blockly.mainWorkspace.options.pathToMedia + 'icons/AdornerSpeed1.svg', speed: '3.78', width: 45, height: 45, alt: 'Slow'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/MoveSpeed2.svg',
            value: 'normal', iconSrc: Blockly.mainWorkspace.options.pathToMedia + 'icons/AdornerSpeed2.svg', speed: '1.45', width: 45, height: 45, alt: 'Normal'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/MoveSpeed3.svg',
            value: 'medium', iconSrc: Blockly.mainWorkspace.options.pathToMedia + 'icons/AdornerSpeed3.svg', speed: '.83', width: 45, height: 45, alt: 'Medium'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/MoveSpeed4.svg',
            value: 'fast', iconSrc: Blockly.mainWorkspace.options.pathToMedia + 'icons/AdornerSpeed4.svg', speed: '.58', width: 45, height: 45, alt: 'Fast'
          }
        ], 
        {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/AdornerMove.svg', width: 100, height: 100},
      ),
        'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.move.primary,
      Blockly.Colours.move.secondary,
      Blockly.Colours.move.tertiary
    );
  }
};

Blockly.Blocks['move_speed'] = {
  /**
   * Block to set speed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "move_speed",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/MoveSpeed1.svg",
          "width": 40,
          "height": 40,
          "alt": "Move Speed"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.move,
      "colour": Blockly.Colours.move.primary,
      "colourSecondary": Blockly.Colours.move.secondary,
      "colourTertiary": Blockly.Colours.move.tertiary
    });
  }
};

Blockly.Blocks['input_move_num'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldInputNumber(1,0),
        'CHOICE');
    this.setOutput(true);
    this.setColour('#fff',
      Blockly.Colours.move.secondary,
      Blockly.Colours.move.tertiary
    );
  }
};

Blockly.Blocks['move_forward'] = {
  /**
   * Block to wait (pause) stack.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "move_forward",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/MoveForward.svg",
          "width": 40,
          "height": 40,
          "alt": "Wait"
        },
        {
          "type": "input_value",
          "name": "CHOICE",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.move,
      "colour": Blockly.Colours.move.primary,
      "colourSecondary": Blockly.Colours.move.secondary,
      "colourTertiary": Blockly.Colours.move.tertiary
    });

  }
};



Blockly.Blocks['move_back'] = {
  /**
   *
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "move_back",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/MoveBack.svg",
          "width": 40,
          "height": 40,
          "alt": "Wait"
        },
        {
          "type": "input_value",
          "name": "CHOICE",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.move,
      "colour": Blockly.Colours.move.primary,
      "colourSecondary": Blockly.Colours.move.secondary,
      "colourTertiary": Blockly.Colours.move.tertiary
    });

  }
};

Blockly.Blocks['move_left'] = {
  /**
   *
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "move_left",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/MoveLeft.svg",
          "width": 40,
          "height": 40,
          "alt": "Wait"
        },
        {
          "type": "input_value",
          "name": "CHOICE",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.move,
      "colour": Blockly.Colours.move.primary,
      "colourSecondary": Blockly.Colours.move.secondary,
      "colourTertiary": Blockly.Colours.move.tertiary
    });

  }
};
Blockly.Blocks['move_right'] = {
  /**
   *
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "move_right",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/MoveRight.svg",
          "width": 40,
          "height": 40,
          "alt": "Wait"
        },
        {
          "type": "input_value",
          "name": "CHOICE",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.move,
      "colour": Blockly.Colours.move.primary,
      "colourSecondary": Blockly.Colours.move.secondary,
      "colourTertiary": Blockly.Colours.move.tertiary
    });

  }
};

Blockly.Blocks['move_stop'] = {
  /**
   * Block to set motor speed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "move_stop",
      "message0": "%1",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/MoveStop.svg",
          "width": 40,
          "height": 40,
          "alt": "Move Stop"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.move,
      "colour": Blockly.Colours.move.primary,
      "colourSecondary": Blockly.Colours.move.secondary,
      "colourTertiary": Blockly.Colours.move.tertiary
    });
  }
};