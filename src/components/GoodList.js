import React from 'react';
import {
  StyleSheet
} from 'react-native';
import { Content } from 'native-base';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom: 0
    // marginLeft: 10,
    // marginRight: 10
  }
})

export default class GoodList extends React.Component {
  render() {
    const {
      children,
      ...otherProps
    } = this.props

    return (
      <Content style={styles.wrapper} {...otherProps}>
        {children}
      </Content>
    )
  }
}
