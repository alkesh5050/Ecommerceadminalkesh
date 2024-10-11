
import { View, Text, ScrollView, StatusBar, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
// import { addorder, getorderdata } from '../../Redux/slice/order.slice';
import { horizontalScale, moderateScale, verticalScale } from '../../../assets/Fonts/Matrix/Matrix';
import { getorderdata, getproduct } from '../../redux/Slice/Order.slice';
import { getcolordata } from '../../redux/Slice/Colorss.slice';


const data2 = [
  {
    id: 1,
    title: 'Pullover',
    subtitle: 'Mango',
    // image: require('../../../assets/img/drress1.webp'),
    color: 'Blue',
    Size: 'L',
    Units: 1,
    price: 51,

  },
  {
    id: 2,
    title: 'Pullover',
    subtitle: 'Mango',
    // image: require('../../../assets/img/bqq09177.webp'),
    color: 'Orange',
    Size: 'L',
    Units: 1,
    price: 51,

  },
  {
    id: 3,
    title: 'Pullover',
    subtitle: 'Mango',
    // image: require('../../../assets/img/drress1.webp'),
    color: 'gray',
    Size: 'L',
    Units: 1,
    price: 51,
  }
]
const Orderdata = [
  {
    id: 1,
    OrderNo: '1947034',
    Trackingnumber: 'Iw3475453455',
    date: '05-12-2019',
    Delivered: 'Delivered'
  },

]
export default function Order_details({ route, navigation }) {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Pending', value: 'Pending' },
    { label: 'Accept', value: 'Accept' },
    { label: 'Reject', value: 'Reject' },
    { label: 'Transist', value: 'Transist' },
    { label: 'Delivered', value: 'Delivered' },
    { label: 'Cancel', value: 'Cancel' },
  ]);
  // Pending, Accept, Reject, Transist, Delivered, Cancel

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproduct());
    dispatch(getcolordata());
  }, [])
  const order = useSelector(state => state.order);
  const colord = useSelector(state => state.colord)



  // console.log("aaaaaaaaaa", colord.Color);

  const carddata = order.order.filter((v) =>
    route.params.cart.some((v1) => v1.pid === v.id)
  )
  const a = route.params.adresss

  // console.log("carddata", a);

  const d = carddata.length


  const Order = ({ v }) => (
    <View style={styles.ViewOrder}>
      <View>
        <Text style={styles.Order0}>OrderNo: <Text>{route?.params?.ordernum}</Text></Text>
        <Text style={styles.Order2}>Trackingnumber: <Text style={styles.Order}>{v.Trackingnumber}</Text></Text>
      </View>
      <View>
        <Text style={styles.Order2}>{route?.params?.date}</Text>
        <Text style={styles.Order3}>{route?.params?.status}</Text>
      </View>

    </View>
  );


  const NewProductCard = ({ v }) => (

    <TouchableOpacity style={styles.olldeta}>

      {/* <Image source={v.image} style={styles.img} /> */}
      <Image
        source={{ uri: v?.url }}
        style={{ width: 110, height: 130, resizeMode: 'contain' }}
      />
      <View style={styles.pullovertext}>

        <Text style={styles.protext}>{v.Product_name}</Text>

        <Text style={styles.protext2}>{v.Discretion}</Text>

        <View style={styles.Color}>
          <Text style={styles.Colortext}>color:<Text style={styles.colorsize}>{colord.Color.find((v1) => v.Color === v1.id)?.name}</Text></Text>
          {/* <Text style={styles.Colortext}>Size:<Text style={styles.colorsize}>{v.Size}</Text></Text> */}
        </View>

        <View style={styles.OrderDetails}>
          <Text style={styles.Colortext}>Price : <Text style={styles.colorsize}>{v?.Price}</Text></Text>

          {/* <TouchableOpacity><Text style={styles.colorsize}>{v?.Price}$</Text></TouchableOpacity> */}
        </View>
      </View>

    </TouchableOpacity>
  );
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
      />

      <FlatList
        data={Orderdata}
        renderItem={({ item }) => <Order v={item} />}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />
   <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 4,
          }}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={'Choose a Order.'}
          />
        </View>

        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text>Chosen Order: {value === null ? 'none' : value}</Text>
        </View>
      </View>

      <View ><Text style={{ color: 'black', fontSize: 15 }}>{d} : item</Text></View>

      <FlatList
        data={carddata}
        renderItem={({ item }) => <NewProductCard v={item} />}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />

      <TouchableOpacity style={styles.olldeta1}>
        <Text style={styles.orderData2}>Adrress:
          <Text style={styles.orderData1}> {`${a.Full_name},${a.Adrress},${a.State},${a.City},${a.Country},${a.Zip_Code}`}
          </Text></Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: horizontalScale(19),
    paddingTop: horizontalScale(13),

  },
  orderData1: {
    fontFamily: 'Metropolis-Bold',
    color: '#222222',
    lineHeight: 24,
    // width:20
  },
  orderData2: {
    fontFamily: 'Metropolis-Regular',
    color: '#9B9B9B',
    lineHeight: 24,
    // width:200
    // columnGap:70
  },
  olldeta: {
    flexDirection: 'row',
    marginTop: horizontalScale(20),
    backgroundColor: '#FFFFFF',
    borderRadius: horizontalScale(15),
    elevation: 3,
  },
  olldeta1: {
    flexDirection: 'row',
    marginTop: horizontalScale(20),
    backgroundColor: '#FFFFFF',
    borderRadius: horizontalScale(15),
    elevation: 3,
    padding: 25,
    // width:290
  },
  pullovertext: {
    margin: '3%',
  },
  protext: {
    color: 'black',
    fontSize: moderateScale(20),
    fontFamily: 'Metropolis-Bold',
  },
  protext2: {
    color: '#9B9B9B',
    fontSize: moderateScale(14),
    // flexDirection:'row'
  },
  OrderDetails: {
    flexDirection: 'row',
    columnGap: moderateScale(150),
    paddingTop: verticalScale(18)

  },
  img: {
    width: '30%',
    height: '100%',
    borderBottomLeftRadius: horizontalScale(10),
    borderTopLeftRadius: horizontalScale(10),
  },
  Color: {
    flexDirection: 'row',
    columnGap: horizontalScale(35),
    paddingTop: verticalScale(7)
  },
  Colortext: {
    color: '#9B9B9B'
  },
  colorsize: {
    color: 'black',
    right: 20
  },
  starrating: {
    color: '#9B9B9B',
    fontSize: moderateScale(15),
    bottom: horizontalScale(3)
  },
  Ordertext: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: horizontalScale(10)
  },
  Ordertext2: {
    color: 'black',
    fontSize: moderateScale(20),
    paddingTop: horizontalScale(8)
  },
  searchicon: {
    paddingTop: horizontalScale(9)
  },
  ViewOrder: {
    flexDirection: 'row',
    paddingBottom: horizontalScale(15),
    justifyContent: 'space-between'
  },
  Order0: {
    color: 'black',
    paddingTop: horizontalScale(7),
    paddingBottom: horizontalScale(8),
    fontFamily: 'Metropolis-Bold',
    fontSize: moderateScale(18),
  },
  Order: {
    color: 'black',
    paddingTop: horizontalScale(7),
    paddingBottom: horizontalScale(8),

  },
  Order2: {
    color: '#B9B9B9',
    paddingTop: horizontalScale(7),
    paddingBottom: horizontalScale(8),
  },
  Order3: {
    color: '#2AA952',
    paddingTop: horizontalScale(7),
    paddingBottom: horizontalScale(8),
  }

});

// // Pending, Accept, Reject, Transist, Delivered, Cancel