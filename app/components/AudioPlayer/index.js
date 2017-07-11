/**
*
* Gallery
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';

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
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.1);
`;

window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
class AudioPlayer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.animationId = null;
  }

  componentDidMount() {
    const audio = this.audio;
    const ctx = new AudioContext();
    const audioSrc = ctx.createMediaElementSource(audio);
    const analyser = ctx.createAnalyser();

    audioSrc.connect(analyser);
    analyser.connect(ctx.destination);
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

  render() {
    const { style, isPhone, url } = this.props;

    return (
      <Container style={style}>
        <canvas ref={r => this.canvas = r} width={ isPhone ? 300 : 800} height={300}/>
        <Wrapper>
          <audio src={url} ref={r => this.audio = r} crossOrigin="anonymous" controls>audio element not supported</audio>
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
