import React from 'react';
import { connect } from 'react-redux';
import {
  ListView
} from 'react-native';
import {
  Content,
  Toast,
  Text
} from 'native-base';
import {
  getOrdersByUserId
} from '../actions';
import Order from '../components/Order';
import orderService from '../services/orderService';
import {
  ORDER_WAIT,
  ORDER_DISPATCHING,
  ORDER_FINISH,
  ORDER_REFUNDING,
  ORDER_REFUND_SUCCESS,
  ORDER_REFUNDING_FAILURE
} from '../constants';

@connect(
  state => ({
    isAuthorized: state.auth.isAuthorized,
    userId: state.auth.user.userId,
    token: state.auth.user.token,
    orders: state.orders.orders
  }),
  dispatch => ({
    loadOrders: (userId, token, status) => dispatch(getOrdersByUserId(userId, token, status))
  })
)
export default class OrderList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '订单中心',
    tabBarComponent: null
  })

  constructor(props) {
    super(props)
    this.status = new Map([
      [ORDER_WAIT, '待发货'],
      [ORDER_DISPATCHING, '配送中'],
      [ORDER_FINISH, '已完成'],
      [ORDER_REFUNDING, '退款中'],
      [ORDER_REFUND_SUCCESS, '退款成功'],
      [ORDER_REFUNDING_FAILURE, '退款失败']
    ])
  }

  componentWillMount() {
    if (!this.props.isAuthorized) {
      this._showToast('请先登录', 'danger')
      this.props.navigation.navigate('Signin', { from: 'Cart'} )
    } else {
      if (this.props.navigation.state.params && this.props.navigation.state.params.status !== null) {
        this.fetchOrders(this.props.navigation.state.params.status)
      } else {
        this.fetchOrders()
      }
    }
  }

  _showToast = (text, type = "warning") => {
    Toast.show({
      text,
      type,
      position: 'top'
    })
  }

  handleRefund = async (orderId) => {
    const {
      userId,
      token
    } = this.props

    await orderService.remove(userId, token, orderId)

    await this.fetchOrders()
  }

  fetchOrders = async (status) => {
    const {
      userId,
      token,
      loadOrders
    } = this.props

    await loadOrders(userId, token, status)
  }

  renderRow = (rowData, sectionId, rowId) => {
    return (
      <Order
        key={rowData.orderId}
        order={rowData}
        handleRefund={this.handleRefund}
      />
    )
  }

  render() {
    const {
      orders,
    } = this.props

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.orderId != r2.orderId
    })

    return (
      <Content>
        <ListView
          initialListSize={2}
          dataSource={ds.cloneWithRows(orders)}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />
      </Content>
    )
  }
}
