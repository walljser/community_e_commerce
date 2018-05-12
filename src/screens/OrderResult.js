import React from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Text,
  View,
  Button
} from 'native-base';

@connect(
  state => ({
    postError: state.orders.postError,
    isPosting: state.orders.isPosting
  })
)
export default class OrderResult extends React.Component {
  render() {
    return (
      <Content>
      </Content>
    )
  }
}
