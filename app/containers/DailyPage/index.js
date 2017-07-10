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

import Media from 'react-media';
import AppContent from 'components/AppContent';
import Header from 'components/Header';
import Footer from 'components/Footer';
import FlexRowCenter from 'components/FlexRowCenter';

import MomentCard from './MomentCard';

import { fetchMomentList } from './actions';
import { makeSelectDailyList } from './selectors';
import messages from './messages';

export class DailyPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      startPage: 1,
    };
  }

  componentWillMount() {
    const { getList, moment } = this.props;
    const { startPage } = this.state;

    if (!moment.list) {
      getList(startPage);
    }
  }
  render() {
    const { moment } = this.props;
    return (
      <div>
        <Helmet
          title="日常动态"
          meta={[
            { name: 'description', content: 'onehower - 日常动态' },
          ]}
        />
        <Header />
        <AppContent>
          <Media query="(max-width: 928px)">
            {matches => (
              <FlexRowCenter>
                <div style={ matches ? { width: '100%', padding: '8px' } : { width: '960px', padding: '8px' }}>
                  {moment.list && moment.list.map((moment) => (
                    <MomentCard key={moment.id} moment={moment} isPhone={matches} />
                  ))}
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

DailyPage.propTypes = {
  getList: PropTypes.func.isRequired,
  moment: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  moment: makeSelectDailyList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getList: (page) => dispatch(fetchMomentList(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyPage);
