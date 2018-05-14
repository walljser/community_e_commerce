import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  TouchableNativeFeedback,
  StyleSheet,
  ListView
} from 'react-native';
import {
  Toast,
  CheckBox,
  Text,
  Button,
  Container,
  Footer,
  Icon,
  View
} from 'native-base';
import {
  getCart,
  addGoodToCart
} from '../actions';
import { RED_COLOR } from '../constants';
import HeaderDefault from '../components/HeaderDefault';
import Loading from '../components/Loading';
import CartItem from '../components/CartItem';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f3f4f6'
  },
  footer: {
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20
  },
  footerFirstItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  footerSecondItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  submitBtn: {
    marginTop: 5,
    backgroundColor: RED_COLOR,
    marginLeft: 'auto'
  },
  content: {
    padding: 10,
    backgroundColor: '#f3f4f6'
  },
  contentHeader: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderColor: '#f3f4f6'
  },
  contentHeaderText: {
    textAlign: 'left',
    alignSelf: 'center',
    marginLeft: 15
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  }
})

/**
 * 购物车页面, 使用了listView进行更改购物车内容，局部刷新
 *
 * @export
 * @class
 * @author gre_yu@163.com
 * @extends {React.Component}
 */
@connect(
  state => ({
    cart: state.cart.cart,
    userId: state.auth.user.userId,
    token: state.auth.user.token,
    isAuthorized: state.auth.isAuthorized,
    isFetchingCart: state.cart.isFetchingCart,
    receiveAt: state.cart.receiveAt
  }),
  dispatch => ({
    getCart: (userId) => dispatch(getCart(userId)),
    addCart: (userId, token, goodId, count) => dispatch(addGoodToCart(userId, token, goodId, count))
  })
)
export default class Cart extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <HeaderDefault title="购物车" />
  })

  state = {
    cartChecked: false,
    cartState: [],
    totalNum: 0,
    amount: 0
  }

  componentWillMount() {
    if (!this.props.isAuthorized) {
      this._showToast('请先登录', 'danger')
      this.props.navigation.navigate('Signin', { from: 'Cart'} )
    } else {
      this.props.getCart(this.props.userId)
    }
  }

  componentDidMount() {
    if (!this.props.isAuthorized) {
      this._showToast('请先登录', 'danger')
      this.props.navigation.navigate('Signin', { from: 'Cart'} )
    } else {
      this.props.getCart(this.props.userId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props.cart) {
      const {
        cart
      } = nextProps
      const goods = cart.goods ? cart.goods : []

      let cartState = []
      goods.map((item) => {
        cartState = cartState.concat(Object.assign({}, item, { checked: false }))
      })

      this.setState({
        cartState
      })
    }
  }

  _showToast = (text, type = "warning") => {
    Toast.show({
      text,
      type,
      position: 'top'
    })
  }

  _handleSignin = () => {
    this.props.navigation.navigate('Signin')
  }

  _handleCartItemCheckChange = (value, id) => {
    let {
      totalNum,
      cartState,
      cartChecked,
      amount
    } = this.state
    let exist = false

    // 原值为false， 为要加入购物车
    if (value.checked === false) {
      totalNum = totalNum + value.count
      amount = amount + value.count * 1.0 * value.good.price
    } else {
      totalNum -= value.count
      amount -= value.count * 1.0 * value.good.price
    }

    // 更新购物车物品是否选中
    const indexOf = cartState.findIndex(v => v.cartDetailId === value.cartDetailId)
    cartState[indexOf] = Object.assign({}, cartState[indexOf], { checked: !cartState[indexOf].checked} )

    for (let i = 0; i < cartState.length; i++) {
      if (cartState[i].checked === false) {
        exist = true
      }
    }

    if (exist === false) {
      cartChecked = true
    } else {
      cartChecked = false
    }

    this.setState({
      cartChecked,
      cartState,
      totalNum,
      amount
    })
  }

  _handleSelectAll = () => {
    let {
      cartState,
      cartChecked
    } = this.state

    let totalNum = 0
    let amount = 0

    // 原值为false， 动作为： 全选购物车商品
    if (!cartChecked) {
      cartState = cartState.map((item) => {
        totalNum += item.count
        amount += item.count * 1.0 * item.good.price
        return Object.assign({}, item, { checked: true })
      })
    } else {
      cartState = cartState.map((item) => {
        return Object.assign({}, item, { checked: false })
      })
    }

    this.setState({
      totalNum,
      amount,
      cartState,
      cartChecked: !this.state.cartChecked
    })
  }

  _handleGoodDelete = async (value) => {
    const {
      isAuthorized,
      userId,
      token
    } = this.props

    if (isAuthorized) {
      await this.props.addCart(userId, token, value.good.goodId, -value.count)
      let cartState = this.state.cartState
      let totalNum = 0, amount = 0

      for (let i = 0; i < cartState.length ; i++) {
        if (cartState[i].cartDetailId === value.cartDetailId) {
          cartState.splice(i, 1)
          continue;
        }

        if (cartState[i].checked === true) {
          totalNum += cartState[i].count
          amount += cartState[i].amount * cartState[i].count
        }
      }


      this.setState({
        cartState,
        amount,
        totalNum
      })
    }
  }

  /**
   * 商品数量加减
   *
   */
  _handleGoodCountChange = async (value, count) => {
    const {
      isAuthorized,
      userId,
      token
    } = this.props

    if (isAuthorized) {
      let cartState = this.state.cartState

      if (count >= 0) {
        await this.props.addCart(userId, token, value.good.goodId, 1)
        cartStata = cartState.map((item) => {
          if (item.cartDetailId === value.cartDetailId) {
            item.count += 1
            return item
          }

          return item
        })
      } else {
        await this.props.addCart(userId, token, value.good.goodId, -1)

        for (let i = 0; i < cartState.length ; i++) {
          if (cartState[i].cartDetailId === value.cartDetailId) {
            cartState[i].count -= 1

            if (cartState[i].count <= 0) {
              cartState.splice(i, 1)
            }
          }
        }
      }

      let totalNum = 0
      let amount = 0

      cartState.map((item) => {
        if (item.checked === true) {
          totalNum += item.count
          amount += item.count * 1.0 * item.good.price
        }
      })

      this.setState({
        cartState,
        totalNum,
        amount
      })
    }
  }

  /**
   * ListView   row渲染
   *
   */
  _renderList = (rowData, sectionId, rowId) => {
    return (
      <CartItem
        cart={rowData}
        key={rowId}
        handleChange={this._handleCartItemCheckChange}
        handleCountChange={this._handleGoodCountChange}
        handleDelete={this._handleGoodDelete}
        checked={rowData.checked}
      />
    )
  }

  _handleOrder = () => {
    const {
      cartState
    } = this.state

    let currentChecked = []
    currentChecked = cartState.filter((item) => {
      if (item.checked) {
        return true
      } else {
        return false
      }
    })

    if (currentChecked.length === 0) {
      this._showToast('请选择您要购买的商品')
      return
    }

    this.props.navigation.navigate('CreateOrder', {
      currentChecked: currentChecked
    })
  }

  render() {
    const {
      isAuthorized,
      cart
    } = this.props

    const {
      totalNum,
      amount,
      cartChecked,
      cartState
    } = this.state

    const goods = cart.goods ? cart.goods : []

    const ds = new ListView.DataSource({
      // 局部刷新规则
      rowHasChanged: (r1, r2) => {
        if (r1.count !== r2.count) {
          return true
        }

        if (r1.goodId !== r2.goodId) {
          return true
        }

        if (r1.checked !== r2.checked) {
          return true
        }

        return false
      }
    })
    const dataSource = ds.cloneWithRows(cartState)

    return (
      <Container style={styles.wrapper}>
        <ScrollView style={styles.content}>
          {
            !isAuthorized ? (
              <View style={{display: 'flex'}}>
                <Button
                  block
                  style={{backgroundColor: RED_COLOR}}
                  onPress={this._handleSignin}
                >
                  <Text>请先登录</Text>
                </Button>
              </View>
            ) : (
              <View>
                <View style={styles.contentHeader}>
                  <CheckBox checked={cartChecked} color={RED_COLOR} onPress={this._handleSelectAll}/>
                  <TouchableNativeFeedback onPress={this._handleSelectAll}>
                    <Text style={styles.contentHeaderText}>
                      精品云生活 次日达
                    </Text>
                  </TouchableNativeFeedback>
                </View>
                {/* 通过listView实现局部刷新 */}
                <ListView
                  dataSource={dataSource}
                  renderRow={this._renderList}
                  enableEmptySections={true}
                />
              </View>
            )
          }
        </ScrollView>
        <Footer style={styles.footer}>
          <View style={{display: 'flex', flexDirection: 'row', flex: 1}}>
            <View style={styles.footerFirstItem}>
              <Text>商品合计： ￥ {amount.toFixed(2)}</Text>
              <Text>商品件数: {totalNum}</Text>
            </View>
            <View style={styles.footerSecondItem}>
              <Button
                style={styles.submitBtn}
                onPress={this._handleOrder}
              >
                <Text>去结算</Text>
              </Button>
            </View>
          </View>
        </Footer>
      </Container>
    )
  }
}
