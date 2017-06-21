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

import Header from 'components/Header';

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
        <FormattedMessage {...messages.header} />
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
