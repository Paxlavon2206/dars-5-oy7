import React from 'react'
import { useDeleteList } from '../../service/mutation/useDeleteList'
import {toast } from 'react-toastify';
import { queryClient } from '../../../../config/query-client';

export const Card = ({description, title,id}) => {
  const {mutate,isPending} = useDeleteList();
  const deleteItem = () =>{
    mutate(id, {
      onError: ()=>{
        toast.error("Error occured")
      },
      onSuccess: () =>{
        toast.success("Successfully Deleted")
        queryClient.invalidateQueries({queryKey:["todolist"]})
      }
    })
    
  }
  return (
    <div className=' border-2 border-blue-500 mb-4 py-2 px-2'>
        <h2><span className=' font-bold'>Name:  </span>{title}</h2>
        <p> <span className=' font-bold'>Description:  </span>{description}</p>
        <button onClick={deleteItem} className=' bg-blue-500 px-2 hover:bg-blue-700 text-white rounded-xl font-bold'>{isPending ? "Deleting..." : "Delete"}</button>
    </div>
  )
}
