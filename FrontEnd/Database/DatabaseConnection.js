// Importing MySQL module
const mysql = require('mysql');

// Creates a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Rakusens'
});

// Connects to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');


        
        // Closing the connection to the database
        connection.end();
        
     });
     
