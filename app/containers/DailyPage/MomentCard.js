/**
*
* MomentCard
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Media from 'react-media';
import { browserHistory } from 'react-router';
import date from 'utils/date';
import FlexRowCenter from 'components/FlexRowCenter';

import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIdefault from 'photoswipe/dist/photoswipe-ui-default';

import { Card, CardHeader, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import AudioPlayer from 'components/AudioPlayer';
import ViedoPlayer from 'components/VideoPlayer';

const PicWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  paddingLeft: 16px;
  paddingRight: 16px;
  paddingBottom: 16px;
`;

class MomentCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleView = (e, i) => {
    e.preventDefault();
    e.stopPropagation();
    const { moment } = this.props;
    const eTarget = e.target || e.srcElement;
    const pswpElement = document.querySelectorAll('.pswp')[0];
    const length = document.body.clientWidth;

    const items = moment.pictures.split(',').map((p) => ({
      src: p,
      w: length,
      h: length,
      doGetSlideDimensions: true,
    }));

    const options = {
      index: i,
      shareEl: false,
      bgOpacity: 0.5,
      // getThumbBoundsFn: () => {
      //   const thumbnail = eTarget;
      //   const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
      //   const rect = thumbnail.getBoundingClientRect();

      //   return {
      //     x: rect.left,
      //     y: rect.top + pageYScroll,
      //     w: rect.width,
      //   };
      // },
    };

    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIdefault, items, options);

    function getSlideDimensions(slide) {

      if (!slide.doGetSlideDimensions)
          return;    // make sure we don't keep requesting the image if it doesn't exist etc.

      let img = new Image();

      img.onerror = () => {
        slide.doGetSlideDimensions = false;
      };

      img.onload = () => {
        slide.doGetSlideDimensions = false;

        slide.w = img.naturalWidth;
        slide.h = img.naturalHeight;

        gallery.invalidateCurrItems();
        gallery.updateSize(true);
      }

      img.src = slide.src;
    }

    gallery.listen("gettingData", function(index, slide){
      if (slide.doGetSlideDimensions) {
        setTimeout(
          // use setTimeout so that it runs in the event loop
          function(){ getSlideDimensions(slide); }
          ,300
        );
      }
    });

    gallery.listen("imageLoadComplete", function(index, slide){
      if (slide.doGetSlideDimensions) {
        getSlideDimensions(slide);
      }
    });

    gallery.init();
  }

  render() {
    const { moment, isPhone } = this.props;

    const pics = moment.pictures.split(',');
    const picLength = isPhone ? (pics.length === 1 ? '325px' : ((pics.length > 1 && pics.length < 4) ? '100px' : '72px'))
                      : (pics.length === 1 ? '325px' : ((pics.length > 1 && pics.length < 4) ? '288px' : '200px'));
    const picsView = pics.length > 0 ? pics.map((pic, i) => (
      <div
        key={i}
        onClick={(e) => this.handleView(e, i)}
        style={{
          backgroundImage: `url(${pic})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          width: (pics.length === 1 ? '100%' : picLength),
          height: picLength,
          marginBottom: (pics.length > 1 ? (isPhone ? '8px' : '16px') : 0),
          marginRight: (pics.length > 1 ? (isPhone ? '8px' : '16px') : 0),
        }}
      />
    )) : null;

    return (
      <Card style={{ marginBottom: '8px' }}>
        <CardHeader
          title={moment.content}
          subtitle={date.format(moment.createdAt, 'YYYY-MM-DD')}
          textStyle={{
            paddingRight: 0,
          }}
        />
        <div style={{ position: 'relative' }}>
          {pics.length > 0 && <PicWrapper>{picsView}</PicWrapper>}
          {moment.type === 'audio' &&
            <AudioPlayer
              url={moment.audio}
              isPhone={isPhone}
              style={{
                marginLeft: '16px',
                marginRight: '16px',
                marginBottom: '16px',
              }}
            />}
          {moment.type === 'vedio' &&
            <ViedoPlayer
              url={moment.vedio}
              pic={pics[0]}
              isPhone={isPhone}
              style={{
                marginLeft: '16px',
                marginRight: '16px',
                marginBottom: '16px',
              }}
            />
          }
        </div>
        <div>
          {moment.type === 'article' &&
            <CardActions>
              <FlatButton label="查看详情" onTouchTap={() => {
                browserHistory.push({
                  pathname: '/momentDetail',
                  query: {
                    id: moment.id,
                  },
                });
              }}/>
            </CardActions>
          }
        </div>
      </Card>
    );
  }
}

MomentCard.propTypes = {
  moment: PropTypes.object,
  isPhone: PropTypes.bool,
};

export default MomentCard;
