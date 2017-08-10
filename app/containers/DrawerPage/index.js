/*
 *
 * DrawerPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pallete from 'styles/colors';

import SubHeader from 'components/Header/SubHeader';
import AppContent from 'components/AppContent';
import Footer from 'components/Footer';
import FlexCenter from 'components/FlexCenter';
import FlexColumn from 'components/FlexColumn';
import FlexRow from 'components/FlexRow';
import Icon from 'components/Icon';

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';

const toolStyle = {
  height: '48px',
  padding: '8px',
};

const radioStyle = {
  display: 'inline-block',
  marginRight: '8px',
  width: '100px',
};

// store the data info
let dataArr = [];
let points = [];
let colorArr = [];
let paint = false;
export class DrawerPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      cWidth: 600,
      cHeight: 400,
      tool: 'pen', // default tool
      color: '#000',
      lineWidth: 5,
      minWidth: 1,
      maxWidth: 20,
    };
  }

  componentDidMount() {
    const canvas = this.canvas;

    this.ctx = canvas.getContext('2d');
  }

  henldeTool = (e, value) => {
    this.setState({
      tool: value,
    });
  }

  handleColor = (e) => {
    const color = e.target.value;
    this.setState({
      color,
    });
  }

  redraw = () => {
    const ctx = this.ctx;

    for (let i = 0; i < points.length; i += 1) {
      ctx.beginPath();
      const point = points[i];
      if (point[3]) {
        ctx.moveTo(points[i][0], points[i][1]);
      } else {
        ctx.moveTo(points[i - 1][0], points[i - 1][1]);
      }

      ctx.lineTo(point[0], point[1]);
      ctx.strokeStyle = colorArr[i];
      ctx.lineJoin = 'round';
      ctx.lineWidth = point[2];

      ctx.closePath();
      ctx.stroke();
    }
  }

  handleDragStart = (e) => {
    const { lineWidth } = this.state;
    const canvas = this.canvas;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.pageX - rect.left;
    const mouseY = e.pageY - rect.top;

    points.push([mouseX, mouseY, lineWidth, true]);
    colorArr.push(this.state.color);
    paint = true;
  }

  handleDrag = (e) => {
    if (!paint) {
      return;
    }

    const { tool, lineWidth } = this.state;
    const canvas = this.canvas;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.pageX - rect.left;
    const mouseY = e.pageY - rect.top;

    points.push([mouseX, mouseY, lineWidth]);
    colorArr.push(tool === 'clear' ? '#fff' : this.state.color);
    this.redraw();
  }

  handleDragEnd = () => {
    paint = false;
  }

  handleSize = (e, value) => {
    this.setState({
      lineWidth: value,
    });
  }

  handleClear = () => {
    const { cWidth, cHeight } = this.state;
    this.ctx.clearRect(0, 0, cWidth, cHeight);

    dataArr = [];
    points = [];
    colorArr = [];
    paint = false;
  }

  handleSave = () => {
    const r = this.canvas.toDataURL('image/png');
    window.open(r, '_blank');
  }

  render() {
    const {
      cWidth,
      cHeight,
      tool,
      color,
      lineWidth,
      minWidth,
      maxWidth,
    } = this.state;
    return (
      <div>
        <SubHeader title="Drawing Board"/>
        <AppContent>
          <FlexCenter>
            <Paper>
              <FlexColumn>
                <FlexRow style={toolStyle}>
                  <RadioButtonGroup name="edit-tool" valueSelected={tool} onChange={this.henldeTool}>
                    <RadioButton
                      value="pen"
                      label="画笔"
                      checkedIcon={<Icon type={require('icons/actions/brush.svg')} color={pallete.primary} />}
                      uncheckedIcon={<Icon type={require('icons/actions/brush.svg')} />}
                      style={radioStyle}
                    />
                    <RadioButton
                      value="line"
                      label="直线"
                      disabled={true}
                      checkedIcon={<Icon type={require('icons/actions/remove.svg')} color={pallete.primary} />}
                      uncheckedIcon={<Icon type={require('icons/actions/remove.svg')} />}
                      style={radioStyle}
                    />
                    <RadioButton
                      value="rect"
                      label="矩形"
                      disabled={true}
                      checkedIcon={<Icon type={require('icons/actions/crop.svg')} color={pallete.primary} />}
                      uncheckedIcon={<Icon type={require('icons/actions/crop.svg')} />}
                      style={radioStyle}
                    />
                    <RadioButton
                      value="circle"
                      label="圆形"
                      disabled={true}
                      checkedIcon={<Icon type={require('icons/actions/panorama_fish_eye.svg')} color={pallete.primary} />}
                      uncheckedIcon={<Icon type={require('icons/actions/panorama_fish_eye.svg')} />}
                      style={radioStyle}
                    />
                    <RadioButton
                      value="clear"
                      label="橡皮"
                      checkedIcon={<Icon type={require('icons/actions/credit_card.svg')} color={pallete.primary} />}
                      uncheckedIcon={<Icon type={require('icons/actions/credit_card.svg')} />}
                      style={radioStyle}
                    />
                  </RadioButtonGroup>
                </FlexRow>
                <FlexRow style={toolStyle}>
                  <section>
                    <label htmlFor="color">Color: </label>
                    <input type="color" id="color" value={color} onChange={this.handleColor} />
                  </section>
                  <FlexRow style={{ width: '120px' }}>
                    <div style={{ width: '110px' }}>
                      <Slider
                        value={lineWidth}
                        min={minWidth}
                        max={maxWidth}
                        onChange={this.handleSize}
                        step={1}
                        style={{ marginLeft: '16px' }}
                        sliderStyle={{ margin: 0 }}
                      />
                    </div>
                    <div style={{ marginLeft: '4px' }}>{lineWidth}</div>
                  </FlexRow>
                  <FlatButton label="Clear" secondary={true} style={{ marginLeft: '8px' }} onTouchTap={this.handleClear} />
                  <FlatButton label="Save" primary={true} style={{ marginLeft: '8px' }} onTouchTap={this.handleSave} />
                </FlexRow>
                <canvas
                  ref={r => this.canvas = r}
                  width={cWidth}
                  height={cHeight}
                  style={{ borderTop: '1px #ccc solid' }}
                  onMouseDown={this.handleDragStart}
                  onMouseMove={this.handleDrag}
                  onMouseUp={this.handleDragEnd}
                >
                  It's seems does not support canvas element~
                </canvas>
              </FlexColumn>
            </Paper>
          </FlexCenter>
        </AppContent>
        <Footer />
      </div>
    );
  }
}

DrawerPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(DrawerPage);
