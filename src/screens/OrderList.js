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
    title: '全部订单',
    tabBarComponent: null
  })

  componentWillMount() {
    if (!this.props.isAuthorized) {
      this._showToast('请先登录', 'danger')
      this.props.navigation.navigate('Signin', { from: 'Cart'} )
    } else {
      if (this.props.navigation.state.params && this.props.navigation.state.params.status) {
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
