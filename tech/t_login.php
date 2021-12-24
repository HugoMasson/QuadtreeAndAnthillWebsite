<?php
    if(isset($_POST['username']) && isset($_POST['password'])){
        $username = $_POST['username'];
        $password = $_POST['password'];
        $myfile = fopen("../assets/credentials.txt", "r") or die("Unable to open file!");
        $cred = fread($myfile,filesize("../assets/credentials.txt"));
        fclose($myfile);
        $cred = explode(";", $cred);

        for ($i=0; $i < count($cred); $i++) {
            $temp = explode(":",$cred[$i]);
            if($username == $temp[0] && $password == $temp[1]){
                session_start();
                $_SESSION["isConnected"] = true;
                $_SESSION["username"] = $temp[0];
                $_SESSION["time"] = time();
                header("Location: ../account.php");
            }
        }

    } else {
        header("Location: ../login.html");
    }
?>