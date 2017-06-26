/**
*
* ResumeCard
*
*/

import React from 'react';
// import styled from 'styled-components';
import Media from 'react-media';
import FlexRowCenter from 'components/FlexRowCenter';
import FlexCenterWrap from 'components/FlexCenterWrap';
import Resume from './Resume';
import ResumeDesc from './ResumeDesc';

class ResumeCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Media query="(max-width: 480px)">
        {matches => (
          <div>
            {matches ? (
              <FlexCenterWrap>
                <Resume />
                <ResumeDesc />
              </FlexCenterWrap>
            ) : (
              <FlexRowCenter>
                <Resume />
                <ResumeDesc />
              </FlexRowCenter>
            )}
          </div>
        )}
      </Media>
    );
  }
}

ResumeCard.propTypes = {

};

export default ResumeCard;
