import React from 'react';
import firebase from 'firebase'
import db from '../config'
import {StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView,TextInput, Keyboard} from 'react-native';
import MyHeader from '../components/MyHeader'
export default class BookRequestScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            bookName:'',
            reasonToRequest:'',
            
        }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }
    addRequest=(bookName, reasonToRequest)=>{
        var userId=this.state.userId
        var requestId=this.createUniqueId()
        db.collection('requested_books').add({
            user_Id:userId,
            book_name:bookName,
            reason_to_request:reasonToRequest,
            request_id:requestId
        })
        this.setState({
            reasonToRequest:'',
            bookName:''

        })
        alert('Request was successful')
        
    }
    render(){
        return(
            <View style={{flex:1}}>
               <MyHeader title={'Request Book'} navigation={this.props.navigation}/>
               <KeyboardAvoidingView style={styles.keyBoardStyle}>
               <TextInput placeholder={'Enter Book Name'} style={styles.formTextInput} value={this.state.bookName}
               onChangeText={(text)=>{
                this.setState({
                    bookName:text
                })
               }}/>
               <TextInput placeholder={'Enter Reason To Request'} style={[styles.formTextInput,{height:300,}]} value={this.state.reasonToRequest}
               multiline={true}numberOfLines={8}
               onChangeText={(text)=>{
                this.setState({
                    reasonToRequest:text
                })
               }}/>
               <TouchableOpacity style={styles.button} onPress={()=>{
                   this.addRequest(this.state.bookName,this.state.reasonToRequest)
               }}>
                   <Text>
                       Request
                   </Text>
                   </TouchableOpacity>
               </KeyboardAvoidingView>
                </View>
        )
    }
}
const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )
  
