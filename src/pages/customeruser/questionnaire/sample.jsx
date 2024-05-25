import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import { Box, Grid, Typography } from '@mui/material'; // Import Grid and Typography from MUI
import { Link, useLocation } from 'react-router-dom';
import { getCustomerUserById } from '../../../services/customeruser';

export default function Sample() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [questionnaireAssignments, setQuestionnaireAssignments] = useState([]);
    const location = useLocation();
    const customerUserId = location.state?.customerUserId;

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const apiData = await getCustomerUserById(customerUserId);
                console.log("ccccciddd", customerUserId);
                setQuestionnaireAssignments(apiData.questionnaireAssignments);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (customerUserId) {
            fetchDataFromApi();
        }
    }, [customerUserId]);

    return (
        <div>
            <Box m="20px">
                <Header
                    title="Questionnaires"
                    subtitle="List of Questionnaires for Feedback Collection"
                />
                <Grid container spacing={2}> {/* Use Grid container */}
                    {questionnaireAssignments.length > 0 ? (
                        questionnaireAssignments.map((assignment, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}> {/* Adjust grid item size based on screen size */}
                                <Box
                                    p={2}
                                    border="1px solid #ccc"
                                    borderRadius="8px"
                                    textAlign="center"
                                    boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
                                    bgcolor={colors.greenAccent[200]}
                                >
                                    <Link 
                                        to={`/questionnaire/${assignment.questionnaireId}`}
                                        style={{ 
                                            textDecoration: 'none',
                                            color: colors.blueAccent[800]
                                        }} 
                                    >
                                        <h2>{assignment.questionnaire.questionnaireTitle}</h2>
                                    </Link>
                                </Box>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h6" color="textSecondary" align="center" style={{ width: '100%' }}>
                            No questionnaires are available.
                        </Typography>
                    )}
                </Grid>
            </Box>
        </div>
    );
}
