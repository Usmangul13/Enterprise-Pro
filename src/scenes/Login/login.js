import React from 'react';

// Function to fetch users from the database
function fetchUsers(callback) {
    const query = 'SELECT Username, Password FROM Users';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching users:', error);
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

// Function to validate the username and password
function validateCredentials(username, password, callback) {
    fetchUsers((error, results) => {
        if (error) {
            callback(error, false);
        } else {
            const user = results.find(row => row.Username === username);
            if (user) {
                // Username exists, check if the password matches
                if (user.Password === password) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            } else {
                // Username does not exist
                callback(null, false);
            }
        }
    });
}

// Login component
function Login() {
    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        validateCredentials(username, password, (error, isValid) => {
            if (error) {
                console.error('Error validating credentials:', error);
                // Handle error
            } else {
                if (isValid) {
                    // Username and password are valid, you can proceed with login
                    console.log("Login successful");
                    // Here you can add code to redirect the user to the dashboard or perform other actions
                } else {
                    // Handle invalid username or password
                    console.log("Invalid username or password");
                }
            }
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" /><br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
