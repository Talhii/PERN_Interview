import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
} from '@mui/material';

interface Item {
  id: number;
  name: string;
  description: string;
}

interface PaginatedResponse {
  items: Item[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

const API_URL = 'http://localhost:3000/api';
const ITEMS_PER_PAGE = 5;

const Dashboard: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item>({ id: 0, name: '', description: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch items from backend
  const fetchItems = async (page: number) => {
    try {
      const response = await axios.get<PaginatedResponse>(`${API_URL}/items`, {
        params: {
          page,
          limit: ITEMS_PER_PAGE
        }
      });
      setItems(response.data.items);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const handleOpen = (item?: Item) => {
    if (item) {
      setCurrentItem(item);
    } else {
      setCurrentItem({ id: 0, name: '', description: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      if (currentItem.id === 0) {
        // Create new item
        await axios.post(`${API_URL}/items`, {
          name: currentItem.name,
          description: currentItem.description
        });
      } else {
        // Update existing item
        await axios.put(`${API_URL}/items/${currentItem.id}`, {
          name: currentItem.name,
          description: currentItem.description
        });
      }
      handleClose();
      fetchItems(currentPage);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/items/${id}`);
      // Refresh the current page
      fetchItems(currentPage);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
        style={{ margin: '20px 0' }}
      >
        Add New Item
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(item)} color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(item.id)} color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, gap: 2 }}>
        <Button
          variant="contained"
          color="inherit"
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          sx={{ bgcolor: 'grey.100' }}
        >
          Previous
        </Button>

        {[...Array(5)].map((_, index) => {
          const pageNumber = currentPage - 2 + index;
          if (pageNumber > 0 && pageNumber <= totalPages) {
            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "contained" : "outlined"}
                color={currentPage === pageNumber ? "primary" : "inherit"}
                onClick={() => setCurrentPage(pageNumber)}
                sx={{ 
                  minWidth: '40px',
                  bgcolor: currentPage === pageNumber ? 'primary.main' : 'grey.100'
                }}
              >
                {pageNumber}
              </Button>
            );
          }
          return null;
        })}

        <Button
          variant="contained"
          color="inherit"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          sx={{ bgcolor: 'grey.100' }}
        >
          Next
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentItem.id === 0 ? 'Add New Item' : 'Edit Item'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={currentItem.name}
            onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={currentItem.description}
            onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
