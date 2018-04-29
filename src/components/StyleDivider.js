import React from 'react';
import {
  Image
} from 'react-native';

function StyleDivider(props) {
  return (
    <Image
      {...props}
      style={{height: 8, marginBottom: 15}}
      resizeMode="cover"
      source={{uri: 'http://119.29.161.228/cloudimg/fengexian.jpg'}}
    />
  )
}

export default StyleDivider
