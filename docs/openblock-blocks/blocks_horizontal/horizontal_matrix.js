'use strict';


goog.provide('Blockly.Blocks.horizontal_matrix');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');


Blockly.Blocks['light_show_matrix'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldHorizontalMatrix(JSON.stringify([{"value":"0","color":""},{"value":"1","color":""},{"value":"0","color":""},{"value":"1","color":""},{"value":"0","color":""},{"value":"1","color":""},{"value":"0","color":""},{"value":"1","color":""},{"value":"0","color":""},{"value":"1","color":""},{"value":"1","color":""},{"value":"0","color":""},{"value":"0","color":""},{"value":"0","color":""},{"value":"1","color":""},{"value":"0","color":""},{"value":"1","color":""},{"value":"0","color":""},{"value":"1","color":""},{"value":"0","color":""},{"value":"0","color":""},{"value":"0","color":""},{"value":"1","color":""},{"value":"0","color":""},{"value":"0","color":""}]),5,5), 'MATRIX');
    this.setOutput(true);
    this.setColour(Blockly.Colours.matrix.primary,
      Blockly.Colours.matrix.secondary,
      Blockly.Colours.matrix.tertiary
    );
  }
};

Blockly.Blocks['light_show'] = {
  /**
   * Block to set speed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "light_show",
      "message0": "%1",
      "args0": [
        {
          "type": "input_value",
          "name": "MATRIX"
        },
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.matrix,
      "colour": Blockly.Colours.matrix.primary,
      "colourSecondary": Blockly.Colours.matrix.secondary,
      "colourTertiary": Blockly.Colours.matrix.tertiary
    });
  }
};

Blockly.Blocks['light_random'] = {
  /**
   * Block to set speed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "light_random",
      "message0": "%1",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + 'icons/Lights5x5Random.svg',
          "width": 40,
          "height": 40,
        },
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.matrix,
      "colour": Blockly.Colours.matrix.primary,
      "colourSecondary": Blockly.Colours.matrix.secondary,
      "colourTertiary": Blockly.Colours.matrix.tertiary
    });
  }
};