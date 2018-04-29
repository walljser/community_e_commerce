import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableNativeFeedback,
  StyleSheet
} from 'react-native';
import {
  View
} from 'native-base';
import { BORDER_COLOR } from '../../constants';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR
  },
  last: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 0
  }
})

function Item(props) {
  const {
    children,
    touchable,
    last,
    ...others
  } = props

  if (touchable) {
    return(
      <TouchableNativeFeedback {...others}>
        <View style={last ? styles.last : styles.wrapper}>
          {children}
        </View>
      </TouchableNativeFeedback>
    )
  } else {
    return(
      <View style={last ? styles.last : styles.wrapper}>
        {children}
      </View>
    )
  }
}

Item.propTypes = {
  last: PropTypes.bool,
  touchable: PropTypes.bool
}

export default Item
