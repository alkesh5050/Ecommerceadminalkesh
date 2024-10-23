import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SubCategory from '../SubCategory/SubCategory';
import Category from '../category/Category';
import Product from '../Product/Product';
import Category1 from '../category/Category1';
import Cate from '../category/Cate';
import CategoryF from '../CategoryF/CategoryF';
import FierCategory from '../category/FierCategory';
import Brand from '../Brand/Brand';
import Colorss from '../Color/Colorss';
import Order from '../Order/Order';
import Stacknavigat from './Order_Stack';
import Order_Stack from './Order_Stack';



const Drawer = createDrawerNavigator();

export default function () {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="FierCategory" component={FierCategory} />
      <Drawer.Screen name="Order_Stack" component={Order_Stack} />
      <Drawer.Screen name="Product" component={Product} />
      <Drawer.Screen name="Category" component={Category} />
      <Drawer.Screen name="Category1" component={Category1} />
      <Drawer.Screen name="cate" component={Cate} />
      <Drawer.Screen name="cateF" component={CategoryF} />
      <Drawer.Screen name="SubCategory" component={SubCategory} />
      <Drawer.Screen name="Brand" component={Brand} />
      <Drawer.Screen name="color" component={Colorss} />
    </Drawer.Navigator>
  )
}