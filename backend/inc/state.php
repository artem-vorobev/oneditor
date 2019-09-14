<?php $STATE = array (
  'rootDir' => '/www/oneditor.loc',
  'openedDirs' => 
  array (
    0 => '/www/oneditor.loc',
  ),
  'openedFiles' => 
  array (
  ),
  'activeTab' => 0,
  'unsavedChanges' => 
  array (
  ),
);
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