import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dicrement, increment } from './redux/action/Counter.action';


export default function Counter() {


  const dispatch = useDispatch();

  const counter = useSelector(state => state.count);  //10
  // console.log(counter.count);

const handleInc=()=>{
  console.log("sassas");
    dispatch(increment());  //2
}

const handleDec=()=>{
    dispatch(dicrement());
}

//1
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Counter</Text>

    <TouchableOpacity 
      style={{ width: '50%', padding: 20, backgroundColor: 'blue', alignItems: 'center' }}  onPress={handleInc}>   
      <Text style={{ fontSize: 40, color: 'white' }}>+</Text>
    </TouchableOpacity>

    <Text style={{ fontSize: 40 }}>{counter.count}</Text>
    {/* 11 */}

    <TouchableOpacity 
      style={{ width: '50%', padding: 20, backgroundColor: 'blue', alignItems: 'center' }}  onPress={handleDec} >
      <Text style={{ fontSize: 40, color: 'white' }}>-</Text>
    </TouchableOpacity>
  </View>
  )
}