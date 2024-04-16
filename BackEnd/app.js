// Import required modules
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

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

// Function to fetch products from the database
app.get('/getProducts', (req, res) => {
    const query = 'SELECT * FROM Products';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Error fetching products' });
        } else {
            // Modify each object in the results array
            const modifiedResults = results.map(product => {
                return {
                    ...product,
                    id: product.SKU_ID,
                };
            });

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
            const modifiedResults = results.map(user => {
                return {
                    ...user,
                    id: user.User_ID,
                };
            });

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
            const modifiedResults = results.map(ingredient => {
                return {
                    ...ingredient,
                    id: ingredient.Ingredient_ID,
                };
            });

            res.json(modifiedResults);
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
