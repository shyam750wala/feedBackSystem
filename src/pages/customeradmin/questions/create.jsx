import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FullEditDataGrid from "mui-datagrid-full-edit";
import { tokens } from '../../../theme';
import { useTheme } from '@emotion/react';
import { deleteQuestion, deleteQuestionnaireQuestionByQuestionId, editQuestion, postQuestion, postQuestionnaireQuestion } from '../../../services/customeradmin';


// const getRowId = (row) => row.srNo;


export default function CreateQuestion({ questionCategoryId, questions, questionnaireId}) {
    const [rows, setRows] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    useEffect(() => {
        async function fetchData() {
            try {
                // const data = await getQuestionsByCategoryId(questionCategoryId);
                //const superadminbyname =  await getSuperadminByid();
                setRows(questions.map((row, index) => ({ ...row, id: index + 1, isNew: false }))); // Assigning srNo starting from
            } catch (error) {
                console.error('Error fetching question banks:', error);
            }
        }
        fetchData();
    }, []);


    const onSaveRow = async (id, updatedRow, oldRow, oldRows) => {
        //console.log(updatedRow);
        const newQuestion = {
            questionText: updatedRow.questionText,
            questionCategoryId: questionCategoryId,
            customerAdminId: 1,
        }

        if (updatedRow.isNew) {
            //Post call
            try {
                const apiData = await postQuestion(newQuestion);
                console.log(apiData);

                const newQuestionnaireQuestion = {
                    questionnaireId: questionnaireId,
                    questionId: apiData.questionId,
                    customerAdminId: 1,
                    serialNo : 2,
                }

                const response = await postQuestionnaireQuestion(newQuestionnaireQuestion)
                console.log(response);
            } catch (error) {
                console.error('Error posting newQuestion :', error);
            }
        } else {
            //Edit call
            try {
                const apiData = await editQuestion(oldRow.questionId, updatedRow)
                console.log(apiData);
            } catch (error) {
                console.error('Error updating Question :', error);
            }
        }

    };


    const onDeleteRow = async (id, oldRow, oldRows) => {
        try {
            //console.log(oldRow.questionBankId);
            const response = await deleteQuestionnaireQuestionByQuestionId(oldRow.questionId);
            console.log(response);
            const apiData = await deleteQuestion(oldRow.questionId);
            console.log(apiData);
        } catch (error) {
            console.error('Error deleting Question :', error);
        }
    };

    const columns = [
        {
            field: 'questionId',
            headerName: 'ID',
            flex: 0.2,
        },
        {
            field: 'questionText',
            headerName: 'Question Text',
            flex: 1,
            editable: true
        },

    ];

    return (
        <Box
            sx={{
                height: 300,
                width: '90%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
                // Added by Vanshita on 7-05-2024
                '& .MuiDataGrid-toolbarContainer': {
                    backgroundColor: colors.grey[500],
                    // backgroundColor:colors.blueAccent[600], 
                },
                "& .MuiDataGrid-cell": {
                    fontSize: 13,
                },
                "& .MuiDataGrid-columnHeaders": {
                    fontSize: 14,
                    backgroundColor: colors.grey[600],
                    // backgroundColor:colors.blueAccent[700], 
                    fontWeight: "bold"
                },
                //Ended
            }}
        >
            <FullEditDataGrid
                columns={columns}
                rows={rows}
                onSaveRow={onSaveRow}
                onDeleteRow={onDeleteRow}
                // createRowData={createRowData}

                //Added by vanshita on 7-05-2024
                columnVisibilityModel={{
                    questionId: false,
                }}

            />
        </Box>
    );
}