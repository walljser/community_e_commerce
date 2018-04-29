import React from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Text
} from 'native-base';
import {
  getOrdersByUserId
} from '../../actions';
import Order from '../../components/Order';

@connect(
  state => ({
    userId: state.auth.user.userId,
    token: state.auth.user.token,
    orders: state.orders.orders
  }),
  dispatch => ({
    loadOrders: (userId, token) => dispatch(getOrdersByUserId(userId, token))
  })
)
export default class OrderAll extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '全部订单',
    tabBarComponent: null
  })

  componentDidMount() {
    this.fetchOrders()
  }

  fetchOrders = async () => {
    const {
      userId,
      token,
      loadOrders
    } = this.props
    await loadOrders(userId, token)
  }

  render() {
    const {
      orders,
    } = this.props
    console.log(orders)

    return (
      <Content>
        {
          orders.length !== 0 ? (
            orders.map((item) => {
              return (
                <Order
                  key={item.orderId}
                  order={item}
                />
              )
            })
          ) : null
        }
      </Content>
    )
  }
}
