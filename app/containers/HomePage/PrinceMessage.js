/**
*
* ResumeCard
*
*/

import React from 'react';
// import styled from 'styled-components';
import Media from 'react-media';
import princeImg from 'assets/images/prince.jpg';
import FlexRowCenter from 'components/FlexRowCenter';
import FlexCenter from 'components/FlexCenter';
import FlexColumnCenter from 'components/FlexColumnCenter';
import Paper from 'material-ui/Paper';

const contentStyle = {
  textAlign: 'center',
  backgroundImage: `url('${princeImg}')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
};

class PrinceMessage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Media query="(max-width: 928px)">
        {matches => (
          <FlexRowCenter>
            <Paper style={ matches ? { width: '100%', height: '220px', ...contentStyle} : { width: '928px', height: '580px', fontSize: '20px', ...contentStyle }}>
              <FlexCenter style={{ color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.12)', padding: '0 40px' }}>
                <FlexColumnCenter>
                  <div>如果你想要与别人制造羁绊，就要承受流泪的风险</div>
                  <div style={{ fontSize: '12px ' }}>If you want to make a bond, you are to take the risk of tearing.</div>
                  <div style={{ width: '100%', marginTop: '16px', fontSize: '12px ', textAlign: 'right' }}>——《小王子》(Little Prince)</div>
                </FlexColumnCenter>
              </FlexCenter>
            </Paper>
          </FlexRowCenter>
        )}
      </Media>
    );
  }
}

PrinceMessage.propTypes = {

};

export default PrinceMessage;
