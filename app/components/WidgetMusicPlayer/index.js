/**
*
* WidgetMusicPlayer
*
*/

import React, { PropTypes } from 'react';

import Icon from 'components/Icon';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const wrapperStyle = {
  display: 'flex',
  minHeight: '160px',
  minWidth: '440px',
  color: 'rgba(0, 0, 0, 0.87)',
  borderRadius: '2px',
  boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  backgroundColor: '#fff',
};

const playerWrapperStyle = {
  position: 'relative',
  display: 'flex',
  height: '160px',
  width: '440px',
};

const playerContentWrapperStyle = {
  width: '68%',
  display: 'flex',
  flexDirection: 'column',
  color: 'rgba(0, 0, 0, 0.54)',
};

const lyricHeight = 24;
const timeReg = /\[\d*:\d*((\.|:)\d*)*]/g;
class WidgetMusicPlayer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { songList } = props;
    this.state = {
      // 当前播放歌曲索引
      index: 0,
      // 播放状态
      status: 0, // 0: pause, 1: playing
      // 播放模式
      mode: 0, // 0: 按列表顺序播放, 1: 单曲循环, 2: 随机播放
      // 当前播放歌曲
      current: songList.length > 0 ? songList[0] : null,
      // 当前歌词索引, 目前用时间
      lyricTime: -1,
      // 歌词
      lyric: {},
      // 歌词缓存
      lyricCache: {},
      // 歌词面板滑动距离
      lyricScrollTop: 0,
      // 是否显示歌单面板
      showPanel: false,
      // 是否显示歌词
      showLyric: false,
      // 音量: 0 - 1
      volume: 1,
      // 是否静音
      muted: false,
    };
  }

  defaultProps = {
    // 音乐列表
    songList: [],
    // 自动播放
    autoPlay: false,
  }

  // 歌词获取
  getLyric(lyricUrl) {
    const self = this;
    const { lyricCache } = this.state;

    if (!lyricCache[lyricUrl]) {
      function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }

        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }

      function parseText(response) {
        return response.text();
      }
      
      fetch(lyricUrl, {
        headers: { 
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
        },
      })
      .then(checkStatus)
      .then(parseText)
      .then((res) => {
        const lyric = res;
        const lyricRows = lyric
              .replace(/(\[\d*:\d*((\.|:)\d*)*])/gm, '\n$1').trim()
              .replace(/\\n/gm, '\n')
              .split('\n');
        const lyricData = {};
        let i = 0,
            content,
            len = lyricRows.length;
        for (i; i < len; i++) {
          content = decodeURIComponent(lyricRows[i]);
          const timeRegArr = content.match(timeReg);
          if (!timeRegArr) continue;
          for (let i = 0, len = timeRegArr.length; i < len; i++) {
              const t = timeRegArr[i];
              const minute = Number(String(t.match(/\[\d*/i)).slice(1)),
                    second = Number(String(t.match(/\:\d*/i)).slice(1));
              const time = minute * 60 + second;
              lyricData[time] = content.replace(timeReg, ''); //内容区去掉时间
          }
        }

        const newLyricCache = {
          ...lyricCache,
          [lyricUrl]: lyricData,
        };

        self.setState({
          lyric: lyricData,
          lyricCache: newLyricCache,
        });
      });
    } else {
      self.setState({
        lyric: lyricCache[lyricUrl],
      });
    }
  }

  // 组件加载完
  componentDidMount() {
    const { current } = this.state;

    this.getLyric(current.lyric);
  }

  // 控制列表面板
  handleTogglePanel = () => {
    this.setState({
      showPanel: !this.state.showPanel,
    });
  }

  // 控制歌词面板
  handleToggleLyric = () => {
    this.setState({
      showLyric: !this.state.showLyric,
    });
  }

  // 根据当前播放状态修改显示界面
  checkStatus = () => {
    const audio = this.audio;

    this.setState({
      status: audio.paused ? 0 : 1,
    });
  }

  // 监听可播放事件
  handleCanPlay = () => {
    const audio = this.audio;
    const { status } = this.state;

    // 如果当前是播放状态，则接着播放选择歌曲
    if (status === 1) {
      audio.play();
    }
    this.checkStatus();
  }

  handleInit = () => {
    // 歌词面板滑动距离
    if (this.lyric) {
      this.lyric.scrollTop = 0;
    }

    // 滑块
    this.progressBar.style.width = 0;
  }

  // 播放
  handlePlay = () => {
    const audio = this.audio;

    audio.play();
    this.checkStatus();
  }

  // 停止
  handlePause = () => {
    const audio = this.audio;

    audio.pause();
    this.checkStatus();
  }

  // 切换歌曲播放
  changeSongToPlay = (song, i) => {
    const { index, status } = this.state;
    const audio = this.audio;

    if (i === index) {
      return;
    }

    this.setState({
      index: i,
      current: song,
    });

    // 设置新的audio src
    audio.src = song.audio;
    // 获取歌词
    this.getLyric(song.lyric);
    // 重置页面样式
    this.handleInit();
  }

  // 播放下一首
  handlePlayNext = () => {
    const { songList } = this.props;
    const { index } = this.state;
    const song = index === (songList.length - 1) ? songList[0] : songList[index + 1];
    const i = index === (songList.length - 1) ? 0 : index + 1;

    this.changeSongToPlay(song, i);
  }

  // 播放上一首
  handlePlayPrev = () => {
    const { songList } = this.props;
    const { index } = this.state;
    const song = index === 0 ? songList[songList.length - 1] : songList[index - 1];
    const i = index === 0 ? songList.length - 1 : index - 1;

    this.changeSongToPlay(song, i);
  }

  // 监听audio时间变化
  handleTimeUpdate = () => {
    const audio = this.audio;
    const { lyric } = this.state;

    const currentTime = Math.round(audio.currentTime);

    if (lyric[currentTime]) {
      this.setState({
        lyricTime: currentTime,
      });
    }

    // 歌词面板滑动距离
    let i = 0;
    for (let time in lyric) {
      if (Number(time) === currentTime && this.lyric) {
        const lyricPanelHeight = this.lyric.offsetHeight;
        const top = i * lyricHeight;
        const doScroll = top >= (lyricPanelHeight / 2 - lyricHeight);

        if (doScroll) {
          this.lyric.scrollTop = top - (lyricPanelHeight / 2 - lyricHeight);
        }
      }

      i += 1;
    }

    // 进度条变化
    const percent = audio.currentTime / audio.duration;
    this.progressBar.style.width = `${Number(percent).toFixed(4) * 100}%`;
  }

 // 切换播放模式
  handleMode = () => {
    const { mode } = this.state;

    this.setState({
      mode: mode === 0 ? (mode + 1) : 0,
    });
  }

  // 监听一首歌曲播放完毕
  handleEneded = () => {
    const { mode } = this.state;

    // 列表循环
    if (mode === 0) {
      this.handlePlayNext();
    } else {
      // 单曲循环
      this.handleInit();
      this.audio.play();
    }
  }

  // 静音切换
  handleMuted = () => {
    const { muted } = this.state;

    this.setState({
      muted: !muted,
    });
  }

  render() {
    const { style, songList, playerStyle, playerContentStyle, autoPlay } = this.props;
    const { index, current, status, showPanel, showLyric, lyric, lyricTime, mode, volume, muted } = this.state;

    const styles = {
      rootStyle: {...wrapperStyle, ...style},
      playerStyle: {...playerWrapperStyle, ...playerStyle},
      playerContentStyle: {...playerContentWrapperStyle, ...playerContentStyle},
      headerStyle: {
        padding: '16px',
      },
      name: {
        fontSize: '24px'
      },
      singer: {
        fontSize: '16px',
        color: 'rgba(0, 0, 0, 0.54)',
      },
      controler: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px',
      },
      controlerBtn: {
        width: '60px',
        height: '60px',
      },
      panelBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
      },
      color: {
        activeColor: 'rgb(0, 188, 212)',
        defaultColor: 'rgba(0, 0, 0, 0.54)',
      },
      songList: {
        width: '240px',
        borderLeft: '1px #f0f0f0 solid',
        overflowY: 'scroll',
      },
      songItem: {
      },
      lyricPanel: {
        height: '240px',
        padding: '15px',
        textAlign: 'center',
        borderTop: '1px #f0f0f0 solid',
        overflowY: 'scroll',
      },
      progressWrapper: {
        position: 'relative',
        paddingLeft: '16px',
        paddingRight: '16px',
      },
      progress: {
        position: 'relative',
        height: '8px',
        backgroundColor: '#f0f0f0',
        borderRadius: '2px',
      },
      progressBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgb(244, 143, 177)',
      },
      progressBtn: {
        position: 'absolute',
        top: '-2px',
        bottom: '-2px',
        right: '-8px',
        width: '16px',
        backgroundColor: 'rgb(0, 188, 212)',
        borderRadius: '2px',
      },
    };

    const songListView = songList.length > 0 && songList.map((song, i) => {
      return (
        <ListItem
          key={i}
          style={index === i ? {...styles.songItem, color: styles.color.activeColor} : styles.songItem}
          leftAvatar={<Avatar src={song.thumbnail} />}
          primaryText={song.name}
          secondaryText={song.singer}
          onTouchTap={() => {
            this.changeSongToPlay(song, i);
          }}
        />
      );
    });

    let lyricView = [];
    for (let time in lyric) {
      lyricView.push(
        <div key={time} style={{ height: lyricHeight, color: (Number(time) === lyricTime ? styles.color.activeColor : styles.color.defaultColor ) }}>{lyric[time]}</div>
      );
    }

    return (
      <div style={styles.rootStyle}>
        <div>
          <section style={styles.playerStyle}>
            <section style={{ width: '32%' }}>
              <img src={current.thumbnail} alt="" style={{ height: '100%', width: '100%' }}/>
            </section>
            <section style={styles.playerContentStyle}>
              <header style={styles.headerStyle}>
                <div style={styles.name}>{current.name}</div>
                <div style={styles.singer}>{current.singer}</div>
              </header>
              <div style={styles.progressWrapper}>
                <div style={styles.progress}>
                  <div style={styles.progressBar} ref={r => this.progressBar = r}>
                    <div style={styles.progressBtn} className="h-cursor-pointer"></div>
                  </div>
                </div>
              </div>
              <section style={styles.controler}>
                <IconButton style={styles.controlerBtn} onTouchTap={this.handleMuted}>
                  {
                    muted ?
                    <Icon type={require('icons/actions/volume_off.svg')} size="24px" /> :
                    <Icon type={require('icons/actions/volume_up.svg')} size="24px" />
                  }
                </IconButton>
                <IconButton style={styles.controlerBtn} onTouchTap={this.handlePlayPrev} title="上一首">
                  <Icon type={require('icons/actions/skip_previous.svg')} size="32px" />
                </IconButton>
                <IconButton style={styles.controlerBtn} title={status === 0 ? "播放" : "暂停"}>
                  {status === 0 ?
                    <Icon type={require('icons/actions/play_arrow.svg')} size="36px" onClick={this.handlePlay} /> :
                    <Icon type={require('icons/actions/pause.svg')} size="36px" onClick={this.handlePause} />
                  }
                </IconButton>
                <IconButton style={styles.controlerBtn} onTouchTap={this.handlePlayNext} title="下一首">
                  <Icon type={require('icons/actions/skip_next.svg')} size="32px" />
                </IconButton>
                <IconButton style={styles.controlerBtn} onTouchTap={this.handleMode} title={mode === 0 ? "循环播放" : "单曲循环"}>
                  {
                    mode === 0 ?
                    <Icon type={require('icons/actions/loop.svg')} size="24px" /> :
                    <Icon type={require('icons/actions/repeat_one.svg')} size="24px" />
                  }
                </IconButton>
              </section>
            </section>

            <div style={styles.panelBtn}>
              <IconButton onTouchTap={this.handleToggleLyric} title="歌词">
                <Icon type={require('icons/actions/queue_music.svg')}  color={showLyric ? styles.color.activeColor : styles.color.defaultColor}/>
              </IconButton>
              <IconButton onTouchTap={this.handleTogglePanel} title="歌单">
                <Icon type={require('icons/actions/playlist_play.svg')}  color={showPanel ? styles.color.activeColor : styles.color.defaultColor}/>
              </IconButton>
            </div>
          </section>
          {showLyric &&
            <article style={styles.lyricPanel} ref={r => this.lyric = r}>
              {lyricView}
            </article>
          }
        </div>
        {showPanel && <List style={styles.songList}>{songListView}</List>}
        <audio
          ref={r => this.audio = r}
          src={current.audio}
          autoPlay={autoPlay}
          onCanPlay={this.handleCanPlay}
          onTimeUpdate={this.handleTimeUpdate}
          onEnded={this.handleEneded}
          muted={muted}
        />
      </div>
    );
  }
}

WidgetMusicPlayer.propTypes = {
  songList: PropTypes.array.isRequired,
  style: PropTypes.object,
  playerStyle: PropTypes.object,
  playerContentStyle: PropTypes.object,
  autoPlay: PropTypes.bool,
};

export default WidgetMusicPlayer;
