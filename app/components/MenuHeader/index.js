/**
*
* MenuHeader
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import FlexRow from 'components/FlexRow';
import Icon from 'components/Icon';

import pallete from 'styles/colors';

function MenuHeader(props) {
  return (
    <div>
      <AppBar
        onLeftIconButtonTouchTap={() => {
          props.onMenuClick && props.onMenuClick();
        }}
        title={
          <FlexRow style={{ height: '100%' }}>
            <FlatButton label="首页" style={{ color: pallete.white }} />
            <FlatButton label="日常动态" style={{ color: pallete.white }} />
            <FlatButton label="人生足迹" style={{ color: pallete.white }} />
            <FlatButton label="留言互动" style={{ color: pallete.white }} />
          </FlexRow>
        }
        iconElementRight={
          <a href="https://github.com/Princess310">
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
