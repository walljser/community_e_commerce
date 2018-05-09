import React from 'React';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Icon,
  Button,
  Grid,
  Col
} from 'native-base';
import {
  RED_COLOR
} from '../../constants';
import Loading from '../../components/Loading';
import FooterCart from './FooterCart';
import { getOneGood } from '../../actions';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#efeff4',
    display: 'flex',
    flexDirection: 'column'
  },
  image: {
    height: 300
  },
  titleWrapper: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#efeff4',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center'
  },
  titleActive: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: RED_COLOR
  },
  desc: {
    backgroundColor: '#fff',
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#efeff4'
  },
  descBorderWrapper: {
    borderLeftWidth: 1,
    // borderRightWidth: 1,
    borderColor: '#efeff4'
  },
  descTitle: {
    textAlign: 'center'
  },
  descContent: {
    textAlign: 'center',
    color: '#999'
  },
  list: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 30
    // borderTopWidth: 30,
    // borderColor: '#efeff4'
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#efeff4'
  }
})

@connect(
  state => ({
    good: state.goods.good,
    inService: state.service.inService
  }),
  dispatch => ({
    getGood: (goodId) => dispatch(getOneGood(goodId))
  })
)
export default class extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '商品详情'
  })

  componentWillMount() {
    this.props.getGood(this.props.navigation.state.params.goodId)
  }

  render() {
    const {
      good,
      inService
    } = this.props

    const categoryName = good ? (
      good.category ? good.category.categoryName : ""
    ) : ""

    return (
      <Container style={styles.wrapper}>
        <ScrollView>
          {
            !inService ? (
              <View style={{flex: 1}}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{uri: good.image}}
                />
                <View style={styles.titleWrapper}>
                  <Text style={styles.title} numberOfLines={2}>{good.goodName}</Text>
                  <Text style={styles.titleActive}>￥{good.price}</Text>
                </View>
                <Grid style={styles.desc}>
                  <Col style={styles.descBorderWrapper}>
                    <Text style={styles.descTitle}>产地</Text>
                    <Text style={styles.descContent}>{good.origin}</Text>
                  </Col>
                  <Col style={styles.descBorderWrapper}>
                    <Text style={styles.descTitle}>规格</Text>
                    <Text style={styles.descContent}>{good.spec}</Text>
                  </Col>
                  <Col style={styles.descBorderWrapper}>
                    <Text style={styles.descTitle}>分类</Text>
                    <Text style={styles.descContent}>{categoryName}</Text>
                  </Col>
                </Grid>
                <View style={styles.list}>
                  <View style={styles.listItem}>
                    <Text style={{fontSize: 20, color: '#333', textAlign: 'center'}}>库存: {good.inventory} 件</Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={{fontSize: 20, color: '#333', textAlign: 'center'}}>销量: {good.soldCount} 件</Text>
                  </View>
                </View>
              </View>
            ) : (
              <Loading />
            )
          }
        </ScrollView>
        <FooterCart
          goodId={good.goodId}
          navigation={this.props.navigation}
        />
      </Container>
    )
  }
}
