import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SubCategory from '../SubCategory/SubCategory';
import Category from '../category/Category';
import Product from '../Product/Product';
import Category1 from '../category/Category1';
import Cate from '../category/Cate';

const Drawer = createDrawerNavigator();

export default function () {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Category" component={Category} />
      <Drawer.Screen name="Category1" component={Category1} />
      <Drawer.Screen name="SubCategory" component={SubCategory} />
      <Drawer.Screen name="Product" component={Product} />
      <Drawer.Screen name="cate" component={Cate} />
    </Drawer.Navigator>
  )
}