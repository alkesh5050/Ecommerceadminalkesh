
import { View, Text } from 'react-native'
import React from 'react'
import Category from './App/container/category/Category'
import { NavigationContainer } from '@react-navigation/native'
import SubCategory from './App/container/SubCategory/SubCategory'
import Drawer from './App/container/Drawer/Drawer'
import { configureStore } from './App/redux/Store'
import { Provider } from 'react-redux'
import Counter from './App/counter'

export default function App() {
  const store = configureStore();
  return (
    <Provider store={store}>  
    {/* 9 */}
     <NavigationContainer>
       <Drawer/>
     </NavigationContainer>
   {/* <Counter/> */}
    </Provider>
  )
}