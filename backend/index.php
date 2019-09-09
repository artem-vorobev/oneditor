<?php
  require('inc/state.php');
  require('inc/functions.php');
  require('inc/api.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Editor</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT+Mono|PT+Sans:400,700&display=swap">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/theme/material.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.min.css">
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/xml/xml.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/clike/clike.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/javascript/javascript.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/css/css.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/php/php.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/htmlmixed/htmlmixed.min.js"></script>
  <link rel="stylesheet" href="/frontend/style.css">
</head>
<body>
  <div id="root"></div>
  <script>
    window.ROOT_DIR = '<?=$_SERVER['DOCUMENT_ROOT']?>';
    window.STATE = <?=json_encode($state, true)?>;
  </script>
  <script src="/frontend/build/build.js"></script>
</body>
</html>