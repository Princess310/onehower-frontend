/*
 *
 * CommentPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import Media from 'react-media';
import { formatBackDate } from 'utils/date';

import Header from 'components/Header';
import Footer from 'components/Footer';
import AppContent from 'components/AppContent';
import ChatTool from 'components/ChatTool';
import FlexRowCenter from 'components/FlexRowCenter';
import Emoji from 'components/EmojiPanel/Emoji';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';

import { fetchMessageList, sendMessage } from './actions';
import { makeSelectMessageList } from './selectors';
import messages from './messages';

export class CommentPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      startPage: 1,
      value: '',
      open: false,
      errMsg: '',
    };
  }

  componentWillMount() {
    const { getList, message } = this.props;
    const { startPage } = this.state;

    if (!message.list) {
      getList(startPage);
    }
  }

  handleChange = (value) => {
    this.setState({
      value,
    });
  }

  handleMessage = () => {
    const { value } = this.state;
    const { addMessage } = this.props;

    if (value.trim() === '') {
      this.setState({
        open: true,
        errMsg: '内容不能为空',
      });
      return;
    }

    this.setState({
      value: '',
    });

    addMessage(value);
  }

  getMessageContent(content) {
    const values = content.split('::');
    const contentView = values.map((v, i) => (
      <Emoji name={v} key={i} />
    ));

    return contentView;
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { value, open, errMsg } = this.state;
    const { message } = this.props;

    return (
      <div>
        <Helmet
          title="互动留言"
          meta={[
            { name: 'description', content: 'onehower - 互动留言' },
          ]}
        />
        <Header />
        <AppContent>
           <Media query="(max-width: 928px)">
            {matches => (
              <FlexRowCenter>
                <div style={ matches ? { width: '100%', padding: '8px' } : { width: '960px', padding: '8px' }}>
                  <ChatTool value={value} onChange={this.handleChange} sendChatMessage={this.handleMessage} />
                  <div style={{ marginTop: '8px' }}>
                    {message.list && message.list.map((m, i) => (
                      <Card key={m.id}>
                        <CardHeader
                          title={m.username}
                          subtitle={formatBackDate(m.ctime)}
                          avatar={m.avatar}
                        />
                        <CardText>
                          {this.getMessageContent(m.content)}
                        </CardText>
                      </Card>
                    ))}
                  </div>
                </div>
              </FlexRowCenter>
            )}
          </Media>
        </AppContent>
        <Snackbar
          open={open}
          message={errMsg}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        <Footer />
      </div>
    );
  }
}

CommentPage.propTypes = {
  getList: PropTypes.func,
  message: PropTypes.object,
  addMessage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  message: makeSelectMessageList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getList: (page) => dispatch(fetchMessageList(page)),
    addMessage: (message) => dispatch(sendMessage(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentPage);
