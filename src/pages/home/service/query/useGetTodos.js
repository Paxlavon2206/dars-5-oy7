import { useQuery } from "@tanstack/react-query"
import { request } from "../../../../config/request"



export const useGetTodos = () => {
  return useQuery({
   queryKey:['todolist'],
   queryFn: ()=>{
   return request.get("/todos").then((res)=> res.data);
   }
      
  })
}
