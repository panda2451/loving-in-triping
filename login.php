<?php
header("content-type:textml; charset=utf-8");
 $filename="password.json";
 //----加载文件
 $js=file_get_contents($filename);
 //---转数组
 $js=json_decode($js);
 //---定义获得得值
 $em=$_GET["email"];
 $pass=$_GET["password"];
 $flag =0;//----失败
 //-----判断是否存在数组中
 for($i=0;$i<count($js);$i++){
    if($js[$i]->email==$em && $js[$i]->pwd==$pass ){
        $flag=1;
    }
 }
 echo $flag;
?>
