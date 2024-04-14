<?php
// Start a session
session_start();

// Check if the user is already logged in
if (isset($_SESSION['username'])) {
  // User is logged in, redirect to restricted page
  header('Location: ./scenes/dashboard');
  exit();
}

// Handle login form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Get the username and password from the form data
  $username = $_POST['username'];
  $password = $_POST['password'];

  // Database connection
  $servername = "localhost";
  $usernameDB = "root";
  $passwordDB = "";
  $dbname = "rakusens";

  $conn = new mysqli($servername, $usernameDB, $passwordDB, $dbname);

  if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
  }

  // Query the database for the user with the given username and password
  $stmt = $conn->prepare("SELECT User_ID FROM users WHERE Username = ?");
  $stmt->bind_param("ss", $username, $password);
  $stmt->execute();
  $result = $stmt->get_result();

  // If a matching user was found, create a session and redirect to the appropriate page
  if ($result->num_rows == 1) {
    // Set the session variable
    $_SESSION['username'] = $username;
    // Redirect to the dashboard page
    header('Location: .src/scenes/dashboard');
    exit();
  } else {
    // Login failed, display an error message
    $error = "Invalid username or password";
  }

  $stmt->close();
  $conn->close();
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>Login Error</title>
</head>
<body>
  <h2><?php if (isset($error)) { echo $error; } ?></h2>
</body>
</html>
