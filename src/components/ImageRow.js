import React from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';
import {
  View,
  Text
} from 'native-base'
import { RED_COLOR_ACTIVE } from '../constants';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderColor: '#fff',
  },
  imageWrapper: {
    width: 100
  },
  image: {
    height: 90,
    width: 90
  },
  textActive: {
    textAlign: 'right',
    fontSize: 15,
    color: RED_COLOR_ACTIVE
  },
  textLine: {
    textAlign: 'right',
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through'
  },
  textDefault: {
    textAlign: 'right',
    fontSize: 14,
    color: '#888'
  }
})

export default class GoodList extends React.Component {
  render() {
    const {
      data,
      number
    } = this.props

    return (
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{uri: 'http://119.29.161.228/cloudimg/goods/'+ data.image}}
          />
        </View>
        <View style={{flex: 1}}>
          <Text numberOfLines={2} style={{fontSize: 16}}>
            {data.goodName}
          </Text>
          <View style={{paddingBottom: 8, paddingTop: 8}}>
            <Text style={{fontSize: 15, color: '#888'}}>
              {
                data.category || '商品分类：禽鱼肉类'
              }
            </Text>
          </View>
        </View>
        <View style={{width: 80}}>
          <Text style={styles.textActive}>￥ {data.price}</Text>
          <Text style={styles.textLine}>￥ {data.originalPrice}</Text>
          <Text style={styles.textDefault}>× {number}</Text>
        </View>
      </View>
    )
  }
}
