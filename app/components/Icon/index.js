/**
*
* Icon
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';

function Icon(props) {
  const { size, type, ...restProps } = props;

  return (
    <div>
      <svg width={size} height={size} {...restProps}>
        <use xlinkHref={`#${type.default.id}`} />
      </svg>
    </div>
  );
}

Icon.propTypes = {
  size: PropTypes.string,
  type: PropTypes.object.isRequired,
};

Icon.defaultProps = {
  size: '24px',
}

export default Icon;
