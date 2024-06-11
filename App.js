
import { View, Text } from 'react-native'
import React from 'react'
import Category from './App/container/category/Category'
import { NavigationContainer } from '@react-navigation/native'
import SubCategory from './App/container/SubCategory/SubCategory'
import Drawer from './App/container/Drawer/Drawer'

export default function App() {
  return (
    <NavigationContainer>
      <Drawer/>
    </NavigationContainer>
   
  )
}