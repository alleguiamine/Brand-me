import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

function CategoryListScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/affiche/categorie');
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setError('An error occurred while fetching categories.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const deleteCategory = async (categoryId) => {
    try {
      // Make API call to delete category with given categoryId
      // After successful deletion, fetch categories again to update the list
      await axios.delete(`/api/categories/${categoryId}`);
      const { data } = await axios.get('/api/products/affiche/categorie');
      setCategories(data);
    } catch (error) {
      console.error('Error deleting category:', error);
      // Handle error if category deletion fails
    }
  };

  return (
<div className="m-4">  
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>
                <td>
                  <div className="">
                    <Button variant="danger" className="m-2" onClick={() => deleteCategory(category._id)}>
                      Delete
                    </Button>
                    {/* Add modify action button or link here */}
                    <Button variant="primary">
                      Modify
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      
    </div>
  );
}

export default CategoryListScreen;
