
'use strict';

goog.provide('Blockly.FieldRotateDropdown');

goog.require('Blockly.FieldNumber');

/**
 * Class for an icon menu field.
 * @param {Object} icons List of icons. These take the same options as an Image Field.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldRotateDropdown = function (arrow, turnsNum) {
  this.arrow_ = arrow;
  this.turnsNum_ = turnsNum;
  Blockly.FieldRotateDropdown.superClass_.constructor.call(
    this, this.turnsNum_);
  // this.setRestrictor(/^-?\d*\.?\d*(00|25|50|75)?$/)
  /**
* Array holding info needed to unbind events.
* Used for disposing.
* Ex: [[node, name, func], [node, name, func]].
* @type {!Array.<Array<?>>}
* @private
*/
  this.boundEvents_ = [];
};
goog.inherits(Blockly.FieldRotateDropdown, Blockly.FieldNumber);

/**
 * Construct a FieldRotateDropdown from a JSON arg object.
 * @param {!Object} element A JSON object with options.
 * @returns {!Blockly.FieldRotateDropdown} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldRotateDropdown.fromJson = function (element) {
  return new Blockly.FieldRotateDropdown(element['arrow'], element['turnsNum']);
};
goog.inherits(Blockly.FieldRotateDropdown, Blockly.FieldNumber);

/**
 * Called when the field is placed on a block.
 * @param {Blockly.Block} block The owning block.
 */
Blockly.FieldRotateDropdown.prototype.init = function () {
  Blockly.FieldRotateDropdown.superClass_.init.call(this);
};



/**
 * Clean up this FieldAngle, as well as the inherited FieldTextInput.
 * @return {!Function} Closure to call on destruction of the WidgetDiv.
 * @private
 */
Blockly.FieldSilderVolume.prototype.dispose_ = function () {
  return function () {
    for (var event in this.boundEvents_) {
      Blockly.unbindEvent_(event);
    }
    // this.sliderInput_ = null;
  };
};

/**
 * Get the language-neutral value from this drop-down menu.
 * @return {string} Current language-neutral value.
 */
Blockly.FieldRotateDropdown.prototype.getValue = function () {
  return this.value_;
};

// 重写 setValue 方法，添加验证逻辑
Blockly.FieldRotateDropdown.prototype.setValue = function (newValue) {
  let newValue_ = newValue.toString() || '0';
  this.value_ = newValue_;
  // 调用父类的 setValue 方法
  Blockly.FieldNumber.prototype.setValue.call(this, newValue_);

  // 更新文本显示
  this.setText(newValue_);

  // 重新渲染块
  this.render_();
};

/**
 * Show the drop-down menu for editing this field.
 * @private
 */
