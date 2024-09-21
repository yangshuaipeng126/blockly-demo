<script setup>
import * as Blockly from 'blockly';
import {
  ContinuousToolbox,
  ContinuousFlyout,
  ContinuousMetrics,
} from './utils/tools/index';
import { FieldTurtle } from './utils/dropdown/dropdown.js';
import { FieldBitmap } from './utils/field-bitmap';
import { FieldGridDropdown } from '@blockly/field-grid-dropdown';
import { nextTick, onMounted } from 'vue';
import * as zhHans from 'blockly/msg/zh-hans';
import { registerFieldColour, FieldColour } from './utils/field-colour';
let workspace = null
onMounted(() => {
  nextTick(() => {
    registerFieldColour();
    init();
  })
})
Blockly.setLocale(zhHans);
const rotate = {
  init: function () {
    this.appendEndRowInput('NAME')
      .setAlign(Blockly.inputs.Align.CENTRE)
      .appendField(new Blockly.FieldImage('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgaWQ9ImRzbUljb24iPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIgMikiIGlkPSJJY29uLzQ4L21vdG9yIiBzdHJva2Utd2lkdGg9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBpZD0iQmciIGZpbGw9IiNGRkYiIGN4PSIyMiIgY3k9IjIyIiByPSIyMSIvPjxwYXRoIGQ9Ik0yMiAwYzEyLjE1IDAgMjIgOS44NSAyMiAyMnMtOS44NSAyMi0yMiAyMlMwIDM0LjE1IDAgMjIgOS44NSAwIDIyIDB6bTAgMS41QzEwLjY5NiAxLjUgMS41IDEwLjY5NiAxLjUgMjJTMTAuNjk2IDQyLjUgMjIgNDIuNSA0Mi41IDMzLjMwNCA0Mi41IDIyIDMzLjMwNCAxLjUgMjIgMS41em0wIDI2Ljc1YTUuNzUgNS43NSAwIDExMCAxMS41IDUuNzUgNS43NSAwIDAxMC0xMS41em0tMTItMTJhNS43NSA1Ljc1IDAgMTEwIDExLjUgNS43NSA1Ljc1IDAgMDEwLTExLjV6bTI0IDBhNS43NSA1Ljc1IDAgMTEwIDExLjUgNS43NSA1Ljc1IDAgMDEwLTExLjV6bS0xMi4xMzIgMS43NTdsLjExNi0uMDA3YTEgMSAwIDAxLjk5NC44ODNsLjAwNi4xMTd2MS45N0gyNWExIDEgMCAwMS45OTMuODg0bC4wMDcuMTE3YTEgMSAwIDAxLS44ODMuOTkzbC0uMTE3LjAwNy0yLjAxNi0uMDAxVjI1YTEgMSAwIDAxLS44ODMuOTkzbC0uMTE3LjAwN2ExIDEgMCAwMS0uOTkzLS44ODNMMjAuOTg0IDI1di0yLjAzaC0yLjAxNWExIDEgMCAwMS0uOTkzLS44ODNsLS4wMDctLjExNmExIDEgMCAwMS44ODMtLjk5NGwuMTE3LS4wMDYgMi4wMTUtLjAwMVYxOWExIDEgMCAwMS44ODQtLjk5M2wuMTE2LS4wMDd6TTIyIDQuMjVhNS43NSA1Ljc1IDAgMTEwIDExLjUgNS43NSA1Ljc1IDAgMDEwLTExLjV6IiBpZD0iQ29tYmluZWQtU2hhcGUiIGZpbGw9IiMwMDc4Q0MiLz48L2c+PC9zdmc+', 25, 25, { alt: '*', flipRtl: 'FALSE' }))
      .appendField(new FieldTurtle(), 'c')
      .appendField(new Blockly.FieldDropdown([
        ['向左', 'left'],
        ['向右', 'right']
      ]), 'direction')
      .appendField('运行')
      .appendField(new Blockly.FieldNumber(1), 'num')
      .appendField(new Blockly.FieldDropdown([
        ['圈', '1'],
        ['度', '2'],
        ['秒', '3']
      ]), 'type');
    this.setInputsInline(true)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(Blockly.utils.colour.rgbToHex(63, 142, 238));
  }
};

