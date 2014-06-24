<?php
$id = $_POST['id'];
$page = $_POST['page'];
$data = array(
    "id" => $id,
    "page" => $page,
    "items" => array(
        array(
            "id" => 101,
            "pid" => 0,
            "type" => 1,
            "name" => "folder1",
            "url" => "http://testurl"
        ),
        array(
            "id" => 102,
            "pid" => 0,
            "type" => 2,
            "name" => "image1",
            "url" => "http://testurl"
        ),
        array(
            "id" => 103,
            "pid" => 0,
            "type" => 2,
            "name" => "image1",
            "url" => "http://testurl"
        ),
        array(
            "id" => 104,
            "pid" => 0,
            "type" => 2,
            "name" => "image1",
            "url" => "http://testurl"
        ),
        array(
            "id" => 105,
            "pid" => 0,
            "type" => 2,
            "name" => "image1",
            "url" => "http://testurl"
        ),
        array(
            "id" => 106,
            "pid" => 0,
            "type" => 2,
            "name" => "image1",
            "url" => "http://testurl"
        ),
        array(
            "id" => 107,
            "pid" => 0,
            "type" => 2,
            "name" => "image1",
            "url" => "http://testurl"
        ),
    ),
);

echo json_encode($data);