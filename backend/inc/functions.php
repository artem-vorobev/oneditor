<?php

function getFiles($rootDir) {

  $list = scandir($rootDir);
  $files = [];
  $dirs = [];
  foreach ($list as $name) if ($name != '.' && $name != '..' && $name != '.DS_Store') {
    if (is_dir($rootDir.'/'.$name)) $dirs[] = $rootDir.'/'.$name;
    else $files[] = $rootDir.'/'.$name;
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