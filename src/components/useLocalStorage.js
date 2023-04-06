import { useState } from "react";

export function useLocalStorage (key, initialValue) {

     const [storageValue, setStorageValue] = useState(() =>{
          try {
               const item = window.localStorage.getItem(key);
               return item ? JSON.parse(item) : initialValue;
          }catch(error) {
               return initialValue;
          }
     }) 

     const setValue = value => {
          try {
               let dataArray = [];
               let dataExist = window.localStorage.getItem(key);
               if(dataExist){
                    dataExist = JSON.parse(dataExist);
                    if(dataExist.id){
                         dataArray.push(dataExist);
                         dataArray.push(value);
                         setStorageValue(dataArray);
                         window.localStorage.setItem(key, JSON.stringify(dataArray));
                    }else{
                         if(dataExist[0]){
                              dataExist.push(value);
                              setStorageValue(dataExist);
                              window.localStorage.setItem(key, JSON.stringify(dataExist));
                         }else{
                              dataArray.push(value);
                              setStorageValue(dataArray);
                              window.localStorage.setItem(key, JSON.stringify(dataArray));
                         }
                    }
                    
               }else{
                    setStorageValue(value);
                    window.localStorage.setItem(key, JSON.stringify(value));
               }
          }catch(e){
               console.log(e);
          }
     }
     return [storageValue, setValue];
}
