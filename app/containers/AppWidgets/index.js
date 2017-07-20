/*
 *
 * AppWidgets
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Media from 'react-media';

import Header from 'components/Header';
import Footer from 'components/Footer';
import AppContent from 'components/AppContent';
import FlexRowCenter from 'components/FlexRowCenter';
import Icon from 'components/Icon';

import pallete from 'styles/colors';

export class AppWidgets extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
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
              <FlexRowCenter style={{ padding: '16px', textAlign: 'center', color: pallete.grey }}>
                <div>There are no widgets for now, comming soon. <Icon type={require('icons/actions/pets.svg')} /></div>
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
