import React,{useEffect} from 'react';
import { View, Text,SafeAreaView } from 'react-native';
import Appnavigation from "./src/navigation/appnav";
import { apiCall } from './src/api/openAI';
import { dummyMessages } from './src/constants/messages';
export default function App(){
  
  return (
   <Appnavigation/>
  );
};


