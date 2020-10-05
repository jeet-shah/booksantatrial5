import React,{Component} from 'react';
import { View } from 'react-native';
import { Badge, Header,Icon } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase'

export default class MyHeader extends Component {

    constructor(){
        super()
        this.state={
            value:''
        }
    }

    getnoofunreadnotification = () => {
        db.collection('All_Notifications').where('NotificationStatus','==','Unread').onSnapshot((snapshot)=>{
            var UnreadNotifications = snapshot.docs.map((doc)=>{
                doc.data()
            })
            this.setState({
                value:UnreadNotifications.length
            })
        })
    }

    componentDidMount(){
        this.getnoofunreadnotification()
    }

    Belliconwithbadge = () => {
        return(
            <View>
                <Icon name='bell' type='font-awesome' color='#696969' size={25} onPress={()=>{
                    this.props.navigation.navigate('Notification')
                }} />
                <Badge value={this.state.value} containerStyle={{position:"absolute",top:-4,right:-4}} />
            </View>
        )
    } 

    render(){
    return(
        <Header
            backgroundColor={'#8282DF'}
            centerComponent={{
                text:props.title,
                style:{
                    color:'white',
                    fontSize:25,
                    fontWeight:'bold'
                    }
                }}
             leftComponent={
                 <Icon name='bars' type='font-awesome' color='#696969' onPress={()=>{
                     this.props.navigation.toggleDrawer()
                 }} />
             }
        /> 
    )
 }
}