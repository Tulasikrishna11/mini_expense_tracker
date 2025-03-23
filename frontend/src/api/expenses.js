import axios from '../config/axiosConfig';

export const getExpenses = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('/expenses', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteExpense = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
