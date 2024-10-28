'use strict';


goog.provide('Blockly.Blocks.chart');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');


Blockly.Blocks['dropdown_chart_color'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldColourMenu( [
        {
          src: Blockly.mainWorkspace.options.pathToMedia + "icons/DisplayChartPink.svg",
          backgroundColor: '#d42da3',
          value: 'pink'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + "icons/DisplayChartBlue.svg",
          backgroundColor: '#3f8eee',
          value: 'blue'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + "icons/DisplayChartCyan.svg",
          backgroundColor: '#77E8FF',
          value: 'cyan'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + "icons/DisplayChartGreen.svg",
          backgroundColor: '#00A845',
          value: 'green'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + "icons/DisplayChartYellow.svg",
          backgroundColor: '#FFD500',
          value: 'yellow'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + "icons/DisplayChartRed.svg",
          backgroundColor: '#FF000C',
          value: 'red'
        },
      
      ]), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.show.primary,
      Blockly.Colours.show.secondary,
      Blockly.Colours.show.tertiary
    );
  }
};

Blockly.Blocks['chart_color'] = {
  /**
   * Block to set speed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "chart_color",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src":  Blockly.mainWorkspace.options.pathToMedia + 'icons/DisplayChartGreen.svg',
          "width": 40,
          "height": 40,
          "alt": "Chart Color"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.show,
      "colour": Blockly.Colours.show.primary,
      "colourSecondary": Blockly.Colours.show.secondary,
      "colourTertiary": Blockly.Colours.show.tertiary
    });
  }
};

Blockly.Blocks['char_clear_color'] = {
  /**
   * Block to set speed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "char_clear_color",
      "message0": "%1",
      "args0": [
        {
          "type": "field_image",
          "src":  Blockly.mainWorkspace.options.pathToMedia + 'icons/DisplayChartClear.svg',
          "width": 40,
          "height": 40,
          "alt": "Chart Clear"
        },
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.show,
      "colour": Blockly.Colours.show.primary,
      "colourSecondary": Blockly.Colours.show.secondary,
      "colourTertiary": Blockly.Colours.show.tertiary
    });
  }
};

Blockly.Blocks['dropdown_chart_display_story'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldIconMenu([
        {
          src:  Blockly.mainWorkspace.options.pathToMedia + 'icons/DisplayChartExpand.svg',
          width: 40,
          height: 40,
          alt: 'Expand',
          value: 'expand'
        },
        {
          src:  Blockly.mainWorkspace.options.pathToMedia + 'icons/DisplayChartCollapse.svg',
          width: 40,
          height: 40,
          alt: 'Collapse',
          value: 'collapse'
        },
      ]), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.show.primary,
      Blockly.Colours.show.secondary,
      Blockly.Colours.show.tertiary
    );
  }
};

Blockly.Blocks['chart_display_story'] = {
  /**
   * Block to set speed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "chart_display_story",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src":  Blockly.mainWorkspace.options.pathToMedia + 'icons/DisplayChartExpand.svg',
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
      "category": Blockly.Categories.show,
      "colour": Blockly.Colours.show.primary,
      "colourSecondary": Blockly.Colours.show.secondary,
      "colourTertiary": Blockly.Colours.show.tertiary
    });
  }
};