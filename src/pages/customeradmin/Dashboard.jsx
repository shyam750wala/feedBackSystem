// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts';
// import { getAllFeedbackDetails } from '../../services/customeradmin';

// const Dashboard = () => {
//   const [feedbackData, setFeedbackData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getAllFeedbackDetails();
//         setFeedbackData(response);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const getRatingsCount = (data) => {
//     const ratingsCount = {};
//     data.forEach((feedback) => {
//       const rating = feedback.responseRating;
//       ratingsCount[rating] = (ratingsCount[rating] || 0) + 1;
//     });
//     return ratingsCount;
//   };

//   const ratingsCount = getRatingsCount(feedbackData);
//   const seriesData = Object.entries(ratingsCount).map(([rating, count]) => ({
//     rating: rating.toString(), // Convert rating to string if necessary
//     count,
//   }));

//   return (
//     <div>
//       <h1>Feedback Response Ratings</h1>
//       <BarChart
//         series={[
//           {
//             data: seriesData.map(({ count }) => count),
//             label: 'Response Ratings',
//           },
//         ]}
//         height={300}
//         xAxis={[
//           {
//             data: seriesData.map(({ rating }) => rating),
//             label: 'Ratings',
//             scaleType: 'band', // Set the x-axis scale type to "band"
//           },
//         ]}
//         margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
//       />
//     </div>
//   );
// };

// export default Dashboard;
import React from 'react'

function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
