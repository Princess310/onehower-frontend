/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import MenuHeader from 'components/MenuHeader';
import UserCard from 'containers/UserCard';

import Drawer from 'material-ui/Drawer';

import messages from './messages';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
      <div>
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
