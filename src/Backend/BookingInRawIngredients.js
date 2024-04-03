// // Server side code for the Booking in Raw Ingrediants (function 4)................................................................................................


const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');

class Ingredient {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 3000;

        // Middleware to parse JSON bodies
        this.app.use(bodyParser.json());

        // Create MySQL connection
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'your_username',
            password: 'your_password',
            database: 'Rakusens'    // Change this to our database name if nessecary
        });

        // Connect to MySQL database
        this.connection.connect(err => {
            if (err) {
                console.error('Error connecting to MySQL database:', err);
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
        // Endpoint to book in raw ingredients
        this.app.post('/book-in-ingredients', (req, res) => {
            const { ingredients } = req.body;

            // Generate unique SKU codes for each ingredient and book in
            const bookedIngredients = ingredients.map(ingredient => {
                const sku = uuidv4(); // Generate unique SKU
                return { ...ingredient, sku };
            });

            // Store booked ingredients in MySQL database
            const values = bookedIngredients.map(ingredient => [
                ingredient.SKU_ID,
                ingredient.IngredientName,
                ingredient.Quantity,
                ingredient.Size,
                ingredient.Unit,
                ingredient.ExpiryDate
            ]);
            const sql = 'INSERT INTO Ingredients (SKU_ID, IngredientName, Quantity, Size, Unit, ExpiryDate) VALUES ?';
            this.connection.query(sql, [values], (err, result) => {
                if (err) {
                    console.error('Error inserting ingredients:', err);
                    res.status(500).json({ message: 'Error booking in ingredients' });
                    return;
                }
                console.log('Ingredients booked in successfully');
                res.status(201).json({ message: 'Ingredients booked in successfully', ingredients: bookedIngredients });
            });
        });

        // Endpoint to retrieve all raw ingredients
        this.app.get('/raw-ingredients', (req, res) => {
            // Retrieve all ingredients from MySQL database
            const sql = 'SELECT * FROM Ingredients';
            this.connection.query(sql, (err, rows) => {
                if (err) {
                    console.error('Error retrieving ingredients:', err);
                    res.status(500).json({ message: 'Error retrieving ingredients' });
                    return;
                }
                console.log('Raw ingredients retrieved successfully');
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

// Create an instance of IngredientManager to start the server
const ingredient = new Ingredient();
