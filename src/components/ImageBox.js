import React from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';
import {
  View,
  Text
} from 'native-base';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    padding: 14
  },
  image: {
    width: '100%',
    height: 100
  },
  text: {
    textAlign: 'center',
    padding: 10,
    fontSize: 14
  }
})

function ImageBox(props) {
  const {
    image,
    desc,
    style,
    ...others
  } = props

  // const dealStyle = StyleSheet.flatten([styles.wrapper, style])
  //   width: defaultWidth
  // }

  return (
    <View {...others} style={[styles.wrapper, style]}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{uri: image}}
      />
      <Text style={styles.text}>
        {desc}
      </Text>
    </View>
  )
}

ImageBox.propTypes = {
  image: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
}

export default ImageBox
