import {Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import './App.css';
import {Table} from 'antd';
import axios from 'axios';
import {FiTrash2} from 'react-icons/fi';
import {FiEdit} from 'react-icons/fi'


const App=()=> {


  const [name,Setname]=useState('');
  const [family,Setfamily]=useState('');
  const [age,Setage]=useState('');
  const [list,Getlist]=useState([]);

  const columns=[
    {
      title:'نام',
      dataIndex:'name',
      key:'name'
    },
    {
      title:'نام خانوادگی',
      dataIndex:'family',
      key:'family'
    },
    {
      title:'سن',
      dataIndex:'age',
      key:'age'
    },
    {
    title:'پاک کردن',
    dataIndex:'id',
    Key:'name',
    render:val=> <FiTrash2
    onClick={()=>DeleteData(val)} 
    fontSize={20} />
  
    },
    {
      title:'ویرایش',
      dataIndex:'id',
      Key:'name',
      render:val=> <FiEdit
      onClick={()=>UpdateData(val)} 
      fontSize={20} />
    
      }
  ]



  useEffect(()=>{
    GetData()
  },[])


  const PostData=async()=>{
    await axios({
    method:'POST',
    url:'http://ehsanshirzadi.com:8080/v1/product',
    data:{
      name:name,
      family:family,
      age:age
         }
    }).then((res)=>{
      console.log('res',res);
      GetData();
    }).catch((err)=>{
      console.log('err',err);
    }).finally(()=>{
      console.log('finally');
    })
  }


  const GetData=async()=>{
    await axios({
    method:'GET',
    url:'http://ehsanshirzadi.com:8080/v1/product'
    }).then((res)=>{
      console.log('res',res.data.data.list)
      Getlist(res.data.data.list)
    }).catch((err)=>{
      console.log('err',err)
    }).finally(()=>{
      console.log('finally')
    })
  }


  const DeleteData=async(id)=>{
    console.log(id)
    await axios({
      method:'DELETE',
      url:'http://ehsanshirzadi.com:8080/v1/product/' + id 
    }).then(res=>{
      console.log('res',res)
    }).catch(err=>{
      console.log('err',err)
    })
  }


  const UpdateData=async(id)=>{
    console.log(id)
    await axios({
      method:'put',
      url:'http://ehsanshirzadi.com:8080/v1/product/' + id 
    }).then(res=>{
      console.log('res',res)
    }).catch(err=>{
      console.log('err',err)
    })
  }
  




  return (
    <div className="App">
      <div className="form">
        <input onChange={(e)=>Setname(e.target.value)} placeholder="enter your name"/>
        <input onChange={(e)=>Setfamily(e.target.value)} placeholder="enter your family"/>
        <input onChange={(e)=>Setage(e.target.value)} placeholder="enter your age"/>
        <Button
        variant="success"
        onClick={PostData}
        >Submit
        </Button>
      </div>
      <h1>DataBase</h1>
      <div>
      <Table
            columns={columns}
            dataSource={list}/>
      </div>

    </div>
  );
}

export default App;
