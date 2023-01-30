<?php
    // php /var/www/html/script.php?save_path="http://wms.cardi-hu.com/files/geofenceModels/wrl.csv"&geofence_name="wrl"&api_url="https://wms.cardi-hu.com/api/auth/admin/geofences/upload-files"
    // python3 /var/www/html/geofence_web_script_function.py http://wms.cardi-hu.com/files/geofenceModels/wrl.csv wrl https://wms.cardi-hu.com/api/auth/admin/geofences/upload-files

    echo "python3 /var/www/html/geofence_web_script_function.py"." ".$_GET['save_path']." ".$_GET['geofence_name']." ".$_GET['api_url'];
    $command = "python3 /var/www/html/geofence_web_script_function.py"." ".$_GET['save_path']." ".$_GET['geofence_name']." ".$_GET['api_url'];
    $output=null;
    $retval=null;
    exec($command, $output, $retval);
    echo "\nReturned with status $retval and output:\n";
    print_r($output);
