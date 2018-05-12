import React from 'react';
import {
  StyleSheet
} from 'react-native';
import {
  View,
  Text,
  Icon
} from 'native-base';

const styles = StyleSheet.create({
  address: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 10
  },
  addressIcon: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addressIconRight: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addressContent: {
    flex: 1,
    flexDirection: 'column'
  },
  addressContentHeader: {
    flexDirection: 'row',
    marginBottom: 8
  },
  headerLeft: {

  },
  headerRight: {
    flex: 1,
  }
})

function AddressHeader(props) {
  const {
    address
  } = props

  return (
    <View style={styles.address} {...props}>
      <View style={styles.addressIcon}>
        <Text style={{textAlign: 'center', display: 'flex'}}>
          <Icon name="ios-pin-outline" style={{alignSelf: 'center'}} />
        </Text>
      </View>
      <View style={styles.addressContent}>
        <View style={styles.addressContentHeader}>
          <View>
            <Text>{address.consignee}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={{textAlign: 'right'}}>{address.phone}</Text>
          </View>
        </View>
        <View>
          <Text numberOfLines={2} style={{color: '#666'}}>
            收货地址：{address.city + address.address + address.streetNumber}
          </Text>
        </View>
      </View>
      <View style={styles.addressIconRight}>
        <Text style={{textAlign: 'center', display: 'flex'}}>
          <Icon name="ios-arrow-forward-outline" style={{alignSelf: 'center'}} />
        </Text>
      </View>
    </View>
  )
}

export default AddressHeader
