<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
	<link rel="stylesheet" href="styles/mainStyle.css">
	<link rel="stylesheet" href="styles/c_navBar.css">
	<link rel="stylesheet" href="styles/formLogin.css">
	<title>Login</title>
</head>
<body>
<!--<Nav Bar>-->
<script id="replace_with_navbar" src="nav.js"></script>
<!--</Nav Bar>-->
<br><br>
<center>
	<br><h1 style="color: blue;">Connection</h1></u><br><br><br>
</center>
<form class="login" action="tech/t_login.php" method="post">

  	<input class="inp" type="text" id="username" name="username" placeholder="Username">
  		<br><br>
  	<input class="inp" id="password" name="password" type="password" placeholder="Password">
  	<i class="bi bi-eye-slash" id="togglePassword"></i>
  		<br>	
  	
  	<input class="submit" type="submit" value="Login">
	<h1>Mots de Passe</h1>
	<p class=lead>hugo & azer<br>admin & admin<br>test & test</p>
</form>


<script type="text/javascript">
	const togglePassword = document.querySelector('#togglePassword');
	const password = document.querySelector('#password');

	togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye / eye slash icon
    this.classList.toggle('bi-eye');
});
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>