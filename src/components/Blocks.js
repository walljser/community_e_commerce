import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet
} from 'react-native';
import {
  View,
  Text
} from 'native-base';

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    paddingBottom: 0
  },
  title: {
    padding: 10,
    fontSize: 20
  },
  content: {
    padding: 5,
    backgroundColor: '#fff'
  }
})

export default class Blocks extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render() {
    const {
      title,
      children
    } = this.props

    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          {title}
        </Text>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    )
  }
}
