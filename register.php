<?php
header("Content-Type:text/html; charset=utf-8");
 $filename="password.json";
 //----加载文件
 $js=file_get_contents($filename);
 //---转数组
 $js=json_decode($js);
 //---定义获得得值
 $em=$_POST["email"];
 $pass=$_POST["password"];

 //----值添加到数组
 $arr=array($em,$pass);
 $js[count($js)]->email=$arr[0];
 $js[count($js)-1]->pwd=$arr[1];
 file_put_contents($filename,json_encode($js));
?>