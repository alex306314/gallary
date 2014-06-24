<?php
if (!isset($_POST['id'])) {
  $data = array(
    "id" => 0,
    'name' => '我的空间',
    'pid' => -1,
    'open' => true,
    'children' => array(
        array(
            'id' => 1,
            'name' => 'folder1',
            'pid' => 0,
            'isParent' => true,
        ),
        array(
            'id' => 2,
            'name' => 'folder2',
            'pid' => 0,
            'isParent' => true,
        ),
        array(
            'id' => 3,
            'name' => 'folder3',
            'pid' => 0,
            'isParent' => false,
        ),
    ),
  );

} else {
  if($_POST['id']==1){
    $data = array(
        array(
            'id' => 11,
            'name' => 'folder11',
            'pid' => 1,
            'isParent' => true,
        ),
        array(
            'id' => 12,
            'name' => 'folder12',
            'pid' => 1,
            'isParent' => true,
        ),
    );
  }else{
    $data = array(
        array(
            'id' => 21,
            'name' => 'folder21',
            'pid' => 2,
            'isParent' => true,
        ),
        array(
            'id' => 22,
            'name' => 'folder22',
            'pid' => 2,
            'isParent' => true,
        ),
    );
  }
  if($_POST['action'] = "addnew"){
    $data = array(
      'id' => 100,
      'name' => ""
    );
  }
}


echo json_encode($data);