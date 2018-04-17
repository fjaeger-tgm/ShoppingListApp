//@flow
import React from 'react';
import { View, TextInput, ScrollView, Button, Text, FlatList } from 'react-native';
import firebase from 'react-native-firebase';
import ListItem from './ListItem';
export default class Shoppinglist extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('shoppinglist');
    this.unsubscribe = null;
    this.state = {
      textInput: '',
      loading: true,
      itemList: [],
      };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
  }
  
  componentWillUnmount() {
      this.unsubscribe();
  }

  updateTextInput(value) {
    this.setState({ textInput: value });
  }

  onCollectionUpdate = (querySnapshot) => {
    const itemList = [];
    querySnapshot.forEach((doc) => {
      const { title, complete } = doc.data();
      itemList.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        complete,
      });
    });
    this.setState({ 
      itemList,
      loading: false,
   });
  }

addItem() {
  this.ref.add({
    title: this.state.textInput,
    complete: false,
  });
  this.setState({
    textInput: '',
  });
}

  render() {
    if (this.state.loading) {
      return null; // or render a loading icon
    }
    return (
      <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.itemList}
            renderItem={({ item }) => <ListItem {...item} />}
            ItemSeparatorComponent={this.renderSeparator}
          />
          <TextInput
              placeholder={'Add Item'}
              value={this.state.textInput}
              onChangeText={(text) => this.updateTextInput(text)}
          />
          <Button
              title={'Add Item'}
              disabled={!this.state.textInput.length}
              onPress={() => this.addItem()}
          />
      </View>
    );
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#f6f0e4",
          marginLeft: "14%"
        }}
      />
    );
  };
}