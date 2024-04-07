<?php
$data = json_decode(file_get_contents('php://input'), true);
$password = $data['password'];

$existingData = json_decode(file_get_contents('../dynamic/files.json'), true);
if (isset($existingData[$password])) {
    $fileToDelete = $existingData[$password];
    unset($existingData[$password]);

    // Delete the file from the upload folder
    $uploadFolder = '../upload/';
    if (file_exists($uploadFolder . $fileToDelete)) {
        unlink($uploadFolder . $fileToDelete);
    }

    file_put_contents('../dynamic/files.json', json_encode($existingData));
    echo json_encode(['message' => 'Data deleted successfully']);
} else {
    echo json_encode(['error' => 'Password not found in the data']);
}
?>
