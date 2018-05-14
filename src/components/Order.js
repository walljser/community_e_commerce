import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet
} from 'react-native';
import {
  View,
  Button,
  Text
} from 'native-base';
import {
  RED_COLOR_ACTIVE, ORDER_FINISH, ORDER_REFUNDING_FAILURE, ORDER_REFUNDING, ORDER_DISPATCHING, ORDER_WAIT, ORDER_REFUND_SUCCESS
} from '../constants';
import {
  dateFormat
} from '../utils/index'
import ImageRow from './ImageRow';

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 5,
    marginBottom: 5
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 10,
  },
  headerRight: {
    marginLeft: 'auto'
  },
  content: {
    // paddingLeft: 10,
    // paddingRight: 10
  },
  footer: {
    padding: 10,
    backgroundColor: '#fff'
  },
  footerAction: {
    marginTop: 10,
    marginBottom: 5
  }
})

export default class Order extends React.Component {
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

  handleRefund = () => {
    const {
      order
    } = this.props

    this.props.handleRefund(order.orderId)
  }

  renderAction = () => {
    const {
      status
    } = this.props.order

    if (status === ORDER_REFUNDING ||
      status === ORDER_REFUND_SUCCESS) {
        return null
    } else {
      return (
        <Button
          style={{marginLeft: 'auto'}}
          light
          onPress={this.handleRefund}
        >
          <Text>申请退款</Text>
        </Button>
      )
    }
  }

  render() {
    const {
      order
    } = this.props

    const statusContent = this.status.get(order.status)
    const orderDetails = order.orderDetails
    let count = 0
    const actionNode = this.renderAction()

    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text>
            {dateFormat(new Date(order.createTime), 'yyyy-MM-dd hh:ss')}
          </Text>
          <View style={styles.headerRight}>
            <Text style={{color: RED_COLOR_ACTIVE}}>
              {statusContent}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          {
            orderDetails.length !== 0 ? (
              orderDetails.map((item, index) => {
                count += item.count
                return (
                  <ImageRow
                    key={item.orderDetailId}
                    data={item.good}
                    number={item.count}
                  />
                )
              })
            ) : null
          }
        </View>
        <View style={styles.footer}>
          <Text style={{textAlign: 'right'}}>
            共{count}件商品  合计: ￥ {order.amount.toFixed(2)}
          </Text>
          <View style={styles.footerAction}>
            <View style={{flex: 1}}>
            </View>
            {actionNode}
          </View>
        </View>
      </View>
    )
  }
}
