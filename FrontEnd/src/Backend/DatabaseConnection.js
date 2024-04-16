// Importing MySQL module
const mysql = require('mysql');

//Creates a connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Rakusens'
});

// Function to fetch users from the database
function fetchUsers(callback) {
    const query = 'SELECT * FROM Users';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching users:', error);
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

// Function to fetch purchase orders from the database
function fetchPurchaseOrders(callback) {
    const query = 'SELECT * FROM PurchaseOrders';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching purchase orders:', error);
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

// Function to fetch vendors from the database
function fetchVendors(callback) {
    const query = 'SELECT * FROM Vendors';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching vendors:', error);
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

// Function to fetch products from the database
function fetchProducts(callback) {
    const query = 'SELECT * FROM Products';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

// Function to fetch ingredients from the database
function fetchIngredients(callback) {
    const query = 'SELECT * FROM Ingredients';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching ingredients:', error);
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

// Function to close the connection to the database
function closeMySQLConnection() {
    if (connection) {
        connection.end(function(err) {
            if (err) {
                console.error('Error closing MySQL connection:', err.message);
            } else {
                console.log('SQL connection closed successfully.');
            }
        });
    } else {
        console.warn('No active SQL connection to close.');
    }
}


// Exporting the functions to use in other files
module.exports.fetchUsers = fetchUsers;
module.exports.fetchPurchaseOrders = fetchPurchaseOrders;
module.exports.fetchVendors = fetchVendors;
module.exports.fetchProducts = fetchProducts;
module.exports.fetchIngredients = fetchIngredients;
module.exports.closeMySQLConnection = closeMySQLConnection;
module.exports.connection = connection;