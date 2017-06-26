/**
*
* Header
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import UserCard from 'containers/UserCard';

import Drawer from 'material-ui/Drawer';
import MenuHeader from './MenuHeader';
import messages from './messages';

class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    showDrawer: false,
  }

  toggleDrawer = () => {
    this.setState({
      showDrawer: !this.state.showDrawer,
    });
  }

  render() {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        zIndex: 100,
      }}>
        <MenuHeader onMenuClick={this.toggleDrawer} />
        <Drawer
          docked={false}
          open={this.state.showDrawer}
          onRequestChange={this.toggleDrawer}>
          <UserCard />
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {

};

export default Header;
