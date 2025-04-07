/* eslint-disable @typescript-eslint/no-explicit-any */
 import axios from "axios";
const BASE_URL= "http://localhost:3000/api"
export const getAllSequences = async () =>{
    try {
        const response = await axios.get(`${BASE_URL}/sequences`);

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
  export const deleteNode = async (nodeId: any) => {
    try {
      const response = await axios.delete(`${BASE_URL}/sequences/node/${nodeId}`);
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

  export const addMailsToSequence = async (sequenceId:any, emails:any) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/sequences/${sequenceId}/add-emails`,
        { emails }
      );
  
      return res.data;
    } catch (error) {
      console.error('Error adding mails:', error);
      throw error;
    }
  };
  export const startSequence = async (sequenceId:any) => {
    try {
      const response = await axios.post(`${BASE_URL}/sequences/${sequenceId}/start`);
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
