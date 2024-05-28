import axios from "axios"
import qs from 'qs';

const apiURL = "https://localhost:44332/api"

//[GET] Call to fetch CustomerUserById
export const getCustomerUserById = async (customerId) => {
    try {
        const response = await axios.get(`${apiURL}/CustomerUsers/${customerId}`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching CustomerUser for id : ${customerId} :`, error);
        throw error;
    }
}

//[POST] Call to post new FeedbackMaster
export const postFeedbackMaster = async (newFeedbackMaster) => {
    try {

        const response = await axios.post(`${apiURL}/FeedbackMasters`, newFeedbackMaster)
        return response.data;
    } catch (error) {
        console.error('Error posting into FeedbackMaster :', error);
        throw error;
    }
}

//[POST] Call to post new FeedbackDetails
export const postFeedbackDetails = async (newFeedbackDetails) => {
    try {

        const response = await axios.post(`${apiURL}/FeedbackDetails`, newFeedbackDetails)
        return response.data;
    } catch (error) {
        console.error('Error posting into FeedbackDetails :', error);
        throw error;
    }
}

//Added 23-05-24

export const getQuestionnaireAssignmentsByCustomerUserId = async (customeruserId) => {
    try {
        const response = await axios.get(`${apiURL}/QuestionnaireAssignments/QuestionnaireByCustomerUserId/${customeruserId}`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching questionnaireAssignment  for customerUserId: ${customeruserId} :`, error);
        throw error;
    }
}

export const loginCustomerUser = async (customerTokenId, customerUserName, password) => {
    try {
        const response = await axios.post(
            `${apiURL}/CustomerUsers/login?customerTokenId=${customerTokenId}&customerUserName=${customerUserName}&password=${password}`
        );
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.error('Error logging in CustomerUser:', error);
        throw error;
    }
}