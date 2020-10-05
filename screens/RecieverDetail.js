import React,{Component} from 'react';
import { Text,View,TouchableOpacity,StyleSheet,TextInput,Alert, } from 'react-native';
import { Card } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class RecieverDetail extends Component{

    constructor(){
        super()
        this.state = {
            userID:firebase.auth().currentUser.email,
            recieverID:this.props.navigation.getParam('details')["User_ID"],
            requestID:this.props.navigation.getParam('details')["Request_ID"],
            bookname:this.props.navigation.getParam('details')["Book_Name"],
            reasonforrequest:this.props.navigation.getParam('details')["Reason_To_Request"],
            recieverName:"",
            recieverNo:"",
            recieverAddress:"",
            recieverDocID:"",
            username:""
        }
    }

    getrecieverdetail = () => {
        db.collection('Users').where('Email_ID','==',this.state.recieverID).get().then((Snapshot) => {Snapshot.forEach(doc => {
            this.setState({
                recieverName:doc.data().First_Name,
                recieverNo:doc.data().Mobile_Number,
                recieverAddress:doc.data().Address
            })
        });})
    }

    getuserdetail = (userID) => {
        db.collection('Users').where('Email_ID','==',userID).get().then((Snapshot) => {Snapshot.forEach(doc => {
            this.setState({
                username:doc.data().First_Name + doc.data().Last_Name
            })
        })})
    }

    componentDidMount(){
        this.getrecieverdetail()
        this.getuserdetail(this.state.userID)
    }

    updatebookstatus = () => {
        db.collection('All_Donation').add({
            "Book_Name":this.state.bookname,
            "Request_ID":this.state.requestID,
            "Donor_ID":this.state.userID,
            "Request_Status":"Donor Interested"
        })
    }

    addnotification = () => {
        var message = this.state.username + "has shown interest in donating the book."
        db.collection("All_Notifications").add({
            "targeteduserid":this.state.recieverID,
            "donorID":this.state.userID,
            "requestID":this.state.requestID,
            "BookName":this.state.bookname,
            "date":firebase.firestore.FieldValue.serverTimestamp(),
            "NotificationStatus":"Unread",
            "Message":message
        })
    }

    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Card title={"Book Information"} titleStyle={{fontSize:20}}>
                    <Card>
                        <Text style={{fontWeight:'bold'}}> Name:{this.state.bookname} </Text>
                    </Card>
                    <Card>
                        <Text style={{fontWeight:'bold'}}> Reason:{this.state.reasonforrequest} </Text>
                    </Card>
                </Card>
                <View>
                    <Card title={"Reciever Information"} titleStyle={{fontSize:20}}>
                        <Card>
                            <Text style={{fontWeight:'bold'}}> Name:{this.state.recieverName} </Text>
                        </Card>
                        <Card>
                            <Text style={{fontWeight:'bold'}}> Mobile Number:{this.state.recieverNo} </Text>
                        </Card>
                        <Card>
                            <Text style={{fontWeight:'bold'}}> Address:{this.state.recieverAddress} </Text>
                        </Card>
                    </Card>
                </View>
                {this.state.recieverID != this.state.userID?(
                <TouchableOpacity style={styles.login} onPress={()=>{
                    this.updatebookstatus()
                    this.addnotification()
                    this.props.navigation.navigate('')
                }}>
                    <Text style={styles.text}> I want to donate </Text>
                </TouchableOpacity>
                ):null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    login:{
        backgroundColor:'#8282DF',
        width:'60%',
        height:40,
        marginTop:20,
        shadowColor:'black',
        shadowOffset:{width:0,height:8},
        shadowOpacity:0.30,
        shadowRadius:10.32,
        elevation:16,
        alignSelf:'center',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    },
    text:{
        color:'white',
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:18,
        fontWeight:'bold',
        marginTop:5
    }
})