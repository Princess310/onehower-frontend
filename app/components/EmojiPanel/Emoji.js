/**
*
* Emoji
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';
import getEmoji from 'get-emoji';
import emojiList from './emojiList';

function Emoji(props) {
  const { name, onSelect, style } = props;

  if (emojiList.findIndex(e => e === name) === -1) {
    return <span>{name}</span>;
  }
  return (
    <img style={style} src={getEmoji(name)} name={name} onClick={onSelect} />
  );
}

Emoji.propTypes = {
  style: PropTypes.object,
};

Emoji.defaultProps = {
  style: {
    margin: '4px',
    width: '16px',
    height: '16px',
  },
};

export default Emoji;
