import { apiKey } from "../constants/messages";
import axios from 'axios';
const client = axios.create({
    headers: {
        
        "Authorization": "Bearer "+apiKey,
        "Content-Type": "application/json"
    }
})

const chatgptUrl = 'https://api.openai.com/v1/chat/completions';
const dalleUrl = 'https://api.openai.com/v1/images/generations';

export const apiCall = async (prompt, message)=>{
    console.log("got it ");
    console.log(apiKey);
    prompt = prompt.toLowerCase();
    let isArt = prompt.includes('image') || prompt.includes('sketch') || prompt.includes('art') || prompt.includes('picture') || prompt.includes('drawing');
    if(isArt.toLowerCase().includes('yes')){
         console.log('dalle api call');
         return dalleApiCall(prompt, message)
    }else{
         console.log('chatgpt api call')
         return chatgptApiCall(prompt, message);
    }
}

const chatgptApiCall = async (prompt, message)=>{
    try{
        const res = client.post(chatgptUrl, {
            model: "gpt-3.5-turbo",
            message
        })

        let answer = res.data?.choices[0]?.message?.content;
        message.push({role: 'assistant', content: answer.trim()});
        console.log('got chat response', answer);
        return Promise.resolve({success: true, data: message}); 

    }catch(err){
        console.log('error: ',err);
        return Promise.resolve({success: false, msg: err.message});
    }
}

const dalleApiCall = async (prompt, message)=>{
    try{
        const res = client.post(dalleUrl, {
            prompt,
            n: 1,
            size: "512x512"
        })

        let url = res?.data?.data[0]?.url;
         console.log('got image url: ',url);
        message.push({role: 'assistant', content: url});
        return Promise.resolve({success: true, data: message});

    }catch(err){
        console.log('error: ',err);
        return Promise.resolve({success: false, msg: err.message});
    }
}
