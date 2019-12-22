import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const TAPS_LIMIT = 10;
const TIMEOUT = 5000; // milli secs

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class TapsCounter extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      taps: 0,
    };
    this.timer = null;
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handlePress() {
    const { onTapsReached } = this.props;
    const { taps } = this.state;

    this.setState(prevState => ({ taps: prevState.taps + 1 }));

    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.setState({ taps: 0 });
        this.timer = null;
      }, TIMEOUT);
    }

    if (taps === TAPS_LIMIT) {
      onTapsReached();
    }
  }

  render() {
    const { children } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => { this.handlePress(); }}>
        {children}
      </TouchableWithoutFeedback>
    );
  }
}

TapsCounter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onTapsReached: PropTypes.func,
};

TapsCounter.defaultProps = {
  onTapsReached: () => {},
};

export default TapsCounter;
