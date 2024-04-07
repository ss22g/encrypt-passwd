<?php
$data = json_decode(file_get_contents('php://input'), true);
$oldPassword = $data['oldPassword'];
$newPassword = $data['newPassword'];
$newFile = $data['newFile'];

$existingData = json_decode(file_get_contents('../dynamic/files.json'), true);
unset($existingData[$oldPassword]);

// Check if the file exists in the upload folder
$uploadFolder = '../upload/';
$fileExists = file_exists($uploadFolder . $newFile);

if ($fileExists) {
    $existingData[$newPassword] = $newFile;
    file_put_contents('../dynamic/files.json', json_encode($existingData));
    echo json_encode(['message' => 'Data edited successfully']);
} else {
    echo json_encode(['error' => 'File does not exist in the upload folder']);
}
?>
