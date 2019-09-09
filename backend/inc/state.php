<?php $state = [];
function writeState() {
  global $state;
  $str = file_get_contents(__FILE__);
  $pos = strpos($str, 'function writeState');
  file_put_contents(__FILE__, 
    "<?php \$state = ".
    var_export($state, true).";\n".
    substr($str, $pos)
  );
}