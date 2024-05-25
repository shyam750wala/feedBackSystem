import React from 'react'
import Header from '../../../components/Header'
import { deleteQuestionnaireBank, editQuestionnaireBank, getAllQuestionnaireBanks } from '../../../services/superadmin';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from 'react';
import FullEditDataGrid from "mui-datagrid-full-edit";
import { Link } from 'react-router-dom';



export default function Index() {


  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const apiData = await getAllQuestionnaireBanks();
        setData(apiData.map((row, index) => ({ ...row, id: index + 1, isNew: false }))); // Assigning srNo starting from

        // setData(apiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromApi();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const onSaveRow = async (id, updatedRow, oldRow, oldRows) => {
    if (!updatedRow.isNew) {
      //Edit call
      try {
        //console.log("update qb : ", updatedRow);
        const apiData = await editQuestionnaireBank(oldRow.questionnaireBankId, updatedRow)
        console.log(apiData);
      } catch (error) {
        console.error('Error updating QuestionnaireBank :', error);
      }
    }
  };

  const onDeleteRow = async (id, oldRow, oldRows) => {
    try {
      //console.log(oldRow.questionnaireBankId);
      const apiData = await deleteQuestionnaireBank(oldRow.questionnaireBankId);
      console.log(apiData);
    } catch (error) {
      console.error('Error deleting QuestionnaireBank :', error);
    }
  };

  const columns = [
    {
      field: "questionnaireBankId",
      headerName: "ID",
      flex: 0.2,      //Changed by vanshita on 1-05-2024
    },
    {
      field: "questionnaireBankTitle",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      //Added on 9-05-2024
      renderCell: (params) => (
        <Link to={`/questionnairebank/${params.row.id}`}>
          {params.value}
        </Link>
      ),
    },
    {
      field: 'superAdmin',
      headerName: "SuperAdmin Email ID",
      flex: 0.5,       //Added by vanshita on 1-05-2024
      valueGetter: (params) => params.value.emailId,
      //   {
      //   console.log(params.value.emailId);
      //   params.value.emailId
      // }
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];

  const getRowId = (row) => row.questionnaireBankId;

  return (
    <div>
      <Box m="20px">
        <Header
          title="QuestionnaireBanks"
          subtitle="List of Questionnaires for Feedback Collection"
        />
        <Box
          m="40px 0 0 0"
          height="70vh"
          width="100%"
          overflow='auto'
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
            "& .MuiDataGrid-toolbarContainer ": {
              display: 'none'
            },
            // "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            //   color: `${colors.grey[100]} !important`,
            // },
          }}
        >

          <FullEditDataGrid
            columns={columns}
            rows={data}
            onSaveRow={onSaveRow}
            onDeleteRow={onDeleteRow}
          // createRowData={createRowData}
          />
          {/* <DataGrid
          rows={ data }
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={getRowId}
          onSaveRow={onSaveRow} 
        />*/}
        </Box>
      </Box>
    </div>
  )
}
