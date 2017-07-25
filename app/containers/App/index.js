/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Grid from 'components/Grid';
import Gallery from 'components/Gallery';
import withProgressBar from 'components/ProgressBar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
function App(props) {
  return (
    <MuiThemeProvider>
      <div>
        {React.Children.toArray(props.children)}
        <Gallery />
        <Grid />
      </div>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
