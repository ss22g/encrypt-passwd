<?php

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if password and file are set
    if (isset($_POST['password']) && isset($_FILES['file'])) {
        // Get password and file details
        $password = $_POST['password'];
        $fileName = $_FILES['file']['name'];
        $fileTmpName = $_FILES['file']['tmp_name'];

        // Check if the password already exists in the file
        $existingData = file_exists('files.json') ? file_get_contents('files.json') : '';
        if ($existingData && strpos($existingData, $password) !== false) {
            echo '<script>alert("This password already exists and it\'s a special password.");</script>';
            exit; // Stop further execution
        }

        // Prepare data to store in files.json
        $dataToStore = ', "' . $password . '" : "' . $fileName . '"' . PHP_EOL;

        // If files.json contains data, remove the last curly bracket and append the new data
        $updatedData = $existingData ? rtrim($existingData, "}") . "\n" . $dataToStore . "}" : "{" . PHP_EOL . $dataToStore . "}";

        // Write the updated data back to files.json
        file_put_contents('files.json', $updatedData);

        // Move the uploaded file to the 'upload' folder
        $uploadDir = '../upload/';
        $destination = $uploadDir . $fileName;
        move_uploaded_file($fileTmpName, $destination);

        // Respond with success message
        echo '<script>alert("File submitted successfully");</script>';
    } else {
        // Respond with error message if password or file is missing
        echo '<script>alert("Please provide both password and file");</script>';
    }
} else {
    // Redirect if accessed directly
    header("Location: index.html");
    exit;
}
?>
