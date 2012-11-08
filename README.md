# About 
This jQuery plugin helps you easily create a stylish dropdown (select).

# Usage
You need to add the following to your page:
```html
<link href="stylesheets/dropdown.css" rel="stylesheet" media="screen">
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="javascripts/dropdown.js"></script>
```
And of course some HTML:
```html
<select name="mySelect1" id="mySelect1">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
</select>
```
And a little bit of Javascipt:
```javascript
<script type="text/javascript">
$(function(){
    $('#mySelect1').dropdown();
});
</script>
```

## Standalone Test Page
[View Test Page](http://andyghiuta.github.com/dropdown.html)
