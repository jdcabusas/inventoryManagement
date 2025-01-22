// src/components/TableComponent.js
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box, List, ListItem, ListItemText, Typography, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(" http://127.0.0.1:5000/get_all_data")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleSelectItem = (item) => {
    const isSelected = selectedItems.some(selectedItem => selectedItem["Item Name"] === item["Item Name"]);
    if (isSelected) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem["Item Name"] !== item["Item Name"]));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleCreateOrder = () => {
    if (selectedItems.length > 0) {
      navigate('/create-order', { state: { selectedItems } });
    } else {
      alert('Please select at least one item to create an order.');
    }
  };

    const handleRestockItems = () => {
    if (selectedItems.length > 0) {
      navigate('/restock-items', { state: { selectedItems } });
    } else {
      alert('Please select at least one item to create an order.');
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = data.filter(item =>
      item["Item Name"].toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: 4, padding: 2, backgroundColor: '#fff', boxShadow: 2, borderRadius: 2, overflowY: 'auto', maxHeight: '90vh' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Inventory Management
      </Typography>

      <TextField
        label="Search for Items"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        margin="normal"
        sx={{ marginBottom: 2 }}
      />

    <Box display="flex" justifyContent="flex-start" marginBottom={2} width="100%">
      <Button variant="contained" color="primary" onClick={handleCreateOrder} sx={{ padding: '10px 20px' }}>
        Create Order
      </Button>

      <Button variant="contained" color="primary" onClick={handleCreateOrder} sx={{ padding: '10px 20px', marginLeft: '10px' }}>
        Restock Items
      </Button>
    </Box>



      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4, width: '100%' }}>
        <Box sx={{ width: '70%' }}>
          <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f4f4f4' }}>Item Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f4f4f4' }}>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleSelectItem(item)}
                    sx={{
                      backgroundColor: selectedItems.some(selectedItem => selectedItem["Item Name"] === item["Item Name"])
                        ? "#e3f2fd" : "transparent",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <TableCell>{item["Item Name"]}</TableCell>
                    <TableCell>{item["Quantity"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ width: '28%' }}>
          <Typography variant="h6" gutterBottom align="center">
            Selected Items
          </Typography>
          <Box
            border={1}
            borderColor="gray"
            borderRadius="8px"
            padding="10px"
            height="100%"
            overflow="auto"
            sx={{ backgroundColor: "#fafafa" }}
          >
            <List>
              {selectedItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item["Item Name"]}
                    secondary={`Quantity: ${item["Quantity"]}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default TableComponent;
