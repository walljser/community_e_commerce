import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  StyleSheet
} from 'react-native';
import {
  Content,
  Button,
  View,
  Text,
  Grid,
  Col,
  Spinner
} from 'native-base';
import {
  Card,
  ListItem,
  Overlay
} from 'react-native-elements';
import HeaderSearchbar from '../../components/HeaderSearchbar';
import {
  search
} from '../../actions';
import { RED_COLOR } from '../../constants';

const styles = {
  desc: {
    display: 'flex',
    alignItems: 'center',
    height: 40
  },
  descFirst: {
    fontSize: 18
  },
  descSecond: {
    fontSize: 16,
  },
  originalPrice: {
    fontSize: 18,
    textDecorationLine: 'line-through'
  },
  buyBtn: {
    marginTop: 10,
    backgroundColor: RED_COLOR
  },
  notFound: {
    display: 'flex',
    height: 500,
    alignItems: 'center'
  }
}

@connect(
  state => ({
    inService: state.service.inService,
    goods: state.goods.searchs
  }),
  dispatch => ({
    searchGoods: (good) => dispatch(search(1, 10, good))
  })
)
export default class extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: (
      <HeaderSearchbar back navigation={navigation}/>
    )
  })

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.searchGoods(this.props.navigation.state.params.good)
  }

  handleClick = (good) => {
    this.props.navigation.navigate('GoodDetail', {
      goodId: good.goodId
    })
  }

  renderNotFound() {
    const {
      goods,
      inService
    } = this.props

    if (goods.length === 0 && !inService) {
      return (
        <View style={styles.notFound}>
          <Text style={{textAlign: 'center'}}>没有找到您想要的</Text>
        </View>
      )
    } else {
      return null
    }
  }

  render() {
    const {
      goods,
      inService
    } = this.props

    const notFound = this.renderNotFound()

    return (
      <Content padder style={{paddingBottom: 40}}>
        {
          inService ? (
            <View style={{display: 'flex', height: 300, alignItems: 'center'}}>
              <Spinner color="blue" />
            </View>
          ) : null
        }
        {notFound}
        {
          goods.length > 0 ? (
            goods.map((item, id) => {
              return (
                <Card title={item.goodName} key={id} >
                  <View>
                    <Image
                      style={{height: 260}}
                      resizeMode="cover"
                      source={{uri: item.image}}
                    />
                    <Grid style={styles.desc}>
                      <Col>
                        <Text style={styles.originalPrice}>原价: {item.originalPrice} 元</Text>
                      </Col>
                      <Col>
                        <Text style={styles.descSecond}>
                          库存: {item.inventory} 件
                        </Text>
                      </Col>
                    </Grid>
                    <Grid style={styles.desc}>
                      <Col>
                        <Text style={styles.descFirst}>规格：{item.spec} </Text>
                      </Col>
                      <Col>
                        <Text style={styles.descSecond}>
                          产地: {item.origin}
                        </Text>
                      </Col>
                    </Grid>
                    <Button
                      style={styles.buyBtn}
                      block
                      onPress={() => this.handleClick(item)}
                    >
                      <Text>￥ {item.price}</Text>
                    </Button>
                  </View>
                </Card>
              )
            })
          ) : null
        }
      </Content>
    )
  }
}
