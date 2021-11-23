import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native';
import { initializeApp } from "firebase/app";
import{ getDatabase, push, ref, onValue}  from"firebase/database";

export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyD1vIyAK4-qHz0-NcFk0l5uIZ1li_4lOeM",
    authDomain: "snshoppinglistwithfirebase.firebaseapp.com",
    databaseURL: "https://snshoppinglistwithfirebase-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "snshoppinglistwithfirebase",
    storageBucket: "snshoppinglistwithfirebase.appspot.com",
    messagingSenderId: "196349212549",
    appId: "1:196349212549:web:855066e1b271f95b6df6ec",
    measurementId: "G-VXFYD09ZDD"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [groceries, setGroceries ] = useState([]);



  useEffect(() => {
    const groceriesRef = ref(database, 'groceries/');
    onValue(groceriesRef, (snapshot) =>{
      const data = snapshot.val();
      setGroceries(Object.values(data));
      console.log(Object.keys(data)[0])
      console.log(Object.values(data));
    })
   
  }, []);

  const saveProduct = () => {
    push(ref(database, 'groceries/'), {
      'product':product, 'amount':amount
    });
  }

  const deleteProduct = (item) => {
    //remove(ref(database, 'groceries/' + item.key))
    Alert.alert('Remove product!', 'This is under construction, you will only see the alert message. We appreciate your patience. \n\nBest regards,\n-sn dev',
    [{text: 'Roger that!'}]);
  }



 

  return (
    <View style={styles.container}>

      <Text style={styles.title}> Shopping list </Text>

      <TextInput
       style={styles.input}
      placeholder="Product"
      onChangeText={product => setProduct(product)}
      value={product}
      ></TextInput>

      <TextInput
      style={styles.input}
      placeholder="Amount"
      onChangeText={amount => setAmount(amount)}
      value={amount}
      ></TextInput>

      <Pressable
      style={styles.btnContainer}
      onPress={saveProduct}>
      <Text
      style={styles.btn}>Save</Text>
     </Pressable>

     <FlatList style={{marginLeft: "5%"}}
      data={groceries}
      keyExtractor={(item)=>item.key}
      renderItem={({ item})  => {
      return(
   
        <TouchableOpacity>
        <View style={styles.fView}>
            <Text style={styles.text_style1}>{item.product}, {item.amount} </Text>
            <Text style={styles.text2} onPress={()  =>  deleteProduct(item)  }>Delete</Text>
        </View>
        </TouchableOpacity>
       )}}/>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
  },

  btnContainer:{
    alignItems:'center',
    justifyContent:'center',
    marginTop: 5,
    marginBottom: 5,
  },

  btn:{
    color: 'white',
    width: 300,
    backgroundColor: '#70B8FF',
    textAlign:'center',
    height: 50,
    borderRadius: 20,
    padding: 10,
    fontSize: 18,
  },

  input:{
    width: "90%",
    textAlign:'center',
    backgroundColor: '#f4f4f4',
    height: 50,
    margin: 10,
    borderRadius: 20,
  },

  fView:{
    display:'flex',
    flexDirection: 'row',
    margin: 5,
    marginTop: 15,
  },

  title:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },

  text1:{
    color: 'black'
  },

  text2:{
    color: 'blue',
  }

  

});
