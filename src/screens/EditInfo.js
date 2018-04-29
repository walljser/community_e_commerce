import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TouchableNativeFeedback,
  Image
} from 'react-native';
import {
  View,
  Content,
  Left,
  Right,
  Text
} from 'native-base';
import { RED_COLOR_ACTIVE } from '../constants';
import List from '../components/List';

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  imageWrapper: {
    paddingLeft: 50,
    paddingRight: 50,
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: 250
  },
  imageDesc: {
    textAlign: 'center',
    padding: 10,
    fontSize: 26,
    fontWeight: '400'
  },
  actionBorder: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15
  }
})

@connect(
  state => ({
    userId: state.auth.user.userId,
    token: state.auth.user.token,
    user: state.userInfo.user
  })
)
export default class EditInfo extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '编辑个人资料',
    tabBarComponent: null
  })

  render() {
    const {
      user
    } = this.props

    return (
      <Content style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{uri: 'http://119.29.161.228/cloudimg/avatars/gre_yu@163.com.jpg'}}
          />
          <Text style={styles.imageDesc}>
            greyu
            {/* {user.nickName} */}
          </Text>
        </View>
        <TouchableNativeFeedback>
          <View style={styles.actionBorder}>
            <Text style={{textAlign: 'center', color: RED_COLOR_ACTIVE, fontSize: 18}}>
              编辑昵称
            </Text>
          </View>
        </TouchableNativeFeedback>
        <Text style={{padding: 12, textAlign: 'center', color: '#333', fontSize: 18}}>
          私人信息
        </Text>
        <List>
          <List.Item touchalbe>
            <Left>
              <Text>邮箱号</Text>
            </Left>
            <Right>
              <Text style={{color: RED_COLOR_ACTIVE}}>{user.userName}</Text>
            </Right>
          </List.Item>
          <List.Item touchalbe onPress={() => {}}>
            <Left>
              <Text>性别</Text>
            </Left>
            <Right>
              <Text style={{color: RED_COLOR_ACTIVE}}>{user.sex}</Text>
            </Right>
          </List.Item>
          <List.Item last touchalbe>
            <Left>
              <Text>电话</Text>
            </Left>
            <Right>
              <Text style={{color: RED_COLOR_ACTIVE}}>{user.phone}</Text>
            </Right>
          </List.Item>
        </List>
      </Content>
    )
  }
}