const start = {
  init: function () {
    this.appendEndRowInput('action')
      .setAlign(Blockly.inputs.Align.CENTRE)
      .appendField(new Blockly.FieldImage('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgaWQ9ImRzbUljb24iPjxnIGlkPSJJY29uLzQ4L3BsYXktYmxvY2stb3V0bGluZWQiIHN0cm9rZS13aWR0aD0iMSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzUuMzc2IDI0TDEzLjI1IDM4LjM4MlY5LjYxOEwzNS4zNzYgMjR6IiBpZD0iQ29tYmluZWQtU2hhcGUiIHN0cm9rZT0iI0NFQUMwMSIgc3Ryb2tlLXdpZHRoPSIxLjUiIGZpbGw9IiNGRkZGRkYiLz48L2c+PC9zdmc+', 25, 25, { alt: '*', flipRtl: 'FALSE' }))
      .appendField('当程序启动时');
    this.setInputsInline(false)
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(Blockly.utils.colour.rgbToHex(237, 198, 67));
  }
};


const sport01 = {
  init: function () {
    this.appendEndRowInput('NAME')
      .appendField(new Blockly.FieldImage('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgaWQ9ImRzbUljb24iPjxnIGlkPSJJY29uLzQ4L21vdmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNOS45MzEgMzguMDY5QTIwLjQwNSAyMC40MDUgMCAwMDIwLjUgNDFDMzEuODIyIDQxIDQxIDMxLjgyMiA0MSAyMC41YzAtMy44NjYtMS4wNy03LjQ4My0yLjkzMS0xMC41NjlDNDQuMDIgMTMuNTE5IDQ4IDIwLjA0NSA0OCAyNy41IDQ4IDM4LjgyMiAzOC44MjIgNDggMjcuNSA0OGMtNy40NTUgMC0xMy45ODEtMy45OC0xNy41NjktOS45MzF6IiBpZD0iQmctMiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0yNy41IDMzLjMyNGE1LjM1OCA1LjM1OCAwIDExMCAxMC43MTYgNS4zNTggNS4zNTggMCAwMTAtMTAuNzE2ek00NC4wNCAyNy41YTUuMzU4IDUuMzU4IDAgMTEtMTAuNzE2IDAgNS4zNTggNS4zNTggMCAwMTEwLjcxNiAwek0yNy41IDQ4QzM4LjgyMiA0OCA0OCAzOC44MjIgNDggMjcuNVMzOC44MjIgNyAyNy41IDcgNyAxNi4xNzggNyAyNy41IDE2LjE3OCA0OCAyNy41IDQ4em0wLTEuNWMtMTAuNDkzIDAtMTktOC41MDctMTktMTlzOC41MDctMTkgMTktMTkgMTkgOC41MDcgMTkgMTktOC41MDcgMTktMTkgMTl6IiBpZD0iQ29tYmluZWQtU2hhcGUtMiIgZmlsbD0iI0M4MDA5MCIvPjxjaXJjbGUgaWQ9IkJnLTEiIGZpbGw9IiNGRkYiIGN4PSIyMC41IiBjeT0iMjAuNSIgcj0iMjAuNSIvPjxwYXRoIGQ9Ik0xNC42NzYgMjAuNWE1LjM1OCA1LjM1OCAwIDExLTEwLjcxNiAwIDUuMzU4IDUuMzU4IDAgMDExMC43MTYgMHptMjIuMzY0IDBhNS4zNTggNS4zNTggMCAxMS0xMC43MTYgMCA1LjM1OCA1LjM1OCAwIDAxMTAuNzE2IDB6bS0xNy41NTUuOTczaC0xLjgxYTEgMSAwIDAxMC0yaDEuODF2LTEuNzY4YTEgMSAwIDAxMiAwdjEuNzY4aDEuODFhMSAxIDAgMDEwIDJoLTEuODF2MS44MjJhMSAxIDAgMDEtMiAwdi0xLjgyMnptMS4wMTUgNC44NWE1LjM1OCA1LjM1OCAwIDExMCAxMC43MTcgNS4zNTggNS4zNTggMCAwMTAtMTAuNzE2em0wLTIyLjM2M2E1LjM1OCA1LjM1OCAwIDExMCAxMC43MTYgNS4zNTggNS4zNTggMCAwMTAtMTAuNzE2em0wIDM3LjA0QzMxLjgyMiA0MSA0MSAzMS44MjIgNDEgMjAuNVMzMS44MjIgMCAyMC41IDAgMCA5LjE3OCAwIDIwLjUgOS4xNzggNDEgMjAuNSA0MXptMC0xLjVjLTEwLjQ5MyAwLTE5LTguNTA3LTE5LTE5czguNTA3LTE5IDE5LTE5IDE5IDguNTA3IDE5IDE5LTguNTA3IDE5LTE5IDE5eiIgaWQ9IkNvbWJpbmVkLVNoYXBlLTEiIGZpbGw9IiNDODAwOTAiLz48L2c+PC9zdmc+', 25, 25, { alt: '*', flipRtl: 'FALSE' }))
      .appendField(new Blockly.FieldDropdown([
        ['向上', 'up'],
        ['向下', 'down']
      ]), 'direction')
      .appendField('移动')
      .appendField(new Blockly.FieldTextInput('10'), 'num')
      .appendField(new Blockly.FieldDropdown([
        ['圈', '1'],
        ['度', '2'],
        ['秒', '3']
      ]), 'type');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(Blockly.utils.colour.rgbToHex(236, 90, 200));

  }
};
const light = {
  init: function () {
    this.appendEndRowInput('NAME')
      .appendField(new Blockly.FieldImage('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgaWQ9ImRzbUljb24iPjxnIGlkPSJJY29uLzQ4LzN4M21hdHJpeCIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zOS42MTMgNDIuNzAzSDcuODlBMy4wOSAzLjA5IDAgMDE0LjggMzkuNjE0VjcuODlBMy4wOSAzLjA5IDAgMDE3Ljg4OSA0LjhoMzEuNzI0YTMuMDkgMy4wOSAwIDAxMy4wODkgMy4wOXYzMS43MjRhMy4wODkgMy4wODkgMCAwMS0zLjA4OSAzLjA5IiBpZD0iQm9yZGVyIiBmaWxsPSIjNjkxRkYwIi8+PHBhdGggZD0iTTE2LjA2IDE2Ljc3Mkg3LjkxOGEuNzkyLjc5MiAwIDAxLS43OTItLjc5M1Y3LjgzOGMwLS40MzguMzU1LS43OTMuNzkyLS43OTNoOC4xNDJjLjQzOCAwIC43OTMuMzU1Ljc5My43OTN2OC4xNGMwIC40NC0uMzU1Ljc5NC0uNzkzLjc5NCIgaWQ9IjEiIGZpbGw9IiNGRkYiLz48cGF0aCBkPSJNMjcuODIyIDE2Ljc3MkgxOS42OGEuNzkzLjc5MyAwIDAxLS43OTMtLjc5M1Y3LjgzOGMwLS40MzguMzU1LS43OTMuNzkzLS43OTNoOC4xNGMuNDM5IDAgLjc5NC4zNTUuNzk0Ljc5M3Y4LjE0YzAgLjQ0LS4zNTUuNzk0LS43OTMuNzk0IiBpZD0iMiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0zOS41ODQgMTYuNzcyaC04LjE0YS43OTMuNzkzIDAgMDEtLjc5NC0uNzkzVjcuODM4YzAtLjQzOC4zNTUtLjc5My43OTMtLjc5M2g4LjE0Yy40MzkgMCAuNzk0LjM1NS43OTQuNzkzdjguMTRjMCAuNDQtLjM1NS43OTQtLjc5My43OTQiIGlkPSIzIiBmaWxsPSIjRkZGIi8+PHBhdGggZD0iTTE2LjA2IDI4LjYxNUg3LjkxOGEuNzkzLjc5MyAwIDAxLS43OTItLjc5M1YxOS42OGMwLS40MzguMzU1LS43OTIuNzkyLS43OTJoOC4xNDJjLjQzOCAwIC43OTMuMzU0Ljc5My43OTJ2OC4xNDJhLjc5My43OTMgMCAwMS0uNzkzLjc5MyIgaWQ9IjQiIGZpbGw9IiNGRkYiLz48cGF0aCBkPSJNMjcuODIyIDI4LjYxNUgxOS42OGEuNzkzLjc5MyAwIDAxLS43OTMtLjc5M1YxOS42OGMwLS40MzguMzU1LS43OTIuNzkzLS43OTJoOC4xNGMuNDM5IDAgLjc5NC4zNTQuNzk0Ljc5MnY4LjE0MmEuNzkzLjc5MyAwIDAxLS43OTMuNzkzIiBpZD0iNSIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0zOS41ODQgMjguNjE1aC04LjE0YS43OTMuNzkzIDAgMDEtLjc5NC0uNzkzVjE5LjY4YzAtLjQzOC4zNTUtLjc5Mi43OTMtLjc5Mmg4LjE0Yy40MzkgMCAuNzk0LjM1NC43OTQuNzkydjguMTQyYS43OTMuNzkzIDAgMDEtLjc5My43OTMiIGlkPSI2IiBmaWxsPSIjRkZGIi8+PHBhdGggZD0iTTE2LjA2IDQwLjQ1OEg3LjkxOGEuNzkzLjc5MyAwIDAxLS43OTItLjc5M3YtOC4xNGMwLS40MzkuMzU1LS43OTQuNzkyLS43OTRoOC4xNDJjLjQzOCAwIC43OTMuMzU1Ljc5My43OTN2OC4xNDFhLjc5My43OTMgMCAwMS0uNzkzLjc5MyIgaWQ9IjciIGZpbGw9IiNGRkYiLz48cGF0aCBkPSJNMjcuODIyIDQwLjQ1OEgxOS42OGEuNzkzLjc5MyAwIDAxLS43OTMtLjc5M3YtOC4xNGMwLS40MzkuMzU1LS43OTQuNzkzLS43OTRoOC4xNGMuNDM5IDAgLjc5NC4zNTUuNzk0Ljc5M3Y4LjE0MWEuNzkzLjc5MyAwIDAxLS43OTMuNzkzIiBpZD0iOCIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0zOS41ODQgNDAuNDU4aC04LjE0YS43OTMuNzkzIDAgMDEtLjc5NC0uNzkzdi04LjE0YzAtLjQzOS4zNTUtLjc5NC43OTMtLjc5NGg4LjE0Yy40MzkgMCAuNzk0LjM1NS43OTQuNzkzdjguMTQxYS43OTMuNzkzIDAgMDEtLjc5My43OTMiIGlkPSI5IiBmaWxsPSIjRkZGIi8+PC9nPjwvc3ZnPg==', 25, 25, { alt: '*', flipRtl: 'FALSE' }))
      .appendField(new Blockly.FieldDropdown([
        ['A', 'a'],
        ['B', 'b'],
        ['A + B', 'c']
      ]), 'c')
      .appendField('点亮')
      .appendField(new FieldBitmap(
        
      [[{ value: 0, color: '' }, { value: 0, color: '' }, { value: 0, color: '' }, { value: 0, color: '' }],
      [{ value: 0, color: '' }, { value: 0, color: '' }, { value: 0, color: '' }, { value: 0, color: '' }],
      [{ value: 0, color: '' }, { value: 0, color: '' }, { value: 0, color: '' }, { value: 0, color: '' }],
      [{ value: 0, color: '' }, { value: 0, color: '' }, { value: 0, color: '' }, { value: 0, color: '' }],
    ],
        (value) => {
          // console.log(value)
        },
        {
          width: 1,
          height: 1,
          fieldHeight: 20,
        }
      ), "FIELDNAME")
      .appendField(new Blockly.FieldNumber(1), 'num')
      .appendField('秒');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour('rgb(148, 108, 238)');
  }
};

