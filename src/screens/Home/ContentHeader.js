import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView
} from 'react-native';
import {
  Content,
  Text,
  H2
} from 'native-base';

const styles = StyleSheet.create({
  wrapper: {
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    fontWeight: '600'
  },
  horizontalListItem: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 2,
    borderWidth:1,
    borderColor:'#efeff4',
    // shadowColor:'#000',
    // shadowOffset: {
    //   height: 100,
    //   width: 100
    // },
    // shadowRadius: 3,
    // shadowOpacity: 0.5,
  },
  itemText: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 15,
    fontSize: 16,
    fontWeight: '600'
  }
})

export default class extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.header}>
          <H2>探索云生活</H2>
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.horizontalListItem}>
            <Image
              style={{height: 90, width: 130}}
              resizeMode="cover"
              source={{ uri: "http://119.29.161.228/cloudimg/advs/guoshushengxian.jpg"}}
            />
            <Text style={styles.itemText}>精品水果</Text>
          </View>
          <View style={styles.horizontalListItem}>
            <Image
              style={{height: 90, width: 130}}
              resizeMode="cover"
              source={{ uri: "http://119.29.161.228/cloudimg/advs/putaojiu.jpg"}}
            />
            <Text style={styles.itemText}>中外名酒</Text>
          </View>
          <View style={styles.horizontalListItem}>
            <Image
              style={{height: 90, width: 130}}
              resizeMode="cover"
              source={{ uri: "http://119.29.161.228/cloudimg/advs/longxia.jpg"}}
            />
            <Text style={styles.itemText}>天天海鲜</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
