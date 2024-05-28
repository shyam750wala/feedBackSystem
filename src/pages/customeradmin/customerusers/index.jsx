import React, { useState, useEffect } from 'react';
import FullEditDataGrid from 'mui-datagrid-full-edit';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, useTheme } from '@mui/material';
import { getAllCustomerUsers, getAllQuestionnaireAssignments, getAllQuestionnaires, getCustomerAdminById, getCustomerUsersBycustomeradmin, getQuestionnaireByCustomerId, getQuestionnaireById, postQuestionnaireAssignment, postQuestionnaireQuestion } from '../../../services/customeradmin';
import Header from '../../../components/Header';
import { tokens } from '../../../theme';
import { object } from 'yup';
import { getQuestionnaireAssignmentsByCustomerUserId, getQuestionnaireByCustomerUserId } from '../../../services/customeruser';

function Index() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [questionnaires, setQuestionnaires] = useState([]);
    const [selectedCustomerAdminId, setSelectedCustomerAdminId] = useState(null);
    const [selectedQuestionnaires, setSelectedQuestionnaires] = useState({});
    const [assignedQuestionnaires, setAssignedQuestionnaires] = useState({});
    const [currentSelectedQuestionnaires, setCurrentSelectedQuestionnaires] = useState({});

    const fetchDataFromApi = async () => {
        try {
            const apiData = await getCustomerUsersBycustomeradmin(5);
            const formattedData = apiData.map((item) => ({
                id: item.customerUserId,
                customerUserId: item.customerUserId,
                customerUserTokenId: item.customerUserTokenId,
                customerUserName: item.customerUserName,
                password: item.password,    
                customerAdminId: item.customerAdminId,
                status: item.status,
                QuestionnaireAssign: "Questionnaire Assign",
                isNew: false
            }));
            setRows(formattedData);
            console.log("customer users",rows);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDataFromApi();

        const fetchGetAllQuestionnaire = async () => {
            try {
                const apiData = await getQuestionnaireByCustomerId(5);
                console.log("api", apiData);
        
                // Convert the object into an array
                const formattedData = [apiData]; // Assuming apiData is an object, convert it into an array
                setQuestionnaires(formattedData);
                console.log("formattedData", formattedData);
            } catch (error) {
                console.error('Error fetching questionnaires:', error); 
            }
        };
        fetchGetAllQuestionnaire();

        const fetchquestionnaireByCustomerUser = async (customerUserId) => {
            try{
                const assignedquestionnaire = await getQuestionnaireAssignmentsByCustomerUserId(customerUserId)
                console.log("jsbjsbjsf",assignedquestionnaire);       
            }
            catch(error)
            {

            }

        }
        fetchquestionnaireByCustomerUser()
    }, []);

    const fetchAssignedQuestionnaires = async (customerUserId) => {
        try {
            const assigned = await getQuestionnaireAssignmentsByCustomerUserId(customerUserId)
            console.log("assigned",assigned);
            const selectedBank = {};
            assigned.forEach(assignment => {
                selectedBank[assignment.questionnaire.questionnaireId] = assignment.questionnaire;
            });
            setAssignedQuestionnaires(selectedBank);
            setSelectedQuestionnaires(selectedBank);    
            // setCurrentSelectedQuestionnaires(selectedBank)
            console.log("asssigned questionnaire",assignedQuestionnaires);
            console.log("selected questionnaire",selectedQuestionnaires);
            // console.log("current questionnaire",selectedQuestionnaires);
            console.log("selected bank:", selectedBank);
        } catch (error) {
            console.error('Error fetching assigned questionnaires:', error);
        }
    };

    const handleOpen = async (customerUserId) => {
        console.log("Selected Customer Admin Id:", customerUserId);
        setSelectedCustomerAdminId(customerUserId);
        setCurrentSelectedQuestionnaires({});
        fetchAssignedQuestionnaires(customerUserId)
        console.log(selectedCustomerAdminId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggleQuestionnaire = (q) => (event) => {
        const selected = event.target.checked;
        setCurrentSelectedQuestionnaires((prevSelected) => {
            const updatedSelection = selected
                ? { ...prevSelected, [q.questionnaireId]: q }
                : Object.fromEntries(Object.entries(prevSelected).filter(([key]) => key !== q.questionnaireId));
            return updatedSelection;
        });
        console.log(" current questionnaire selected",currentSelectedQuestionnaires);
    };

    const onSaveRow = async (id, updatedRow, oldRow, oldRows) => {
        try {
            const promises = Object.values(currentSelectedQuestionnaires).map(async (selectedBank) => {
                const newQuestionnaire = {
                    questionnaireId: selectedBank.questionnaireId,
                    customerUserId: updatedRow.customerUserId,
                    customerAdminId: selectedBank.customerAdminId,
                };
                console.log("new questionnaire",newQuestionnaire);
                await postQuestionnaireAssignment(newQuestionnaire);
            });
            await Promise.all(promises);
        } catch (error) {
            console.error('Error saving assigned questionnaires:', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'Customer User Id', flex: 1 },
        { field: 'customerUserTokenId', headerName: 'User Token Id', flex: 1 },
        { field: 'customerUserName', headerName: 'User Name', flex: 1 },
        { field: 'password', headerName: 'Password', flex: 1 },
        { field: 'customerAdminId', headerName: 'Customer Admin Id', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
        {
            field: 'QuestionnaireAssign',
            headerName: 'Assign Questionnaire',
            flex: 1,
            editable:true,
            renderEditCell: (params) => (
                console.log("params",params.row.customerAdminId),
                <div>
                    <Button variant="contained" onClick={() => handleOpen(params.row.customerUserId)}>
                        Assign Questionnaire
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Assign Questionnaires</DialogTitle>
                <DialogContent>
                    {questionnaires.map((q) => (
                        <FormControlLabel
                            key={q.questionnaireId}
                            control={
                                <Checkbox
                                    checked={!!selectedQuestionnaires[q.questionnaireId] || !! currentSelectedQuestionnaires[q.questionnaireId]}
                                    onChange={handleToggleQuestionnaire(q)}
                                />
                            }
                            label={q.questionnaireTitle}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
                </div>
            )
        },
    ];

    return (
        <Box m="20px">
            <Header title="Customer Users" subtitle="Manage Customer Users and Assign Questionnaires" />
            <FullEditDataGrid
                rows={rows}
                columns={columns}
                onSaveRow={onSaveRow}
              
            />
           
        </Box>
    );
}

export default Index;