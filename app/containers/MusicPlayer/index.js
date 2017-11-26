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

import request from 'utils/request';

export class MusicPlayer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    const self = this;

    request.doGet('song/list')
      .then((res) => {
        const { result: { list } } = res;
        self.setState({
          list,
        });
      });
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
                {list.length > 0 ?
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
                  </FlexColumnCenter> :
                  <div>请加入歌单先~</div>
                }
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
