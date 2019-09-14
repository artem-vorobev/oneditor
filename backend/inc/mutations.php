<?php
function mutation_RESET() {
  global $STATE;
  $STATE = [
    'rootDir' => $_SERVER['DOCUMENT_ROOT'],
    'openedDirs' => [$_SERVER['DOCUMENT_ROOT']],
    'openedFiles' => [],
    'activeTab' => 0,
    'unsavedChanges' => []
  ];
}