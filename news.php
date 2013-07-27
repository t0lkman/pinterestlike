<?php

$data_type = $_GET['data_type'];
$keyword = $_GET['keyword'];


$AZURE_ACCOUNT_KEY = 'bing_search_api_key_here'; // for the Bing provider

switch($data_type)
{
    case 'images':
        $service_op = 'Image';
        $params = '&ImageFilters=' . urlencode("'Size:Large'");
        break;

    case 'news':
    default:
        $service_op = 'News';
        $params = "";
        break;
}

$bing_search_root_url = 'https://api.datamarket.azure.com/Bing/Search';

$query = urlencode("'$keyword'");

$request_url = "$bing_search_root_url/$service_op?\$format=json&\$top=30&Query=$query" . $params;

$auth = base64_encode($AZURE_ACCOUNT_KEY . ':' . $AZURE_ACCOUNT_KEY);
$data = array(
    'http' => array(
        'request_fulluri' => true,
        'ignore_errors' => true,
        'header' => "Authorization: Basic $auth")
);

$context = stream_context_create($data);
$response = file_get_contents($request_url, 0, $context);
die($response);
//$result_obj = json_decode($response);
//$provider_products = $result_obj->d->results;
// $provider_products = array_merge($result->Image, $result->News);
