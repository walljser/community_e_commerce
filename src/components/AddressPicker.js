import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableNativeFeedback,
  StyleSheet,
  Modal,
  Platform,
  ListView
} from "react-native";
import {
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Right,
  Body,
  Left,
  List,
  ListItem
} from "native-base";
import { RED_COLOR, areas } from '../constants';

const styles = StyleSheet.create({
  header: {
    backgroundColor: RED_COLOR
  }
})

export default class AddressPicker extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    handleSelect: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
  }

  _handleSelect = (value) => {
    this.props.handleSelect(value)
  }

  _renderRow = (rowData, rowId) => {
    const lists = rowData.citys.map((content, index) => {
      return (
        <ListItem key={index} onPress={() => this._handleSelect(rowData.provinceName + content.citysName)}>
          <Text>{content.citysName}</Text>
        </ListItem>
      )
    })

    return (
      <List>
        <ListItem itemDivider>
          <Text>{rowData.provinceName}</Text>
        </ListItem>
        {lists}
      </List>
    )
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    return (
      <Modal
        visible={this.props.visible}
        onRequestClose={this.props.handleClose}
      >
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={this.props.handleClose}>
              <Text>返回</Text>
            </Button>
          </Left>
          <Body>
            <Title>城市选择</Title>
          </Body>
        </Header>
        <ListView
          initialListSize={1}
          dataSource={ds.cloneWithRows(areas)}
          renderRow={(rowData, sectionId, rowId) => this._renderRow(rowData, rowId)}
        />
      </Modal>
    )
  }
}
