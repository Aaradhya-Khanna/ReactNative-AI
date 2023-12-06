import React, { useEffect, useState , useRef} from 'react';
import { View, Text,SafeAreaView ,StyleSheet, Image,ScrollView, TouchableOpacity, Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Features from "../components/Features"
import Voice from '@react-native-voice/voice';
import { apiCall } from '../api/openAI';
export default function HomeScreen(){
  const [messages,setMessages] = useState([]);
  const [recording,setRecording] = useState(false);
  const [speaking,setSpeaking] = useState(false);
  const [results,setResult] = useState(''); 
  const scrollViewRef = useRef();
  const clear = ()=>{
    setMessages([]);
    setSpeaking(false)
  }
  const stop = ()=>{
    setSpeaking(false);
  }
  const SpeechStartHandler=e=>{
    console.log('speech started',e);
  }
  const SpeechEndHandler=e=>{
    setRecording(false);
    console.log('speech ended',e);
    
  }
  const SpeechResultsHandler=e=>{
    console.log('voice event : ',e);
    const text=e.value[0];
    console.log(text)
    setResult(text); 
    messages.push({ role: 'user', content: text });
    setMessages(messages);
    console.log("api call in next step");
    fetchResponse(text);
  }
  const SpeechErrorHandler=e=>{
    console.log('error reported : ',e);
  }

  const startRecording = async () =>{
    setRecording(true);
    
    try{
        await Voice.start('en-US');
    }catch(error){
        console.log("error : ",error);
    }
  }

  const stopRecording = async () =>
  {
   try{
        Voice.stop();
        setRecording(false);
        //fetchResponse();
    }catch(error){
        console.log("error from home screen: ",error);
    }
  }

  const fetchResponse = async(result) =>{
    console.log("api call started : ",result);
    if(result.trim.length>0){
      let newMessages=[...messages];
      //newMessages.push({role:'user',content:result.trim()});
      //setMessages([...newMessages]);
      updateScrollView();
      console.log("api call ill start : ",result);
      apiCall(result,messages).then(res=>{
        console.log('got api data : ',res);
        if(res.success)
        {
          setMessages([...res.data]);
          updateScrollView();
          setResult('');
        }else
        {
          Alert.alert('Error',res.msg);
        }
      })
    }
  }

  const updateScrollView = ()=>{
    setTimeout(()=>{
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    },200)
  }

  useEffect(()=>{
    //voice handle
    Voice.onSpeechStart = SpeechStartHandler;
    Voice.onSpeechEnd = SpeechEndHandler;
    Voice.onSpeechResults = SpeechResultsHandler;
    Voice.onSpeechError = SpeechErrorHandler;

    return () =>{
        //Destroy voice instance
        Voice.destroy().then(Voice.removeAllListeners);
    }
  },[])


  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require("../../assets/images/bot.png")} resizeMode='contain'/>
        </View>
        {
          messages.length>0?(            
          <View style={styles.chat}>
            <Text style={styles.chatHeading}>
              Assistant
            </Text>
            <View style={styles.chatbox}>
              <ScrollView  showsVerticalScrollIndicator={false} bounces={false} ref={scrollViewRef}>
                {
                  messages.map((message,index)=>{
                      if(message.content && typeof message.content === 'string' && message.role=='assistant'){
                        console.log(typeof message.content);
                        if(message.content.includes("https")){
                          return(
                          <View key={index} style={styles.aiReplyParent}> 
                            <View style={styles.aiReplyChild}>
                              <Image style={styles.aiimage}source={{uri:message.content}}/>
                            </View>
                          </View>
                          )
                        }
                        else
                        {
                          return(
                            <View key={index} style={styles.aiReplyParent}>
                              <View style={styles.aiReplyChild} > 
                                <Text style={styles.chatMessageai}>{message.content}</Text>
                              </View>
                            </View>
                          )
                        }
                      }
                      else{
                        //user
                        return(
                          <View key={index} style={styles.userReplyParent}>
                            <View style={styles.userReplyChild}> 
                              <Text style={styles.chatMessageUser}>{message.content}</Text>
                            </View>
                          </View>
                        )
                      }
                  })
                }
              </ScrollView>
            </View>
          </View>
          ):(
            <Features/>
          )
        }
        <View style={styles.buttons}> 
          {
            recording?(
                //recording stop
              <TouchableOpacity onPress={stopRecording}>
              <Image style={styles.mic} source={require("../../assets/images/voiceLoading.gif")}/>
            </TouchableOpacity>
            ):(
              <TouchableOpacity onPress={startRecording}>
              <Image style={styles.mic} source={require("../../assets/images/recordingIcon.png")}/>
            </TouchableOpacity>
            )
          }
          {
            //recording start
            messages.length>0 && (
              <TouchableOpacity style={styles.clearButton} onPress={clear}>
                <Text style={styles.ButtonText}>clear</Text>
              </TouchableOpacity> 
              )
          }
          {
            speaking && (
              <TouchableOpacity onPress={stop} style={styles.stopButton} >
              <Text style={styles.ButtonText}>stop</Text>
            </TouchableOpacity> 
            )
          }
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
  },
  image:
  {
    width:hp(15),
    height:hp(15),
  },
  imageContainer:
  {
    alignItems:"center"
  },
  chat:
  { 
    marginVertical:wp(2)
  },
  chatHeading:
  {
    color:"black",
    fontWeight:"700",
    marginHorizontal:40,
    fontSize:hp(3)
  },
  chatbox:
  {
    height:hp(60),
    borderRadius:30,
    backgroundColor:'oldlace'
  },
  userReplyParent:
  {
    flexDirection:"row",
    justifyContent:"flex-end"
  },
  userReplyChild:
  {
    width:wp(65),
    backgroundColor:"cyan",
    borderRadius:20,
    padding:10,
    marginVertical:5
  },
  chatMessageUser:
  {
    color:"black",
    fontSize:10
  },
  chatMessageai:
  {
    color:"black",
    fontSize:10
  },
  aiReplyParent:
  {
    flexDirection:"row",
    justifyContent:"flex-start"
  },
  aiReplyChild:
  {
    width:wp(65),
    backgroundColor:"springgreen",
    borderRadius:20,
    padding:10,
    marginVertical:5
  },
  aiimage:
  {
    borderRadius:10,
    resizeMode:"contain",
    height:wp(60),
    width:wp(60),
  },
  buttons:{
    alignItems:"center"
  },
  mic:
  {
    resizeMode:"contain",
    borderRadius:100,
    width:100,
    height:100,
  },
  clearButton:
  {
      marginLeft:wp(70),
      backgroundColor:"grey",
      padding:20,
      borderRadius:20,
      marginVertical:hp(-10),
  },  
  stopButton:
  {
    marginRight:wp(70),
    backgroundColor:"red",
    padding:20,
    borderRadius:20,
    marginTop:wp(3)
  },
  ButtonText:
  { 
    fontSize:15,
    fontWeight:"bold"
  },
});
  