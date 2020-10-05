import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import BookDonate from '../screens/BookDonate';
import RecieverDetail from '../screens/RecieverDetail';

export const AppStackNavigator = createStackNavigator({
    BookDonateList:{
        screen:BookDonate,
        navigationOptions:{headerShown:false}
    },
    RecieverDetail:{
        screen:RecieverDetail,
        navigationOptions:{headerShown:false}
    }
},{initialRouteName:'BookDonateList'})