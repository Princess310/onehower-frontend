/**
*
* MenuHeader
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import FlexRow from 'components/FlexRow';
import Icon from 'components/Icon';

import pallete from 'styles/colors';
import Media from 'react-media'

import messages from './messages';

const activeStyle = {
  borderBottom: `2px ${pallete.secondary} solid`,
  boxSizing: 'border-box',
  height: '100%',
};

function MenuHeader(props) {
  return (
    <div>
      <AppBar
        onLeftIconButtonTouchTap={() => {
          props.onMenuClick && props.onMenuClick();
        }}
        title={
          <Media query="(max-width: 480px)">
            {matches => matches ? (
              <div>OneHower</div>
            ) : (
              <FlexRow style={{ height: '100%' }}>
                <Link to="/" activeStyle={activeStyle}><FlatButton label="首页" style={{ color: pallete.white }} /></Link>
                <Link to="/daily" activeStyle={activeStyle}><FlatButton label="日常动态" style={{ color: pallete.white }} /></Link>
                <Link to="/widgets" activeStyle={activeStyle}><FlatButton label="实验室" style={{ color: pallete.white }} /></Link>
                {/*<Link to="/life" activeStyle={activeStyle}><FlatButton label="人生足迹" style={{ color: pallete.white }} /></Link>
                <Link to="/comment" activeStyle={activeStyle}><FlatButton label="留言互动" style={{ color: pallete.white }} /></Link>*/}
              </FlexRow>
            )}
          </Media>
        }
        iconElementRight={
          <a href="https://github.com/Princess310" target="_blank">
            <IconButton>
              <Icon type={require('icons/logo/github.svg')} color={pallete.white} />
            </IconButton>
          </a>
        }
      />
    </div>
  );
}

MenuHeader.propTypes = {
  onMenuClick: PropTypes.func,
};

export default MenuHeader;
