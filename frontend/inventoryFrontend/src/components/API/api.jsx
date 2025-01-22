// src/components/API/api.js
export const fetchData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/get_all_data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
