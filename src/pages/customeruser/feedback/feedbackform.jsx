import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik'; // Import Formik components
import Header from '../../../components/Header';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import * as yup from "yup";
import { Box, Button, Grid, Rating, Typography, TextField } from '@mui/material'; // Import TextField from MUI
import { Link, useParams } from 'react-router-dom';
import { getQuestionnaireById } from '../../../services/customeradmin';
import { postFeedbackDetails, postFeedbackMaster } from '../../../services/customeruser';

export default function FeedbackForm() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams();
    const [questionnaire, setQuestionnaire] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const apiData = await getQuestionnaireById(id);
                setQuestionnaire(apiData);
            } catch (error) {
                console.error('Error fetching questionnaire:', error);
            }
        };
        fetchDataFromApi();
    }, []);

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                setQuestions(questionnaire.questionnaireQuestions);
                console.log("questionnaire:", questionnaire);
            } catch (error) {
                console.error('Error setting questions:', error);
            }
        };
        fetchDataFromApi();
    }, [questionnaire]);

    if (!questionnaire) {
        return '<div>Loading...</div>';
    }

    const checkoutSchema = yup.object().shape({
        name: yup.string().required("* required"),
        contactNo: yup.string().required("* required"),
        dob: yup.string().required("* required"),
    });

    const handleFormSubmit = async (values) => {
        var personalData = {
            personName: values.name,
            personContactNo: values.contactNo,
            dateOfBirth: values.dob,
            questionnaireId: id,
            customerUserId: 1,
        }
        console.log("personalData :", personalData);



        try {
            var feedbackMaster = await postFeedbackMaster(personalData)
            console.log("postFeedbackMaster :", feedbackMaster);
            var ratings = questions.map((question, index) => ({
                feedBackMasterId: feedbackMaster.feedbackMasterId,
                questionId: question.questionId,
                responseRating: values[`rating-${index}`]
            }));
            console.log("ratings :", ratings);

            var promises = ratings.map(async (rating) => {
                try {
                    var feedbackDetails = await postFeedbackDetails(rating);
                    console.log("postFeedbackDetails :", feedbackDetails);
                } catch (error) {
                    console.error('Error posting feedback details:', error);
                }
            });

            await Promise.all(promises);
            // Refresh the page after all POST requests are successful
            window.location.reload();
        } catch (error) {
            console.error('Error posting feedback master:', error);
        }
    }


    return (
        <div>
            <Box m="20px">
                <Header
                    title="Collect Feedback"
                    subtitle="Fill up the feedback form"
                />
                <Box height='540px' overflow='auto' mt={1}>
                    <Formik
                        initialValues={{
                            name: '',
                            contactNo: '',
                            dob: '',
                            ratings: Array(questions.length).fill(0)
                        }}
                        validationSchema={checkoutSchema}
                        onSubmit={(values) => {
                            // Handle form submission here
                            console.log(values);
                            handleFormSubmit(values);
                        }}
                    >
                        {({ values, errors, touched, handleBlur, handleChange }) => (
                            <Form>
                                <Box
                                    sx={{
                                        border: '2px solid',
                                        borderColor: colors.primary[200],
                                        borderRadius: '10px',
                                        padding: '20px',
                                        position: 'relative',
                                        margin: '10px',
                                        marginTop: '20px'
                                    }}
                                >
                                    <Typography variant="h4"
                                        position="absolute"
                                        top={-20}
                                        bgcolor={colors.grey[100]}
                                        padding={1}
                                        color={colors.greenAccent[700]}
                                        borderRadius="10px"
                                    >
                                        Personal Details
                                    </Typography>
                                    {/* Use Field components from Formik */}
                                    <Box key="personal-details" mb={2} mt={2}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <Field
                                                    as={TextField}
                                                    id="name"
                                                    label="Name"
                                                    variant="filled"
                                                    fullWidth
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    error={touched.name && !!errors.name}
                                                    helperText={touched.name && errors.name}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Field
                                                    as={TextField}
                                                    id="contactNo"
                                                    label="Contact Number"
                                                    variant="filled"
                                                    fullWidth
                                                    value={values.contactNo}
                                                    onChange={handleChange}
                                                    error={touched.contactNo && !!errors.contactNo}
                                                    helperText={touched.contactNo && errors.contactNo}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <Field
                                                    as={TextField}
                                                    id="dob"
                                                    label="Date of Birth"
                                                    type="date"
                                                    variant="filled"
                                                    fullWidth
                                                    value={values.dob}
                                                    onChange={handleChange}
                                                    error={touched.dob && !!errors.dob}
                                                    helperText={touched.dob && errors.dob}
                                                    InputLabelProps={{ shrink: true }} // Ensures label shrinks when value is entered
                                                    placeholder="Select Date of Birth"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>

                                {/* Map through other questions */}
                                <Box
                                    sx={{
                                        border: '2px solid',
                                        borderColor: colors.primary[200],
                                        borderRadius: '10px',
                                        padding: '20px',
                                        position: 'relative',
                                        margin: '10px',
                                        marginTop: '30px'
                                    }}
                                >
                                    <Typography variant="h4"
                                        position="absolute"
                                        top={-20}
                                        bgcolor={colors.grey[100]}
                                        padding={1}
                                        color={colors.greenAccent[700]}
                                        borderRadius="10px"
                                    >
                                        Feedback Collection
                                    </Typography>

                                    {questions.length === 0 ? (
                                        <Typography variant="h5" mt={2} mb={2}>No questions found...</Typography>
                                    ) : (
                                        questions.map((question, index) => (
                                            <Box key={index} mb={2} mt={2}>
                                                <Typography variant="h5">{question.question.questionText}</Typography>
                                                {/* Add Rating input */}
                                                <Field as={Rating} name={`rating-${index}`} defaultValue={0} max={5} precision={1} size='large' />
                                            </Box>
                                        ))
                                        
                                    )}
                                    {/* {questions.map((question, index) => (

                                        <Box key={index} mb={2} mt={2}>
                                            <Typography variant="h5">{question.question.questionText}</Typography>
                                            <Field as={Rating} name={`rating-${index}`} defaultValue={0} max={5} precision={1} size='large' />
                                        </Box>
                                        // <h2>{question.question.questionText}</h2>
                                    ))} */}
                                    {questions.length > 0 && <Button type='submit' variant="contained"sx={{fontWeight:'bolder'}} color="secondary">Submit Feedback</Button>}
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </div>
    );
}
