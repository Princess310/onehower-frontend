/*
 *
 * UserCard
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectUserCard from './selectors';
import { Link } from 'react-router';

import personBg from 'assets/images/person-bg.jpg';
import personAvatar from 'assets/images/person-avatar.jpg';
import FlexRow from 'components/FlexRow';
import FlexColumnCenter from 'components/FlexColumnCenter';
import FlexColumn from 'components/FlexColumn';
import Icon from 'components/Icon';

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';

import qrcode from 'assets/images/qrcode.jpg';

import pallete from 'styles/colors';

const activeStyle = {
  display: 'block',
  borderRight: `4px ${pallete.primary} solid`,
  boxSizing: 'border-box',
  width: '100%',
};

export class UserCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    openPopup: false,
  }

  handleRequestClose = () => {
    this.setState({
      openPopup: false,
    });
  }

  handleOpenPopup = (e) =>{
    e.preventDefault();

    this.setState({
      openPopup: true,
      anchorEl: e.currentTarget,
    });
  }

  render() {
    return (
      <div>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '256px',
          backgroundSize: '100% 100%',
          backgroundImage: `url(${personBg})`,
        }}>
          <FlexColumnCenter style={{ color: pallete.white }}>
            <FlexRow style={{ marginTop: '80px' }}>
              <Avatar src={personAvatar} size={56} />
              <FlexColumn style={{ marginLeft: '8px' }}>
                <div>Princess310</div>
                <div>One - Hower</div>
              </FlexColumn>
            </FlexRow>
            <div style={{ marginTop: '8px', transform: 'scale(.78)' }}>追求卓越是我们一直坚持的方向!</div>
          </FlexColumnCenter>
        </div>
        <List>
          <Link to="/" activeStyle={activeStyle}><ListItem primaryText="首页" leftIcon={<Icon type={require('icons/menu/home.svg')} />} /></Link>
          <Link to="/daily" activeStyle={activeStyle}><ListItem primaryText="日常动态" leftIcon={<Icon type={require('icons/menu/schedule.svg')} />} /></Link>
          <Link to="/life" activeStyle={activeStyle}><ListItem primaryText="人生足迹" leftIcon={<Icon type={require('icons/menu/flag.svg')} />} /></Link>
          <Link to="/comment" activeStyle={activeStyle}><ListItem primaryText="留言互动" leftIcon={<Icon type={require('icons/menu/chat.svg')} />} /></Link>
        </List>

        <Divider />
        <List>
          <ListItem primaryText="WeChat" leftIcon={<Icon type={require('icons/logo/wechat.svg')} />} onTouchTap={this.handleOpenPopup} />
          <ListItem primaryText="wanghaojz@gmail.com" leftIcon={<Icon type={require('icons/logo/gmail.svg')} />} />
          <a href="https://github.com/Princess310" target="_blank">
            <ListItem primaryText="Github" leftIcon={<Icon type={require('icons/logo/github.svg')} />} />
          </a>
        </List>

        <Popover
          open={this.state.openPopup}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
          targetOrigin={{horizontal: 'middle', vertical: 'center'}}
          onRequestClose={this.handleRequestClose}
          className="qrcode-wrapper"
        >
          <img src={qrcode} style={{ width: '240px', height: 'auto' }} />
        </Popover>
      </div>
    );
  }
}

UserCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  UserCard: makeSelectUserCard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
