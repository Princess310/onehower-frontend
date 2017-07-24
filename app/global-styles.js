import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    user-select: none;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .video-js {
    width: 100% !important;
    height: 100% !important;
  }
  

  .chat-editor {
    height: 104px;
    width: 100%;
    padding: 15px;
    overflow-y: scroll;
  }

  .chat-editor:focus {
    outline: transparent;
  }

  .chat-editor:hover {
    cursor: text;
  }

  .h-cursor-pointer:hover {
    cursor: pointer;
  }

  .grid-system{
    z-index:9999;
    .grid-canvas{
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 9998;
      display: none;
    }
    .toggle-grid{
      position: absolute;
      right: 15px;
      bottom: 12px;
      top:auto;
      width:20px;
      height:20px;
      font-size:20px;
      opacity: .2;
      z-index: 9999;
    }
  }

  ::-webkit-scrollbar{width:2px;height:2px}
  ::-webkit-scrollbar-button:vertical{display:none}
  ::-webkit-scrollbar-track:vertical{background-color:transparent;}
  ::-webkit-scrollbar-track-piece{background-color:transparent;}
  ::-webkit-scrollbar-thumb:vertical{background-color:#00BCD4;border-radius:2px}
  ::-webkit-scrollbar-thumb:vertical:hover,
  ::-webkit-scrollbar-thumb:vertical:active {background-color: #00ACC1}
`;
