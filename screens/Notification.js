import React,{Component} from 'react';
import { Text,View,TouchableOpacity,StyleSheet,TextInput,Alert,SwipeableFlatList } from 'react-native';
import { Card } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class Notification extends Component{

    constructor(props){
        super(props)
        this.state={
            userID:firebase.auth().currentUser.email,
            allNotifications:[],
        }
        this.notificationref = null
    }

    getNotifications = () => {
        this.notificationref = db.collection('All_Notifications').where("NotificationStatus","==","Unread")
        .where("targeteduserid","==",this.state.userID).onSnapshot((Snapshot)=>{
            var AllNotifications = []
            Snapshot.docs.map((doc)=>{
                var Notification = doc.data()
                Notification["Doc_ID"] = doc.id
                AllNotifications.push(Notification)
            })
            this.setState({
                allNotifications:AllNotifications
            })
        })
    }

    componentDidMount(){
        this.getNotifications()
    }

    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:0.9}}>
                    {this.state.allNotifications.length === 0?(<Text> You have no notification </Text>):(
                        <SwipeableFlatList allNotifications = {this.state.allNotifications}>

                        </SwipeableFlatList>
                    )}
                </View>
            </View>
        )
    }
}