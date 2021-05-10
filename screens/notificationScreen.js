import React from 'react'
import {View, Text, Flatlist, StyleSheet} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'
export default class NotificationScreen extends React.Component{
    render(){
        return(
            <View>
            <MyHeader title={'Notifications'} navigation={this.props.navigation}/>
            </View>
        )
    }
}