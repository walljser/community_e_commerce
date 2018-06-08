import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import {
  Content,
  Text,
  Form,
  Item,
  Label,
  Input,
  Button,
  Spinner,
  Toast
} from 'native-base';
import {
  signin,
  loadUser,
  loadAllAddesses
} from '../actions';
import HeaderDefault from '../components/HeaderDefault';
import { RED_COLOR } from '../constants';

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
    userId: state.auth.user.userId,
    token: state.auth.user.token,
    errorMessage: state.auth.errorMessage,
    isFetching: state.auth.isFetching
  }),
  dispatch => ({
    signin: (username, password) => dispatch(signin(username, password)),
    loadUser: (userId, token) => dispatch(loadUser(userId, token)),
    fetchAddress: (userId, token) => dispatch(loadAllAddesses(userId, token))
  })
)
export default class Signin extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    userId: PropTypes.number,
    token: PropTypes.string,
    errorMessage: PropTypes.string
  }

  static navigationOptions = ({ navigation }) => ({
    title: '登录',
    tabBarComponent: null
  })

  state = {
    username: 'shenmi@163.com',
    password: 'cma1799'
  }

  handleSubmit = (e) => {
    this.signin()
  }

  signin = async () => {
    await this.props.signin(this.state.username, this.state.password)

    if (this.props.errorMessage !== "") {
      Toast.show({
        text: this.props.errorMessage,
        position: 'top',
        type: 'danger'
      })
    } else {
      const {
        navigation,
        userId,
        token
      } = this.props

      this.props.fetchAddress(userId, token)
      // await this.props.loadUser(userId, token)

      Toast.show({
        text: '登录成功',
        position: 'top',
        type: 'success'
      })

      const params = navigation.state.params

      if (params)  {
        if (params.from) {
          if (params.params) {
            navigation.navigate(params.from, params.params)
          } else {
            navigation.navigate(params.from)
          }
        } else {
          navigation.navigate('Profile')
        }
      } else {
        navigation.navigate('Profile')
      }
    }
  }

  handleSignup = () => {
    const {
      navigation
    } = this.props

    if (navigation.state.params)  {
      if (navigation.state.params.from) {
          navigation.navigate('Signup', { from: navigation.state.params.from})
      } else {
        navigation.navigate('Signup')
      }
    } else {
      navigation.navigate('Signup')
    }
  }

  render() {
    const {
      isFetching
    } = this.props

    return (
      <Content
        style={styles.content}
        padder
      >
        <Form>
          <Item floatingLabel>
            <Label>用户名</Label>
            <Input
              value={this.state.username}
              onChangeText={(text) => this.setState({username: text})}
              disabled={isFetching}
            />
          </Item>
          <Item floatingLabel last>
            <Label>密码</Label>
            <Input
              value={this.state.password}
              type="password"
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry
              disabled={isFetching}
            />
          </Item>
          <Button
            style={styles.submitButton}
            block
            onPress={this.handleSubmit}
            disabled={isFetching}
          >
            {
              isFetching ? (
                <Spinner />
              ) : null
            }
            <Text>登录</Text>
          </Button>
          <Button
            style={{marginTop: 10}}
            block
            info
            onPress={this.handleSignup}
            disabled={isFetching}
          >
            <Text>立即注册</Text>
          </Button>
        </Form>
      </Content>
    )
  }
}
