/*
 *
 * AppWidgets
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Media from 'react-media';
import { browserHistory } from 'react-router';

import Header from 'components/Header';
import Footer from 'components/Footer';
import AppContent from 'components/AppContent';
import FlexRowCenter from 'components/FlexRowCenter';
import FlexWrap from 'components/FlexWrap';
import Icon from 'components/Icon';

import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';

import pallete from 'styles/colors';

const widgetStyle = {
  position: 'relative',
  width: '240px',
  marginRight: '15px',
  marginBottom: '15px',
};
export class AppWidgets extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          name: 'onehower - Music',
          thumbnail: 'http://onehower.oss-cn-shenzhen.aliyuncs.com/images/widgets/07.jpg',
          desc: 'One music player of react build',
          version: '1.0.0',
          path: 'musicPlayer',
          github: '',
        },
        {
          name: 'onehower - Palette',
          thumbnail: 'http://onehower.oss-cn-shenzhen.aliyuncs.com/images/widgets/paintroller-01_1x.png',
          desc: 'Drawing board',
          version: '1.0.0',
          path: 'drawer',
          github: '',
        },
        {
          name: 'onehower - Lucky Time',
          thumbnail: 'http://onehower.oss-cn-shenzhen.aliyuncs.com/images/widgets/clover.jpg',
          desc: 'Lucky Time',
          version: '1.0.0',
          path: 'lucky',
          github: '',
        }
      ],
    };
  }
  render() {
    const { list } = this.state;
    return (
      <div>
        <Helmet
          title="实验室"
          meta={[
            { name: 'description', content: 'onehower - 实验室' },
          ]}
        />
        <Header />
          <AppContent>
            <Media query="(max-width: 928px)">
            {matches => (
              <FlexRowCenter style={{ padding: '16px', color: pallete.grey }}>
                <FlexWrap>
                  {list.length > 0 && list.map((widget, i) => (
                    <Card
                      key={i}
                      style={ matches ? {...widgetStyle, width: '100%', marginRight: 0 } : widgetStyle }
                      className="h-cursor-pointer"
                      onTouchTap={() => {
                        browserHistory.push(widget.path);
                      }
                    }>
                      <CardMedia>
                        <img src={widget.thumbnail} />
                      </CardMedia>
                      <CardTitle title={widget.name} subtitle={widget.desc} />
                      {widget.github && widget.github !== '' && (
                        <a href={widget.github} style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          margin: 0,
                        }}>
                          <IconButton>
                            <Icon type={require('icons/logo/github.svg')} />
                          </IconButton>
                        </a>
                      )}
                    </Card>
                  ))}
                </FlexWrap>
              </FlexRowCenter>
            )}
          </Media>
          </AppContent>
        <Footer />
      </div>
    );
  }
}

AppWidgets.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(AppWidgets);
