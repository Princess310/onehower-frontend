/**
*
* ResumeDesc
*
*/

import React from 'react';
import styled from 'styled-components';

import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Media from 'react-media';

import Icon from 'components/Icon';
import FlexRow from 'components/FlexRow';

const ContentWrapper = styled.div`
  font-size: 14px;
  padding-left: 16px;
  padding-right 16px;
`;

class ResumeDesc extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Media query="(max-width: 480px)">
        {matches => (
          <Paper
            style={
              matches ?
              { width: '100%', marginBottom: '8px', paddingBottom: '8px' } :
              { width: '640px', marginLeft: '7px', paddingBottom: '8px', marginBottom: '8px' }
            }>
            <Subheader>2012 - 2016</Subheader>
            <ContentWrapper>四川农业大学，认识了一群人，熟悉了一座城。</ContentWrapper>
            <Divider />
            <Subheader>2014 - 2015</Subheader>
            <ContentWrapper>大三，花了一年时间，跟着老外Jeremy做外包工作。接触了很多优质的webapp项目，OCI, BriteCRM, JSS, Sample-social, ISONAS等，学习了很多姿势。</ContentWrapper>
            <Divider />
            <Subheader>2015 - 2016</Subheader>
            <ContentWrapper>在深圳金证公司实习4个月后，来到了成都一个西藏当季公司，从事web前端工作，接触了一个OA项目，不过，很意外，公司在接近半年后就解散了。</ContentWrapper>
            <Divider />
            <Subheader>2016 - current</Subheader>
            <ContentWrapper>在现在的公司 - 四川阿里健网络科技集团工作，从事web前端，主要负责公司网站, Webapp, 小程序等工作的开发。</ContentWrapper>
            <Divider />
            <Subheader>如果对我感兴趣，请联系我：</Subheader>
            <ContentWrapper>
              <FlexRow>
                <Icon type={require('icons/logo/qq.svg')} size="20px" />
                <span style={{ marginRight: '16px' }}>: 837478514</span>

                <a href="tel:18227552785" style={{ marginRight: '16px' }}>
                  <FlexRow>
                    <Icon type={require('icons/logo/iphone.svg')} size="20px" />
                    <span>: 18227552785</span>
                  </FlexRow>
                </a>

                <a href="http://blog.onehower.com">
                  <FlexRow>
                    <Icon type={require('icons/logo/blog.svg')} size="20px" />
                    <span>: My Blog</span>
                  </FlexRow>
                </a>
              </FlexRow>
            </ContentWrapper>
          </Paper>
        )}
      </Media>
    );
  }
}

ResumeDesc.propTypes = {

};

export default ResumeDesc;
