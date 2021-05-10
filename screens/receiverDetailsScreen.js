import React from 'react';
import db from '../config';
import firebase from 'firebase'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import MyHeader from '../components/MyHeader'
import {Card,Header, Icon} from 'react-native-elements'
export default class ReceiverDetailsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            userId: firebase.auth().currentUser.email,
            receiverId: this.props.navigation.getParam('details')['user_Id'],
            requestId: this.props.navigation.getParam ('details')['request_id'],
            bookName: this.props.navigation.getParam('details')['book_name'],
            reason_to_request: this.props.navigation.getParam('details')['reason_to_request'],
            receiverName:'',
            receiverContact:'',
            recieverAddress:'',
            recieverRequestDocId:'',

        }
    }
    getRecieverDetails(){
        db.collection('users').where('email_id','==',this.state.receiverId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    receiverName:doc.data().first_name,
                    receiverContact:doc.data().contact,
                    recieverAddress: doc.data().address
                })
            })
        })
        db.collection('requested_books').where('request_id','==',this.state.requestId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    recieverRequestDocId:doc.id
                })
            })
        })
    }
    updateBookStatus=()=>{
        db.collection('all_donations').add({
            book_name:this.state.bookName,
            request_id: this.state.requestId,
            requested_by:this.state.receiverName,
            donor_id:this.state.userId,
            request_status:'Donor Interested',

        })
    }
    addNotification=()=>{
        var message=this.state.userName+' Has Shown Interest In Donating The Book'
        db.collection('all_notifications').add({
            targeted_user_id:this.state.receiverId,
            donor_id:this.state.userId,
            request_id:this.requestId,
            book_name:this.state.bookName,
            
            notification_status:'unread',
            message:message,

        })
        
    }
    getUserDetails=()=>{
        db.collection('users').where('email_id','==',this.state.userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    userName:doc.data().first_name+' '+ doc.data().last_name
                })
            })
        })
    }
    componentDidMount(){
        this.getRecieverDetails()
        this.getUserDetails()
    }
    render(){
        return(
            <View style={{flex:1}}>
                
                <View style={{flex:0.1}}>
            <Header leftComponent={<Icon name='arrow-left' color='grey' type='feather' onPress={()=>{
                this.props.navigation.goBack()
            }} />} centerComponent={{text:'Reciever Details', style:{color:'grey', fontsize:20, fontWeight:'bold'}}}/>
                </View>
                <View style={{flex:0.3}}>
                        <Card title={'Book Information'} titleStyle={{fontSize:20}}>
                            <Card>
                                <Text>
                                    Name:{this.state.bookName}
                                </Text>
                            </Card>
                            <Card>
                                <Text>
                                    Reason:{this.state.reason_to_request}
                                </Text>
                                </Card>
                            </Card>
                    </View>
                    <View>
                        <Card title={'Reciever Information'} titleStyle={{fontSize:20}}>
                            <Card>
                                <Text>
                                    Name:{this.state.receiverName}
                                    </Text>
                                </Card>
                                <Card>
                                    <Text>
                                        Contact:{this.state.receiverContact}
                                        </Text>
                                </Card>
                                <Card>
                                    <Text>
                                        Address:{this.state.recieverAddress}
                                        </Text>
                                    </Card>
                        </Card>
                        </View>
                        <View style={{flex:0.3, justifyContent:'center', alignItems:'center'}}>
                                {
                                    this.state.receiverId != this.state.userId?
                                    (
                                        <TouchableOpacity onPress={()=>{
                                            this.updateBookStatus()
                                            this.addNotification()
                                            //this.props.navigation.navigate('MyDonations')

                                        }}>
                                            <Text>
                                                I want to donate
                                                </Text>
                                            </TouchableOpacity>
                                    ):
                                    null
                                }

                            </View>
                </View>
                
        )

    }
}