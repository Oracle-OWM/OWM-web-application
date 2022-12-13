@extends('layouts.layout')

@section('content')
{{--    <script src="https://cdn.tailwindcss.com"></script>--}}

    <div id="root"></div>

{{--    <script src="{{ asset('js/app.js') }}" supportedLocales={{json_encode($data)}} defer></script>--}}
    <script src="{{ asset('js/app.js') }}"></script>
@endsection
