import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import {
  Footer,
  View,
  Text,
  Icon,
  Button,
  Badge
} from 'native-base';
import {
  getCartByGoodId,
  addGoodToCart
} from '../../actions';
import { RED_COLOR } from '../../constants';

const styles = StyleSheet.create({
  wrapper: {
    // position: 'absolute',
    // left: 0,
    // bottom: 0,
    height: 60,
    backgroundColor: '#fff',
    padding: 15,
    paddingTop: 5
  },
  btnGroup: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row'
  }
})

@connect(
  state => ({
    isAuthorized: state.auth.isAuthorized,
    userId: state.auth.user.userId,
    token: state.auth.user.token,
    cartDetail: state.cart.cartDetail,
    isFetching: state.service.isFetching,
    posting: state.service.posting
  }),
  dispatch => ({
    getCartDetail: (userId, token, goodId) => dispatch(getCartByGoodId(userId, token, goodId)),
    addCart: (userId, token, goodId, count) => dispatch(addGoodToCart(userId, token, goodId, count))
  })
)
export default class extends React.Component {
  componentDidMount() {
    const {
      isAuthorized,
      userId,
      token,
      getCartDetail,
      goodId
    } = this.props

    if (isAuthorized) {
      getCartDetail(userId, token, goodId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.goodId !== this.props.goodId) {
      const {
        isAuthorized,
        userId,
        token,
        getCartDetail,
        goodId
      } = nextProps

      if (isAuthorized) {
        getCartDetail(userId, token, goodId)
      }
    }
  }

  handleUpdateCart = async (count) => {
    const {
      isAuthorized,
      goodId,
      navigation,
      addCart,
      userId,
      token,
      getCartDetail
    } = this.props

    if (!isAuthorized) {
      navigation.navigate('Signin', {
        from: 'GoodDetail',
        params: {
          goodId: goodId
        }
      })
    } else {
      await addCart(userId, token, goodId, count)
      await getCartDetail(userId, token, goodId)
    }
  }

  _handleGoToCart = () => {
    this.props.navigation.navigate('Cart')
  }

  render() {
    const {
      isAuthorized,
      cartDetail
    } = this.props

    return (
      <Footer style={styles.wrapper}>
        <View style={{display: 'flex', flexDirection: 'row', flex: 1}}>
          <View
            style={{
              paddingLeft: 80
            }}
          >
            <View
              style={{
                position: 'absolute',
                left: 0
              }}
            >
              <Button
                rounded
                style={{backgroundColor: '#f56c6c'}}
                onPress={this._handleGoToCart}
              >
                <Icon name="cart" />
              </Button>
            </View>
            {
              isAuthorized && cartDetail.count ? (
                <View
                  style={{
                    position: 'absolute',
                    left: 45,
                  }}
                >
                  <Badge style={{backgroundColor: '#f56c6c'}}>
                    <Text>{cartDetail.count}</Text>
                  </Badge>
                </View>
              ) : null
            }
          </View>
          <View style={styles.btnGroup}>
            <Button
              rounded
              warning
              outline
              onPress={() => this.handleUpdateCart(-1)}
              disabled={this.props.posting}
            >
              <Icon name="ios-remove" />
            </Button>
            <Button
              rounded
              onPress={() => this.handleUpdateCart(1)}
              style={{marginLeft: 15, backgroundColor: RED_COLOR}}
              disabled={this.props.posting}
            >
              <Icon name="ios-add" />
            </Button>
          </View>
        </View>
      </Footer>
    )
  }
}
