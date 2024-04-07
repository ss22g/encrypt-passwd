<?php
$uploadFolder = '../upload/';
$files = scandir($uploadFolder);
$files = array_diff($files, array('.', '..')); // Remove '.' and '..' entries
echo json_encode(array_values($files)); // Return files as JSON array
?>
