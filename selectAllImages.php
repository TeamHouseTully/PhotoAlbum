<?php
include("DbConnect.php");

class ImagesDataSelector {
    function selectImageIds () {
        dbConnect::connect();

        $query = "select * from image";
        $result = mysqli_query(dbConnect::$db, $query);
        $arr = [];

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            array_push($arr, $row);
        }

        return json_encode($arr);
    }
}

$images = new ImagesDataSelector();
echo $images->selectImageIds();
?>
