<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Книжная коллекция</title>

    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app"></div>
    @env('local')
        <script src="http://localhost:3000/js/app.js"></script>
    @else
        <script src="{{ mix('/js/app.js') }}"></script>
    @endenv
</body>
</html>