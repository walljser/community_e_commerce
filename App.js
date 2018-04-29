import React from 'react';
import { AppLoading, Font } from 'expo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { Root } from 'native-base';
import Routes from './src/Routes';
import AppStorage from './src/AppStorage';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './src/reducers';

const storage = AppStorage._getStorage()
global.storage = storage

const loggerMiddleware = createLogger()

const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunkMiddleware
      // loggerMiddleware
    )
  )
)

console.log(store.getState())

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({
      isReady: true
    })
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />
    } else {
      return (
        <Provider store={store}>
          <Root>
            <Routes />
          </Root>
        </Provider>
      )
    }
  }
}
