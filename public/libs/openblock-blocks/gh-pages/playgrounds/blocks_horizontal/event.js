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
 * @fileoverview Control blocks for Scratch (Horizontal)
 * @author ascii@media.mit.edu <Andrew Sliwinski>
 */
'use strict';

goog.provide('Blockly.Blocks.event');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');
Blockly.Blocks['event_whenplayclicked'] = {
  init: function () {
    this.jsonInit({
      "id": "event_whenplayclicked",
      "message0": "%1",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/EventPlay.svg",
          "width": 40,
          "height": 40,
          "alt": "",
          "flip_rtl": true
        }
      ],
      "inputsInline": true,
      "nextStatement": null,
      "category": Blockly.Categories.event,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    })
  }
}


Blockly.Blocks['event_whenflagclicked'] = {
  /**
   * Block for when flag clicked.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "event_whenflagclicked",
      "message0": "%1",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/event_whenflagclicked.svg",
          "width": 40,
          "height": 40,
          "alt": "When green flag clicked",
          "flip_rtl": true
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



Blockly.Blocks['dropdown_color'] = {
  /**
   * Block for when broadcast dropdown (used for shadow).
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldColourMenu(
        [
          {
            src: Blockly.mainWorkspace.options.pathToMedia + "icons/EventColorPink.svg",
            backgroundColor: '#d42da3',
            value: 'pink'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + "icons/EventColorBlue.svg",
            backgroundColor: '#3f8eee',
            value: 'blue'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + "icons/EventColorCyan.svg",
            backgroundColor: '#77E8FF',
            value: 'cyan'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + "icons/EventColorGreen.svg",
            backgroundColor: '#00A845',
            value: 'green'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + "icons/EventColorYellow.svg",
            backgroundColor: '#FFD500',
            value: 'yellow'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + "icons/EventColorRed.svg",
            backgroundColor: '#FF000C',
            value: 'red'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + "icons/EventColorWhite.svg",
            backgroundColor: '#fff',
            value: 'white'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + "icons/EventColorBlack.svg",
            backgroundColor: '#1E1E1D',
            value: 'black'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + "icons/EventColorNone.svg",
            backgroundColor: 'transparent',
            value: 'transparent',
          },
        ]), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.event.primary,
      Blockly.Colours.event.secondary,
      Blockly.Colours.event.tertiary
    );
  }
};

Blockly.Blocks['event_color'] = {
  /**
   * Block for when broadcast received.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "event_color",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/EventColorPink.svg",
          "width": 40,
          "height": 40,
          "alt": "whenselectcolour"
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



Blockly.Blocks['dropdown_whenbroadcast'] = {
  /**
   * Block for when broadcast dropdown (used for shadow).
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldColourMenu([
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventReceivePink.svg',
          value: 'pink', backgroundColor: 'rgb(231, 0, 167)'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventReceiveBlue.svg',
          value: 'blue', backgroundColor: 'rgb(0, 144, 245)'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventReceiveCyan.svg',
          value: 'cyan', backgroundColor: 'rgb(119, 232, 255)'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventReceiveGreen.svg',
          value: 'green', backgroundColor: 'rgb(0, 168, 69)'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventReceiveYellow.svg',
          value: 'yellow', backgroundColor: 'rgb(255, 227, 96)'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventReceiveRed.svg',
          value: 'red', backgroundColor: 'rgb(255, 0, 12)'
        },
      ], '#00b4af'), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.event.primary,
      Blockly.Colours.event.secondary,
      Blockly.Colours.event.tertiary
    );
  }
};

Blockly.Blocks['event_whenbroadcastreceived'] = {
  /**
   * Block for when broadcast received.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "event_whenbroadcastreceived",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/EventReceiveBlue.svg",
          "width": 40,
          "height": 40,
          "alt": "Broadcast received"
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


Blockly.Blocks['dropdown_broadcast'] = {
  /**
   * Block for broadcast dropdown (used for shadow).
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldColourMenu([
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventBroadcastPink.svg',
          value: 'pink', backgroundColor: 'rgb(231, 0, 167)'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventBroadcastBlue.svg',
          value: 'blue', backgroundColor: 'rgb(0, 144, 245)'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventBroadcastCyan.svg',
          value: 'cyan', backgroundColor: 'rgb(119, 232, 255)'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventBroadcastGreen.svg',
          value: 'green', backgroundColor: 'rgb(0, 168, 69)'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventBroadcastYellow.svg',
          value: 'yellow', backgroundColor: 'rgb(255, 227, 96)'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventBroadcastRed.svg',
          value: 'red', backgroundColor: 'rgb(255, 0, 12)'
        },
        {
          type: 'placeholder'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventBroadcastRandom.svg',
          value: 'random', type: 'svg', with: 48, height:48, iconSrc:Blockly.mainWorkspace.options.pathToMedia + 'icons/AdornerRandom.svg'
        },
        {
          type: 'placeholder'
        },
      ], '#00b4af'), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.event.primary,
      Blockly.Colours.event.secondary,
      Blockly.Colours.event.tertiary
    );
  }
};

Blockly.Blocks['event_broadcast'] = {
  /**
   * Block to send a broadcast.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "event_broadcast",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/EventBroadcastBlue.svg",
          "width": 40,
          "height": 40,
          "alt": "Broadcast"
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

Blockly.Blocks['dropdown_broaddirection'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldBlockDirectionMenu([
        { src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventGyroEssentialAll.svg', icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMjEuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjMwLjNweCIgaGVpZ2h0PSIzMC4zcHgiIHZpZXdCb3g9IjAgMCAzMC4zIDMwLjMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMwLjMgMzAuMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7c3Ryb2tlOiMwMDAwMDA7fQo8L3N0eWxlPgo8cGF0aCBpZD0iWE1MSURfNF8iIGNsYXNzPSJzdDAiIGQ9Ik0xNS4yLDEzYy0wLjEsMC0wLjIsMC0wLjQsMGMtMC41LTAuMS0xLTAuNS0xLjItMWwtMS4xLTQuOWgtMS43Yy0wLjUsMC0wLjktMC4zLTEuMS0wLjcgIEM5LjUsNiw5LjYsNS41LDEwLDUuMmw0LjQtNC40YzAuMi0wLjIsMC41LTAuMywwLjgtMC4zczAuNiwwLjEsMC44LDAuM2w0LjQsNC40YzAuMywwLjMsMC40LDAuOCwwLjMsMS4yYy0wLjIsMC40LTAuNiwwLjctMS4xLDAuNyAgaC0xLjhsLTEuMiw0LjhDMTYuMywxMi41LDE1LjgsMTMsMTUuMiwxMyIgc3R5bGU9InN0cm9rZTogcmdiKDE3NiwgMTQ4LCAwKTsiLz4KPHBhdGggaWQ9IlhNTElEXzNfIiBjbGFzcz0ic3QwIiBkPSJNMTUuMSwxNy4zYzAuMSwwLDAuMiwwLDAuNCwwYzAuNSwwLjEsMSwwLjUsMS4yLDFsMS4xLDQuOWgxLjdjMC41LDAsMC45LDAuMywxLjEsMC43ICBzMC4xLDAuOS0wLjMsMS4ybC00LjQsNC40Yy0wLjIsMC4yLTAuNSwwLjMtMC44LDAuM3MtMC42LTAuMS0wLjgtMC4zbC00LjQtNC40Yy0wLjMtMC4zLTAuNC0wLjgtMC4zLTEuMmMwLjItMC40LDAuNi0wLjcsMS4xLTAuNyAgaDEuOGwxLjItNC44QzE0LDE3LjgsMTQuNSwxNy4zLDE1LjEsMTcuMyIgc3R5bGU9InN0cm9rZTogcmdiKDE3NiwgMTQ4LCAwKTsiLz4KPHBhdGggaWQ9IlhNTElEXzJfIiBjbGFzcz0ic3QwIiBkPSJNMTcuMywxNS4yYzAtMC4xLDAtMC4yLDAtMC40YzAuMS0wLjUsMC41LTEsMS0xLjJsNC45LTEuMXYtMS43YzAtMC41LDAuMy0wLjksMC43LTEuMSAgYzAuNC0wLjIsMC45LTAuMSwxLjIsMC4zbDQuNCw0LjRjMC4yLDAuMiwwLjMsMC41LDAuMywwLjhzLTAuMSwwLjYtMC4zLDAuOGwtNC40LDQuNGMtMC4zLDAuMy0wLjgsMC40LTEuMiwwLjMgIGMtMC40LTAuMi0wLjctMC42LTAuNy0xLjF2LTEuOGwtNC44LTEuMkMxNy44LDE2LjMsMTcuMywxNS44LDE3LjMsMTUuMiIgc3R5bGU9InN0cm9rZTogcmdiKDE3NiwgMTQ4LCAwKTsiLz4KPHBhdGggaWQ9IlhNTElEXzFfIiBjbGFzcz0ic3QwIiBkPSJNMTMsMTUuMWMwLDAuMSwwLDAuMiwwLDAuNGMtMC4xLDAuNS0wLjUsMS0xLDEuMmwtNC45LDEuMXYxLjdjMCwwLjUtMC4zLDAuOS0wLjcsMS4xICBjLTAuNCwwLjItMC45LDAuMS0xLjItMC4zbC00LjQtNC40Yy0wLjItMC4yLTAuMy0wLjUtMC4zLTAuOHMwLjEtMC42LDAuMy0wLjhsNC40LTQuNEM1LjUsOS42LDYsOS41LDYuNCw5LjYgIGMwLjQsMC4yLDAuNywwLjYsMC43LDEuMXYxLjhsNC44LDEuMkMxMi41LDE0LDEzLDE0LjUsMTMsMTUuMSIgc3R5bGU9InN0cm9rZTogcmdiKDE3NiwgMTQ4LCAwKTsiLz4KPC9zdmc+', width: 40, height: 40, alt: 'any', value: 'any' },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventGyroEssentialUp.svg',
          icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMjEuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE0LjhweCIgaGVpZ2h0PSIxNi44cHgiIHZpZXdCb3g9IjAgMCAxNC44IDE2LjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0LjggMTYuODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7c3Ryb2tlOiMwMDAwMDA7fQo8L3N0eWxlPgo8cGF0aCBpZD0iWE1MSURfMV8iIGNsYXNzPSJzdDAiIGQ9Ik03LjYsMTYuM2MtMC4xLDAtMC4zLDAtMC40LDBjLTAuNi0wLjEtMS40LTAuNy0xLjYtMS40bC0xLjUtNkgxLjlDMS4zLDguOSwwLjgsOC41LDAuNiw4ICBTMC41LDYuOSwwLjksNi40bDUuNS01LjVjMC4zLTAuMywwLjYtMC40LDEtMC40czAuNywwLjIsMSwwLjRsNS41LDUuNWMwLjQsMC40LDAuNSwxLDAuMywxLjZjLTAuMiwwLjUtMC44LDAuOS0xLjMsMC45aC0yLjJsLTEuNSw2ICBDOC45LDE1LjYsOC40LDE2LjMsNy42LDE2LjMiIHN0eWxlPSJzdHJva2U6IHJnYigxNzYsIDE0OCwgMCk7Ii8+Cjwvc3ZnPg==',
          width: 40,
          height: 40,
          alt: 'up',
          value: 'up'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventGyroEssentialFlat.svg',
          icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMjEuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI5cHgiIGhlaWdodD0iMTguNXB4IiB2aWV3Qm94PSIwIDAgMjkgMTguNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjkgMTguNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8dGl0bGU+VGlsdC1hZG9ybmVyIC8gZmxhdC1nZWNrbzwvdGl0bGU+CjxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgo8ZyBpZD0iVGlsdC1hZG9ybmVyLV94MkZfLWZsYXQtZ2Vja28iPgoJPHBhdGggaWQ9IlBhdGgiIGQ9Ik0yNS40LDBsMC4xLDBjMC42LDAuMSwxLjIsMC42LDEuMywxLjJsMCwwLjFsMCwwLjFMMjcsNWwwLDBsMCwxbDAsMGwwLDEwLjRsMCwwbDEuMSwwYzAuNiwwLDEsMC40LDEsMSAgIHMtMC40LDEtMSwxSDFjLTAuNiwwLTEtMC40LTEtMXMwLjQtMSwxLTFsMC45LDBMMS45LDVsMC0zLjRjMC0wLjMsMC4xLTAuNiwwLjItMC45bDAuMS0wLjFsMC4xLTAuMWMwLjItMC4yLDAuNS0wLjMsMC44LTAuNGwwLjIsMCAgIGwwLjEsMEwyNS40LDB6IiBzdHlsZT0iZmlsbDogcmdiKDE3NiwgMTQ4LCAwKTsiLz4KCTxwYXRoIGlkPSJTaGFwZSIgY2xhc3M9InN0MCIgZD0iTTIuOSw2TDI2LDZsMCwzLjFDMjUuOCw5LjEsMjUuNiw5LDI1LjUsOUMyNC42LDksMjQsOS43LDI0LDEwLjVjMCwwLjgsMC43LDEuNSwxLjUsMS41ICAgYzAuMiwwLDAuMywwLDAuNS0wLjFsMCw0LjZjMCwwLjMtMC4xLDAuNS0wLjQsMC41bC0wLjEsMGwtNi41LDBsMC0yLjVjMC0xLjMtMS4xLTIuNC0yLjUtMi41bC00LDAuMUMxMS4xLDEyLDEwLDEzLjEsMTAsMTQuNiAgIGwwLDIuNWwtNi41LDBjLTAuMiwwLTAuNS0wLjItMC41LTAuNWwwLTAuMWwwLTQuNkMzLjEsMTIsMy4zLDEyLDMuNSwxMkM0LjMsMTIsNSwxMS40LDQuOSwxMC41YzAuMS0wLjgtMC41LTEuNC0xLjMtMS40bC0wLjEsMCAgIGwtMC4xLDBjLTAuMSwwLTAuMywwLTAuNCwwLjFMMi45LDZ6IE0xMS45LDE1LjVsNSwwYzAuMywwLDAuNSwwLjIsMC41LDAuNGwwLDAuMWMwLDAuMi0wLjIsMC40LTAuNCwwLjVsLTAuMSwwbC01LDAgICBjLTAuMywwLTAuNS0wLjItMC41LTAuNGwwLTAuMWMwLTAuMSwwLTAuMiwwLjEtMC4ybDAuMS0wLjFDMTEuNiwxNS42LDExLjcsMTUuNiwxMS45LDE1LjVMMTEuOSwxNS41eiBNMTYuOSwxMy41ICAgYzAuMywwLDAuNSwwLjIsMC41LDAuNGwwLDAuMWMwLDAuMy0wLjIsMC41LTAuNCwwLjVsLTAuMSwwbC01LDAuMWMtMC4yLDAtMC40LTAuMi0wLjUtMC40bDAtMC4xYzAtMC4xLDAuMS0wLjIsMC4xLTAuM2wwLjEtMC4xICAgYzAuMS0wLjEsMC4yLTAuMSwwLjItMC4ybDAuMSwwTDE2LjksMTMuNXogTTI1LjQsMWMwLjIsMCwwLjUsMC4yLDAuNSwwLjVsMCwwLjFMMjYsNUwyLjksNWwwLTMuNGMwLTAuMiwwLTAuMywwLjEtMC40bDAuMS0wLjEgICBjMCwwLDAuMS0wLjEsMC4yLTAuMWwwLjEsMEwyNS40LDF6Ii8+CjwvZz4KPC9zdmc+',
          width: 40,
          height: 40,
          alt: 'flat',
          value: 'flat'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventGyroEssentialLeft.svg',
          icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMjEuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2LjhweCIgaGVpZ2h0PSIxNC44cHgiIHZpZXdCb3g9IjAgMCAxNi44IDE0LjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2LjggMTQuODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7c3Ryb2tlOiMwMDAwMDA7fQo8L3N0eWxlPgo8cGF0aCBpZD0iWE1MSURfMV8iIGNsYXNzPSJzdDAiIGQ9Ik0xNi4zLDcuNmMwLTAuMSwwLTAuMywwLTAuNGMtMC4xLTAuNi0wLjctMS40LTEuNC0xLjZsLTYtMS41VjEuOWMwLTAuNi0wLjQtMS4xLTAuOS0xLjMgIFM2LjksMC41LDYuNCwwLjlMMC45LDYuNEMwLjYsNi43LDAuNSw3LDAuNSw3LjRzMC4yLDAuNywwLjQsMWw1LjUsNS41YzAuNCwwLjQsMSwwLjUsMS42LDAuM2MwLjUtMC4yLDAuOS0wLjgsMC45LTEuM3YtMi4ybDYtMS41ICBDMTUuNiw4LjksMTYuMyw4LjQsMTYuMyw3LjYiIHN0eWxlPSJzdHJva2U6IHJnYigxNzYsIDE0OCwgMCk7Ii8+Cjwvc3ZnPg==',
          width: 40,
          height: 40,
          alt: 'left',
          value: 'left'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventGyroEssentialRight.svg',
          icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMjEuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2LjhweCIgaGVpZ2h0PSIxNC44cHgiIHZpZXdCb3g9IjAgMCAxNi44IDE0LjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2LjggMTQuODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7c3Ryb2tlOiMwMDAwMDA7fQo8L3N0eWxlPgo8cGF0aCBpZD0iWE1MSURfMV8iIGNsYXNzPSJzdDAiIGQ9Ik0wLjUsNy42YzAtMC4xLDAtMC4zLDAtMC40YzAuMS0wLjYsMC43LTEuNCwxLjQtMS42bDYtMS41VjEuOWMwLTAuNiwwLjQtMS4xLDAuOS0xLjMgIHMxLjEtMC4xLDEuNiwwLjNsNS41LDUuNWMwLjMsMC4zLDAuNCwwLjYsMC40LDFzLTAuMiwwLjctMC40LDFsLTUuNSw1LjVjLTAuNCwwLjQtMSwwLjUtMS42LDAuM2MtMC41LTAuMi0wLjktMC44LTAuOS0xLjN2LTIuMiAgbC02LTEuNUMxLjIsOC45LDAuNSw4LjQsMC41LDcuNiIgc3R5bGU9InN0cm9rZTogcmdiKDE3NiwgMTQ4LCAwKTsiLz4KPC9zdmc+',
          width: 40,
          height: 40,
          alt: 'right',
          value: 'right'
        },
        {
          src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventGyroEssentialDown.svg',
          icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMjEuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE0LjhweCIgaGVpZ2h0PSIxNi44cHgiIHZpZXdCb3g9IjAgMCAxNC44IDE2LjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0LjggMTYuODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7c3Ryb2tlOiMwMDAwMDA7fQo8L3N0eWxlPgo8cGF0aCBpZD0iWE1MSURfMV8iIGNsYXNzPSJzdDAiIGQ9Ik03LjYsMC41Yy0wLjEsMC0wLjMsMC0wLjQsMEM2LjYsMC42LDUuOCwxLjIsNS42LDEuOWwtMS41LDZIMS45Yy0wLjYsMC0xLjEsMC40LTEuMywwLjkgIHMtMC4xLDEuMSwwLjMsMS42bDUuNSw1LjVjMC4zLDAuMywwLjYsMC40LDEsMC40czAuNy0wLjIsMS0wLjRsNS41LTUuNWMwLjQtMC40LDAuNS0xLDAuMy0xLjZjLTAuMi0wLjUtMC44LTAuOS0xLjMtMC45aC0yLjIgIGwtMS41LTZDOC45LDEuMiw4LjQsMC41LDcuNiwwLjUiIHN0eWxlPSJzdHJva2U6IHJnYigxNzYsIDE0OCwgMCk7Ii8+Cjwvc3ZnPg==',
          width: 40,
          height: 40,
          alt: 'down',
          value: 'down'
        }
      ]), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.event.primary,
      Blockly.Colours.event.secondary,
      Blockly.Colours.event.tertiary
    );
  }
}

Blockly.Blocks['event_broadcastdirection'] = {
  init: function () {
    this.jsonInit({
      "id": "event_broadcastdirection",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/EventGyroEssentialRight.svg",
          "width": 40,
          "height": 40,
          "alt": "Broadcast",
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
}

Blockly.Blocks['dropdown_distance'] = {
  /**
   * Block for when broadcast dropdown (used for shadow).
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldSilderVolume(0, 0, 200), 'CHOICE');
    this.setOutput(true);
    this.outputShape_ = Blockly.OUTPUT_SHAPE_ROUND;
    this.setColour('#fff',
      Blockly.Colours.event.secondary,
      Blockly.Colours.event.tertiary
    );
  }
};


Blockly.Blocks['event_distance'] = {
  init: function () {
    this.jsonInit({
      "id": "event_distance",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/EventDistance3.svg",
          "width": 40,
          "height": 40,
          "alt": "Broadcast",
        },
        {
          "type": "input_value",
          "name": "CHOICE",
        }
      ],
      "inputsInline": true,
      "nextStatement": null,
      "category": Blockly.Categories.event,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary,

    });
  }
}




Blockly.Blocks['dropdown_event_press'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldIconMenu(
        [
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventForceDown.svg',
            value: 'down', width: 48, height: 48, alt: 'Down'
          },
          {
            src: Blockly.mainWorkspace.options.pathToMedia + 'icons/EventForceUp.svg',
            value: 'up', width: 48, height: 48, alt: 'Up'
          },
        ]), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.event.primary,
      Blockly.Colours.event.secondary,
      Blockly.Colours.event.tertiary
    );
  }
};

Blockly.Blocks['event_press'] = {
  /**
   * Block to set motor speed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "event_press",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/EventForceDown.svg",
          "width": 40,
          "height": 40,
          "alt": "press"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.event,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};

