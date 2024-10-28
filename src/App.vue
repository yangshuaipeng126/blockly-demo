<script setup>
import { nextTick, onMounted } from 'vue'


 // 注意不要在setup函数里创建Scratch Blocks 工作空间，否则workspace会变为响应式，进而在拖动块时报错。
 let workspace = null
 onMounted(() => {
  nextTick(() => {
    start() 
  }
  )
 })
 const toolbox = '<xml id="toolbox-categories" style="display: none">' +
      '<category name="Events">' +
      '<block type="event_whenplayclicked"></block>' +
      '<block type="event_color">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_color">' +
      '<field name="CHOICE">red</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="event_press">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_event_press">' +
      '<field name="CHOICE">down</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="event_broadcastdirection">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_broaddirection">' +
      '<field name="CHOICE">right</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="event_distance">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_distance">' +
      '<field name="CHOICE">10</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +

      '<block type="event_whenbroadcastreceived">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_whenbroadcast">' +
      '<field name="CHOICE">bule</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +

      '<block type="event_broadcast">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_broadcast">' +
      '<field name="CHOICE">bule</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '</category>' +
      '<category name="Wedo">' +
      '<block type="wedo_motorspeed">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_wedo_motorspeed">' +
      '<field name="CHOICE">slow</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="wedo_left">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_wedo_rotate_left">' +
      '<field name="CHOICE">1</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="wedo_right">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_wedo_rotate_right">' +
      '<field name="CHOICE">1</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="wedo_stop"></block>' +
      '</category>' +
      '<category name="MATRIX">' +
        '<block type="light_show">' +
      '<value name="MATRIX">' +
      '<shadow type="light_show_matrix">' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="light_random"></block>' +
      '</category>' +
      '<category name="Audio" id="Audio">' +
      '<block type="audio_animal">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_play_times">' +
      '<field name="CHOICE">1</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="audio_effect">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_play_times">' +
      '<field name="CHOICE">1</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="audio_music">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_play_times">' +
      '<field name="CHOICE">1</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="horizontalsound_recordSound"></block>' +
      '<block type="horizontalsound_playRecordedSound"></block>' +
  
      '</category>' +
      '<category name="Control">' +
      '<block type="control_wait">' +
      '<value name="DURATION">' +
      '<shadow type="control_positive_num">' +
      '<field name="NUM">1</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="control_forever"></block>' +
      '<block type="control_repeat">' +
      '<value name="TIMES">' +
      '<shadow type="control_whole_num">' +
      '<field name="TIMES">4</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +

      '<block type="control_stop"></block>' +
      '</category>' +
      '<category name="Show">' +
      '<block type="show_input">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_show_input">' +
      '<field name="CHOICE">Hello</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="show_image">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_showimage">' +
      '<field name="CHOICE">amusement_park</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="show_display_story">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_show_display_story">' +
      '<field name="CHOICE">expand</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '</category>' +
      '<category name="Chart">' +
      '<block type="chart_color">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_chart_color">' +
      '<field name="CHOICE">green</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="char_clear_color"></block>' +
      '<block type="chart_display_story">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_chart_display_story">' +
      '<field name="CHOICE">expand</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '</category>' +
      '<category name="Move">' +
      '<block type="move_speed">' +
      '<value name="CHOICE">' +
      '<shadow type="dropdown_move_speed">' +
      '<field name="CHOICE">slow</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="move_forward">' +
      '<value name="CHOICE">' +
      '<shadow type="input_move_num">' +
      '<field name="CHOICE">1</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="move_back">' +
      '<value name="CHOICE">' +
      '<shadow type="input_move_num">' +
      '<field name="CHOICE">1</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="move_left">' +
      '<value name="CHOICE">' +
      '<shadow type="input_move_num">' +
      '<field name="CHOICE">1</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="move_right">' +
      '<value name="CHOICE">' +
      '<shadow type="input_move_num">' +
      '<field name="CHOICE">1</field>' +
      '</shadow>' +
      '</value>' +
      '</block>' +
      '<block type="move_stop"></block>'
    '</category>' +

      '</xml>';
    ;
 function start() {
      workspace = Blockly.inject('blocklyDiv', {
        comments: false,
        disable: false,
        collapse: false,
        media:  new URL(`../public/libs/openblock-blocks/media/`, import.meta.url) + '/',
        readOnly: false,
        toolbox: toolbox,
        rtl: false,
        scrollbars: true,
        toolbox: toolbox,
        trashcan: true,
        horizontalLayout: 'bottom',
        toolboxPosition: 'end',
        sounds: true,
        grid: {
          spacing: 50,
          length: 4,
          colour: '#d9d9d9',
          snap: false
        },
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 4,
          minScale: 0.25,
          scaleSpeed: 1.1,
          trashcan: false
        },
        colours: {
          fieldShadow: 'rgba(255, 255, 255, 0.3)',
          dragShadowOpacity: 0.6
        }
      });
      // 动态添加块到工具箱
      function addBlockToToolbox(blockType, beforeBlock) {
        // 将当前的工具箱 XML 转换为 DOM 对象
        var parser = new DOMParser();
        var toolboxXml = parser.parseFromString(toolbox, "text/xml");

        // 创建新的块元素
        var newBlockElement = document.createElement('block');
        newBlockElement.setAttribute('type', blockType);
        // 找到要插入新块的位置
        var categoryElements = toolboxXml.querySelectorAll('category');
        let audioEl = null
        for (var i = 0; i < categoryElements.length; i++) {
          let categoryElement = categoryElements[i];
          if (categoryElement.getAttribute('name') === 'Audio') {
            audioEl = categoryElement;
            break;
          }
        }
        const blocks = audioEl.querySelectorAll('block')
        
        var existingBlock = audioEl.querySelector(`block[type="${beforeBlock}"]`);
        console.log(existingBlock);
        // 如果找到现有块，则在其前面插入新块
        if (existingBlock) {
          audioEl.insertBefore(newBlockElement, existingBlock);
        } else {
          // 如果没有找到现有块，则将新块添加到类别末尾
          audioEl.appendChild(newBlockElement);
        }

        // 将更新后的 DOM 对象转换回 XML 字符串
        var serializer = new XMLSerializer();
        toolboxXmlString = serializer.serializeToString(toolboxXml);

        // 重新加载工具箱
        workspace.updateToolbox(toolboxXmlString);
      }
      function onFirstComment(event) {
        if (event.element === 'click' && event.blockId === 'horizontalsound_recordSound') {
          addBlockToToolbox('horizontalsound_playRecordedSound','horizontalsound_recordSound')
          workspace.removeChangeListener(onFirstComment);
        }
      }
      var flyoutWorkspace = workspace.getFlyout().getWorkspace();
      flyoutWorkspace.addChangeListener(onFirstComment);
      // console.log(flyoutWorkspace);
      var xml = Blockly.Xml.textToDom(toolbox);
      // console.log(document.getElementById('toolbox-categories'));
    }

    function getToolboxElement() {
      var match = location.search.match(/toolbox=([^&]+)/);
      return document.getElementById('toolbox-' + (match ? match[1] : 'categories'));
    }
</script>

<template>
  <div id="blocklyDiv" style="height: 100vh; width: 100vw;"></div>
</template>

<style>

</style>
