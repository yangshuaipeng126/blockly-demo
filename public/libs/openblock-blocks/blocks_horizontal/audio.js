'use strict';


goog.provide('Blockly.Blocks.audio');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');


Blockly.Blocks['dropdown_play_times'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumberMenu(1, [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '?', value: 'random' },
      ], 1, 8, 1), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.audio.primary,
      Blockly.Colours.audio.secondary,
      Blockly.Colours.audio.tertiary
    );
  }
};

Blockly.Blocks['audio_animal'] = {
  /**
   * Block to set speed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "audio_animal",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + 'icons/SoundsAnimal.svg',
          "width": 40,
          "height": 40,
          "alt": "SoundsAnimal"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.audio,
      "colour": Blockly.Colours.audio.primary,
      "colourSecondary": Blockly.Colours.audio.secondary,
      "colourTertiary": Blockly.Colours.audio.tertiary
    });
  }
};

Blockly.Blocks['audio_effect'] = {
  /**
   * Block to set speed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "audio_effect",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + 'icons/SoundsEffect.svg',
          "width": 40,
          "height": 40,
          "alt": "SoundsEffect"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.audio,
      "colour": Blockly.Colours.audio.primary,
      "colourSecondary": Blockly.Colours.audio.secondary,
      "colourTertiary": Blockly.Colours.audio.tertiary
    });
  }
};

Blockly.Blocks['audio_music'] = {
  /**
   * Block to set speed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "audio_music",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + 'icons/SoundsMusic.svg',
          "width": 40,
          "height": 40,
          "alt": "SoundsMusic"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.audio,
      "colour": Blockly.Colours.audio.primary,
      "colourSecondary": Blockly.Colours.audio.secondary,
      "colourTertiary": Blockly.Colours.audio.tertiary
    });
  }
};

Blockly.Blocks['horizontalsound_recordSound'] = {
  /**
   * Block to set speed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "horizontalsound_recordSound",
      "message0": "%1",
      "args0": [
        {
          "type": "field_image",
          "src": 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgaWQ9ImRzbUljb24iPjxnIGlkPSJJY29uL0Vzc2VudGlhbC9zb3VuZHMtbmV3cmVjIiBzdHJva2Utd2lkdGg9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTMwLjc2OCAxMi41M3YxMS40MWMwIDEuOTYyLS42OTggMy42NC0yLjA5NSA1LjAzOC0xLjM5NiAxLjM5NS0zLjA3NiAyLjA5NC01LjAzNSAyLjA5NC0xLjk2MiAwLTMuNjQxLS42OTktNS4wMzgtMi4wOTQtMS4zOTctMS4zOTctMi4wOTUtMy4wNzYtMi4wOTUtNS4wMzhWMTIuNTNjMC0xLjk2LjY5OC0zLjY0IDIuMDk1LTUuMDM2QzE5Ljk5NyA2LjA5NyAyMS42NzYgNS40IDIzLjYzOCA1LjRjMS45NiAwIDMuNjQuNjk3IDUuMDM1IDIuMDk0IDEuMzk3IDEuMzk3IDIuMDk1IDMuMDc2IDIuMDk1IDUuMDM2em01LjcwNSA4LjU1OHYyLjg1MmMwIDMuMjg0LTEuMDk2IDYuMTQtMy4yODcgOC41Ny0yLjE5MiAyLjQyOC00Ljg5OCAzLjgyLTguMTIzIDQuMTc4djIuOTRoNS43MDVjLjM4NiAwIC43MjEuMTQyIDEuMDAzLjQyNC4yODIuMjgyLjQyMy42MTcuNDIzIDEuMDA0IDAgLjM4Ni0uMTQuNzItLjQyMyAxLjAwMmExLjM2NyAxLjM2NyAwIDAxLTEuMDAzLjQyM0gxNi41MDVjLS4zODUgMC0uNzE5LS4xNC0xLjAwMi0uNDIzYTEuMzcgMS4zNyAwIDAxLS40MjQtMS4wMDJjMC0uMzg3LjE0Mi0uNzIyLjQyNC0xLjAwNGExLjM3MyAxLjM3MyAwIDAxMS4wMDItLjQyM2g1LjcwNnYtMi45NDFjLTMuMjIzLS4zNTgtNS45MzItMS43NS04LjEyMy00LjE3OS0yLjE5Mi0yLjQyOS0zLjI4OC01LjI4NS0zLjI4OC04LjU2OXYtMi44NTJjMC0uMzg2LjE0My0uNzIuNDI0LTEuMDA0LjI4Mi0uMjguNjE4LS40MjIgMS4wMDMtLjQyMi4zODYgMCAuNzIuMTQyIDEuMDAzLjQyMi4yODIuMjg0LjQyMi42MTguNDIyIDEuMDA0djIuODUyYzAgMi43NS45NzggNS4xIDIuOTMyIDcuMDU0IDEuOTU0IDEuOTUzIDQuMzA0IDIuOTMgNy4wNTQgMi45MyAyLjc0OCAwIDUuMDk4LS45NzcgNy4wNTItMi45MyAxLjk1Mi0xLjk1NCAyLjkzLTQuMzA1IDIuOTMtNy4wNTR2LTIuODUyYzAtLjM4Ni4xNC0uNzIuNDIzLTEuMDA0LjI4My0uMjguNjE3LS40MjIgMS4wMDMtLjQyMi4zODggMCAuNzIxLjE0MiAxLjAwMy40MjIuMjgzLjI4NC40MjQuNjE4LjQyNCAxLjAwNHoiIGlkPSJGaWxsLTctQ29weS03IiBmaWxsPSIjN0M3QzdDIi8+PHBhdGggZD0iTTQ3Ljg0IDM2Ljg2Yy0uMTUgNS41MDQtNC42NTYgOS45MTktMTAuMTk2IDkuOTE5LTUuNjM0IDAtMTAuMi00LjU2Ny0xMC4yLTEwLjIgMC01LjYzNCA0LjU2Ny0xMC4yIDEwLjItMTAuMiA1LjU0IDAgMTAuMDQ3IDQuNDE1IDEwLjE5NiA5LjkxOWwuMDAzLjI4LS4wMDMuMjgxeiIgaWQ9IlBhdGgiIGZpbGw9IiM2NDJFN0YiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik00Ni42NCAzNi4zMTNhOSA5IDAgMDAtOC45OTYtOC43MzQgOSA5IDAgMTAwIDE4IDkgOSAwIDAwOC45OTYtOC43MzVsLjAwMy0uMjY2LS4wMDMtLjI2NXoiIGlkPSJQYXRoIiBmaWxsPSIjQUY1MkRFIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBpZD0iKyIgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMzguOTczIDM5LjMwNlYzNy4xNGgyLjA5OXYtMS42MjRoLTIuMDk5di0yLjE1MWgtMS43NDJ2Mi4xNTFoLTIuMXYxLjYyNGgyLjF2Mi4xNjV6Ii8+PC9nPjwvc3ZnPg==',
          "width": 40,
          "height": 40,
          "alt": "SoundsMusic"
        },
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.audio,
      "colour": Blockly.Colours.audio.primary,
      "colourSecondary": Blockly.Colours.audio.secondary,
      "colourTertiary": Blockly.Colours.audio.tertiary
    });
  }
};

Blockly.Blocks['horizontalsound_playRecordedSound'] = {
  /**
   * Block to set speed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "horizontalsound_playRecordedSound",
      "message0": "%1",
      "args0": [
        {
          "type": "field_sound_svg",
          "width": 40,
          "height": 40,
          "value": 1
        },
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.audio,
      "colour": Blockly.Colours.audio.primary,
      "colourSecondary": Blockly.Colours.audio.secondary,
      "colourTertiary": Blockly.Colours.audio.tertiary
    });
  }
};

