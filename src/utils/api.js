export const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:5000/users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return { users: [] };
  }
};

export const fetchBooks = async () => {
  try {
    const response = await fetch('http://localhost:5000/books');
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    return { books: [] };
  }
};

export const fetchClubs = async () => {
  try {
    const response = await fetch('http://localhost:5000/clubs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return { clubs: [] };
  }
};

export const addBook = async (bookData) => {
  try {
    const response = await fetch('http://localhost:5000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding book:', error);
    return { success: false, message: error.message };
  }
};

export const addBookOwnership = async (bookId, userId) => {
  try {
    const response = await fetch(`http://localhost:5000/books/ownership/${bookId}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, role: 'owner' }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding book ownership:', error);
    return { success: false, message: error.message };
  }
};

// In src/utils/api.js, add these functions

export const addClub = async (clubData) => {
  try {
    const response = await fetch('http://localhost:5000/clubs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clubData),
    });
    const data = await response.json()
    return data;
  } catch (error) {
    console.error('Error adding club:', error);
    return { success: false, message: error.message };
  }
};

export const deleteClub = async (clubId) => {
  try {
    const response = await fetch(`http://localhost:5000/clubs/${clubId}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting club:', error);
    return { success: false, message: error.message };
  }
};

export const updateUser = async (userId, updates) => {
  try {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, message: error.message };
  }
};