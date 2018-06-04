import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableNativeFeedback,
  ScrollView
} from 'react-native';
import {
  Content,
  Text,
  Toast,
  H2
} from 'native-base';
import advService from '../../services/advService';

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
  state = {
    advs: []
  }

  componentDidMount() {
    this.fetchAdvs()
  }

  goToSearch = (categorySecondId) => {
    console.log(categorySecondId)
    this.props.navigation.navigate('GoodSearch', {
      good: {
        categorySecondId: categorySecondId
      }
    })
  }

  fetchAdvs = async () => {
    try {
      const res = await advService.all()
      const advs = res.data.data
      this.setState({
        advs: advs
      })
    } catch(err) {
      Toast.show({
        text: '网络异常',
        position: 'top',
        type: 'danger'
      })
    }
  }

  render() {
    const advs = this.state.advs
    console.log(advs)
    return (
      <View style={styles.wrapper}>
        <Text style={styles.header}>
          <H2>探索云生活</H2>
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {
            advs.length > 0 ? (
              advs.map((item) => (
                <TouchableNativeFeedback onPress={() => this.goToSearch(item.categorySecondId)} key={item.advSwiperId}>
                  <View style={styles.horizontalListItem}>
                    <Image
                      style={{height: 90, width: 130}}
                      resizeMode="cover"
                      source={{ uri: item.image}}
                    />
                    <Text style={styles.itemText}>{item.name}</Text>
                  </View>
                </TouchableNativeFeedback>
              ))
            ) : null
          }
          {/* <View style={styles.horizontalListItem}>
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
          </View> */}
        </ScrollView>
      </View>
    )
  }
}
