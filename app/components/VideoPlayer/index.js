/**
*
* ViedoPlayer
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Video from 'video.js';

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

class ViedoPlayer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { isPhone } = this.props;
    const player = Video('my-player');
  }

  render() {
    const { style, isPhone, url, pic } = this.props;

    return (
      <Container style={style}>
        <video
          id="my-player"
          className="video-js"
          controls
          preload="auto"
          poster={pic}
          data-setup='{}'>
          <source src={url} type="video/mp4"></source>
          <source src={url} type="video/webm"></source>
          <source src={url} type="video/ogg"></source>
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
          </p>
        </video>
      </Container>
    );
  }
}

ViedoPlayer.propTypes = {
  style: PropTypes.object,
  url: PropTypes.string.isRequired,
  pic: PropTypes.string,
  isPhone: PropTypes.bool,
};

export default ViedoPlayer;
