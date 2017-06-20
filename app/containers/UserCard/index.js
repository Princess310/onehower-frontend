/*
 *
 * UserCard
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectUserCard from './selectors';
import personBg from 'assets/images/person-bg.jpg';
import personAvatar from 'assets/images/person-avatar.jpg';
import FlexRow from 'components/FlexRow';
import FlexColumnCenter from 'components/FlexColumnCenter';
import FlexColumn from 'components/FlexColumn';

import Avatar from 'material-ui/Avatar';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import pallete from 'styles/colors';

export class UserCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
          <ListItem primaryText="首页" leftIcon={<ContentInbox />} />
          <ListItem primaryText="日常动态" leftIcon={<ContentInbox />} />
          <ListItem primaryText="人生足迹" leftIcon={<ContentInbox />} />
          <ListItem primaryText="留言互动" leftIcon={<ContentInbox />} />
          <Divider />
          <ListItem primaryText="WeChat" leftIcon={<ContentInbox />} />
          <ListItem primaryText="Gmail" leftIcon={<ContentInbox />} />
          <ListItem primaryText="Github" leftIcon={<ContentInbox />} />
        </List>
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
