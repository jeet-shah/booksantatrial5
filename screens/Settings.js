import React,{Component} from 'react';
import { Text,View,TouchableOpacity,StyleSheet,TextInput,Alert, SnapshotViewIOS } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader'

export default class Settings extends Component{

    constructor(){
        super()
        this.state={
            FirstName:'',
            LastName:'',
            Address:'',
            Contact:'',
            docID:'',
            email:''
        }
    }

    getUserDetail = () => {
        var user = firebase.auth().currentUser
        var email = user.email
        db.collection('Users').where('Email_ID','==',email).get()
        .then(Snapshot => {Snapshot.array.forEach(doc => {
            var data = doc.data()
            this.setState({
                email:data.Email_ID,
                FirstName:data.First_Name,
                LastName:data.Last_Name,
                Address:data.Address,
                Contact:data.Mobile_Number,
                docID:doc.id
            })
        });})
    }
    
    componentDidMount(){
        this.getUserDetail()
    }

    updateuserDetail = () => {
        db.collection('Users').doc(this.state.docID).update({
            'First_Name':this.state.FirstName,
            'Last_Name':this.state.LastName,
            'Address':this.state.Address,
            'Mobile_Number':this.state.Contact
        })
        Alert.alert('Profile Updated Successfully')
    }

    render(){
        return(
            <View>
                <TextInput
                  style = {styles.input}
                  placeholder='First Name'
                  maxLength={8}
                  onChangeText={(text)=>{
                      this.setState({
                        FirstName:text
                      })
                  }}
                  value={this.state.FirstName}
                />
                <TextInput
                  style = {styles.input1}
                  placeholder='Last Name'
                  maxLength={8}
                  onChangeText={(text)=>{
                      this.setState({
                        LastName:text
                      })
                  }}
                  value={this.state.LastName}
                />
                <TextInput
                  style = {styles.input1}
                  placeholder='Enter Address'
                  multiline={true}
                  onChangeText={(text)=>{
                      this.setState({
                        Address:text
                      })
                  }}
                  value={this.state.Address}
                />
                <TextInput
                  style = {styles.input1}
                  placeholder='Enter Phone Number'
                  maxLength={10}
                  keyboardType={'numeric'}
                  onChangeText={(text)=>{
                      this.setState({
                        Contact:text
                      })
                  }}
                  value={this.state.Contact}
                />
                <TouchableOpacity style={styles.login} onPress={this.updateuserDetail}>
                    <Text styles={styles.text}> Save </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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