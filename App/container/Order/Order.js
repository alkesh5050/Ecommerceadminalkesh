
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
  } from 'react-native';
  import EvilIcons from 'react-native-vector-icons/EvilIcons';
  import React, { useEffect } from 'react';

  import { useDispatch, useSelector } from 'react-redux';
import { horizontalScale, moderateScale, verticalScale } from '../../../assets/Fonts/Matrix/Matrix';
import { getorderdata, getprofile } from '../../redux/Slice/Order.slice';

  
  const Data = [
    {
      id: 0,
      Order_no: 'Order №1947034',
      Date: '05-12-2019',
      tracking_number: 'IW3475453455',
      quantity: 3,
      total_amount: 112,
    },
    {
      id: 0,
      Order_no: 'Order №1947972',
      Date: '03-11-2020',
      tracking_number: 'IW3475553555',
      quantity: 4,
      total_amount: 110,
    },
    {
      id: 0,
      Order_no: 'Order №1947678',
      Date: '08-08-2021',
      tracking_number: 'IW3477457755',
      quantity: 6,
      total_amount: 118,
    },
    {
      id: 0,
      Order_no: 'Order №1947777',
      Date: '07-07-2022',
      tracking_number: 'IW3477777777',
      quantity: 7,
      total_amount: 150,
    },
  ];
  
  const DataStructure = ({ v, n }) => (
  
    <TouchableOpacity onPress={() => n.navigate("OrderDetails",v)}>
      <View style={Styles.orderDatamainBody}>
        <View style={{ marginTop: 6 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={Styles.orderData1}>order_No :{v.ordernum}</Text>
            <Text style={Styles.orderData2}>{v.date}</Text>
          </View>
  
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={Styles.orderData2}>Tracking number:</Text>
            <Text style={Styles.orderData1}>{v?.tracking_number}</Text>
          </View>
  
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={Styles.orderData2}>Quantity:</Text>
              <Text style={Styles.orderData1}>{v?.cart.reduce((acc, v) => acc + v.qty, 0)}</Text>
             
            </View>
  
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={Styles.orderData2}>Total Amount:</Text>
              <Text style={Styles.orderData1}>{v?.Totalamunt}$</Text>
            </View>
          </View>
          {/* <Text style={Styles.orderData2}>Adrress: 
            <Text style={Styles.orderData1}> {`${v.adresss?.Full_name},${v.adresss?.Adrress},${v.adresss?.Zip_Code},${v.adresss?.State},${v.adresss?.City},${v.adresss?.Country}`}
              </Text></Text> */}
          
          <View style={Styles.detailBtnHead}>
            <View style={Styles.detaildBtn}>
              <TouchableOpacity >
                <Text style={Styles.detaildBtnText}>Details</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Text style={Styles.delieverdText}>{v?.status}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  export default function Order({ route, navigation }) {
  
    const dispatch = useDispatch();
  

    const orderd = useSelector(state => state.order)
    useEffect(() => {
      dispatch(getorderdata())

    }, [])
    // console.log("dddddrrrr", orderd.order?.[0]?.order); 
  
    const datao = orderd.order?.[0]?.order
  
    return (
      <ScrollView>
        <StatusBar backgroundColor="#F4F4F4" barStyle="dark-content" />
        <View style={{ width: '100%', height: 1000, backgroundColor: '#F4F4F4' }}>
    
  
          <Text style={Styles.myOrderText}>My orders</Text>
  
          <View style={Styles.delievered}>
            <TouchableOpacity>
              <Text style={Styles.delieveredBtn}>Delivered</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={Styles.process}>Processing</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={Styles.process}>Cancelled</Text>
            </TouchableOpacity>
          </View>
  
          <FlatList
            data={datao}
            renderItem={({ item }) => <DataStructure v={item} n={navigation} />}
            // keyExtractor={item => item.id}
            keyExtractor={(item, index) => index.toString()}
            // keyExtractor={(item, index) => String(index)}
            scrollEnabled={false}
  
          />
        </View>
      </ScrollView>
    );
  }
  
  const Styles = StyleSheet.create({
    mainIcon: {
      width: horizontalScale(1000),
      height: verticalScale(30),
      // borderWidth: 1,
      flexDirection: 'row',
      // marginHorizontal: 16,
      columnGap: 240,
      marginTop: verticalScale(10),
    },
    myOrderText: {
      // width:"90%",
      // height:30,
      // borderWidth:1,
      marginHorizontal: horizontalScale(16),
      marginTop: verticalScale(18),
      fontFamily: 'Metropolis-Bold',
      fontSize: moderateScale(34),
      color: '#222222',
    },
    delievered: {
      width: horizontalScale(90),
      height: verticalScale(30),
      flexDirection: 'row',
      // borderWidth:1,
      marginHorizontal: horizontalScale(16),
      marginTop: verticalScale(15),
      columnGap: 35,
    },
    delieveredBtn: {
      width: horizontalScale(100),
      height: verticalScale(30),
      backgroundColor: '#222222',
      borderRadius: moderateScale(50),
      fontSize: moderateScale(14),
      textAlign: 'center',
      padding: horizontalScale(6),
      padding: verticalScale(6),
      color: '#FFFFFF',
      fontFamily: 'Metropolis-Regular',
    },
    process: {
      textAlign: 'center',
      padding: horizontalScale(5),
      padding: verticalScale(5),
    },
    orderDatamainBody: {
      flex: 1,
      // borderWidth: 1,
      backgroundColor: '#FFFFFF',
      borderRadius: moderateScale(8),
      elevation: 5,
      marginHorizontal: horizontalScale(18),
      marginTop: verticalScale(30),
      padding: horizontalScale(10),
      padding: verticalScale(10),
    },
    orderData1: {
      fontFamily: 'Metropolis-Bold',
      color: '#222222',
      lineHeight: 24,
    },
    orderData2: {
      fontFamily: 'Metropolis-Regular',
      color: '#9B9B9B',
      lineHeight: 24,
    },
    detaildBtn: {
      width: horizontalScale(100),
      height: verticalScale(38),
      borderWidth: 1,
      borderRadius: moderateScale(50),
    },
    detaildBtnText: {
      fontFamily: 'Metropolis-Regular',
      color: '#222222',
      textAlign: 'center',
      padding: horizontalScale(8),
      padding: verticalScale(8),
    },
    detailBtnHead: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      columnGap: 128,
      marginTop: verticalScale(30),
    },
    delieverdText: {
      textAlign: 'center',
      color: '#2AA952',
      fontFamily: 'Metropolis-Regular',
      marginTop: verticalScale(10),
    },
  });
  