const my_block = {
  init: function () {
    this.appendEndRowInput('NAME')
      .appendField(new Blockly.FieldImage('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgaWQ9ImRzbUljb24iPjxnIGlkPSJJY29uLzQ4L2NvbG9yLXNlbnNvciIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zOCA1LjVjMi40ODEgMCA0LjUgMi4wMTkgNC41IDQuNXYyOGMwIDIuNDgxLTIuMDE5IDQuNS00LjUgNC41SDEwQTQuNTA1IDQuNTA1IDAgMDE1LjUgMzhWMTBjMC0yLjQ4MSAyLjAxOS00LjUgNC41LTQuNWgyOCIgaWQ9IkJnIiBmaWxsPSIjRkZGIi8+PHBhdGggZD0iTTM0IDI0YzAgNS41MjItNC40NzcgMTAtMTAgMTBzLTEwLTQuNDc4LTEwLTEwIDQuNDc3LTEwIDEwLTEwIDEwIDQuNDc4IDEwIDEwem00LTIwYTYgNiAwIDAxNiA2djI4YTYgNiAwIDAxLTYgNkgxMGE2IDYgMCAwMS02LTZWMTBhNiA2IDAgMDE2LTZoMjh6bTAgMS41SDEwQTQuNTA1IDQuNTA1IDAgMDA1LjUgMTB2MjhjMCAyLjQ4MSAyLjAxOSA0LjUgNC41IDQuNWgyOGMyLjQ4MSAwIDQuNS0yLjAxOSA0LjUtNC41VjEwYzAtMi40ODEtMi4wMTktNC41LTQuNS00LjV6TTI0IDljOC4yNzEgMCAxNSA2LjcyOSAxNSAxNXMtNi43MjkgMTUtMTUgMTVTOSAzMi4yNzEgOSAyNCAxNS43MjkgOSAyNCA5em0wIDJjLTcuMTggMC0xMyA1LjgyLTEzIDEzczUuODIgMTMgMTMgMTMgMTMtNS44MiAxMy0xMy01LjgyLTEzLTEzLTEzeiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjMDBBOEM5Ii8+PC9nPjwvc3ZnPg==', 25, 25, { alt: '*', flipRtl: 'FALSE' }))
      .appendField(new FieldGridDropdown([
        ['A', 'a'],
        ['B', 'b'],
        ['A + B', 'c']
      ]), 'c')
      .appendField('颜色是否为')
      .appendField(new FieldColour('#e700a7', null, {
        colourOptions: [
          '#e700a7',
          '#0090f5',
          '#77e8ff',
          '#00a845',
          '#ffe360',
          '#ff000c',
          '#ffffff',
          '#000000',
          'transparent'
        ],
        columns: 3,
      }), 'NAME')
      .appendField('？');
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour('#34ccf1');
  }
};

