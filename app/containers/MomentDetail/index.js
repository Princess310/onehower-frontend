/*
 *
 * MomentDetail
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import date from 'utils/date';

import Helmet from 'react-helmet';
import AppContent from 'components/AppContent';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';

import { fetchMomentDetail } from './actions';
import { makeSelectMomentDetail } from './selectors';

const PicWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  paddingLeft: 16px;
  paddingRight: 16px;
  paddingBottom: 16px;
`;

export class MomentDetail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    const { location: { query }, getInfo } = this.props;
    const { id } = query;

    getInfo(id);
  }

  render() {
    const { moment } = this.props;

    const pics = moment ? moment.pictures.split(',') : [];
    const picLength = pics.length === 1 ? '325px' : ((pics.length > 1 && pics.length < 4) ? '288px' : '200px');
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
      <div>
        <Helmet
          title="OneHower"
          meta={[
            { name: 'description', content: '文章详情' },
          ]}
        />
        <Header />
        <AppContent style={{ padding: '8px' }}>
          {moment &&
            <Card>
              {moment.article}
              <CardHeader
                title={moment.content}
                subtitle={date.format(moment.createdAt, 'YYYY-MM-DD')}
                textStyle={{
                  paddingRight: 0,
                }}
              />
              {pics.length > 0 && <PicWrapper>{picsView}</PicWrapper>}
              <CardText>
                {moment.article}
              </CardText>
            </Card>
          }
        </AppContent>
        <Footer />
      </div>
    );
  }
}

MomentDetail.propTypes = {
  getInfo: PropTypes.func,
  moment: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
};

const mapStateToProps = createStructuredSelector({
  moment: makeSelectMomentDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    getInfo: (id) => dispatch(fetchMomentDetail(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MomentDetail);
