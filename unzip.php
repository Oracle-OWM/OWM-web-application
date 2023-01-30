<?php

$zip = new ZipArchive;
  
// Zip File Name
if ($zip->open('owm-php-7.3.zip') === TRUE) {
  
    // Unzip Path
    $zip->extractTo('/');
    $zip->close();
    echo 'Unzipped Process Successful!';
} else {
    echo 'Unzipped Process failed';
}
?>