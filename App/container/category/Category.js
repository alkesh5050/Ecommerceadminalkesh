import { View, Text, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Category() {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Category</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Show Modal</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  headerText: {
    color: 'black',
    fontSize: 24,
    marginBottom: 20,
  },
});

// import React, { useState } from 'react';
// import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

// export default function Category() {
//   const [modalVisible, setModalVisible] = useState(false);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Category</Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => setModalVisible(true)}
//       >
//         <Text style={styles.buttonText}>Show Modal</Text>
//       </TouchableOpacity>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalText}>This is a modal!</Text>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.buttonText}>Close Modal</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerText: {
//     color: 'black',
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   button: {
//     padding: 10,
//     backgroundColor: '#007BFF',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: 300,
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
// });
