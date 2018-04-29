import React from 'react';
import PropTypes from 'prop-types';
import {
  Content
} from 'native-base';
import Header from './Header';

export default class extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: (
      <Header navigation={navigation} />
    )
  })

  render() {
    return (
      <Content>
      </Content>
    )
  }
}
