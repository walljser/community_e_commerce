import React from 'react';
import {
  Image,
  TouchableNativeFeedback,
  StyleSheet
} from 'react-native';
import {
  Container,
  Content,
  Footer,
  Button,
  View,
  Text,
  Icon,
  Input,
  List,
  ListItem,
  Left,
  Body,
  Right
} from 'native-base';
import { RED_COLOR } from '../../constants';
import StyleDivider from '../../components/StyleDivider';
import AddressHeader from './AddressHeader';
import GoodList from '../../components/GoodList';

const styles = StyleSheet.create({
  footer: {
    height: 50,
    alignItems: 'center',
    backgroundColor: RED_COLOR
  },
  footerContent: {
    color: '#fff',
    fontSize: 18
  }
})

export default class CreateOrder extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '确认订单',
    tabBarComponent: null
  })

  handleAddressClick = () => {

  }

  render() {
    return (
      <Container style={{height: 1000}}>
        <Content>
          <TouchableNativeFeedback>
            <AddressHeader
              onPress={this.handleAddressClick}
            />
          </TouchableNativeFeedback>
          <StyleDivider />
          <GoodList>
            <View style={{flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#efeff4', marginTop: 10}}>
              <View style={{width: 120}}>
                <Image
                  style={{height: 110, width: 110}}
                  resizeMode="cover"
                  source={{uri: 'http://119.29.161.228/cloudimg/goods/1524159475685.png'}}
                />
              </View>
              <View style={{flex: 1}}>
                <Text numberOfLines={2} style={{fontSize: 20}}>
                  澳洲牛肉块
                </Text>
                <View style={{paddingBottom: 8, paddingTop: 12}}>
                  <Text style={{fontSize: 16, color: '#888'}}>
                    商品分类：禽鱼肉类
                  </Text>
                </View>
                <Text style={{color: '#ff5a5f', fontSize: 18}}>
                  ￥ 43.90 元
                </Text>
              </View>
              <View style={{width: 40, alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom: 20, paddingRight: 15}}>
                <Text>× 4</Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#efeff4', marginTop: 10}}>
              <View style={{width: 120}}>
                <Image
                  style={{height: 110, width: 110}}
                  resizeMode="cover"
                  source={{uri: 'http://119.29.161.228/cloudimg/goods/1524191924873.png'}}
                />
              </View>
              <View style={{flex: 1}}>
                <Text numberOfLines={2} style={{fontSize: 20}}>
                  彩食鲜咖喱果
                </Text>
                <View style={{paddingBottom: 8, paddingTop: 12}}>
                  <Text style={{fontSize: 16, color: '#888'}}>
                    商品分类：精品水果
                  </Text>
                </View>
                <Text style={{color: '#ff5a5f', fontSize: 18}}>
                  ￥ 9.90 元
                </Text>
              </View>
              <View style={{width: 40, alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom: 20, paddingRight: 15}}>
                <Text>× 2</Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#efeff4', marginTop: 10}}>
              <View style={{width: 120}}>
                <Image
                  style={{height: 110, width: 110}}
                  resizeMode="cover"
                  source={{uri: 'http://119.29.161.228/cloudimg/goods/1524192749663.png'}}
                />
              </View>
              <View style={{flex: 1}}>
                <Text numberOfLines={2} style={{fontSize: 20}}>
                  特特香蕉
                </Text>
                <View style={{paddingBottom: 8, paddingTop: 12}}>
                  <Text style={{fontSize: 16, color: '#888'}}>
                    商品分类：精品水果
                  </Text>
                </View>
                <Text style={{color: '#ff5a5f', fontSize: 18}}>
                  ￥ 7.79 元
                </Text>
              </View>
              <View style={{width: 40, alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom: 20, paddingRight: 15}}>
                <Text>× 3</Text>
              </View>
            </View>
          </GoodList>
          <List style={{backgroundColor: '#fff', marginTop: 20}}>
            <ListItem icon>
              <Body>
                <Text>配送方式</Text>
              </Body>
              <Right>
                <Text>快递免邮费</Text>
                <Icon name="ios-arrow-forward-outline" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Body>
                <Text>退货须知</Text>
              </Body>
              <Right>
                <Icon name="ios-information-circle-outline" fontSize="30" />
              </Right>
            </ListItem>
            <ListItem>
              <Text>
                买家留言
              </Text>
              <Input placeholder="选填留言" />
            </ListItem>
          </List>
          <View style={{height: 500, flexDirection: 'column'}}>
            <View style={{marginTop: 'auto', padding: 10}}>
              <Text style={{color: '#999', textAlign: 'center'}}>我们是有底线的</Text>
            </View>
          </View>
        </Content>
        <Footer style={styles.footer}>
          <Text style={styles.footerContent}>
            提交订单
          </Text>
        </Footer>
      </Container>
    )
  }
}
