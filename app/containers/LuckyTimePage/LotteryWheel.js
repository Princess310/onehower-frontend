/*
 *
 * LotteryWheel
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { easeOut, easeIn } from 'utils/utils';
import ImagePreloader from 'utils/ImagePreloader';
import pallete from 'styles/colors';

import pointerImg from 'assets/images/pointer.png';

import FlexRowContentCenter from 'components/FlexRowContentCenter';
import Icon from 'components/Icon';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

const BtnWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  color: #ffffff;
  text-align: center;
  line-height: 3.2rem;
  background-image: url(${pointerImg});
  background-size: contain;
  background-position: center;
`;

// -------------- config params --------------//
let   RADIUAS = 270,           // 转盘的半径
      OUTSIDE_RADIUAS = 240,   // 抽奖区域半径
      INSIDE_RADIUAS = 0,      // 用于非零7环绕原则的内圆半径
      TEXT_RADIUAS = 180,      // 转盘内文字的半径
      DOT_RADIUAS = 255,        // 小点半径

      startRadian = 0,                             // 绘制奖项的起始角，改变该值实现旋转效果

      duration = 4000,     // 旋转事件
      velocity = 10,       // 旋转速率
      spinningTime = 0,    // 旋转当前时间
      dotCount = 18,
      dotRadian = (Math.PI * 2) / dotCount;

  let spinTotalTime,       // 旋转时间总长
      spinningChange,      // 旋转变化值的峰值
      CENTER_X,
      CENTER_Y,
      FETCH_STATUS = 'static',
      result = {
        name: '我们相爱吧',
      };

  // 旋转判断辅助参数
  let lastChangeStart = 0;
  let checkFlag = false;
  let changeFetchedRadian = 0;
  let resultRadian = 0;
  let isRunnig = false;
// -------------- /config params --------------//

export class LotteryWheel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {   
    super(props);

    this.state = {
      awards: [               // 转盘内的奖品个数以及内容
        {
          index: 0,
          name: '吃好吃的',
        }, {
          index: 1,
          name: '健身',
        }, {
          index: 2,
          name: '我们相爱吧',
        }, {
          index: 3,
          name: '保持微笑',
        }
      ],
      awardRadian: (Math.PI * 2) / 4, // 每一个奖项所占的弧度
      open: false,
      newItem: '',
      result: '',
      openResult: false,
      openSnackbar: false,
      message: 'Hello - Lucky',
    };
  }

  componentDidMount() {
    const container = this.container;
    const canvas = this.canvas;
    this.context = canvas.getContext('2d');
    this.images = [];

    // set style for canvas
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    const radius = canvas.width / 2;

    // reset config params
    RADIUAS = radius;
    OUTSIDE_RADIUAS = radius - 30;
    TEXT_RADIUAS = radius - 90;
    DOT_RADIUAS = radius - 15;
    CENTER_X = canvas.width / 2;
    CENTER_Y = canvas.height / 2;

    this.drawRouletteWheel();
  }

  drawRouletteWheel = () => {
    const canvas = this.canvas;
    const context = this.context;
    const awards = this.state.awards;
    const awardRadian = this.state.awardRadian;

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // draw the background circle first
    context.save();
    context.beginPath();
    context.fillStyle = pallete.primary;
    context.arc(canvas.width / 2, canvas.height / 2, RADIUAS, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
    // draw the dot
    for (let i = 0; i < dotCount; i ++) {
      let radian = startRadian + i * dotRadian;
      context.save();
      context.translate(
          CENTER_X + Math.cos(radian + dotRadian / 2) * DOT_RADIUAS,
          CENTER_Y + Math.sin(radian + dotRadian / 2) * DOT_RADIUAS
      );

      if (i % 2 === 0) context.fillStyle = pallete.white;
      else             context.fillStyle = pallete.secondary;
      context.beginPath();
      context.arc(0, 0, 5, 0, Math.PI * 2, false);
      context.fill();
      context.restore();
    }

    for (let i = 0; i < awards.length; i ++) {
      let _startRadian = startRadian + awardRadian * i,  // 每一个奖项所占的起始弧度
          _endRadian =   _startRadian + awardRadian;     // 每一个奖项的终止弧度

      // 绘制圆盘
      context.save();
      if (i % 2 === 0) context.fillStyle = '#4DD0E1'
      else             context.fillStyle = '#B2EBF2';
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, OUTSIDE_RADIUAS, _startRadian, _endRadian, false);
      context.lineTo(canvas.width / 2, canvas.height / 2);
      //context.arc(canvas.width / 2, canvas.height / 2, INSIDE_RADIUAS, _endRadian, _startRadian, true);
      context.fill();
      context.restore();
      // -----

      // ----- ③ 绘制文字
      context.save();
      context.font = 'bold 24px Helvetica, Arial';
      context.fillStyle = '#fff';
      context.translate(
          CENTER_X + Math.cos(_startRadian + awardRadian / 2) * TEXT_RADIUAS,
          CENTER_Y + Math.sin(_startRadian + awardRadian / 2) * TEXT_RADIUAS
      );
      context.rotate(_startRadian + awardRadian / 2 + Math.PI / 2);
      context.fillText(awards[i].name, -context.measureText(awards[i].name).width / 2, 0);

      context.restore();
      // -----
    }
  }

  getValue = () => {
    let startAngle = startRadian * 180 / Math.PI,       // 弧度转换为角度
      awardAngle = this.state.awardRadian * 180 / Math.PI,

      pointerAngle = 90,                              // 指针所指向区域的度数，该值控制选取哪个角度的值
      overAngle = (startAngle + pointerAngle) % 360,  // 无论转盘旋转了多少圈，产生了多大的任意角，我们只需要求到当前位置起始角在360°范围内的角度值
      restAngle = 360 - overAngle,                    // 360°减去已旋转的角度值，就是剩下的角度值

      index = Math.floor(restAngle / awardAngle);     // 剩下的角度值 除以 每一个奖品的角度值，就能得到这是第几个奖品

    return this.state.awards[index];
  }

  rotateWheel = () => {
    spinningTime += 20;
    let _spinningChange = easeIn(spinningTime, 0, spinningChange, spinTotalTime) * (Math.PI / 180);

    if (FETCH_STATUS === 'fetching' && spinningTime >=  spinTotalTime) {
      _spinningChange = spinningChange * (Math.PI / 180);
    } else if (FETCH_STATUS === 'fetched') {
      // 当 当前时间 大于 总时间，停止旋转，并返回当前值
      if (spinningTime >= spinTotalTime) {
        const result = this.getValue();
        this.setState({ openResult: true, result: result.name });

        spinningTime = 20;
        checkFlag = false;
        FETCH_STATUS = 'static';
        isRunnig = false;
        return;
      }

      if (!checkFlag) {
        const value = this.getValue();
        const rangeRadian = 5 * 2 * Math.PI + (value.index - result.index) * this.state.awardRadian;
        resultRadian = rangeRadian;
      }

      changeFetchedRadian = easeOut(spinningTime, 0, resultRadian, spinTotalTime);
      checkFlag = true;
    }

    if (!checkFlag) {
      startRadian += _spinningChange
      lastChangeStart = startRadian;
    } else {
      startRadian = lastChangeStart + changeFetchedRadian;
    }

    this.drawRouletteWheel();
    window.requestAnimationFrame(this.rotateWheel);
  }

  getBackendData = () => {
    FETCH_STATUS = 'fetching';
    const awards = this.state.awards;
    setTimeout(() => {
      const radamIndex = parseInt(Math.random() * 10 % awards.length);
      result = awards[radamIndex];
      FETCH_STATUS = 'fetched';
      spinningTime = 0;
      // console.log('模拟后台获取结果得:' + result.name);
    }, 1000);
  }

  handleAction = () => {
    if (isRunnig) {
      return false;
    }

    isRunnig = true;
    spinningTime = 0;                                // 初始化当前时间
    spinTotalTime = Math.random() * 3 + duration;    // 随机定义一个时间总量
    spinningChange = velocity;  // 随机顶一个旋转速率
    this.rotateWheel();
    // 模拟后台获取数据
    this.getBackendData();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpenResult = () => {
    this.setState({ openResult: true });
  };

  handleCloseResult = () => {
    this.setState({ openResult: false, result: '' });
  };

  handleRequestClose = () => {
    this.setState({
      openSnackbar: false,
    });
  }

  handleAddItem = () => {
    const { newItem, awards } = this.state;

    if (newItem === '') {
      this.setState({
        openSnackbar: true,
        message: 'The item name should not be empty~',
      });
      return;
    }

    this.setState({
      awards: [
        ...awards,
        {
          index: awards.length,
          name: newItem,
        },
      ],
      newItem: '',
      awardRadian: (Math.PI * 2) / (awards.length + 1), // 每一个奖项所占的弧度
    }, () => {
      this.drawRouletteWheel();
    });
  }

  handleClear = (index) => {
    const { awards } = this.state;

    if (awards.length === 1) {
      this.setState({
        openSnackbar: true,
        message: 'Should leave one lucky item at least~',
      });
      return;
    }

    const newList = awards.filter((award, i) => (
      i !== index
    ));
    this.setState({
      awards: newList,
      awardRadian: (Math.PI * 2) / newList.length, // 每一个奖项所占的弧度
    }, () => {
      this.drawRouletteWheel();
    });
  }

  render() {
    const { awards, newItem, result, openSnackbar, message } = this.state;

    return (
      <div>
        <RaisedButton label="Edit" primary={true} style={{ marginTop: '24px', marginLeft: '24px' }} onClick={this.handleOpen} />
        <FlexRowContentCenter style={{ position: 'relative' }}>
          <div ref={r => this.container = r} style={{ width: '360px', height: '360px' }}>
            <canvas ref={r => this.canvas = r}></canvas>
          </div>
          <BtnWrapper>
            <Button onClick={this.handleAction}>Lucky~</Button>
          </BtnWrapper>
        </FlexRowContentCenter>

        <FlexRowContentCenter style={{ marginTop: '24px', color: 'rgba(0, 0, 0, 0.54)' }}>
          Click the lucky pointer to rotate the Lucky wheel~
        </FlexRowContentCenter>

        <Snackbar
          open={openSnackbar}
          message={message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />

        <Dialog
          title="Edit lucky list"
          actions={[
            <RaisedButton label="CLOSE" primary={true} onClick={this.handleClose} />
          ]}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <List>
            {awards.map((award, i) => (
              <ListItem key={i} primaryText={award.name} rightIconButton={
                <IconButton onTouchTap={() => {
                  this.handleClear(i);
                }}>
                  <Icon type={require('icons/actions/clear.svg')} color={pallete.secondary} />
                </IconButton>
              }/>
            ))}
          </List>
          <TextField
            hintText="Add new lucky item"
            value={newItem}
            onChange={(e, v) => {
              this.setState({
                newItem: v,
              });
            }}
          />
          <FlatButton label="Add" primary={true} onClick={this.handleAddItem} />
        </Dialog>

        <Dialog
          title="Lucky result"
          modal={false}
          open={this.state.openResult}
          onRequestClose={this.handleCloseResult}
        >
            {result}
        </Dialog>
      </div>
    );
  }
}

LotteryWheel.propTypes = {

};

export default LotteryWheel;
