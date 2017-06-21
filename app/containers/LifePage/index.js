/*
 *
 * LifePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import Header from 'components/Header';

import makeSelectLifePage from './selectors';
import messages from './messages';

export class LifePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="人生足迹"
          meta={[
            { name: 'description', content: 'onehower - 人生足迹' },
          ]}
        />
        <Header />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

LifePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  LifePage: makeSelectLifePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LifePage);
