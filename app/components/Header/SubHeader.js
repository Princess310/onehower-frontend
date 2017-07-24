/**
*
* Header
*
*/

import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';

import Icon from 'components/Icon';
import IconButton from 'material-ui/IconButton';

import AppBar from 'material-ui/AppBar';

class SubHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { title, githubLink } = this.props;
    return (
      <AppBar
        iconElementLeft={
          <IconButton>
            <Icon type={require('icons/actions/keyboard_backspace.svg')} color={pallete.white} />
          </IconButton>
        }
        onLeftIconButtonTouchTap={() => {
          browserHistory.goBack();
        }}
        title={title}
        iconElementRight={
          githubLink ? 
          <a href={githubLink} target="_blank">
            <IconButton>
              <Icon type={require('icons/logo/github.svg')} color={pallete.white} />
            </IconButton>
          </a>
          : null
        }
      />
    );
  }
}

SubHeader.propTypes = {
  title: PropTypes.string,
  githubLink: PropTypes.string,
};

export default SubHeader;
