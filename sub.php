<?php
$q = $_REQUEST["q"];
$txt = "<data>".$q."</data>";
echo "the file is ".$txt;
$myfile = fopen("search_history.txt","a");
fwrite($myfile,$txt);
fclose($myfile);

$servername = "localhost";
$username = "root";
$password = "vij@0001";
$dbname = "learning";

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO search_history(history) values ('$q')";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
$conn->close();
?>
