import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../redux/action/category.action';

export default function SubCategoryA() {
    const category = useSelector(state => state.category);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getCategory());
    }, [])

    console.log(category);
    return (
        <View>

        </View>
    );
}