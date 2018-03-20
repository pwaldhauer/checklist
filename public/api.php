<?php


use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app = new \Slim\App;

$app->post('/checklist', function (Request $request, Response $response, array $args) {

    $content = json_Decode($request->getBody()->getContents(), true);

    file_put_contents(sprintf('../storage/checklist/%s.json', $content['id']), json_encode($content));

    $response->getBody()->write('Yo');

    return $response;
});


$app->get('/checklist', function (Request $request, Response $response, array $args) {

    $glob = glob('../storage/checklist/*.json');

    $result = array_map(function ($file) {
        return json_decode(file_get_contents($file), true);
    }, $glob);

    $response->getBody()->write(json_encode($result));

    return $response;
});

$app->get('/completed', function (Request $request, Response $response, array $args) {

    $glob = glob('../storage/completed/*.json');

    $result = array_map(function ($file) {
        return json_decode(file_get_contents($file), true);
    }, $glob);

    $response->getBody()->write(json_encode($result));

    return $response;
});



$app->post('/completed', function (Request $request, Response $response, array $args) {

    $content = json_Decode($request->getBody()->getContents(), true);

    file_put_contents(sprintf('../storage/completed/%s.json', $content['id']), json_encode($content));

    $response->getBody()->write('Yo');

    return $response;
});


$app->run();