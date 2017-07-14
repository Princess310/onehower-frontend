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

import Header from 'components/Header';
import Footer from 'components/Footer';
import AppContent from 'components/AppContent';
import ChatTool from 'components/ChatTool';
import FlexRowCenter from 'components/FlexRowCenter';

import makeSelectCommentPage from './selectors';
import messages from './messages';

export class CommentPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
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
                  <ChatTool/>
                </div>
              </FlexRowCenter>
            )}
          </Media>
        </AppContent>
        <Footer />
      </div>
    );
  }
}

CommentPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  CommentPage: makeSelectCommentPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentPage);
