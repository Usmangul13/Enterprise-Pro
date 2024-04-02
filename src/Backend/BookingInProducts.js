// Server side code for Booking in products (function 3)................................................................................................
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql2'); // Import the mysql2 library

class Product {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 3000;
        this.products = [];

        // Middleware to parse JSON bodies
        this.app.use(bodyParser.json());

        // Initialize MySQL connection
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'your_mysql_username',
            password: 'your_mysql_password',
            database: 'Rakusens' // Change this to your database name
        });

        // Connect to MySQL
        this.connection.connect(err => {
            if (err) {
                console.error('Error connecting to MySQL:', err);
                return;
            }
            console.log('Connected to MySQL database');
        });

        // Define routes
        this.defineRoutes();

        // Start the server
        this.startServer();
    }

    defineRoutes() {
        // Endpoint to book in products
        this.app.post('/book-in', (req, res) => {
            const { bestBeforeDate, productType, quantity } = req.body;

            // Generate unique SKU codes for each quantity unit
            const skuCodes = Array.from({ length: quantity }, () => uuidv4());

            // Add each product to the database
            const sql = 'INSERT INTO Products (SKU_ID, ProductName, Price, Size, Unit, QuantityAvailable, Description, Category, ExpiryDate) VALUES ?';
            const values = skuCodes.map(sku => [sku, productType, 0, 0, '', 0, '', '', bestBeforeDate]);

            this.connection.query(sql, [values], (err, result) => {
                if (err) {
                    console.error('Error inserting products:', err);
                    res.status(500).json({ message: 'Error booking in products' });
                    return;
                }
                console.log('Products booked in successfully');
                res.status(201).json({ message: 'Products booked in successfully', skuCodes });
            });
        });

        // Endpoint to retrieve all products
        this.app.get('/products', (req, res) => {
            const sql = 'SELECT * FROM Products';

            this.connection.query(sql, (err, rows) => {
                if (err) {
                    console.error('Error retrieving products:', err);
                    res.status(500).json({ message: 'Error retrieving products' });
                    return;
                }
                res.json(rows);
            });
        });
    }

    startServer() {
        this.app.listen(this.PORT, () => {
            console.log(`Server is running on port ${this.PORT}`);
        });
    }
}

// Create an instance of Product to start the server
const product = new Product();

