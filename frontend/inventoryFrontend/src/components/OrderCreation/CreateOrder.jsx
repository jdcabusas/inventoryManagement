import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF

const CreateOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedItems } = location.state || {}; // Retrieve the selected items from the location state

  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);  // New loading state
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog visibility

  useEffect(() => {
    if (!selectedItems || selectedItems.length === 0) {
      navigate("/"); // Redirect if no items were passed
      return;  // Exit useEffect if no items
    }

    // Initialize the orderData state with the selected items
    const itemsWithQuantity = selectedItems.map((item) => ({
      ...item,
      quantity: "", // Add a quantity field to each item
    }));
    setOrderData(itemsWithQuantity);
    setLoading(false);  // Set loading to false after data is prepared
  }, [selectedItems, navigate]);

  // Handle input change for quantities
  const handleQuantityChange = (index, event) => {
    const newOrderData = [...orderData];
    newOrderData[index].quantity = event.target.value;
    setOrderData(newOrderData);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Show the confirmation dialog before submitting the order
    setOpenDialog(true);
  };

  // Handle order confirmation
  const handleConfirmOrder = () => {
    // Prepare the data to send
    const dataToSend = orderData.map(item => ({
      itemName: item["Item Name"],
      quantity: item.quantity,
    }));

    // Send the data to the backend
    axios
      .post("http://localhost:5000/create_order", { items: dataToSend })
      .then((response) => {
        console.log("Order created:", response.data);

        // Generate the PDF after the order is successfully created
        const doc = new jsPDF();
        doc.text("Order Summary", 10, 10);
        orderData.forEach((item, index) => {
          doc.text(`${item["Item Name"]}: ${item.quantity}`, 10, 20 + index * 10);
        });

        // Automatically download the PDF
        doc.save("order_summary.pdf");

        alert("Order created successfully!");
        navigate("/"); // Redirect back to the main page after successful submission
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        alert("Failed to create order.");
      });

    // Close the confirmation dialog
    setOpenDialog(false);
  };

  // Handle dialog close without submitting
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box padding={3}>
      <Typography variant="h5" gutterBottom>
        Create Order
      </Typography>
      {orderData.length > 0 ? (
        orderData.map((item, index) => (
          <Box key={index} marginBottom={2}>
            <Typography variant="body1">{item["Item Name"]}</Typography>
            <TextField
              label="Quantity"
              variant="outlined"
              type="number"
              value={item.quantity}
              onChange={(event) => handleQuantityChange(index, event)}
              fullWidth
            />
          </Box>
        ))
      ) : (
        <Typography variant="body1">No items selected</Typography>
      )}

      <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
        Submit Order
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Order</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Order Summary:</Typography>
          <Box>
            {orderData.map((item, index) => (
              <Typography key={index}>
                {item["Item Name"]}: {item.quantity}
              </Typography>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmOrder} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateOrder;
