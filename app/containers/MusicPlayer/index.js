/*
 *
 * MusicPlayer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Media from 'react-media';

import SubHeader from 'components/Header/SubHeader';
import AppContent from 'components/AppContent';
import Footer from 'components/Footer';
import FlexCenter from 'components/FlexCenter';
import FlexColumnCenter from 'components/FlexColumnCenter';
import WidgetMusicPlayer from 'components/WidgetMusicPlayer';

export class MusicPlayer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          name: '一次就好',
          singer: '孙露',
          audio: 'https://onehower.oss-cn-shenzhen.aliyuncs.com/audio/1/%E5%AD%99%E9%9C%B2%20-%20%E4%B8%80%E6%AC%A1%E5%B0%B1%E5%A5%BD.mp3',
          lyric: 'https://onehower.oss-cn-shenzhen.aliyuncs.com/audio/1/%E5%AD%99%E9%9C%B2%20-%20%E4%B8%80%E6%AC%A1%E5%B0%B1%E5%A5%BD.lrc',
          thumbnail: 'https://onehower.oss-cn-shenzhen.aliyuncs.com/images/music/023b5bb5c9ea15ce8ce4435abe003af33a87b25f.jpg',
        },
        {
          name: '平凡之路',
          singer: '左凡',
          audio: 'https://onehower.oss-cn-shenzhen.aliyuncs.com/audio/1/%E5%B7%A6%E5%87%A1%20-%20%E5%B9%B3%E5%87%A1%E4%B9%8B%E8%B7%AF.mp3',
          lyric: 'https://onehower.oss-cn-shenzhen.aliyuncs.com/audio/1/%E5%B7%A6%E5%87%A1%20-%20%E5%B9%B3%E5%87%A1%E4%B9%8B%E8%B7%AF.lrc',
          thumbnail: 'https://onehower.oss-cn-shenzhen.aliyuncs.com/images/music/timg.jpg',
        },
      ],
    };
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        <SubHeader title="Music Player"/>
        <AppContent>
          <Media query="(max-width: 928px)">
            {matches => (
              <FlexCenter>
                <FlexColumnCenter>
                  <WidgetMusicPlayer songList={list} />
                  <article style={{
                    marginTop: '15px',
                    color: 'rgba(0, 0, 0, 0.54)',
                    textAlign: 'center',
                    fontSize: '12px',
                  }}>
                    <div>基于React的一个简单的音乐播放器 ---- OneHower - Music</div>
                    <div>v.1.0.0</div>
                    <div style={{ textAlign: 'left' }}>
                      Next Schedule:
                      <ol>
                        <li>Responsible for mobile</li>
                        <li>Volume && Time line control</li>
                        <li>Add more function things</li>
                      </ol>
                    </div>
                  </article>
                </FlexColumnCenter>
              </FlexCenter>
            )}
          </Media>
        </AppContent>
        <Footer />
      </div>
    );
  }
}

MusicPlayer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(MusicPlayer);
