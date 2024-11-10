# Header Markdown file
This template is used for creating a website header at the top of my webpages.

## Usage
To use this template, place the following code in the header of your HTML file:
```html
<!-- Load Template HTML -->
<script
        src="https://code.jquery.com/jquery-3.3.1.js"
        integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
        crossorigin="anonymous">
</script>
<script defer>
    $(function(){ $("#page-header").load("/.templates/header/header.html",
        function(){ $("#sdev-header__nav_XXXX").addClass("sdev-header__text-highlight"); });
    });
</script>
```

## Features
- **Responsive Design**: The header is designed to be responsive and will adjust to the size of the screen.
- **Customizable**: The header can be customized by changing the CSS and HTML files.
- **Easy to Use**: The header can be easily added to any webpage by including the code above.
- **Lightweight**: The header is lightweight and will not slow down the loading of the webpage.
- **Cross-Browser Compatibility**: The header is compatible with all modern browsers.
