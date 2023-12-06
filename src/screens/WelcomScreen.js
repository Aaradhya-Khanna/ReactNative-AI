import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text,SafeAreaView ,StyleSheet, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function WelcomScreen(){
  const navigation= useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View>
      <Text style={styles.text1}>Jarvis</Text>
      <Text style={styles.text2}>The future, powered by AI</Text>
      </View>
      <View style={styles.container2}>
        <Image style={styles.image} source={require('../../assets/images/welcome.png')}/>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')}style={styles.touchable}>
        <Text style={styles.buttontext}>Get Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
  },
  container2:{
    alignItems:'center',
    marginVertical:wp(20)
  },
  text1:
  {
    fontSize:wp(10),
    fontWeight:"bold",
    color:"black",
    textAlign:'center'
  },
  text2:{
    fontSize:wp(5),
    fontWeight:"bold",
    color:"black",
    textAlign:'center'
  },
  image:{
    resizeMode:"cover",
    width:wp(95),
    height:wp(95),
    alignItems:'center'
  },
  touchable: {
    backgroundColor: '#50C878',
    padding: 10,
    borderRadius: 100,
    borderWidth:1
  },
  buttontext:{
    fontSize:30,
    color:'black',
    textAlign:"center"
  }
});
