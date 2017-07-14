/**
*
* ResumeCard
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';
//import { emojiList } from 'get-emoji';
import Emoji from './Emoji';
import emojiList from './emojiList';

class EmojiPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { style, onSelect } = this.props;

    const emojiView = emojiList.map((name, i) => {
      return <Emoji key={i} name={name} onSelect={() => {
        onSelect(name)
      }} />
    });

    return (
      <div style={style}>
        {emojiView}
      </div>
    );
  }
}

EmojiPanel.propTypes = {
  style: PropTypes.object,
  onSelect: PropTypes.func,
};

export default EmojiPanel;
