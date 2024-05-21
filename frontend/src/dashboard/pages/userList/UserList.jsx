import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users/users'); // Assuming your backend route is '/api/users'
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`); // Assuming your backend delete route is '/api/users/:id'
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('There was an error deleting the user!', error);
    }
  };

  return (
    <div className="home">
      <div className="container">
        <div className="container my-2 py-2">
          <div className="row">
            <div className="col-12">
              <h1
                style={{ fontFamily: "'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif" }}
                className="display-6 text-center mb-4"
              >
                Liste des utilisateurs
              </h1>
              <hr className="w-25 mx-auto" />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <img
                          src={user.image ? user.image : '/images/th.jpeg' } // Use default image if user image is not available
                          style={{ width: '70px', height: '70px', borderRadius: '50%', marginRight: '10px' }}
                          className="circular-image"
                          alt="user"
                        />
                      </td>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;

