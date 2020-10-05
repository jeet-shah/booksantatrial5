import React,{Component} from 'react';
import { Text,View,TouchableOpacity,StyleSheet,Alert,FlatList } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader'

export default class BookDonate extends Component{

    constructor(){
        super()
        this.state = {
            RequestedBookList:[],
        }
        this.requestref = null
    }

    getrequestedbooklist = () => {
        this.requestref = db.collection("Requested_Books")
        .onSnapshot((snapshot)=>{
            var requestedbooks = snapshot.docs.map((doc) => doc.data())
            this.setState({
                RequestedBookList:requestedbooks
            })
        })
    }

    componentDidMount(){
        this.getrequestedbooklist()
    }

    keyExtractor = (item,index) => index.toString()

    renderItem = ({item,i}) => {
        return(
            <ListItem 
              key = {i}
              title = {item.Book_Name}
              subtitle = {item.Reason_To_Request}
              titleStyle = {{color:'white',fontWeight:'bold'}}
              subtitleStyle = {{color:'white'}}
              rightElement = {<TouchableOpacity style={styles.button} onPress={()=>{
                  this.props.navigation.navigate("RecieverDetail",{"details":item})
              }}>
                  <Text style={styles.text}> View </Text>
              </TouchableOpacity>}
            />
        )
    }

render(){
    return(
        <View style={{backgroundColor:'#1E205C'}}>
            <View style={{flex:1}}>
                {this.state.RequestedBookList.length === 0 ? 
                (<Text> There Is No Book Requested </Text>):(
                    <FlatList 
                      keyExtractor = {this.keyExtractor}
                      data = {this.state.RequestedBookList}
                      renderItem = {this.renderItem}
                    />
                )}
            </View>
        </View>
    )
}

}

const styles = StyleSheet.create({
    text:{
        color:'white',
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:18,
        fontWeight:'bold',
        marginTop:5
    }
})