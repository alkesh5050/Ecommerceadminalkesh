import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SubCategory from '../SubCategory/SubCategory';
import Category from '../category/Category';

const Drawer = createDrawerNavigator();

export default function () {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Category" component={Category} />
      <Drawer.Screen name="SubCategory" component={SubCategory} />
      {/* <Drawer.Screen name="SubCategory" component={SubCategory} /> */}

    </Drawer.Navigator>
  )
}