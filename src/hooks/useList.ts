import axios from "axios";
import {useState,useEffect} from "react";

interface DataSchema {
  title:string,
  value:number,
  type:"income" | "expense",
  category: "Freelancing" | "Salary" | "Grocery" | "Utility Bill" | "Rent" | "Entertainment",
}

export default function useList(){
  const [list, setList] = useState([]);
  const [refetch, setRefetch] = useState(false);

  // get all data
  useEffect(()=> {
      axios.get('https://final-assignment-dpq0.onrender.com/list').then(({data})=> {
          setList(data.data);
      })
  },[refetch]);


  // store a data
  const storeData = (data:DataSchema)=> {
    axios.post('https://final-assignment-dpq0.onrender.com/list',data).then(({data})=> {
        if (data.acknowledged) {
          setRefetch(prev=>!prev);
        }
    })
  }


  // delete a data
  const deleteData = (id:string)=> {
    axios.delete(`https://final-assignment-dpq0.onrender.com/list/${id}`).then(({data})=>{
      if(data.deletedCount){
        setRefetch(prev=>!prev);
      }
    })
  }

  return [list, storeData, deleteData];
}