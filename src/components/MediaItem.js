import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';
import { Card } from 'react-native-elements';
import {
  Content,
  Text,
  H2,
  Grid,
  Col
} from 'native-base';
import { RED_COLOR } from '../constants';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  mediaItem: {
  },
  image: {
    height: 120,
    marginBottom: 10,
    borderRadius: 4
  },
  desc: {
    color: '#324',
    fontSize: 12,
    paddingTop: 5
  },
  title: {
    // paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#efeff4',
    // marginBottom: 10,
    paddingTop: 4,
    overflow: 'hidden',
    fontWeight: '500'
  },
  content: {
    paddingTop: 4,
    color: '#666',
    fontSize: 14,
    color: RED_COLOR
  },
  deleteContent: {
    paddingTop: 4,
    color: '#666',
    fontSize: 12,
    textDecorationLine: 'line-through'
  }
})

export default class extends React.Component {
  static propTypes = {
    good: PropTypes.object
  }

  handleClick = () => {
    alert(this.props.good.goodId)
  }

  render() {
    const {
      good
    } = this.props

    return (
      <View style={styles.wrapper} >
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{uri: good.image}}
        />
        <Text style={styles.desc}>产地：{good.origin}</Text>
        <Text style={styles.title} numberOfLines={2} selectable>{good.goodName}</Text>
        <Text style={styles.deleteContent}>￥ {good.originalPrice} 每件</Text>
        <Text style={styles.content}>￥ {good.price} 每件</Text>
      </View>
    )
  }
}
