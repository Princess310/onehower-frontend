/**
*
* ChatTool
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import pallete from 'styles/colors';
import utils from 'utils/utils';
import { emojify } from 'react-emojione';

import FlexRow from 'components/FlexRow';
import Icon from 'components/Icon';
import EmojiPanel from 'components/EmojiPanel';
import Emoji from 'components/EmojiPanel/Emoji';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Overlay from 'material-ui/internal/Overlay';
import Paper from 'material-ui/Paper';

import oss from 'utils/oss';

const Container = styled(Paper)`
  position: relative;
  background-color: ${pallete.white};
`;

const HeaderWrapper = styled(FlexRow)`
  padding: 0 15px 0 0;
  height: 48px;
  background: #fff;
  align-items: center;
  border-bottom: 1px ${pallete.border} solid;
  justify-content: space-between;
`;

const ActionItem = styled(IconButton)`
  font-size: 24px;

  &:hover{
    cursor: pointer;
  }
`;

const FileItem = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  opacity: 0;
  font-size: 0;

  &:hover{
    cursor: pointer;
  }
`;

class ChatTool extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      showEmojiPanel: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { clearMessage } = nextProps;
    if (clearMessage) {
      this.editor.innerHTML = '';
    }
  }

  handleSendMessage = () => {
    
  }

  handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const { name, size } = file;

      const path = `${oss.getFolderPath('avatar', 1)}__${size}__${oss.getFileSuffix(name)}`;

      // upload file here
      oss.multipartUpload(path, file).then((res) => {
        const url = oss.getImgDomain(oss.getFileDomain() + oss.getFilePath(res.name));
        const img = new Image();

        img.src = oss.getImgSuitablePath(url);
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          const content = {
            type: 'pic',
            url,
            width,
            height,
            size,
          };

          this.props.sendChatMessage(content, '[图片]');
        };
      });
    }
  }

  handleShowEmoji = () => {
    this.setState({
      showEmojiPanel: !this.state.showEmojiPanel,
    });
  }

  handleSelectEmoji = (name) => {
    const { value } = this.state;

    this.setState({
      value: `${value}::${name}::`,
    });
  }

  handleChangeValue = (e) => {
    const value = e.target.value;

    this.setState({
      value,
    });
  }

  render() {
    const { showEmojiPanel, value } = this.state;
    const { disabled, style } = this.props;

    return (
      <Container style={style}>
        <HeaderWrapper>
          <FlexRow>
            <ActionItem onTouchTap={this.handleShowEmoji}>
              <Icon type={require('icons/actions/tag_faces.svg')} color={showEmojiPanel ? pallete.primary : pallete.grey} />
            </ActionItem>
            <div style={{ position: 'relative' }}>
              <FileItem type="file" accept="image/jpg,image/jpeg,image/png,image/gif" onChange={this.handleFileChange} />
              <ActionItem>
                <Icon type={require('icons/actions/insert_drive_file.svg')} color={pallete.grey} />
              </ActionItem>
            </div>
          </FlexRow>
          <FlexRow style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '12px', marginRight: '15px' }}>Leave Message ~</span>
            <RaisedButton label="发送" primary={true} onTouchTap={this.handleSendMessage} disabled={disabled} />
          </FlexRow>
        </HeaderWrapper>
        { this.state.showEmojiPanel &&
          <EmojiPanel style={{ margin: '0 8px' }} onSelect={this.handleSelectEmoji} />
        }
        <textarea
          className="chat-editor"
          value={value}
          onChange={this.handleChangeValue}
          ref={(r) => { this.editor = r; }}
        />
        {disabled &&
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: pallete.disable,
            opacity: 0.2,
            zIndex: 20,
          }}
        />
        }
      </Container>
    );
  }
}

ChatTool.propTypes = {
  sendChatMessage: PropTypes.func,
  clearMessage: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

export default ChatTool;
