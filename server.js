const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'laithsurkhi',
  password: '1234567',
  database: 'hotel_bookingg'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.use(express.json());
app.use(express.static('frontend'));

app.get('/api/rooms', (req, res) => {
  const { capacity, area, hotel_chain, category, min_price, max_price } = req.query;
  let query = `
    SELECT r.id, r.hotel_name, r.hotel_chain_name, r.price, r.capacity, r.view, r.extension, h.address
    FROM Room r
    JOIN Hotel h ON r.hotel_name = h.name
    WHERE 1=1
  `;

  if (capacity && capacity !== 'any') query += ` AND r.capacity >= ${capacity}`;
  if (area && area !== 'any') query += ` AND h.address LIKE '%${area}%'`;
  if (hotel_chain && hotel_chain !== 'any') query += ` AND r.hotel_chain_name = '${hotel_chain}'`;
  if (category && category !== 'any') query += ` AND h.category = '${category}'`;
  if (min_price) query += ` AND r.price >= ${min_price}`;
  if (max_price) query += ` AND r.price <= ${max_price}`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Failed to fetch rooms' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/hotel-chains', (req, res) => {
  db.query('SELECT DISTINCT hotel_chain_name FROM Hotel', (err, results) => {
    if (err) {
      console.error('Error fetching hotel chains:', err);
      res.status(500).json({ error: 'Failed to fetch hotel chains' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/areas', (req, res) => {
  db.query('SELECT DISTINCT address FROM Hotel', (err, results) => {
    if (err) {
      console.error('Error fetching areas:', err);
      res.status(500).json({ error: 'Failed to fetch areas' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/room-capacities', (req, res) => {
  db.query('SELECT DISTINCT capacity FROM Room', (err, results) => {
    if (err) {
      console.error('Error fetching room capacities:', err);
      res.status(500).json({ error: 'Failed to fetch room capacities' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/categories', (req, res) => {
  db.query('SELECT DISTINCT category FROM Hotel', (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Failed to fetch categories' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/rooms/:id', (req, res) => {
  const roomId = req.params.id;
  db.query('SELECT * FROM Room WHERE id = ?', [roomId], (err, results) => {
    if (err) {
      console.error('Error fetching room details:', err);
      res.status(500).json({ error: 'Failed to fetch room details' });
      return;
    }
    res.json(results[0]); 
  });
});

app.get('/api/bookings', (req, res) => {
    db.query('SELECT * FROM Books', (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            return res.status(500).json({ error: 'Failed to fetch bookings' });
        }
        res.json(results);
    });
});

app.post('/api/bookings', (req, res) => {
  const { roomId, startDate, endDate, userId } = req.body;

  if (!roomId || !startDate || !endDate || !userId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO Books (customer_id, room_id, start_date, end_date) VALUES (?, ?, ?, ?)';
  db.query(query, [userId, roomId, startDate, endDate], (err, results) => {
    if (err) {
      console.error('Error saving booking:', err);
      return res.status(500).json({ error: 'Failed to save booking' });
    }
    res.json({ message: 'Booking confirmed!' });
  });
});

app.post('/api/employee/login', (req, res) => {
    const { ssn, password } = req.body;

    if (!ssn || !password) {
        return res.status(400).json({ success: false, message: 'SSN and password are required.' });
    }

    const query = 'SELECT * FROM Employee WHERE ssn = ?';
    db.query(query, [ssn], (err, results) => {
        if (err) {
            console.error('Error checking employee:', err);
            return res.status(500).json({ success: false, message: 'Internal server error.' });
        }

        if (results.length > 0) {
            
            return res.json({ success: true, employee: results[0] }); // Return employee details
        } else {
            return res.status(401).json({ success: false, message: 'Invalid SSN or password.' });
        }
    });
});

app.post('/api/bookings/convert-to-rental', (req, res) => {
  const { customerId, roomId } = req.body; 

  if (!customerId || !roomId) {
      return res.status(400).json({ error: 'Customer ID and Room ID are required' });
  }

  console.log('Fetching booking details for Customer ID:', customerId, 'and Room ID:', roomId); 

  const fetchBookingQuery = 'SELECT * FROM Books WHERE customer_id = ? AND room_id = ?';
  db.query(fetchBookingQuery, [customerId, roomId], (err, results) => {
      if (err) {
          console.error('Error fetching booking details:', err);
          return res.status(500).json({ error: 'Failed to fetch booking details' });
      }

      console.log('Booking details:', results); 

      if (results.length === 0) {
          console.error('Booking not found for Customer ID:', customerId, 'and Room ID:', roomId); 
          return res.status(404).json({ error: 'Booking not found' });
      }

      const booking = results[0];

      const insertRentalQuery = 'INSERT INTO Rentals (customer_id, room_id, start_date, end_date) VALUES (?, ?, ?, ?)';
      db.query(insertRentalQuery, [booking.customer_id, booking.room_id, booking.start_date, booking.end_date], (err, results) => {
          if (err) {
              console.error('Error converting booking to rental:', err); // Debug log
              return res.status(500).json({ error: 'Failed to convert booking to rental' });
          }

          const deleteBookingQuery = 'DELETE FROM Books WHERE customer_id = ? AND room_id = ?';
          db.query(deleteBookingQuery, [customerId, roomId], (err, results) => {
              if (err) {
                  console.error('Error deleting booking:', err);
                  return res.status(500).json({ error: 'Failed to delete booking' });
              }

              res.json({ message: 'Booking successfully turned into rental' });
          });
      });
  });
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});
