import React,{Component} from 'react';
import { Text,View,StyleSheet,TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Icon, ListItem } from 'react-native-elements';

export default class SwipeableFlatList extends Component{

    constructor(props){
        super(props)
        this.state = {
            allnotifications:this.props.allnotifications
        }
    }

    renderItem = (data) => (
        <TouchableHighlight>
            <ListItem
              leftElement = {<Icon name="book" type="font-awesome" color='#696969' />}
              title={data.item.BookName}
              titleStyle = {{color:'black',fontWeight:'bold'}}
              subtitle = {data.item.Message}
              bottomDivider
            >
            </ListItem>
        </TouchableHighlight>
    )

    render(){
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <SwipeListView 
                  data = {this.state.allnotifications}
                  renderItem = {this.renderItem}
                  renderHiddenItem = {this.renderHiddenItem}
                  leftOpenValue = {75}
                  rightOpenValue = {-150}
                  previewOpenValue = {-40}
                  previewOpenDelay = {3000}
                ></SwipeListView>
            </View>
        )
    }
}