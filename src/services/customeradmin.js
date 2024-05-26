import axios from "axios"

const apiURL = "https://localhost:44332/api"

//[GET] Call to fetch QuestionnaireBanks
export const getAllQuestionnaireBanks = async () => {
    try {
        const response = await axios.get(`${apiURL}/Questionnaires`)
        return response.data;
    } catch (error) {
        console.error('Error fetching questionnaires :', error);
        throw error;
    }
}

//[GET] Call to fetch allQuestionnaires
export const getAllQuestionnaires = async () =>{
    try {
        const response = await axios.get(`${apiURL}/Questionnaires`)
        return response.data;
    } catch (error) {
        console.error('Error fetching questionnaires :', error);
        throw error;
    }
}



//[GET] Call to fetch QuestionnaireById
export const getQuestionnaireById = async (id) => {
    try {
        const response = await axios.get(`${apiURL}/Questionnaires/${id}`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching questionnaire for id: ${id} :`, error);
        throw error;
    }
}

//[GET] Call to fetch QuestionnaireByCustomerId
export const getQuestionnaireByCustomerId = async (customerId) => {
    try {
        const response = await axios.get(`${apiURL}/Questionnaires/questionnaireByCustomerId/${customerId}`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching questionnaire for customerId: ${customerId} :`, error);
        throw error;
    }
}
//[GET] Call to fetch CustomerAdminById
export const getCustomerAdminById = async (customerId) => {
    try {
        const response = await axios.get(`${apiURL}/CustomerAdmins/${customerId}`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching CustomerAdmin for id : ${customerId} :`, error);
        throw error;
    }
}

//[POST] Call to post new Questionnaire
export const postQuestionnaire = async (newQuestionnaire) => {
    try {

        const response = await axios.post(`${apiURL}/Questionnaires`, newQuestionnaire)
        return response.data;
    } catch (error) {
        console.error('Error posting questionnaire :', error);
        throw error;
    }
}

//[PUT] Call to update Questionnaire
export const editQuestionnaire = async (id, updatedQuestionnaire) => {
    try {
        const response = await axios.put(`${apiURL}/Questionnaires/${id}`, updatedQuestionnaire)
        return response.data;
    } catch (error) {
        console.error('Error updating questionnaire :', error);
        throw error;
    }
}

//[GET] Call to fetch CategoryByName
export const getCategoryByName = async (name) => {
    try {
        const response = await axios.get(`${apiURL}/QuestionCategories/CategoryByName/${name}`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching Question Category for name ${name} :`, error);
        throw error;
    }
}

//[POST] Call to post new Question
export const postQuestion = async (newQuestion) => {
    try {
        const response = await axios.post(`${apiURL}/Questions`, newQuestion)
        return response.data;
    } catch (error) {
        console.error('Error posting question :', error);
        throw error;
    }
}
//[PUT] Call to update Question
export const editQuestion = async (id, updatedQuestion) => {
    try {
        // return axios.post(`${apiURL}/Questions`, newQuestion);
        const response = await axios.put(`${apiURL}/Questions/${id}`, updatedQuestion)
        return response.data;
    } catch (error) {
        console.error('Error updating question :', error);
        throw error;
    }
}

//[DELETE] Call to delete Question
export const deleteQuestion = async (idToDelete) => {
    try {
        const response = await axios.delete(`${apiURL}/Questions/${idToDelete}`)
        return response.data;
    } catch (error) {
        console.error('Error deleting question :', error);
        throw error;
    }
}

//[POST] Call to post new QuestionnaireQuestion
export const postQuestionnaireQuestion = async (newQuestionnaireQuestion) => {
    try {
        console.log("newQuestionnaireQuestion",newQuestionnaireQuestion);
        const response = await axios.post(`${apiURL}/QuestionnaireQuestions`, newQuestionnaireQuestion)
        console.log("Response from posting new QuestionnaireQuestion:", response.data);
        return response.data;
       
    } catch (error) {
        console.error('Error posting new QuestionnaireQuestion  :', error);
        throw error;
    }
}

//[DELETE] Call to delete QuestionnaireQuestion By questionId
export const deleteQuestionnaireQuestionByQuestionId = async (questionId) => {
    try {
        const response = await axios.delete(`${apiURL}/QuestionnaireQuestions/DeleteByQuestionId/${questionId}`)
        return response.data;
       
    } catch (error) {
        console.error('Error deleting QuestionnaireQuestion  :', error);
        throw error;
    }
}

//[POST] Call to post new CustomerUser
export const postCustomerUser = async (newCustomerUser) =>{
    try {
        const response = await axios.post(`${apiURL}/CustomerUsers`,newCustomerUser)
        return response.data;
    } catch (error) {
        console.error('Error posting Customer User :', error);
        throw error;
    }
}

//[GET] Call to fetch CustomerUsers
export const getAllCustomerUsers = async () =>{
    try {
        const response = await axios.get(`${apiURL}/CustomerUsers`)
        return response.data;
    } catch (error) {
        console.error('Error fetching Customer Users :', error);
        throw error;
    }
}
//Added on 26-05-24 for customeruser as per customeradmin
export const getCustomerUsersBycustomeradmin = async (customerAdminId) =>{
    try {
        const response = await axios.get(`${apiURL}/CustomerUsers/byAdmin/${customerAdminId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching Customer Users as per customer admin :', error);
        throw error;
    }
}

//[POST] Call to post new QuestionnaireAssignment
export const postQuestionnaireAssignment = async (questionnaireassignments) =>{
    try {
        const response = await axios.post(`${apiURL}/QuestionnaireAssignments`,questionnaireassignments)
        return response.data;
    } catch (error) {
        console.error('Error posting QuestionnaireAssignment :', error);
        throw error;
    }
}

//[GET] Call to fetch QuestionnaireAssignments
export const getAllQuestionnaireAssignments = async () =>{
    try {
        const response = await axios.get(`${apiURL}/QuestionnaireAssignments`)
        return response.data;
    } catch (error) {
        console.error('Error fetching questionnaire Assignments :', error);
        throw error;
    }
}
export const getAllFeedbackDetails = async () =>{
    try {
        const response = await axios.get(`${apiURL}/FeedbackDetails`)
        console.log("response",response);
        return response.data;
    } catch (error) {
        console.error('Error fetching Feedback details :', error);
        throw error;
    }
}

