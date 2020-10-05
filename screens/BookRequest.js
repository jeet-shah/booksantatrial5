import React,{Component} from 'react';
import { Text,View,TouchableOpacity,StyleSheet,TextInput,Alert,KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader'

export default class BookRequest extends Component{

    constructor(){
        super()
        this.state={
            UserID:firebase.auth().currentUser.email,
            BookName:'',
            ReasonToRequest:''
        }
    }

    addRequest = (BookName,ReasonToRequest) => {
        var UserID = this.state.UserID
        var UniqueID = Math.random().toString(36).substring(7)
        db.collection('Requested_Books').add({
            "User_ID":UserID,
            "Book_Name":BookName,
            "Reason_To_Request":ReasonToRequest,
            "Request_ID":UniqueID
        })
        this.setState({
            BookName:'',
            ReasonToRequest:''
        })
        return Alert.alert('Book Requested Successfully')
    }

render(){
    const BookName = this.state.BookName
    const ReasonToRequest = this.state.ReasonToRequest
    return(
        <View style={{backgroundColor:'#1E205C'}}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                <TextInput style={styles.input} 
                 placeholder="Enter Book Name"
                 placeholderTextColor='black'
                 onChangeText={(text)=>{
                     this.setState({
                         BookName:text
                     })
                 }}
                />
                <TextInput style={styles.input1} 
                 placeholder="Enter Reason To Request The Book"
                 placeholderTextColor='black'
                 multiline={true}
                 onChangeText={(text)=>{
                     this.setState({
                         ReasonToRequest:text
                     })
                 }}
                />
                <TouchableOpacity style={styles.login} onPress={this.addRequest(BookName,ReasonToRequest)}>
                    <Text style={styles.text}> Request </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}
}

const styles = StyleSheet.create({
    KeyboardAvoidingView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    input:{
        backgroundColor:"#E9DBDB",
        borderBottomWidth:2,
        borderBottomColor:'white',
        width:'80%',
        height:40,
        marginTop:40,
        alignSelf:'center',
        alignContent:'center',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        paddingLeft:10
    },
    input1:{
        backgroundColor:"#E9DBDB",
        borderBottomWidth:2,
        borderBottomColor:'white',
        width:'80%',
        height:40,
        marginTop:10,
        alignSelf:'center',
        alignContent:'center',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        paddingLeft:10
    },
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
    },
})