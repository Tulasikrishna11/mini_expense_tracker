import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './ExpenseChart.css'; // Import the CSS file

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart = ({ data }) => {
    const chartData = {
        labels: data.map(expense => expense.category),
        datasets: [
            {
                label: 'Expenses',
                data: data.map(expense => expense.amount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return <div className="chart-container"><Bar data={chartData} /></div>;
};

export default ExpenseChart;