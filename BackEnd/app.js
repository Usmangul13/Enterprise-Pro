// Import required modules
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const modifyResults = require('./functions/modifyResults');

// Create an instance of Express
const app = express();
app.use(cors());

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Rakusens'
});

// Connect to MySQL
connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.use(express.json());

// Route handler for fetching products
app.get('/getProducts', (req, res) => {
    const query = 'SELECT * FROM Products';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Error fetching products' });
        } else {
            // Modify each object in the results array
            const modifiedResults = modifyResults(results, 'SKU_ID');

            res.json(modifiedResults);
        }
    });
});

// Function to fetch users from the database
app.get('/getUsers', (req, res) => {
    const query = 'SELECT * FROM Users';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Error fetching users' });
        } else {
            // Modify each object in the results array
            const modifiedResults = modifyResults(results, 'User_ID');

            res.json(modifiedResults);
        }
    });
});

// Function to fetch ingredients from the database
app.get('/getIngredients', (req, res) => {
    const query = 'SELECT * FROM Ingredients';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching ingredients:', error);
            res.status(500).json({ error: 'Error fetching ingredients' });
        } else {
            // Modify each object in the results array
            const modifiedResults = modifyResults(results, 'Ingredient_ID');

            res.json(modifiedResults);
        }
    });
    
});

app.use(express.json());

// Function to create a new ingredient
app.post('/createIngredient', (req, res) => {
    // Extract ingredient data from request body
    const { skuid, ingredientname, quantity, size, unit, expirydate } = req.body;

    // query to insert a new ingredient into the database
    const query = `INSERT INTO Ingredients (SKU_ID, IngredientName, Quantity, Size, Unit, ExpiryDate) 
                   VALUES ( ?, ?, ?, ?, ?, ?)`;
    
    // Executes the query
    connection.query(query, [skuid, ingredientname, quantity, size, unit, expirydate], (error, results) => {
        if (error) {
            console.error('Error creating ingredient:', error);
            res.status(500).json({ error: 'Error creating ingredient' });
        } else {
            // Return success message 
            res.json({ message: 'Ingredient created successfully', id: results.insertId });
        }
    });
});

// Function to delete a ingredient
app.delete('/deleteIngredient/:id', (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM Ingredients WHERE Ingredient_ID = ?';

    connection.query(query, [id], (error, result) => {
        if (error) {
            console.error('Error deleting ingredient:', error);
            res.status(500).json({ error: 'Error deleting ingredient' });
        } else {
            res.json({ message: 'Ingredient deleted successfully' });
        }
    });
});



// Function to update a ingredient
app.put('/updateIngredient/:id', (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const query = 'UPDATE Ingredients SET ? WHERE Ingredient_ID = ?';

    connection.query(query, [newData, id], (error, result) => {
        if (error) {
            console.error('Error updating Ingredient:', error);
            res.status(500).json({ error: 'Error updating Ingredient' });
        } else {
            res.json({ message: 'Ingredient updated successfully' });
        }
    });
});


// Function to create a new product
app.post('/createproduct', (req, res) => {
    // Extract product data from request body
    const { skuid, productname, price, size, unit,quantityavailable, description, category, expirydate } = req.body;

    // query to insert a new product into the database
    const query = `INSERT INTO Products (SKU_ID, ProductName, Price ,Size, Unit, QuantityAvailable, Description, Category, ExpiryDate) 
                   VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    // Executes the query
    connection.query(query, [skuid, productname, price, size, unit,quantityavailable, description, category, expirydate], (error, results) => {
        if (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Error creating product' });
        } else {
            // Return success message 
            res.json({ message: 'Product created successfully', id: results.insertId });
        }
    });
});

// Function to delete a product
app.delete('/deleteProduct/:id', (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM Products WHERE SKU_ID = ?';

    connection.query(query, [id], (error, result) => {
        if (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Error deleting product' });
        } else {
            res.json({ message: 'Product deleted successfully' });
        }
    });
});



// Function to update a product
app.put('/updateProduct/:id', (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const query = 'UPDATE Products SET ? WHERE SKU_ID = ?';

    connection.query(query, [newData, id], (error, result) => {
        if (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Error updating product' });
        } else {
            res.json({ message: 'Product updated successfully' });
        }
    });
});



// Function to fetch purchased orders from the database
app.get('/getPurchaseOrders', (req, res) => {
    const query = 'SELECT * FROM PurchaseOrders';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Error fetching orders' });
        } else {
            // Modify each object in the results array
            const modifiedResults = results.map(purchaseorder => {
                return {
                    ...purchaseorder,
                    id: purchaseorder.PurchaseOrder_ID,
                };
            });

            res.json(modifiedResults);
        }
    });
});

// Function to fetch Vendors from the database
app.get('/getVendors', (req, res) => {
    const query = 'SELECT * FROM Vendors';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching vendors:', error);
            res.status(500).json({ error: 'Error fetching vendors' });
        } else {
            // Modify each object in the results array
            const modifiedResults = results.map(vendors => {
                return {
                    ...vendors,
                    id: vendors.Vendor_ID,
                };
            });

            res.json(modifiedResults);
        }
    });
});

// Function to fetch Vendors from the database
app.get('/getImageGallery', (req, res) => {
    const query = 'SELECT * FROM ImageGallery';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching images', error);
            res.status(500).json({ error: 'Error fetching images' });
        } else {
            // Modify each object in the results array
            const modifiedResults = results.map(images => {
                return {
                    ...images,
                    id: images.Image_ID,
                };
            });

            res.json(modifiedResults);
        }
    });
});







// Function to close the connection to the database
app.get('/close', (req, res) => {
    connection.end(function(err) {
        if (err) {
            console.error('Error closing MySQL connection:', err.message);
            res.status(500).json({ error: 'Error closing MySQL connection' });
        } else {
            console.log('SQL connection closed successfully.');
            res.send('SQL connection closed successfully.');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export the connection (optional if you need to use it elsewhere)
module.exports.connection = connection;
module.exports = app;
