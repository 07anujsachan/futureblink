/* eslint-disable @typescript-eslint/no-explicit-any */
 import axios from "axios";
const BASE_URL= "http://localhost:3000/api"
export const getAllSequences = async () =>{
    try {
        const response = await axios.get(`${BASE_URL}/sequences`);
        // if (!response.ok) {
        //   throw new Error('Failed to fetch users');
        // }
        return  response.data;
        
        
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }

}
export const createSequence = async (sequenceData: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/sequences`, sequenceData);
      return response.data;
    } catch (error) {
      console.error("Error creating sequence:", error);
      throw error;
    }
  };
  export const deleteSequence = async (sequenceId: any) => {
    try {
      const response = await axios.delete(`${BASE_URL}/sequences/${sequenceId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting sequence:", error);
      throw error;
    }
  };
   
  export const addNodeToSequence = async (sequenceId:any, nodeData:any) => {
    try {
      const response = await axios.post(`${BASE_URL}/sequences/${sequenceId}/node`, nodeData);
      return response.data;
    } catch (error) {
      console.log(error);
      
    }
  };
  

  export const getSequenceById = async (sequenceId: any ) => {
    try {
      const response = await axios.get(`${BASE_URL}/sequences/${sequenceId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching sequence details:", error);
      throw error;
    }
  };
//   export const createDelayNode = async (delayData: any ) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/sequences/${sequenceId}/node`, delayData);
//       return response.data;
//     } catch (error) {
//       console.error("Error creating delay node:", error);
//       throw error;
//     }
//   };