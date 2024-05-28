import React, { useEffect, useState } from 'react';
import { editCustomerAdmin, getAllCustomerAdmins, getAllQuestionnaire, getAllQuestionnaireBanks, getAllSubscriptionCategories,} from '../../../services/superadmin';
import FullEditDataGrid from "mui-datagrid-full-edit";
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';
import { getQuestionnaireByCustomerId, getQuestionnaireById, postQuestion, postQuestionnaire, postQuestionnaireQuestion } from '../../../services/customeradmin';

function Index() {
  const [rows, setRows] = useState([]);
  const [selectedCustomerAdminId, setSelectedCustomerAdminId] = useState(null);
  const [questionnaireBanks, setQuestionnaireBanks] = useState([]);
  const [selectedQuestionnaireBanks, setSelectedQuestionnaireBanks] = useState({});
  const [subscriptionCategories, setSubscriptionCategories] = useState([]);
  const [assignedQuestionnaires, setAssignedQuestionnaires] = useState({});
   
  const [open, setOpen] = useState(false);

  const getAllCustomerAdminsData = async () => {
    try {
      const apiData = await getAllCustomerAdmins();
      const formattedData = apiData.map((item) => ({
        id: item.customerAdminId,
        customerAdminId: item.customerAdminId,
        customerTokenId: item.customerTokenId,
        organizationName: item.organizationName,
        officialEmailId: item.officialEmailId,
        password: item.password,
        contactNo: item.contactNo,
        organizationNatureId: item.organizationNature.organizationNatureId,
        subscriptionCategoryName: item.subscriptionCategory?.subscriptionCategoryName,
        subscriptionCategoryId: item.subscriptionCategory?.subscriptionCategoryId,
        maxCustomers: item.subscriptionCategory?.maxCustomerUsers,
        maxResponses: item.subscriptionCategory?.maxResponses,
        status: item.status,
        questionnaireTitle: "Assign Questionnaire",
        isNew: false
      }));
      setRows(formattedData);
      console.log(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAllCustomerAdminsData();

    const fetchSubscriptionCategories = async () => {
      try {
        const categories = await getAllSubscriptionCategories();
        setSubscriptionCategories(categories);
      } catch (error) {
        console.error('Error fetching subscription categories:', error);
      }
    };
    fetchSubscriptionCategories();

    const fetchQuestionnaireBanks = async () => {
      try {
        const qb = await getAllQuestionnaireBanks();
        setQuestionnaireBanks(qb);
      } catch (error) {
        console.error('Error fetching questionnaire banks:', error);
      }
    };
    fetchQuestionnaireBanks();
  }, []);

  const fetchAssignedQuestionnaires = async (customerAdminId) => {
    try {
      const assigned = await getQuestionnaireByCustomerId(customerAdminId);
      const selectedBank = {};
      assigned.forEach(bank => {
        selectedBank[bank.questionnaireTitle] = bank;
      });
      setAssignedQuestionnaires(prev => ({
        ...prev,
        [customerAdminId]: selectedBank
      }));
     // setSelectedQuestionnaireBanks(selectedBank);
      console.log("Assigned Questionnaires:", selectedBank);
    } catch (error) {
      console.error('Error fetching assigned questionnaires:', error);
    }
  };

  const handleOpen = async (customerAdminId) => {
    console.log("Selected Customer Admin Id:", customerAdminId);
    setSelectedCustomerAdminId(customerAdminId);
    console.log(selectedCustomerAdminId);
    await fetchAssignedQuestionnaires(customerAdminId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuestionnaireSelection = (bank) => (event) => {
    console.log("Bank selected:", bank);
    const selected = event.target.checked;
    setSelectedQuestionnaireBanks((prevSelected) => {
      const updatedSelection = selected
        ? { ...prevSelected, [bank.questionnaireBankTitle]: bank }
        : Object.fromEntries(Object.entries(prevSelected).filter(([key]) => key !== bank.questionnaireBankTitle));
      console.log("Updated Selection:", updatedSelection);
      return updatedSelection;
    });
  };

  // const onSaveRow = async (id, updatedRow, oldRow) => {
  //   console.log("Selected Banks for Customer Admin ID:", updatedRow.customerAdminId, selectedQuestionnaireBanks);
  //   try {
  //     if (!updatedRow.isNew) {
  //       const updatedData = await editCustomerAdmin(oldRow.customerAdminId, updatedRow);
  //       const updatedRows = rows.map(row => (row.id === updatedData.customerAdminId ? updatedData : row));

  //       // const combinedBanks = {
  //       //   ...assignedQuestionnaires,
  //       //   ...selectedQuestionnaireBanks
  //       // };
  //       // console.log('Combined Banks:', combinedBanks);

  //       // const selectedBankss = Object.values(combinedBanks);
  //       // console.log('Selected Banks:', selectedBankss);


  //       const selectedBanks = Object.values(selectedQuestionnaireBanks);
  //       console.log('Selected Banks:', selectedBanks);

  //       for (const bank of selectedBanks) {
  //         const newQuestionnaire = {
  //           questionnaireTitle: bank.questionnaireBankTitle,
  //           customerAdminId: updatedRow.customerAdminId,
  //         }
  //         const response = await postQuestionnaire(newQuestionnaire);
  //         // console.log("newQuestionnaire :", response)
  //         const questionnaireQuestionBanks = bank.questionnaireQuestionBanks
  //         for (const qqb of questionnaireQuestionBanks) {
  //           const newQuestion = {
  //             questionText: qqb.questionBank.questionBankText,
  //             customerAdminId: updatedRow.customerAdminId,
  //             questionCategoryId: qqb.questionBank.questionCategoryId
  //           }
  //           const quesResponse = await postQuestion(newQuestion);
  //           // console.log("newQuestion : ",quesResponse);
  //           const newQuestionnaireQuestion = {
  //             questionnaireId: response.questionnaireId,
  //             questionId: quesResponse.questionId,
  //             customerAdminId: updatedRow.customerAdminId,
  //             serialNo: 2
  //           }

  //           const qqResponse = await postQuestionnaireQuestion(newQuestionnaireQuestion);
  //           console.log("newQuestionnaireQuestion : ", qqResponse);
  //         }
  //       }
  //       // setRows(updatedRows);
  //       getAllCustomerAdminsData();
  //       setOpen(false);
  //       setSelectedQuestionnaireBanks({});
  //     }
  //   } catch (error) {
  //     console.error('Error saving selected questionnaire banks:', error);
  //   }
  // };



  const handleCategoryChange = (event, id) => {
    const newValue = event.target.value;
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, subscriptionCategoryId: newValue, subscriptionCategoryName: subscriptionCategories.find(cat => cat.subscriptionCategoryId === newValue).subscriptionCategoryName };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const columns = [
    { field: "customerAdminId", headerName: "ID", flex: 0.2 },
    { field: "customerTokenId", headerName: "Token Id", flex: 0.5 },
    { field: 'organizationName', headerName: "Organization Name", flex: 1 },
    { field: 'officialEmailId', headerName: "Email Id", flex: 1 },
    { field: 'organizationNatureId', headerName: "Organization Nature", flex: 1 },
    {
      field: "subscriptionCategoryName", headerName: "Category", flex: 1, editable: true,
      renderEditCell: (params) => {
        const value = params.row.subscriptionCategoryId ;
        console.log("value is",value);
        return (
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id={`category-select-label-${params.row.subscriptionCategoryName}`}>{params.row.subscriptionCategoryName}</InputLabel>
              <Select
                 labelId={`category-select-label-${params.id}`}
                id={`category-select-${params.id}`}
               value={value}
               defaultValue={value}
                onChange={(event) => handleCategoryChange(event, params.id)}
              >
                {subscriptionCategories.map((category) => (
                  <MenuItem key={category.subscriptionCategoryId} value={category.subscriptionCategoryId}>
                    {category.subscriptionCategoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
      }
    },
    { field: 'maxResponses', headerName: "No Of Responses", flex: 1 },
    { field: 'maxCustomers', headerName: "No Of Customers", flex: 1 },
    { field: "status", headerName: "Status", flex: 1, editable: true },
    {
      field: "questionnaireTitle", headerName: "Questionnaire Name", flex: 1, editable: true,
      renderEditCell: (params) => (
        <Box display='flex' flexDirection='column'>
          <Button variant="contained" onClick={() => handleOpen(params.row.customerAdminId)}>
            Assign Questionnaire
          </Button>
          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Questionnaire Assignments</DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {questionnaireBanks.map((bank) => (
                  <FormControlLabel
                    key={bank.questionnaireBankId}
                    control={
                      <Checkbox
                       checked={!!assignedQuestionnaires[selectedCustomerAdminId]?.[bank.questionnaireBankTitle] || !!selectedQuestionnaireBanks[bank.questionnaireBankTitle]}
                        onChange={handleQuestionnaireSelection(bank)}
                      />
                    }
                    label={bank.questionnaireBankTitle}
                  />
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )
    },
  ];

  return (
    <>
      <div style={{ width: 'auto', overflowY: 'auto' }}>
        <FullEditDataGrid
          columns={columns}
          rows={rows}
        //  onSaveRow={onSaveRow}
        />
      </div>
    </>
  );
}

export default Index;