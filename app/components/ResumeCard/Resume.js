/**
*
* Resume
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Media from 'react-media';

import personAvatar from 'assets/images/person-avatar.jpg';
import resumeImg from 'assets/images/resume-bg.jpg';

class Resume extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Media query="(max-width: 480px)">
        {matches => (
          <Card
            style={
              matches ?
              { width: '100%', marginBottom: '8px' } :
              { width: '280px', marginBottom: '8px' }
            }>
            <CardHeader
              title="王浩"
              subtitle="princess310 [常用ID]"
              avatar={personAvatar}
            />
            <CardMedia
              overlay={<CardTitle title="向往阳光" subtitle="Yearn for the direction of sunshine" />}
            >
              <img src={resumeImg} alt="" />
            </CardMedia>
            <CardTitle title="It's me" subtitle="热爱Web开发，乐于学习和分享代码的世界" />
          </Card>
        )}
      </Media>
    );
  }
}

Resume.propTypes = {

};

export default Resume;