Blockly.FieldRotateDropdown.prototype.showEditor_ = function () {

  Blockly.FieldRotateDropdown.superClass_.showEditor_.call(this, this.useTouchInteraction_);
  // If there is an existing drop-down someone else owns, hide it immediately and clear it.
  Blockly.DropDownDiv.hideWithoutAnimation();
  Blockly.DropDownDiv.clearContent();
  // Populate the drop-down with the icons for this field.
  var contentDiv = Blockly.DropDownDiv.getContentDiv();
  // Accessibility properties
  contentDiv.setAttribute('role', 'menu');
  contentDiv.setAttribute('aria-haspopup', 'true');

  let turnsNum = this.getValue();
  let startPoint, currentPoint, lastPoint;
  let isDragging = false;
  let totalRotation = turnsNum * 360 * this.arrow_;  // 总旋转角度
  let realRotation = turnsNum * 360;  // 实际旋转角度

  // 更新圈数
  const updateTurnsNum = (angle) => {
    turnsNum =  Math.floor(angle / 360);
    center.textContent = turnsNum;
    this.updateInputText(turnsNum);
  }
  

  // 创建 lls-rotation-selector 容器
  const rotationSelector = document.createElement('div');
  rotationSelector.classList.add('lls-rotation-selector');

  // 创建按钮容器
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('lls-rotation-selector__buttons');

  // 创建减号按钮
  const minusButton = document.createElement('div');
  minusButton.classList.add('lls-rotation-selector__buttons__button');
  minusButton.textContent = '-';
  buttonsContainer.appendChild(minusButton);

  minusButton.addEventListener('click', () => {
    if (turnsNum > 0) {
      realRotation = realRotation - 360;
      totalRotation = realRotation * this.arrow_;
    } else {
      realRotation = 0;
      totalRotation = 0;
    }
    const rotation = realRotation / 360
    turnsNum = Math.floor(rotation);
    center.textContent = turnsNum;

    this.updateInputText(rotation);

    handleContainer.style.transform = `rotate(${realRotation}deg)`;
    computedShadow(realRotation);
  })

  // 创建加号按钮
  const plusButton = document.createElement('div');
  plusButton.classList.add('lls-rotation-selector__buttons__button');
  plusButton.textContent = '+';
  buttonsContainer.appendChild(plusButton);
  plusButton.addEventListener('click', () => {
    realRotation = realRotation + 360;
    totalRotation = realRotation * this.arrow_;
    const rotation = realRotation / 360
    turnsNum = Math.floor(rotation);
    center.textContent = turnsNum;
    this.updateInputText(rotation);
    handleContainer.style.transform = `rotate(${realRotation}deg)`;
  })

  // 将按钮容器添加到 rotationSelector
  rotationSelector.appendChild(buttonsContainer);



  // 创建轮盘
  const wheel = document.createElement('div');
  wheel.classList.add('lls-rotation-selector__wheel');
  wheel.style.borderColor = 'rgb(0, 98, 166)';
  wheel.style.backgroundImage = 'conic-gradient(rgb(128, 188, 231) 0%, rgb(0, 120, 204) 0%)';
  wheel.style.transform = `scaleX(${this.arrow_})`;

  function computedShadow(angle) {
    const checkAngle = Math.floor(angle % 360);
    let num = 0;

    // 定义角度范围及其对应的数值
    const angleRanges = [
      { min: 0, max: 60, value: 0 },  // 处理0到60度的情况
      { min: 60, max: 90, value: 25 },
      { min: 90, max: 150, value: 25 },
      { min: 150, max: 180, value: 50 },
      { min: 180, max: 240, value: 50 },
      { min: 240, max: 270, value: 75 },
      { min: 270, max: 315, value: 75 },
      { min: 315, max: 360, value: 100 },
    ];

    // 查找匹配的角度范围
    for (const range of angleRanges) {
      if (checkAngle >= range.min && checkAngle <= range.max) {
        num = range.value;
        break;
      }
    }

    // 更新背景渐变
    wheel.style.backgroundImage = `conic-gradient(rgb(128, 188, 231) ${num}%, rgb(0, 120, 204) ${num}%)`;
  }


  // 创建标记
  const marks = [0, 90, 180, 270].map((angle, index) => {
    const mark = document.createElement('div');
    mark.classList.add('lls-rotation-selector__wheel__mark');
    mark.style.transform = `rotate(${angle}deg)`;
    if (index === 0) {
      mark.style.backgroundImage = 'linear-gradient(rgb(191, 199, 205), rgb(191, 199, 205))';
    } else {
      mark.style.backgroundImage = 'linear-gradient(transparent 15%, rgb(245, 245, 245) 15%, rgb(245, 245, 245) 30%, transparent 30%)';
    }
    return mark;
  });

  marks.forEach(mark => wheel.appendChild(mark));

  // 创建手柄容器
  const handleContainer = document.createElement('div');
  handleContainer.classList.add('lls-rotation-selector__wheel__handle__container');
  handleContainer.style.transform = `rotate(${realRotation}deg)`;
  computedShadow(realRotation);
  handleContainer.style.backgroundColor = 'rgb(191, 199, 205)';

  // 创建手柄
  const handle = document.createElement('div');
  handle.classList.add('lls-rotation-selector__wheel__handle');
  handleContainer.appendChild(handle);



  // 将手柄容器添加到轮盘
  wheel.appendChild(handleContainer);

  // 创建中心点
  const center = document.createElement('div');
  center.setAttribute('data-testid', 'lls-rotation-selector__wheel__center');
  center.classList.add('lls-rotation-selector__wheel__center');
  center.style.color = 'rgb(0, 98, 166)';
  center.style.transform = `scaleX(${this.arrow_})`;
  center.textContent = Math.floor(turnsNum);
  wheel.appendChild(center);

  // 将轮盘添加到 rotationSelector
  rotationSelector.appendChild(wheel);

  // 将主容器添加到添加到主容器
  contentDiv.appendChild(rotationSelector);


  // 计算两点之间的角度
  function calculateAngle(p1, p2) {
    return Math.atan2(p2.Y - p1.Y, p2.X - p1.X);
  }

  // 计算相对于中心点的角度变化
  function getRotation(start, last, current) {
    const startAngle = calculateAngle(start, last);
    const currentAngle = calculateAngle(start, current);
    let delta = (currentAngle - startAngle) * (180 / Math.PI);
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    return delta;
  }

  // 获取目标元素的中心点
  function getTargetCenter() {
    const rect = handleContainer.getBoundingClientRect();
    return { X: rect.x + rect.width / 2, Y: rect.y + rect.height / 2 };
  }

  const mousemove = (e) => {
    if (isDragging) {
      currentPoint = { X: e.pageX, Y: e.pageY };
      const rotationDelta = getRotation(startPoint, lastPoint, currentPoint);
      // totalRotation += Math.round(rotationDelta);  // 应用方向并四舍五入到最近的整数
      // 当总旋转角度为0且尝试向逆时针方向旋转时，不更新旋转角度

      // 当总旋转角度为0且尝试向相反方向旋转时，不更新旋转角度
      totalRotation += rotationDelta;
      if (this.arrow_ == -1) {
        realRotation = totalRotation < 0 ? totalRotation * this.arrow_ : 0
      } else {
        realRotation = totalRotation > 0 ? totalRotation * this.arrow_ : 0
      }
      computedShadow(realRotation);
      updateTurnsNum(realRotation)
      handleContainer.style.transform = `rotate(${realRotation}deg)`;
      lastPoint = currentPoint;  // 更新上一次的位置为当前的位置

    }
  }
  const mouseup = (e) => {
    isDragging = false;
    let angle = realRotation % 360
    if (angle >= 0 && angle < 45) {
      angle = 0
    } else if (angle >= 45 && angle < 135) {
      angle = 90
    } else if (angle >= 135 && angle < 225) {
      angle = 180
    } else if (angle >= 225 && angle < 315) {
      angle = 270
    } else if (angle >= 315) {
      angle = 360
    } else {
      angle = 0
    }
    realRotation = Math.floor(realRotation / 360) * 360 + angle
    updateTurnsNum(realRotation)
    computedShadow(realRotation);
    handleContainer.setAttribute('class', 'lls-rotation-selector__wheel__handle__container')
    handle.setAttribute('class', 'lls-rotation-selector__wheel__handle')
    handleContainer.style.transform = `rotate(${realRotation}deg)`;
    document.removeEventListener("mousemove", mousemove)
    document.removeEventListener("mouseup", mouseup)
  }
  const mousedown = (e) => {
    isDragging = true;
    startPoint = getTargetCenter();
    lastPoint = { X: e.pageX, Y: e.pageY };
    handleContainer.classList.add('lls-rotation-selector__wheel__handle__container--is-dragging')
    handle.classList.add('class', 'lls-rotation-selector__wheel__handle--is-dragging')
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  }
  let isFirstJudge = true;

  function roundToQuarter(e) {
   
    const htmlInput = Blockly.FieldTextInput.htmlInput_;
    const value = htmlInput.value;
    if(isNaN(value) || value < 0) {
      htmlInput.value = 0
      return
    }
    this.setValue(value);
    const [integerPart, decimalPart] = value.split('.');
    if (!decimalPart) isFirstJudge = true
    if (decimalPart) {
      if (decimalPart.length === 1 && isFirstJudge && decimalPart !== '1') {
        isFirstJudge = false;

        // 将输入值转换为浮点数
        const num = parseFloat(value);

        // 计算四舍五入到最近的 .00, .25, .50, .75
        const rounded = Math.round(num * 4) / 4;
        const angle = rounded * 360
        realRotation = angle
        totalRotation = angle * this.arrow_
        computedShadow(realRotation);
        turnsNum = Math.floor(angle / 360);
        center.textContent = turnsNum;
        handleContainer.style.transform = `rotate(${realRotation}deg)`;
        // 更新输入框的值
        htmlInput.value = rounded
        this.setValue(rounded.toString());
        this.validate_();
        this.resizeEditor_();
      }
    } else{
      const angle = integerPart * 360
      realRotation = angle
      totalRotation = angle * this.arrow_
      computedShadow(realRotation);
      turnsNum = Math.floor(angle / 360) || 0;
      center.textContent = turnsNum;
      handleContainer.style.transform = `rotate(${realRotation}deg)`;
      // 更新输入框的值
      // htmlInput.value = integerPart
      this.setValue(integerPart.toString());
      this.validate_();
      this.resizeEditor_();
    }
  }
  this.boundEvents_.push(Blockly.bindEvent_(
    handle, 'mousedown', this, mousedown));

  this.boundEvents_.push(Blockly.bindEventWithChecks_(
    Blockly.FieldTextInput.htmlInput_, 'input', this, roundToQuarter));

  Blockly.DropDownDiv.setColour(this.sourceBlock_.parentBlock_.getColour(), this.sourceBlock_.parentBlock_.getColourTertiary());
  Blockly.DropDownDiv.setCategory(this.sourceBlock_.parentBlock_.getCategory());
  // Update source block colour to look selected
  this.savedPrimary_ = this.sourceBlock_.getColour();
  this.sourceBlock_.setColour(this.sourceBlock_.getColourSecondary(),
    this.sourceBlock_.getColourSecondary(),
    this.sourceBlock_.getColourTertiary());

  var scale = this.sourceBlock_.workspace.scale;
  // Offset for icon-type horizontal blocks.
  var secondaryYOffset = (
    -(Blockly.BlockSvg.MIN_BLOCK_Y * scale) - (Blockly.BlockSvg.FIELD_Y_OFFSET * scale)
  );
  Blockly.DropDownDiv.showPositionedByBlock(
    this, this.sourceBlock_, this.onHide_.bind(this), secondaryYOffset);

};
Blockly.FieldRotateDropdown.prototype.onHide_ = function () {
  this.textElement_.innerHTML = this.getValue();
};

Blockly.FieldRotateDropdown.prototype.updateInputText = function (value) {
  Blockly.FieldTextInput.htmlInput_.value = value;
  this.setValue(value);
  this.validate_();
  this.resizeEditor_();
}

Blockly.Field.register('field_iconmenu', Blockly.FieldRotateDropdown);
