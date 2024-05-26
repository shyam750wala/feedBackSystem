import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { getAllFeedbackDetails } from '../../services/customeradmin';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [ratingDistribution, setRatingDistribution] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllFeedbackDetails();
        setFeedbackData(response);
        console.log("feedbackdata", response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (feedbackData.length > 0) {
      const categoryRatings = {};
      const distribution = {};

      feedbackData.forEach(feedback => {
        const category = feedback.question.questionCategory.categoryName;
        const rating = feedback.responseRating;

        if (!categoryRatings[category]) {
          categoryRatings[category] = { totalRating: 0, count: 0 };
          distribution[category] = {};
        }

        categoryRatings[category].totalRating += rating;
        categoryRatings[category].count += 1;

        if (!distribution[category][rating]) {
          distribution[category][rating] = 0;
        }
        distribution[category][rating] += 1;
      });

      const processedData = Object.keys(categoryRatings).map(category => ({
        categoryName: category,
        averageRating: (categoryRatings[category].totalRating / categoryRatings[category].count).toFixed(2)
      }));

      const distributionData = Object.keys(distribution).map(category => ({
        categoryName: category,
        ratings: Object.keys(distribution[category]).map(rating => ({
          name: `Rating ${rating}`,
          value: distribution[category][rating]
        }))
      }));

      setChartData(processedData);
      setRatingDistribution(distributionData);
      console.log("chart", processedData); // Log processed data
      console.log("distribution", distributionData); // Log distribution data
    }
  }, [feedbackData]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Average Ratings by Category</h2>
      <div style={styles.scrollContainer}>
        {chartData.length > 0 ? (
          <div style={styles.chartsContainer}>
            <BarChart width={600} height={300} data={chartData} style={styles.chart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoryName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="averageRating" fill="#8884d8" />
            </BarChart>
            {ratingDistribution.map(dist => (
              <div key={dist.categoryName} style={styles.chart}>
                <h3>{dist.categoryName} - Rating Distribution</h3>
                <PieChart width={400} height={400}>
                  <Pie
                    data={dist.ratings}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dist.ratings.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
  },
  header: {
    textAlign: 'center',
  },
  scrollContainer: {
    width: '100%',
    height: '600px', // Set this height as needed
    overflowY: 'auto',
    padding: '20px',
    boxSizing: 'border-box',
  },
  chartsContainer: {
    display: 'flex',
    flexDirection: 'column', // Changed to column for vertical stacking
    alignItems: 'center',
  },
  chart: {
    margin: '20px',
  },
};

export default Dashboard;
