<?php

/*function filter($x,callable $fn)
{
    $result = [];
    foreach ($x as $e) {
        if($fn($e)){
            $result[] = $e;
        }
    }
    return $result;
}*/
$limit=-5;
$numbers = [1, -8, 3, 4, -6, 9];

//$negative=filter($numbers);
/*$negative=filter($numbers,function($e){
return $e<0;
});*/
$negative=array_filter($numbers,function($e) use ($limit){
//return $e<0;
return $e<$limit;
});
/*print("<pre>");
print_r($negative);
print("</pre>");*/
?>
<ul>
<php foreach($negative as $number): ?>
<li>3</li>
<php endforeach ?>
</ul>
