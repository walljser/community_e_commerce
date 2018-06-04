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
  Item,
  Input,
  Icon,
  CheckBox,
  Toast,
  Text
} from 'native-base';
import {
  Overlay
} from 'react-native-elements';
import {
  editUserInfo
} from '../actions';
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
  },
  actionBorderLast: {
    marginTop: 20,
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
    user: state.userInfo.user,
    errorMessage: state.userInfo.errorMessage
  }),
  dispatch => ({
    editInfo: (userId, token, user) => dispatch(editUserInfo(userId, token, user))
  })
)
export default class EditInfo extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '编辑个人资料',
    tabBarComponent: null
  })

  state = {
    overlayVisible: true,
    editName: false,
    editSex: false,
    editPhone: false,
    nickName: '',
    sex: '男',
    phone: ''
  }

  constructor(props) {
    super(props)
    this.state.sex = this.props.user ? this.props.user.sex ? this.props.user.sex: '男' : '男'
  }

  handleEditName = (e) => {
    e.preventDefault()
    this.setState({
      editName: true
    })
  }

  handleCancelEditName = (e) => {
    e.preventDefault()
    this.setState({
      editName: false
    })
  }

  handleEditAll = (e) => {
    e.preventDefault()
    this.setState({
      editPhone: true,
      editSex: true
    })
  }

  handleCancelEditSex = (e) => {
    e.preventDefault()
    this.setState({
      editSex: false
    })
  }

  handleCancelEditPhone = (e) => {
    e.preventDefault()
    this.setState({
      editPhone: false
    })
  }

  /**
   * editInfo
   */
  handleEditInfo = (type = "") => {
    const {
      userId,
      token
    } = this.props

    if (type === "") {
      return ;
    }

    if (type === "nickName") {
      this.props.editInfo(userId, token, {nickName: this.state.nickName})
    }

    if (type === "phone") {
      this.props.editInfo(userId, token, {phone: this.state.phone})
    }

    if (type === "sex") {
      this.props.editInfo(userId, token, {sex: this.state.sex})
    }

    if (this.props.errorMessage !== "") {
      Toast.show({
        text: this.props.errorMessage,
        position: 'top',
        type: 'danger'
      })
    } else {
      Toast.show({
        text: '修改成功',
        position: 'top',
        type: 'success'
      })
    }

    this.setState({
      editName: false,
      editPhone: false,
      editSex: false
    })
  }

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
            {/* greyu */}
            {user.nickName}
          </Text>
        </View>
        <TouchableNativeFeedback onPress={this.handleEditName}>
          <View style={styles.actionBorder}>
            {
              this.state.editName ? (
                <Item>
                  <Input
                    placeholder='请输入您要修改的昵称'
                    onChangeText={(text) => this.setState({nickName: text})}
                  />
                  <TouchableNativeFeedback onPress={this.handleCancelEditName}>
                    <Icon active name='ios-close-circle-outline' />
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback onPress={() => this.handleEditInfo('nickName')}>
                    <Icon active name='ios-checkmark-circle-outline' />
                  </TouchableNativeFeedback>
                </Item>
              ) : (
                <Text style={{textAlign: 'center', color: RED_COLOR_ACTIVE, fontSize: 18}}>
                  编辑昵称
                </Text>
              )
            }
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
          <TouchableNativeFeedback onPress={this.handleEditSex}>
              {
                this.state.editSex ? (
                  <Item>
                    <CheckBox
                      checked={this.state.sex === '男'}
                      style={{marginRight: 12}}
                      onPress={() => this.setState({sex: '男'})}
                    /><Text>男</Text>
                    <CheckBox
                      checked={this.state.sex === '女'}
                      style={{marginRight: 12}}
                      onPress={() => this.setState({sex: '女'})}
                    /><Text style={{marginRight: 20}}>女</Text>
                    <Right>
                      <View>
                        <TouchableNativeFeedback onPress={this.handleCancelEditSex}>
                          <Icon active name='ios-close-circle-outline' />
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={() => this.handleEditInfo('sex')}>
                          <Icon active name='ios-checkmark-circle-outline' />
                        </TouchableNativeFeedback>
                      </View>
                    </Right>
                  </Item>
                ) : (
                  <List.Item >
                    <Left>
                      <Text>性别</Text>
                    </Left>
                    <Right>
                      <Text style={{color: RED_COLOR_ACTIVE}}>{user.sex}</Text>
                    </Right>
                  </List.Item>
                )
              }
          </TouchableNativeFeedback>
            {
              this.state.editPhone ? (
                <Item>
                  <Input
                    placeholder='请输入电话号码'
                    onChangeText={(text) => this.setState({phone: text})}
                  />
                  <TouchableNativeFeedback onPress={this.handleCancelEditPhone}>
                    <Icon active name='ios-close-circle-outline' />
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback onPress={() => this.handleEditInfo('phone')}>
                    <Icon active name='ios-checkmark-circle-outline' />
                  </TouchableNativeFeedback>
                </Item>
              ) : (
              <List.Item last touchalbe>
                <Left>
                  <Text>电话</Text>
                </Left>
                <Right>
                  <Text style={{color: RED_COLOR_ACTIVE}}>{user.phone}</Text>
                </Right>
              </List.Item>
              )
            }
        </List>
        <TouchableNativeFeedback onPress={this.handleEditAll}>
          <View style={styles.actionBorderLast}>
            <Text style={{textAlign: 'center', color: RED_COLOR_ACTIVE, fontSize: 18}}>
              编辑个人信息
            </Text>
          </View>
        </TouchableNativeFeedback>
      </Content>
    )
  }
}
