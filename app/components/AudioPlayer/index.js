/**
*
* Gallery
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Icon from 'components/Icon';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: content-box;
  text-align: center;
  color: #fff;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);

  &:hover {
    cursor: pointer;
  }
`;

window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
class AudioPlayer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      status: -1, // loading source: -1, stop: 0, playing: 1
    };
    this.source = null; //the audio source
    this.animationId = null;
    this.forceStop = false;
    this.arraybuffer = null;

    try {
      this.audioContext = new AudioContext();
    } catch (e) {
      console.log('!妳的浏览器不支持AudioContext:(');
      console.log(e);
    }
  }

  componentDidMount() {
    const self = this;
    const { url } = this.props;

    const request = new XMLHttpRequest(); //建立一个请求
    request.open('GET', url, true); //配置好请求类型，文件路径等
    request.responseType = 'arraybuffer'; //配置数据返回类型
    // 一旦获取完成，对音频进行进一步操作，比如解码
    request.onload = function() {
      self.arraybuffer = request.response;

      self.setState({
        status: 0,
      });
    }

    request.send();
  }

  _visualize = (audioContext, buffer) => {
    const audioBufferSouceNode = audioContext.createBufferSource();
    const analyser = audioContext.createAnalyser();

    //connect the source to the analyser
    audioBufferSouceNode.connect(analyser);
    //connect the analyser to the destination(the speaker), or we won't hear the sound
    analyser.connect(audioContext.destination);
    //then assign the buffer to the buffer source node
    audioBufferSouceNode.buffer = buffer;
    //play the source
    if (!audioBufferSouceNode.start) {
      audioBufferSouceNode.start = audioBufferSouceNode.noteOn //in old browsers use noteOn method
      audioBufferSouceNode.stop = audioBufferSouceNode.noteOff //in old browsers use noteOff method
    };

    //stop the previous sound if any
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.source !== null) {
      this.source.stop(0);
    }

    audioBufferSouceNode.start(0);
    // 设置播放状态
    this.setState({
      status: 1,
    });
    this.source = audioBufferSouceNode;
    audioBufferSouceNode.onended = () => {
      this._audioEnd();
    }

    this._drawSpectrum(analyser);
  }

  _drawSpectrum = (analyser) => {
    const self = this;
    const { isPhone } = this.props;
    const canvas = this.canvas;
    const cwidth = canvas.width;
    const cheight = canvas.height - 2;
    const meterWidth = isPhone ? 4 : 10; //width of the meters in the spectrum
    const gap = 2; //gap between meters
    const capHeight = 2;
    const capStyle = '#fff';
    const meterNum = 800 / (10 + 2); //count of the meters
    const capYPositionArray = [];
    const unitLenth = meterWidth + gap;

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(1, '#80deea');
    gradient.addColorStop(0.5, '#ffee58');
    gradient.addColorStop(0, '#f48fb1');

    const drawMeter = () => {
      const array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);

      if (self.state.status === 0) {
        //fix when some sounds end the value still not back to zero
        for (var i = array.length - 1; i >= 0; i--) {
          array[i] = 0;
        };
        let allCapsReachBottom = true;
        for (var i = capYPositionArray.length - 1; i >= 0; i--) {
          allCapsReachBottom = allCapsReachBottom && (capYPositionArray[i] === 0);
        };
        if (allCapsReachBottom) {
          cancelAnimationFrame(self.animationId); //since the sound is stoped and animation finished, stop the requestAnimation to prevent potential memory leak,THIS IS VERY IMPORTANT!
          return;
        };
      }

      const step = Math.round(array.length / meterNum); //sample limited data from the total array
      ctx.clearRect(0, 0, cwidth, cheight);

      for (var i = 0; i < meterNum; i++) {
        var value = array[i * step];
        if (capYPositionArray.length < Math.round(meterNum)) {
          capYPositionArray.push(value);
        };
        ctx.fillStyle = capStyle;
        //draw the cap, with transition effect
        if (value < capYPositionArray[i]) {
          ctx.fillRect(i * unitLenth, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
        } else {
          ctx.fillRect(i * unitLenth, cheight - value, meterWidth, capHeight);
          capYPositionArray[i] = value;
        };
        ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
        ctx.fillRect(i * unitLenth /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
      }

      self.animationId = requestAnimationFrame(drawMeter);
    }

    this.animationId = requestAnimationFrame(drawMeter);
  }

  _audioEnd = () => {
    if (this.forceStop) {
      this.forceStop = false;
      this.setState({
        status: 1,
      });
      return;
    };

    this.setState({
      status: 0,
    });

    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');
    const cwidth = canvas.width;
    const cheight = canvas.height - 2;
    ctx.clearRect(0, 0, cwidth, cheight);
  }

  handlePlay = () => {
    const self = this;

    if (this.state.status === -1) {
      return;
    }

    const arraybuffer = this.arraybuffer;
    const audioContext = this.audioContext;
    audioContext.decodeAudioData(arraybuffer, function(buffer) { //解码成功则调用此函数，参数buffer为解码后得到的结果
      self._visualize(audioContext, buffer); //调用_visualize进行下一步处理，此方法在后面定义并实现
    }, function(e) { //这个是解码失败会调用的函数
      console.log("文件解码失败:(");
    });
  }

  render() {
    const { style, isPhone } = this.props;
    const { status } = this.state;

    return (
      <Container style={style} onClick={this.handlePlay}>
        <canvas ref={r => this.canvas = r} width={ isPhone ? 300 : 800} height={300}/>
        <Wrapper>
          {status === -1 && 
            <div>Loading...</div>
          }
          {status === 0 &&
            <Icon type={require('icons/actions/播放.svg')} color="#fff" size="64px" />
          }
        </Wrapper>
      </Container>
    );
  }
}

AudioPlayer.propTypes = {
  style: PropTypes.object,
  url: PropTypes.string.isRequired,
  isPhone: PropTypes.bool,
};

export default AudioPlayer;
