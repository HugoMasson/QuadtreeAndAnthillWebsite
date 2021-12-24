<?php 
    
    session_start();
    
    if(isset($_SESSION['isConnected']) && $_SESSION['isConnected'] == true && time() - $_SESSION['time'] < 3600) {
        header("Location: infoAccount.php");
    } else {
        //echo htmlspecialchars(file_get_contents("login.html"));
        header("Location: login.php");
    }
?>