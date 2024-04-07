<?php
if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $uploadFolder = '../upload/';
    $filename = $_FILES['file']['name'];
    $destination = $uploadFolder . $filename;
    if (move_uploaded_file($_FILES['file']['tmp_name'], $destination)) {
        echo json_encode(['message' => 'File uploaded successfully']);
    } else {
        echo json_encode(['error' => 'Error moving uploaded file']);
    }
} else {
    echo json_encode(['error' => 'Error uploading file']);
}
?>
