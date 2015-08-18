SimpleBox
================

##Usage
	<link href="css/style.css" rel="stylesheet">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="js/imagesloaded.js"></script>
	<script src="js/simpleBox.js"></script>
	<script>
		$(document).ready(function(){
		
			// Call simpleBox
			// $('.simpleBox').simpleBox();
			$.simpleBox();
		
		});
	</script>

	<ul class="simpleBox">

		<li>
			<header>
				Header Content
			</header>

			<img src="images/image-thumb-22.jpg" data-img="images/1.jpg" alt="" />

			<p>Lorem ipsum dolor sit amet.</p>

			<footer>
				Footer Content
			</footer>
		</li>
	</ul>

##License
SimpleBox is licensed under the GPL v2 license. (http://opensource.org/licenses/GPL-2.0)
