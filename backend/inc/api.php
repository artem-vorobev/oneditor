<?php

if (isset($_GET['fn'])) switch($_GET['fn']) {

  case 'opendir':
  $i = array_search($_POST['path'], $storage['openedDirs']);
  if ($i !== false) {
    array_splice($storage['openedDirs'], $i, 1);
  } else {
    $storage['openedDirs'][] = $_POST['path'];
  }
  writeStorage();
  exit();

  case 'getfiles':
  exit(json_encode(getFiles($_POST['path']), true));
  
  case 'fread':
  exit(file_get_contents($_POST['path']));

  case 'fwrite':
  file_put_contents($_POST['path'], $_POST['data']);
  exit();

  case 'delete':
  if (is_dir($_POST['path'])) {
    unlinkDir($_POST['path']);
  } else {
    unlink($_POST['path']);
  }
  exit();

  case 'mkdir':
  mkdir($_POST['path']);
  exit();
}