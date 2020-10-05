import React,{ Component } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import BookDonate from '../screens/BookDonate';
import BookRequest from '../screens/BookRequest';
import {AppStackNavigator} from './AppStackNavigator'

export const AppTabNavigator = createBottomTabNavigator({
    BookDonate:{
        screen:AppStackNavigator,
        navigationOptions:{
            tabBarIcon:<Image source={require("../assets/request-list.png")} style={{width:20,height:20}}></Image>,
            tabBarLabel:"Donate Books"
        }
    },
    BookRequest:{
        screen:BookRequest,
        navigationOptions:{
            tabBarIcon:<Image source={require("../assets/request-book.png")} style={{width:20,height:20}}></Image>,
            tabBarLabel:"Request Books"
        }
    }
})