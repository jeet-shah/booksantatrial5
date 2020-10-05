import React,{Component} from 'react';
import { StyleSheet,View,Text,TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase'

export default class CustomSideBarMenu extends Component {

    render(){
        return(
            <View>
                <View style={styles.container}>
                    <DrawerItems {...this.props} />
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={()=>{
                        this.props.navigation.navigate('WelcomeScreen')
                        firebase.auth().signOut()
                    }}>
                        <Text style={styles.buttontext}> Log Out </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        backgroundColor:'blue',
        justifyContent:'center',
        width:'40%',
        height:30,
        alignSelf:'center'
    },
    buttontext:{
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    }
})