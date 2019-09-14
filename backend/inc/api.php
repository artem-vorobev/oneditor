<?php
if (isset($_GET['fn'])) {
  $fn = 'api_'.$_GET['fn'];
  if (function_exists($fn)) {
    $result = $fn($_POST);
    commit_state();
    if ($result !== null) {
      if (!is_scalar($result)) $result = json_encode($result);
      echo $result;
    }
  }
  die();
}


function api_mkdir($p) {
  extract($p);
  mkdir($path);
}


function unlinkDir($rootDir) {
  $list = scandir($rootDir);
  foreach ($list as $name) if ($name != '.' && $name != '..') {
    $f = $rootDir.'/'.$name;
    if (is_dir($f)) {
      unlinkDir($f);
    } else {
      unlink($f);
    }
  }
  rmdir($f);
}


function api_delete($p) {
  extract($p);
  if (is_dir($path)) {
    unlinkDir($path);
  } else {
    unlink($path);
  }
}


function api_savefile($p) {
  extract($p);
  file_put_contents($path, $data);
}


function api_openfile($p) {
  extract($p);
  return file_get_contents($path);
  // TODO apply changes from $STATE
}


function api_scandir($p) {
  extract($p);
  $exclude = ['.', '..', '.DS_Store', '.git'];
  $list = scandir($path);
  $files = [];
  $dirs = [];
  foreach ($list as $name) if (!in_array($name, $exclude)) {
    if (is_dir($path.'/'.$name)) $dirs[] = $path.'/'.$name;
    else $files[] = $path.'/'.$name;
  }
  sort($files);
  sort($dirs);
  foreach ($dirs as $n => $dir) {
    $dirs[$n] = [
      'isDirectory' => true,
      'path' => $dir
    ];
  }
  foreach ($files as $n => $file) {
    $files[$n] = [
      'isDirectory' => false,
      'path' => $file,
    ];
  }
  return array_merge($dirs, $files);
}


function api_getstate() {
  global $STATE;
  if (empty($STATE)) mutation_RESET();
  return $STATE;
}