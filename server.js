const express = require('express');
const mysql = require('mysql2');
const config = require('./config'); 

const app = express();
const port = 3000;

const db = mysql.createConnection(config);

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
    SELECT r.id, r.hotel_name, r.hotel_chain_name, r.hotel_address, r.price, r.capacity, r.view, r.extension, h.address
    FROM Room r
    JOIN Hotel h ON r.hotel_name = h.name
    WHERE 1=1
  `;

  if (capacity && capacity !== 'any') query += ` AND r.capacity = ${capacity}`;
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

app.get('/api/hotel-chains-average-prices', (req, res) => {
  db.query('SELECT * FROM Average_Price_Per_Chain', (err, results) => {
    if (err){
      console.error('Error fetching hotel chains average:', err);
      res.status(500).json({ error: 'Failed to fetch hotel chains average' });
      return;
    }
    res.json(results);
  })
})

app.get('/api/hotel-capacities', (req, res) => {
  db.query('SELECT * FROM Hotel_Capacity', (err, results) => {
    if (err){
      console.error('Error fetching hotel capacities:', err);
      res.status(500).json({ error: 'Failed to fetch hotel capacities' });
      return;
    }
    res.json(results);
  })
})


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

app.get('/api/hotels', (req, res) => {
  db.query('SELECT * FROM Hotel', (err, results) => {
    if (err) {
        console.error('Error fetching hotels:', err);
        return res.status(500).json({ error: 'Failed to fetch hotels' });
    }
    res.json(results); 
  });
});

app.get('/api/customers', (req, res) => {
  db.query('SELECT Customer.id, Person.first_name, Person.last_name, Customer.registration_date FROM Customer, Person WHERE Customer.person_id = Person.id', (err, results) => {
    if (err) {
        console.error('Error fetching customers:', err);
        return res.status(500).json({ error: 'Failed to fetch customers' });
    }
    res.json(results); 
  });
});

app.get('/api/employees', (req, res) => {
  db.query('SELECT Employee.ssn, Person.first_name, Person.last_name, Employee.position FROM Employee, Person WHERE Employee.person_id = Person.id', (err, results) => {
    if (err) {
        console.error('Error fetching employees:', err);
        return res.status(500).json({ error: 'Failed to fetch employees' });
    }
    res.json(results); 
  });
});

app.get('/api/rentals', (req, res) => {
  db.query('SELECT * FROM Rentals', (err, results) => {
    if (err) {
        console.error('Error fetching rentals:', err);
        return res.status(500).json({ error: 'Failed to fetch rentals' });
    }
    res.json(results); 
  });
});

app.get('/api/persons/:id', (req, res) => {
  const personId = req.params.id;
  db.query('SELECT * FROM Person WHERE id = ?', [personId], (err, results) => {
    if (err) {
        console.error('Error fetching person\'s details:', err);
        res.status(500).json({ error: 'Failed to fetch person\'s details' });
        return;
    }
    res.json(results[0]);
  });
});

app.get('/api/employees/:ssn', (req, res) => {
  const ssn = req.params.ssn;
  db.query('SELECT Employee.ssn, Person.first_name, Person.last_name, Employee.position FROM Employee, Person WHERE ssn = ? AND Employee.person_id = Person.id', [ssn], (err, results) => {
    if (err) {
        console.error('Error fetching employee\'s details:', err);
        res.status(500).json({ error: 'Failed to fetch employee\'s details' });
        return;
    }
    res.json(results[0]);
  });
});

app.get('/api/customers/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT Customer.id, Person.first_name, Person.last_name, Customer.registration_date FROM Customer, Person WHERE Customer.id = ? AND Customer.person_id = Person.id', [id], (err, results) => {
    if (err) {
        console.error('Error fetching customer\'s details:', err);
        res.status(500).json({ error: 'Failed to fetch customer\'s details' });
        return;
    }
    res.json(results[0]);
  });
});

app.get('/api/hotels/:name', (req, res) => {
  const name = req.params.name;
  db.query('SELECT * FROM Hotel WHERE name = ?', [name], (err, results) => {
    if (err) {
        console.error('Error fetching hotel\'s details:', err);
        res.status(500).json({ error: 'Failed to fetch hotel\'s details' });
        return;
    }
    res.json(results[0]);
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

app.put("/api/employees/:ssn", (req, res) => {
  const { ssn } = req.params;
  console.log(req.body)
  const {newssn, firstName, lastName, position } = req.body;
  console.log(newssn);

  db.query(`SELECT person_id FROM Employee WHERE ssn = ?`, [ssn], (err, results) => {
    if (err) {
        console.error('Error fetching employee details:', err);
        return res.status(500).json({ error: 'Failed to fetch employee details' });
    }

    if (results.length === 0) {
        return res.status(404).json({ error: 'Employee not found' });
    }
    const person_id = results[0].person_id; // Extract person_id correctly

    // Step 2: Update Person table
    db.query(`UPDATE Person SET first_name = ?, last_name = ? WHERE id = ?`, [firstName, lastName, person_id], (err) => {
        if (err) {
            console.error('Error updating person details:', err);
            return res.status(500).json({ error: 'Failed to update person details' });
        }

        // Step 3: Update Employee table
        db.query(`UPDATE Employee SET ssn = ?, position = ? WHERE ssn = ?`, [newssn, position, ssn], (err) => {
            if (err) {
                console.error('Error updating employee details:', err);
                return res.status(500).json({ error: 'Failed to update employee details' });
            }

            res.json({ message: "Employee successfully updated!" });
        });
    });
  });
});

app.put("/api/customers/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.body)
  const { firstName, lastName} = req.body;

  db.query(`SELECT person_id FROM Customer WHERE id = ?`, [id], (err, results) =>{
    if (err) {
      console.error('Error fetching employee details:', err);
      res.status(500).json({ error: 'Failed to fetch employee details' });
      return;
    }
    const person_id = results[0].person_id;
    db.query(`UPDATE Person SET first_name = ?, last_name = ? WHERE id = ?`, [firstName, lastName, person_id], (err, results) => {
      if (err) {
        console.error('Error updating person details:', err);
        res.status(500).json({ error: 'Failed to updating person details' });
        return;
      }      
        res.json("Customer succesfully updated!");
      });
  });

});

app.put("/api/hotels/:name", (req, res) => {
  const { name } = req.params;
  console.log(req.body)
  const {hotel_name, address, category, manager_ssn, email} = req.body;

  db.query(`UPDATE Hotel SET name = ?, address = ?, category = ?, manager_ssn = ?, email_value=? WHERE name = ?`, [hotel_name,address, category, manager_ssn, email, name], (err, results) => {
      if (err) {
        console.error('Error updating hotel details:', err);
        res.status(500).json({ error: 'Failed to updating hotel details' });
        return;
      }
      res.json("Hotel succesfully updated!"); 
  });
});

app.put("/api/rooms/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.body)
  const {price, capacity, view, extension} = req.body;

  db.query(`UPDATE Room SET price = ?, capacity = ?, view = ?, extension = ? WHERE id = ?`, [price, capacity, view, extension, id], (err, results) => {
      if (err) {
        console.error('Error updating room details:', err);
        res.status(500).json({ error: 'Failed to updating room details' });
        return;
      }
      res.json("Room succesfully updated!"); 
  });
});

app.post('/api/employees', (req, res) => {
  const { ssn, firstName, lastName, position } = req.body;

  if (!ssn || !firstName || !lastName || !position) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert Person
  db.query('INSERT INTO Person (first_name, last_name) VALUES (?, ?)', [firstName, lastName], (err, results) => {
      if (err) {
          console.error('Error inserting person:', err);
          return res.status(500).json({ error: 'Failed to save person' });
      }

      const person_id = results.insertId; // Get last inserted ID
      console.log(person_id);

      // Insert Customer
      db.query('INSERT INTO Employee (ssn, person_id, position) VALUES (?,?, ?)', [ssn, person_id, position], (err, results) => {
          if (err) {
              console.error('Error inserting customer:', err);
              return res.status(500).json({ error: 'Failed to save customer' });
          }
          res.json({ message: 'Employee created!' });    
      });
  });
});

app.post('/api/customers', (req, res) => {
  const {firstName, lastName} = req.body;

  if (!firstName || !lastName) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert Person
  db.query('INSERT INTO Person (first_name, last_name) VALUES (?, ?)', [firstName, lastName], (err, results) => {
      if (err) {
          console.error('Error inserting person:', err);
          return res.status(500).json({ error: 'Failed to save person' });
      }

      const person_id = results.insertId; // Get last inserted ID

      // Insert Customer
      db.query('INSERT INTO Customer (person_id) VALUES (?)', [person_id], (err, results) => {
          if (err) {
              console.error('Error inserting customer:', err);
              return res.status(500).json({ error: 'Failed to save customer' });
          }
          res.json({ message: 'Customer created!' });    
      });
  });
});

app.post('/api/hotels', (req, res) => {
  const { hotel_name, hotel_chain_name, address, category, manager_ssn, email } = req.body;

  if (!hotel_name || !hotel_chain_name || !address || !category || !manager_ssn || !email) {
      return res.status(400).json({ error: 'All fields are required' });
  }
  db.query('INSERT INTO Email (value) VALUES (?)', [email], (err, results) => {
      if (err) {
          console.error('Error inserting hotel:', err);
          return res.status(500).json({ error: 'Failed to save hotel' });
      }
      //Check if hotel_chain exists 
      db.query('(SELECT COUNT(*) FROM Hotel_Chain WHERE name = ?', [hotel_chain_name], (err, results) => {
        if (err) {
            console.error('Error inserting hotel:', err);
            return res.status(500).json({ error: 'Failed to save hotel' });
        }
        if (results.length>=1){
          db.query('INSERT INTO Hotel (name, hotel_chain_name, address, category, manager_ssn, email_value) VALUES (?, ?, ?, ?, ?, ?)', [hotel_name, hotel_chain_name, address, category, manager_ssn, email], (err, results) => {
            if (err) {
                console.error('Error inserting hotel:', err);
                return res.status(500).json({ error: 'Failed to save hotel' });
            }
        })}
         else {
          return ('Failed to save hotel! Hotel Chain doesn\'t exist')
        }
      });
  });
});

app.post('/api/rooms', (req, res) => {
  const { roomId, room_hotel_name, room_hotel_address, room_hotel_chain_name, price, capacity, view, extension} = req.body;

  if (!roomId || !room_hotel_name || !room_hotel_address || !room_hotel_chain_name || !price || !capacity || !view || !extension) {
      return res.status(400).json({ error: 'All fields are required' });
  }
  db.query('INSERT INTO Room (id, hotel_name, hotel_address, hotel_chain_name, price, capacity, view, extension) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [roomId, room_hotel_name, room_hotel_address, room_hotel_chain_name, price, capacity, view, extension], (err, results) => {
      if (err) {
          console.error('Error inserting room:', err);
          return res.status(500).json({ error: 'Failed to save room' });
      }
      res.json({ message: 'Room created!' });
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

app.post('/api/bookings', (req, res) => {
  const { roomId, hotel, address, hotel_chain, startDate, endDate, firstName, lastName} = req.body;
  console.log(address);

  if (!roomId || !startDate || !endDate || !firstName || !lastName) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert Person
  db.query('INSERT INTO Person (first_name, last_name) VALUES (?, ?)', [firstName, lastName], (err, results) => {
      if (err) {
          console.error('Error inserting person:', err);
          return res.status(500).json({ error: 'Failed to save person' });
      }

      const person_id = results.insertId; // Get last inserted ID

      // Insert Customer
      db.query('INSERT INTO Customer (person_id) VALUES (?)', [person_id], (err, results) => {
          if (err) {
              console.error('Error inserting customer:', err);
              return res.status(500).json({ error: 'Failed to save customer' });
          }

          const customer_id = results.insertId; // Get last inserted ID

          // Insert Booking
          db.query('INSERT INTO Books (room_id, room_hotel_name, room_hotel_address, room_hotel_chain_name, customer_id, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)'
            , [roomId, hotel, address, hotel_chain, customer_id,startDate, endDate], (err, results) => {
              if (err) {
                  console.error('Error inserting booking:', err);
                  return res.status(500).json({ error: 'Failed to save booking' });
              }
              res.json({ message: 'Booking confirmed!' });
          });
      });
  });
});

app.post('/api/bookings/convert-to-rental', (req, res) => {
  const { employeeSSN, customerId, roomId } = req.body; 

  if (!employeeSSN || !customerId || !roomId) {
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
      console.log(booking);
      db.query('INSERT INTO Rentals (employee_ssn, customer_id, room_id, start_date, end_date) VALUES (?, ?, ?, ?, ?)', [employeeSSN, booking.customer_id, booking.room_id, booking.start_date, booking.end_date], (err, results) => {
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

app.delete("/api/employees/:ssn", (req, res) => {
  const ssn = req.params.ssn;  
  db.query('DELETE FROM Employee WHERE ssn = ?', [ssn], (err, results) => {
    if (err) {
        console.error('Error deleting employee:', err);
        return res.status(500).json({ error: 'Failed to delete employee' });
    }
    res.json({ message: 'Employee successfully deleted' });
  });
});

app.delete("/api/customers/:id", (req, res) => {
  const id = req.params.id;  
  db.query('DELETE FROM Customer WHERE id = ?', [id], (err, results) => {
    if (err) {
        console.error('Error deleting customer:', err);
        return res.status(500).json({ error: 'Failed to delete customer' });
    }
    res.json({ message: 'Customer successfully deleted' });
  });
});

app.delete("/api/hotels/:name", (req, res) => {
  const name = req.params.name;  
  db.query('DELETE FROM Hotel WHERE name = ?', [name], (err, results) => {
    if (err) {
        console.error('Error deleting hotel:', err);
        return res.status(500).json({ error: 'Failed to delete hotel' });
    }
    res.json({ message: 'Hotel successfully deleted' });
  });
});

app.delete("/api/rooms/:id", (req, res) => {
  const id = req.params.id;  
  db.query('DELETE FROM Room WHERE id = ?', [id], (err, results) => {
    if (err) {
        console.error('Error deleting room:', err);
        return res.status(500).json({ error: 'Failed to delete room' });
    }
    res.json({ message: 'Room successfully deleted' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});
