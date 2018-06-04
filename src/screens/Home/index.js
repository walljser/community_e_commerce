import React from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Button,
  Text,
  Header,
  Body,
  Title,
  View
} from 'native-base';
import { StyleSheet } from 'react-native';
import HeaderDefault from '../../components/HeaderDefault';
import { PRIMARY_COLOR } from '../../constants';
import HeaderSearchbar from '../../components/HeaderSearchbar';
import Loading from '../../components/Loading';
import ContentHeader from './ContentHeader';
import ContentRecommend from './ContentRecommend';
import {
  loadGoods,
  loadAllAddesses
} from '../../actions';

@connect(
  state => ({
    goods: state.goods.goods,
    inService: state.service.inService
  }),
  dispatch => ({
    loadGoods: () => dispatch(loadGoods(1, 16, 'sold_count desc'))
  })
)
export default class Home extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <HeaderSearchbar navigation={navigation}/>
  })

  componentDidMount() {
    const {
      userId,
      token
    } = this.props

    this.props.loadGoods()
  }



  render() {
    const {
      goods,
      inService,
      navigation
    } = this.props

    return (
      <Content
        style={{padding: 20, backgroundColor: '#fff'}}
        showsVerticalScrollIndicator={false}
      >
        <ContentHeader
          navigation={navigation}
        />
        <ContentRecommend
          goods={goods}
          navigation={navigation}
        />
      </Content>
    )
  }
}
