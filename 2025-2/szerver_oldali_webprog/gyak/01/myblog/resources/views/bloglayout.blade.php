<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Document @yield('title') </title>
    @vite(['resources//css/app.css', 'resources/js/app.js'])
</head>
<body>
<div class="mx-auto container">
    <div class="grid grid-cols-3">
         <div class="col-span-3">
            <h1>myBlog</h1>
         </div>

         <div class="col-span-2">
            @yield('content')
         </div>
         
         <div class="col-span-1">
            <h1> sidebar </h1>
         </div>
    </div>
</div>
    
</body>
</html>