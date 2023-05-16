import axios from 'axios';

export async function get_api(your_api) {
    try {
        const response = await axios.get(your_api); 
        if(response.request.status === 200){
          return response.data.data
        }
        else{
          return null
        }
        
      } catch (error) {
        console.log('Error', error.message);
      }
}

export async function delete_api(your_api) {
  try {
      const response = await axios.delete(your_api); 
      if(response.request.status === 200){
        return response.data.data
      }
      else{
        return null
      }
      
    } catch (error) {
      console.log('Error', error.message);
    }
}

export async function post_api(your_api) {
    try {
        const response = await axios.get(your_api); 
        if(response.request.status === 200){
          return response.data.data
        }
        else{
          return null
        }
        
      } catch (error) {
        console.log('Error', error.message);
      }
}

export async function specical_case_get_api(your_api) {
    try {
        const response = await axios.get(your_api); 
        if(response.request.status === 200){
          return response.data.data
        }
        else{
          return null
        }
        
      } catch (error) {
        console.log('Error', error.message);
      }
}