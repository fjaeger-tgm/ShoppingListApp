//@flow
import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
export default class ListItem extends React.PureComponent {
    // toggle a todo as completed or not via update()
    toggleComplete() {
        this.props.doc.ref.update({
            complete: !this.props.complete,
        });
    }

    render() {
        return (
          <TouchableHighlight
            onPress={() => this.toggleComplete()}
          >
                
            <View style={{backgroundColor: '#abd0f9', flex: 1, height: 48, flexDirection: 'row', alignItems: 'center' }}>
                
                <View style={{ flex: 8 }}>
                    <Text>{this.props.title}</Text>
                </View>

                  <View style={{ flex: 2 }}>
                      {this.props.complete && (
                          <Text>Check</Text>
                      )}
                  </View>
              </View>
            
          </TouchableHighlight>
        );
    }
}