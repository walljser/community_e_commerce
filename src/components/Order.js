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
  RED_COLOR_ACTIVE
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
      [0, '待发货'],
      [1, '配送中'],
      [2, '已完成'],
      [-1, '退款中']
    ])
  }

  renderBtn = (content, type) => {
    return (
      <Button
        style={{marginLeft: 'auto'}}
        light
      >
        <Text>
          {content}
        </Text>
      </Button>
    )
  }

  renderAction = () => {
    const {
      status
    } = this.props.order

    if (status === 0) {
      return this.renderBtn('提醒发货')
    } else if (status === 1) {
      return this.renderBtn('确认收货')
    } else if (status === 2) {
      return this.renderBtn('申请退款')
    } else {
      return this.renderBtn('确认收货')
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
