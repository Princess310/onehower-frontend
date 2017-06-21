/*
 *
 * DailyPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import Header from 'components/Header';

import makeSelectDailyPage from './selectors';
import messages from './messages';

export class DailyPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="日常动态"
          meta={[
            { name: 'description', content: 'onehower - 日常动态' },
          ]}
        />
        <Header />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

DailyPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  DailyPage: makeSelectDailyPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyPage);
