import React from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Body,
  Title,
  Left,
  Button,
  Right,
  Icon
} from 'native-base';
import {
  StyleSheet,
  StatusBar
} from 'react-native';
import { RED_COLOR } from '../constants';

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 25,
    paddingBottom: 10,
    height: 70,
    backgroundColor: '#fff',
  }
})

export default class HeaderDefault extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
  }

  backToHome = () => {
    this.props.navigation.navigate('Profile')
  }

  render() {
    const {
      title,
      icon,
      backToHome
    } = this.props

    return (
      <Header
        style={styles.wrapper}
        rounded
      >
        <StatusBar
          animated
          barStyle="dark-content"
        />
        {
          backToHome ? (
            <Left>
              <Button onPress={this.backToHome} style={{backgroundColor: RED_COLOR}}>
                <Icon name='arrow-back' color="#333" />
              </Button>
            </Left>
          ) :  <Left />
        }
        <Body>
          <Title style={{color: '#333'}}>
            {title}
          </Title>
        </Body>
        <Right>
          {icon ? (
            <Icon name={icon} />
          ): null}
        </Right>
      </Header>
    )
  }
}
