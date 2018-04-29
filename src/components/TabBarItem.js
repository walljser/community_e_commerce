import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';

const TabBarItem = ({focused, tintColor, iconName}) => (
  focused ? (
    <Icon name={iconName} style={{color: tintColor, fontSize: 22, marginTop: -4}} />
  ) : (
    <Icon name={iconName} style={{color: tintColor, fontSize: 22, marginTop: -4}} />
  )
)

TabBarItem.PropTypes = {
  focused: PropTypes.bool.isRequired,
  tintColor: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired
}

export default TabBarItem
