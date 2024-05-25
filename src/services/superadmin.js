import axios from "axios"

const apiURL = "https://localhost:44332/api"

//[GET] Call to fetch QuestionnaireBanks
export const getAllQuestionnaireBanks = async () => {
    try {
        const response = await axios.get(`${apiURL}/QuestionnaireBanks`)
        return response.data;
    } catch (error) {
        console.error('Error fetching questionnaire banks :', error);
        throw error;
    }
}

//[GET] Call to fetch QuestionnaireBankById
export const getQuestionnaireBankById = async (id) => {
    try {
        const response = await axios.get(`${apiURL}/QuestionnaireBanks/${id}`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching questionnaire bank for id: ${id} :`, error);
        throw error;
    }
}

//[GET] Call to fetch Categories
export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${apiURL}/QuestionCategories`)
        return response.data;
    } catch (error) {
        console.error('Error fetching Question Categories :', error);
        throw error;
    }
}

//[POST] Call to post new QuestionnaireBank
export const postQuestionnaireBank = async (newQuestionnaireBank) => {
    try {

        const response = await axios.post(`${apiURL}/QuestionnaireBanks`, newQuestionnaireBank)
        return response.data;
    } catch (error) {
        console.error('Error posting questionnaire banks :', error);
        throw error;
    }
}
//[PUT] Call to update QuestionnaireBank
export const editQuestionnaireBank = async (id, updatedQuestionnaireBank) => {
    try {
        const response = await axios.put(`${apiURL}/QuestionnaireBanks/${id}`, updatedQuestionnaireBank)
        return response.data;
    } catch (error) {
        console.error('Error updating questionnaire banks :', error);
        throw error;
    }
}
//[DELETE] Call to delete QuestionnaireBank
export const deleteQuestionnaireBank = async (idToDelete) => {
    try {
        const response = await axios.delete(`${apiURL}/QuestionnaireBanks/${idToDelete}`)
        return response.data;
    } catch (error) {
        console.error('Error deleting questionnaire banks :', error);
        throw error;
    }
}

//[GET] Call to fetch QuestionBanks
export const getAllQuestionBanks = async () => {
    try {
        const response = await axios.get(`${apiURL}/QuestionBanks`)
        return response.data;
    } catch (error) {
        console.error('Error fetching Question Banks :', error);
        throw error;
    }
}

//[GET] Call to fetch QuestionBankById
export const getQuestionBankById = async (id) => {
    try {
        const response = await axios.get(`${apiURL}/QuestionBanks/${id}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching Question Banks By CategoryId:', error);
        throw error;
    }
}
//[GET] Call to fetch QuestionBanksByCategoryId
export const getQuestionBanksByCategoryId = async (categoryId) => {
    try {
        const response = await axios.get(`${apiURL}/QuestionBanks/questionbycategory/${categoryId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching Question Banks By CategoryId:', error);
        throw error;
    }
}

//[POST] Call to post new QuestionBank
export const postQuestionBank = async (newQuestionBank) => {
    try {
        // return axios.post(`${apiURL}/QuestionBanks`, newQuestionBank);
        const response = await axios.post(`${apiURL}/QuestionBanks`, newQuestionBank)
        return response.data;
    } catch (error) {
        console.error('Error posting question bank :', error);
        throw error;
    }
}
//[PUT] Call to update QuestionBank
export const editQuestionBank = async (id, updatedQuestionBank) => {
    try {
        // return axios.post(`${apiURL}/QuestionBanks`, newQuestionBank);
        const response = await axios.put(`${apiURL}/QuestionBanks/${id}`, updatedQuestionBank)
        return response.data;
    } catch (error) {
        console.error('Error updating question bank :', error);
        throw error;
    }
}
//[DELETE] Call to delete QuestionBank
export const deleteQuestionBank = async (idToDelete) => {
    try {
        // return axios.post(`${apiURL}/QuestionBanks`, newQuestionBank);
        const response = await axios.delete(`${apiURL}/QuestionBanks/${idToDelete}`)
        return response.data;
    } catch (error) {
        console.error('Error deleting question bank :', error);
        throw error;
    }
}

//[POST] Call to post new QuestionnaireQuestionBank
export const postQuestionnaireQuestionBank = async (QuestionnaireBankId, QuestionBankIds) => {
    try {
        console.log(QuestionBankIds);
        // return axios.post(`${apiURL}/QuestionBanks`, newQuestionBank);
        const promises = QuestionBankIds.map(async (qid) => {
            const data = {
                questionnaireBankId: QuestionnaireBankId,
                questionBankId: qid,
                serialNo: 1,
                superAdminId: 1
            }
            const response = await axios.post(`${apiURL}/QuestionnaireQuestionBanks`, data)
            return response.data;
        })
        const results = await Promise.all(promises);
        return results;
    } catch (error) {
        console.error('Error posting question bank :', error);
        throw error;
    }
}

export const getAllSubscriptionCategories = async () =>{
    try {
        const response = await axios.get(`${apiURL}/SubscriptionCategories`)
        return response.data;
    } catch (error) {
        console.error('Error fetching questionnaire banks :', error);
        throw error;
    }
}
export const getAllQuestionnaire = async () =>{
    try {
        const response = await axios.get(`${apiURL}/Questionnaires`)
        return response.data;
    } catch (error) {
        console.error('Error fetching questionnaires :', error);
        throw error;
    }
}
export const getAllCustomerAdmins = async () =>{
    try {
        const response = await axios.get(`${apiURL}/CustomerAdmins`)
        return response.data;
    } catch (error) {
        console.error('Error fetching customer admins :', error);
        throw error;
    }
}

export const editCustomerAdmin = async (id, newCustomerAdmin) => {
    try {
        const response = await axios.put(`${apiURL}/CustomerAdmins/${id}`, newCustomerAdmin);
        return response.data;
    } catch (error) {
        console.error('Error editing customer admin :', error);
        throw error;
    }
}

