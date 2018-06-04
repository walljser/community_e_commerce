import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  TouchableNativeFeedback,
  StyleSheet
} from 'react-native';
import {
  Container,
  Content,
  Footer,
  Button,
  View,
  Text,
  Icon,
  Input,
  List,
  ListItem,
  Left,
  Body,
  Toast,
  Right
} from 'native-base';
import { RED_COLOR, IMAGE_URL } from '../../constants';
import StyleDivider from '../../components/StyleDivider';
import AddressHeader from './AddressHeader';
import GoodList from '../../components/GoodList';
import {
  loadAllAddesses,
  createOrder
} from '../../actions';

const styles = StyleSheet.create({
  footer: {
    height: 50,
    alignItems: 'center',
    backgroundColor: RED_COLOR
  },
  footerContent: {
    color: '#fff',
    fontSize: 18
  }
})

@connect(
  state => ({
    userId: state.auth.user.userId,
    token: state.auth.user.token,
    addresses: state.address.addresses,
    isPosting: state.orders.isPosting,
    postError: state.orders.postError
  }),
  dispatch => ({
    fetchAddress: (userId, token) => dispatch(loadAllAddesses(userId, token)),
    createOrder: (userId, token, addressId, remarks, cartDetailIds) => {
      dispatch(createOrder(userId, token, addressId, remarks, cartDetailIds))
    }
  })
)
export default class CreateOrder extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '确认订单',
    tabBarComponent: null
  })

  state = {
    remarks: ''
  }

  // componentDidMount() {
    // this.fetchAddress()
  // }

  fetchAddress = async () => {
    const {
      userId,
      token
    } = this.props

    this.props.fetchAddress(userId, token)
  }

  handleAddressClick = () => {
    this.props.navigation.navigate('Address', {
      backToHome: false
    })
  }

  createOrder = () => {
    const {
      navigation,
      userId,
      token
    } = this.props
    const remarks = this.state.remarks
    const address = this.getDefaultAddress()
    const currentChecked = navigation.state.params.currentChecked
    const cartDetailIds = currentChecked.map((item) => {
      return item.cartDetailId
    })

    this.props.createOrder(userId, token, address.addressId, remarks, cartDetailIds)

    navigation.navigate('OrderResult')
  }

  handleOrder = () => {
    this.createOrder()
  }

  getDefaultAddress = () => {
    const addresses = this.props.addresses
    if (addresses.length <= 0) {
      return null
    }
    let address
    for (let i = 0; i< addresses.length; i++) {
      if (addresses[i].isDefault) {
        address = addresses[i]
        break
      }
    }
    return address
  }

  render() {
    const {
      navigation,
      addresses
    } = this.props

    const currentChecked = navigation.state.params.currentChecked

    const address = this.getDefaultAddress()

    return (
      <Container style={{height: 1000}}>
        <Content>
          <TouchableNativeFeedback onPress={this.handleAddressClick}>
            <AddressHeader
              address={address}
            />
          </TouchableNativeFeedback>
          <StyleDivider />
          <GoodList>
            {
              currentChecked.length > 0 ? (
                currentChecked.map((cartDetail) => {
                  return (
                    <View
                      style={{flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#efeff4', marginTop: 10}}
                      key={cartDetail.cartDetailId}
                    >
                      <View style={{width: 120}}>
                        <Image
                          style={{height: 110, width: 110}}
                          resizeMode="cover"
                          source={{uri: IMAGE_URL + cartDetail.good.image}}
                        />
                      </View>
                      <View style={{flex: 1}}>
                        <Text numberOfLines={2} style={{fontSize: 20}}>
                          {cartDetail.good.goodName}
                        </Text>
                        <View style={{paddingBottom: 8, paddingTop: 12}}>
                          <Text style={{fontSize: 16, color: '#888'}}>
                            商品规格：{cartDetail.good.spec}
                          </Text>
                        </View>
                        <Text style={{color: '#ff5a5f', fontSize: 18}}>
                          ￥ {cartDetail.good.price} 元
                        </Text>
                      </View>
                      <View style={{width: 40, alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom: 20, paddingRight: 15}}>
                        <Text>× {cartDetail.count}</Text>
                      </View>
                    </View>
                  )
                })
              ) : null
            }
          </GoodList>
          <List style={{backgroundColor: '#fff', marginTop: 20}}>
            <ListItem icon>
              <Body>
                <Text>配送方式</Text>
              </Body>
              <Right>
                <Text>快递免邮费</Text>
                <Icon name="ios-arrow-forward-outline" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Body>
                <Text>退货须知</Text>
              </Body>
              <Right>
                <Icon name="ios-information-circle-outline" fontSize="30" />
              </Right>
            </ListItem>
            <ListItem>
              <Text>
                买家留言
              </Text>
              <Input placeholder="选填留言" onChangeText={(text) => this.setState({remarks: text})} />
            </ListItem>
          </List>
          <View style={{height: 500, flexDirection: 'column'}}>
            <View style={{marginTop: 'auto', padding: 10}}>
              <Text style={{color: '#999', textAlign: 'center'}}>我们是有底线的</Text>
            </View>
          </View>
        </Content>
        <TouchableNativeFeedback onPress={this.handleOrder}>
          <Footer style={styles.footer}>
            <Text style={styles.footerContent}>
              提交订单
            </Text>
          </Footer>
        </TouchableNativeFeedback>
      </Container>
    )
  }
}