Blockly.common.defineBlocks({ my_block: my_block });
Blockly.common.defineBlocks({ light: light });
Blockly.common.defineBlocks({ sport01: sport01 });
Blockly.common.defineBlocks({ rotate: rotate });
Blockly.common.defineBlocks({ start: start });

function appendDom() {
  var blocks = document.getElementById('workspace-blocks');
  if (blocks.firstElementChild) {
    Blockly.Xml.appendDomToWorkspace(blocks, workspace);
  }
}
function createWorkspace(blocklyDiv, options) {
  workspace = Blockly.inject(blocklyDiv, options);
  appendDom()
}
const toolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "电机",
      "colour": '#3f8eee',
      "contents": [
        {
          "kind": "block",
          "type": "rotate",
        }
      ]
    }, {
      "kind": "category",
      "name": "运动",
      "colour": '#ec5ac8',
      "contents": [
        {
          "kind": "block",
          "type": "sport01",
        }
      ]
    },
    {
      "kind": "category",
      "name": "灯光",
      "colour": '#f9c440',
      "contents": [
        {
          "kind": "block",
          "type": "light",
        }
      ]
    },
    {
      "kind": "category",
      "name": "传感器",
      "colour": '#34ccf1',
      "contents": [
        {
          "kind": "block",
          "type": "my_block",
        }
      ]
    }
  ]
}
const init = () => {
  const defaultOptions = {
    toolbox: toolbox,
    plugins: {
      toolbox: ContinuousToolbox,
      flyoutsVerticalToolbox: ContinuousFlyout,
      metricsManager: ContinuousMetrics,
    },
  };
  createWorkspace('blocklyDiv', defaultOptions);

}
</script>

<template>
  <div id="blocklyDiv" style="height: 100vh; width: 100vw;"></div>
  <xml xmlns="https://developers.google.com/blockly/xml" id="workspace-blocks" style="display: none">
    <block type="start"></block>
  </xml>
</template>

<style>

</style>
