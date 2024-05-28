import React from 'react'
import Header from '../../../components/Header'
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import FullEditDataGrid from "mui-datagrid-full-edit";
import { editQuestionnaire, getCustomerAdminById, postQuestionnaire } from '../../../services/customeradmin';
import { Link } from 'react-router-dom';

export default function Index() {

  const [data, setData] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const apiData = await getCustomerAdminById(5);
        setQuestionnaires(apiData.questionnaires);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataFromApi();
  }, []);

  useEffect(() => {
    setData(questionnaires.map((row, index) => ({
      ...row,
      id: index + 1,
      isNew: false
    })));
  }, [questionnaires]); // Run this effect whenever questionnaires changes

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const onSaveRow = async (id, updatedRow, oldRow, oldRows) => {


    if (updatedRow.isNew) {
      //Post call
      try {

          const newQuestionnaire = {
              questionnaireTitle: updatedRow.questionnaireTitle,
              customerAdminId: 5,
          }
          const response = await postQuestionnaire(newQuestionnaire)
          console.log(response);
      } catch (error) {
          console.error('Error posting newQuestionnaire :', error);
      }
  } else {
      //Edit call
      try {
        // console.log(oldRow.questionnaireId,"update qb : ", updatedRow);
        const apiData = await editQuestionnaire(oldRow.questionnaireId, updatedRow)
        console.log(apiData);
      } catch (error) {
        console.error('Error updating Questionnaire :', error);
      }
  }
    // if (!updatedRow.isNew) {
    //   //Edit call
    //   try {
    //     // console.log(oldRow.questionnaireId,"update qb : ", updatedRow);
    //     const apiData = await editQuestionnaire(oldRow.questionnaireId, updatedRow)
    //     console.log(apiData);
    //   } catch (error) {
    //     console.error('Error updating Questionnaire :', error);
    //   }
    // }
  };

  // const onDeleteRow = async (id, oldRow, oldRows) => {
  //   try {
  //     //console.log(oldRow.questionnaireBankId);
  //     const apiData = await deleteQuestionnaireBank(oldRow.questionnaireBankId);
  //     console.log(apiData);
  //   } catch (error) {
  //     console.error('Error deleting QuestionnaireBank :', error);
  //   }
  // };

  const columns = [
    {
      field: "questionnaireId",
      headerName: "ID",
      flex:0.2,      //Changed by vanshita on 1-05-2024
    },
    {
      field: "questionnaireTitle",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      renderCell: (params) => (
        <Link to={`/questionnaire/${params.row.questionnaireId}`}>
          {params.value}
        </Link>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];

  // const getRowId = (row) => row.questionnaireBankId;

  return (
    <div>
      <Box m="20px">
        <Header
          title="Questionnaires"
          subtitle="List of Questionnaires for Feedback Collection"
        />
        <Box
          m="40px 0 0 0"
          height="75vh"
          width="100%"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
              fontSize: 14,    //Added by Vanshita on 1-05-2024
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
              fontSize: 14,    //Added by Vanshita on 1-05-2024
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            // "& .MuiDataGrid-toolbarContainer ": {
            //   display: 'none'
            // },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >

          <FullEditDataGrid
            columns={columns}
            rows={data}
            onSaveRow={onSaveRow}
            // onDeleteRow={onDeleteRow}
          // createRowData={createRowData}
          />
          
        </Box>
      </Box>
    </div>
  )
}
