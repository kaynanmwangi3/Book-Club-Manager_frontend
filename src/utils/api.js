export const fetchUsers = async () => {
  try {
    const response = await fetch(' https://book-club-manager-backend.onrender.com/users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return { users: [] };
  }
};

export const fetchBooks = async () => {
  try {
    const response = await fetch(' https://book-club-manager-backend.onrender.com/books');
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    return { books: [] };
  }
};

export const fetchClubs = async () => {
  try {
    const response = await fetch('https://book-club-manager-backend.onrender.com/clubs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return { clubs: [] };
  }
};

export const addBook = async (bookData) => {
  try {
    const response = await fetch('https://book-club-manager-backend.onrender.com/books', {
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
    const response = await fetch(`https://book-club-manager-backend.onrender.com/books/ownership/${bookId}/`, {
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
    const response = await fetch(' https://book-club-manager-backend.onrender.com/clubs', {
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
    const response = await fetch(` https://book-club-manager-backend.onrender.com/clubs/${clubId}`, {
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
    const response = await fetch(` https://book-club-manager-backend.onrender.com/users/${userId}`, {
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