import React from 'react';
import {
  StyleSheet
} from 'react-native';
import {
  View
} from 'native-base';
import Item from './Item';

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderRadius: 2
  }
})

export default class List extends React.Component {
  static Item = Item

  render() {
    const {
      children
    } = this.props

    return (
      <View style={styles.wrapper}>
        {children}
      </View>
    )
  }
}
