<?php $STATE = [];
function commit_state() {
  global $STATE;
  $str = file_get_contents(__FILE__);
  $pos = strpos($str, 'function commit_state');
  file_put_contents(__FILE__, 
    "<?php \$STATE = ".
    var_export($STATE, true).";\n".
    substr($str, $pos)
  );
}