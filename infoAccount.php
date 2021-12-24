
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
	<link rel="stylesheet" href="styles/mainStyle.css">
	<link rel="stylesheet" href="styles/c_navBar.css">
    <title>account infos</title>
</head>
<body>
    <?php   
        include "navBar.html";
        session_start();
        echo "Hello World<br>";
        echo "connected: ";
        echo $_SESSION["isConnected"] ? 'true' : 'false';
        echo "<br>";
        echo "username: ".$_SESSION["username"];
    ?>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>