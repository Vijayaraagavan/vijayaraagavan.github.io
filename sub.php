<?php
$q = $_REQUEST["q"];
$txt = "<data>".$q."</data>";
echo "the file is ".$txt;
$myfile = fopen("search_history.txt","a");
fwrite($myfile,$txt);
fclose($myfile);
?>
