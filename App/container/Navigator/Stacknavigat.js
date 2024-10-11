import { View, Text } from 'react-native'
import React from 'react'
import Order from '../Order/Order';
import Order_details from '../Orderdetails/Order_details';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Stacknavigat() {

  return (

 
    <Stack.Navigator> 
     
        <Stack.Screen name="My_Oeders" component={Order} />
        <Stack.Screen name="OrderDetails" component={Order_details} />
    </Stack.Navigator>
 
  )
}