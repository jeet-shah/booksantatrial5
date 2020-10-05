import React,{Component} from 'react';
import { Text,View,TouchableOpacity,StyleSheet,TextInput,Alert,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class WelcomeScreen extends Component{
    
    constructor(){
        super()
        this.state={email:'',
                   password:'',
                   firstname:'',
                   lastname:'',
                   phoneno:'',
                   confirmpassword:'',
                   address:'',
                   isModalVisible:'false'
                }
    }

    userlogin=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((response)=>{
            this.props.navigation.navigate('BookDonate')
        })
        .catch(function(error){
            var errorcode = error.code
            return Alert.alert(error.message)
        })
    }
    usersignup=(email,password,confirmpassword)=>{
        if(password != confirmpassword){
            Alert.alert("Password doesn't match")
        }else{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((response)=>{
            db.collection('Users').add({
                First_Name:this.state.firstname,
                Last_Name:this.state.lastname,
                Mobile_Number:this.state.phoneno,
                Address:this.state.address,
                Email_ID:this.state.email
            })
            return Alert.alert('User Added Successfully',
            '',
            [{text:'OK',onPress:()=>{this.setState({
                "isModalVisible":false
            })}}])
        })
        .catch(function(error){
            var errorcode = error.code
            return Alert.alert(error.message)
        })
    }
    }
    showModal=()=>{
        return(
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.isModalVisible}
            >
                <View style={{backgroundColor:'#1E205C',justifyContent:'center',alignItems:'center',margin:80,width:300}}>
                    <ScrollView style={{width:'100%'}}>
                        <KeyboardAvoidingView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <MyHeader title="Registration" />
                            <TextInput style={styles.input}
                              placeholder='Enter First Name'
                              maxLength={8}
                              placeholderTextColor='black'
                              onChangeText={(text)=>{
                                  this.setState({
                                      firstname:text
                                  })
                              }}
                            />
                            <TextInput style={styles.input1}
                              placeholder='Enter Last Name'
                              maxLength={8}
                              placeholderTextColor='black'
                              onChangeText={(text)=>{
                                  this.setState({
                                      lastname:text
                                  })
                              }}
                            />
                            <TextInput style={styles.input1}
                              placeholder='Enter Phone Number'
                              maxLength={10}
                              placeholderTextColor='black'
                              keyboardType='numeric'
                              onChangeText={(text)=>{
                                  this.setState({
                                      phoneno:text
                                  })
                              }}
                            />
                            <TextInput style={styles.input1}
                              placeholder='Enter Address'
                              multiline={true}
                              placeholderTextColor='black'
                              onChangeText={(text)=>{
                                  this.setState({
                                      address:text
                                  })
                              }}
                            />
                            <TextInput style={styles.input1}
                              placeholder='Enter Email'
                              keyboardType='email-address'
                              placeholderTextColor='black'
                              onChangeText={(text)=>{
                                  this.setState({
                                      email:text
                                  })
                              }}
                            />
                            <TextInput style={styles.input1}
                              placeholder='Enter Password'
                              secureTextEntry={true}
                              placeholderTextColor='black'
                              onChangeText={(text)=>{
                                  this.setState({
                                      password:text
                                  })
                              }}
                            />
                            <TextInput style={styles.input1}
                              placeholder='Confirm Password'
                              secureTextEntry={true}
                              placeholderTextColor='black'
                              onChangeText={(text)=>{
                                  this.setState({
                                      confirmpassword:text
                                  })
                              }}
                            />
                            <View style={{justifyContent:'space-evenly'}}>
                            <TouchableOpacity style={styles.register} onPress={()=>{
                                this.usersignup(this.state.email,this.state.password,this.state.confirmpassword)
                                }}>
                                <Text style={styles.text1}> Register </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancel} onPress={()=>{
                                this.setState({
                                    "isModalVisible":false
                                })
                            }}>
                                <Text style={styles.text1}> Cancel </Text>
                            </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render(){
        const email=this.state.email
        const password=this.state.password
        return(
            <View style={{backgroundColor:'#1E205C'}}>
                 <TextInput 
                   style={styles.input}
                   placeholder="Enter Email"
                   placeholderTextColor="black"
                   keyboardType='email-address'
                   onChangeText={(text)=>{
                       this.setState({
                           email:text
                       })
                   }}
                 />
                  <TextInput 
                   style={styles.input1}
                   placeholder="Enter Password"
                   placeholderTextColor="black"
                   secureTextEntry={true}
                   onChangeText={(text)=>{
                       this.setState({
                           password:text
                       })
                   }}
                 />
                 <TouchableOpacity style={styles.login} onPress={()=>{
                     this.userlogin(email,password)
                 }}>
                     <Text style={styles.text}> Log In </Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.signup} onPress={()=>{
                     this.setState({
                         "isModalVisible":true
                     })
                 }}>
                     <Text style={styles.text}> Sign Up </Text>
                 </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        backgroundColor:"#E9DBDB",
        borderBottomWidth:2,
        borderBottomColor:"white",
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
        borderBottomColor:"white",
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
    register:{
        backgroundColor:'#8282DF',
        width:'60%',
        height:35,
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
    signup:{
        backgroundColor:'rgba(52, 52, 52, 0.0)',
        width:'60%',
        height:40,
        marginTop:10,
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
    cancel:{
        backgroundColor:'rgba(52, 52, 52, 0.0)',
        width:'60%',
        height:35,
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
    text1:{
        color:'white',
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:18,
        fontWeight:'bold',
    },
})