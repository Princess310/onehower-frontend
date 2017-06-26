/**
*
* Header
*
*/

import React from 'react';
import Paper from 'material-ui/Paper';
import FlexCenter from 'components/FlexCenter';
import Media from 'react-media'

class Footer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Paper style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: '24px',
        lineHeight: '24px',
        zIndex: 90,
      }}>
        <FlexCenter style={{ transform: 'scale(.7)' }}>
          <Media query="(max-width: 480px)">
            {matches => matches ? (
              <div className="ellipsis">
                Copyright © 2016 - 2017 Princess310. All Rights Reserved.蜀ICP备16032532号
              </div>
            ) : (
              <div>
                Copyright © 2016 - 2017 Princess310. All Rights Reserved.蜀ICP备16032532号
              </div>
            )}
          </Media>
        </FlexCenter>
      </Paper>
    );
  }
}

Footer.propTypes = {

};

export default Footer;
