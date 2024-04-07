<?php
$data = json_decode(file_get_contents('php://input'), true);
$password = $data['password'];
$file = $data['file'];

$existingData = json_decode(file_get_contents('../dynamic/files.json'), true);

// Check if the password already exists and if it's a special password
if ($existingData && isset($existingData[$password])) {
    die("This password already exists and it's a special password.");
}

// Check if the file exists in the upload folder
$uploadFolder = '../upload/';
$fileExists = file_exists($uploadFolder . $file);

if ($fileExists) {
    $existingData[$password] = $file;
    file_put_contents('../dynamic/files.json', json_encode($existingData));
    echo json_encode(['message' => 'Data added successfully']);
} else {
    echo json_encode(['error' => 'File does not exist in the upload folder']);
}
?>
