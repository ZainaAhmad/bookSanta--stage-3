import React from 'react';
import firebase from 'firebase'
import db from '../config'
import { StyleSheet, Text, View, Image, TextInput,TouchableOpacity,Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            password:'',
            emailId:'',
            isModalVisible:false,
            firstName:'',
            lastName:'',
            adress:'',
            contact:'',
            confirmPassword:''
        }
    }
    showModal=()=>{
        return(
           <Modal
           animationType={'fade'} trasparent={true} visible={this.state.isModalVisible}>
               <View style={styles.modalContainer}>
                   <ScrollView style={{width:'100%'}}>
                            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                                        <Text style={styles.modalTitle}>
                                            Registration
                                            </Text>
                                            <TextInput style={styles.formTextInput} placeholder={'First name'}
                                             maxLength={8} onChangeText={(text)=>{
                                                    this.setState({
                                                        firstName:text
                                                    })
                                             }}
                                             />
                                             <TextInput style={styles.formTextInput} placeholder={'Last name'}
                                             maxLength={8} onChangeText={(text)=>{
                                                    this.setState({
                                                        lastName:text
                                                    })
                                             }}
                                             />
                                             <TextInput style={styles.formTextInput} placeholder={'Address'}
                                             multiline={true} onChangeText={(text)=>{
                                                    this.setState({
                                                        address:text
                                                    })
                                             }}
                                             />
                                             <TextInput style={styles.formTextInput} placeholder={'Contact'}
                                             keyboardType={'numeric'} maxLength={10} onChangeText={(text)=>{
                                                    this.setState({
                                                        contact:text
                                                    })
                                             }}
                                             />
                                             <TextInput style={styles.formTextInput} placeholder={'Email-Id'}
                                             keyboardType={'email-address'} onChangeText={(text)=>{
                                                    this.setState({
                                                        emailId:text
                                                    })
                                             }}
                                             />
                                             <TextInput style={styles.formTextInput} placeholder={'Enter password'}
                                             secureTextEntry={true} onChangeText={(text)=>{
                                                    this.setState({
                                                        password:text
                                                    })
                                             }}
                                             />
                                             <TextInput style={styles.formTextInput} placeholder={'Confirm password'}
                                             secureTextEntry={true} onChangeText={(text)=>{
                                                    this.setState({
                                                        confirmPassword:text
                                                    })
                                             }}
                                             />
                                             <View style={styles.modalBackButton}>
                                                 <TouchableOpacity style={styles.registerButton} onPress={()=>{
                                                this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
                                                 }}>
                                                     <Text style={styles.registerButtonText}>
                                                         Register
                                                         </Text>
                                                     </TouchableOpacity>
                                                 </View>
                                                 <View style={styles.modalBackButton}>
                                                     <TouchableOpacity style={styles.cancelButton} onPress={()=>{
                                                         this.setState({
                                                             isModalVisible:false
                                                         })
                                                     }}>
                                                         <Text style={{color:'#ff5722'}}>
                                                             Cancel
                                                             </Text>
                                                         </TouchableOpacity>
                                                     </View>
                                </KeyboardAvoidingView>
                       </ScrollView>

                   </View>
               </Modal>
        )
    }
    userSignUp=(email,password,confirmPassword)=>{
        if(password !==confirmPassword){
            return alert("Passwords don't match")
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((response)=>{
            db.collection('users').add({
                first_name:this.state.firstName,
                last_name:this.state.lastName,
                address:this.state.address,
                email_id:this.state.emailId,
                contact:this.state.contact,

            })
            return alert('User succesfuly added')
        })
        .catch((error)=>{
         return alert(error.message)
        })
    }
    }
    userLogin=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((response)=>{
            this.props.navigation.navigate('DonateBooks')
        })
        .catch((error)=>{
            return alert(error.message)
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    {
                        this.showModal()
                    }
                    </View>
                <View style={styles.profileContainer}>
                    <Image source={require('../assets/santa.png')} style={{width:150, height:200}}/>
                <Text style={styles.title}>
                    Book Santa!
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TextInput 
                    style={styles.loginBox} placeholder={'abc@example.com'} keyboardType={'email-address'} 
                    onChangeText={(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }}/>
                    <TextInput 
                    style={styles.loginBox} placeholder={'password'} secureTextEntry={true}
                    onChangeText={(text)=>{
                        this.setState({
                            password:text
                        })
                    }}/>
                    <TouchableOpacity style={[styles.button,{marginBottom:20,marginTop:20}]}
                    onPress={()=>{
                        this.userLogin(this.state.emailId,this.state.password)
                    }}>
                        <Text style={styles.buttonText}>
                            Login
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button]}
                    onPress={()=>{
                        this.setState({
                            isModalVisible:true
                        })
                    }}>
                        <Text style={styles.buttonText}>
                            Sign up
                            </Text>
                        </TouchableOpacity>
                        
                    </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#F8BE85',
   alignItems: 'center',
   justifyContent: 'center'
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   color : '#ff3d00'
 },
 loginBox:{
   width: 300,
   height: 40,
   borderBottomWidth: 1.5,
   borderColor : '#ff8a65',
   fontSize: 20,
   margin:10,
   paddingLeft:10
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ff5722',
   margin:50
 },
 modalContainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
 },
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30
 },
 registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
 },
 cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
 },

 button:{
   width:300,
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"#ff9800",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10
 },
 buttonText:{
   color:'#ffff',
   fontWeight:'200',
   fontSize:20
 }
})

  