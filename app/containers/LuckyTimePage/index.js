/*
 *
 * LuckyTimePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pallete from 'styles/colors';

import SubHeader from 'components/Header/SubHeader';
import AppContent from 'components/AppContent';
import Footer from 'components/Footer';

import LotteryWheel from './LotteryWheel';

export class LuckyTimePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <SubHeader title="Lucky Time"/>
        <AppContent>
          <LotteryWheel />
        </AppContent>
        <Footer />
      </div>
    );
  }
}

LuckyTimePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(LuckyTimePage);
