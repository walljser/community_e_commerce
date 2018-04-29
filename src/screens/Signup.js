import React from 'react';
import { connect } from 'react-redux';
import {
  Root,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Icon,
  Text,
  Toast,
  Spinner,
  View
} from 'native-base';
import { StyleSheet } from 'react-native';
import {
  signup
} from '../actions';
import {
  RE_USERNAME,
  RE_PHONE,
  RED_COLOR
} from '../constants'

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 30,
    backgroundColor: RED_COLOR
  },
  content: {
    backgroundColor: '#fff'
  }
})

@connect(
  state => ({
    inService: state.service.inService,
    errorMessage: state.service.errorMessage
  }),
  dispatch => ({
    signup: (username, password, phone) => dispatch(signup(username, password, phone))
  })
)
export default class Signup extends React.Component {
  state = {
    username: '',
    password: '',
    phone: null,
    usernameErr: false,
    passwordErr: false,
    phoneErr: false
  }

  static navigationOptions = ({navigation}) => ({
    title: '注册'
  })

  handleSubmit = (e) => {
    e.preventDefault()

    const {
      usernameErr,
      passwordErr,
      phoneErr
    } = this.state

    if(this.handleValidate()) {
      this.signup()
    }
  }

  signup = async () => {
    await this.props.signup(this.state.username, this.state.password, this.state.phone);

    const {
      errorMessage,
      navigation
    } = this.props

    if (errorMessage !== "") {
      this.showToast(errorMessage)
    } else {
      this.showToast('注册成功！', 'success')

      if (navigation.state.params) {
        if (navigation.state.params.from) {
          navigation.navigate(navigation.state.params.from)
        } else {
          navigation.navigate('Profile')
        }
      } else {
        navigation.navigate('Profile')
      }
    }
  }

  handleValidate = () => {
    const {
      username,
      password,
      phone
    } = this.state

    let validMessage = ""

    this.setState({
      usernameErr: false,
      passwordErr: false,
      phoneErr: false
    })

    if (!RE_USERNAME.test(username)) {
      this.setState({
        usernameErr: true,
      })
      validMessage = '请输入正确用户名，字母开头，不能少于六位数'
      this.showToast(validMessage)
      return false;
    }

    if (null === password || password.length < 6) {
      this.setState({
        passwordErr: true,
      })
      validMessage = '密码不能少于6位数'
      this.showToast(validMessage)
      return false;
    }

    if (!RE_PHONE.test(phone)) {
      this.setState({
        phoneErr: true,
      })
      validMessage = '密码不能少于6位数'
      this.showToast(validMessage)
      return false;
    }

    return true
  }

  showToast = (message, type = 'danger') => {
    Toast.show({
      text: message,
      type,
      position: 'top'
    })
  }

  render() {
    return (
      <Content padder style={styles.content}>
        <Form>
          <Item floatingLabel error={this.state.usernameErr}>
            <Label>用户名</Label>
            <Input
              value={this.state.username}
              onChangeText={(text) => this.setState({username: text})}
            />
            {
              this.state.usernameErr? (
                <Icon name='close-circle' />
              ) : null
            }
          </Item>
          <Item floatingLabel error={this.state.passwordErr}>
            <Label>密码</Label>
            <Input
              value={this.state.password}
              type="password"
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry={true}
            />
            {
              this.state.passwordErr? (
                <Icon name='close-circle' />
              ) : null
            }
          </Item>
          <Item floatingLabel error={this.state.phoneErr}>
            <Label>手机号码</Label>
            <Input
              value={this.state.phone}
              onChangeText={(text) => this.setState({phone: text})}
              // numberOfLine={11}
              number
              keyboardType="number-pad"
            />
            {
              this.state.phoneErr ? (
                <Icon name='close-circle' />
              ) : null
            }
          </Item>
          <Button
            style={styles.submitButton}
            block
            onPress={this.handleSubmit}
          >
            {
              this.state.inService ? (
                <Spinner />
              ) : null
            }
            <Text>注册</Text>
          </Button>
        </Form>
      </Content>
    )
  }
}
