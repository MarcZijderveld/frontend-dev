<?php
$key = "RGAPI-8260ce12-8477-4326-ae07-46abc9eab4bb";
$baseurl = "https://na1.api.riotgames.com/lol/static-data/v3/champions";
$championurl = "https://na1.api.riotgames.com/lol/static-data/v3/champions/";
$runesURL = "https://na1.api.riotgames.com/lol/static-data/v3/runes/";

$requestMethod = $_SERVER["REQUEST_METHOD"];
$currentUrl = $_SERVER['REQUEST_URI'];
$accept = $_SERVER["HTTP_ACCEPT"];

$id = null;
$runes = null;

if (isset($_GET["id"]))
{
    $id = $_GET["id"];
}

if (isset($_GET["runes"]))
{
    $runes = $_GET["runes"];
}

switch($requestMethod) {
    case "GET":
       if (isset($id) && !empty($id)) {
           $object = request_single($championurl . $id, ["tags" =>  ["image", "info", "skins", "spells", "stats", "allytips", "enemytips", "lore", "tags", "passive"] ]);
           echo $object;
       }
        else if (isset($runes) && !empty($runes)) {
            $object = request_all($runesURL, ["tags" => ["image", "sanitizedDescription"]]);
            echo $object;
       }
       else
       {
           $object = request_all($baseurl, ["tags" => [ "image", "info" ]]);
           echo $object;
       }
    default:
        break;
}

function request_all($url, $parameters = []) {
    global $key;
    $parameters["api_key"] = $key;
    $i = 0;
    $j = 0;
    foreach ($parameters as $name => $value) {
        $i++;
        if($i > 1) {$url .= '&';}
        else {$url .= '?';}
        if(is_array($value))
        {
            foreach($value as $parameter) {
                $j++;
                if($j > 1) {$url .= '&';}
                $url .= $name . '=' . $parameter;
            }

        }
        else
        {
            $url .= $name . '=' . $value;
        }
    }

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $result = curl_exec($ch);
    $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $error = true;
    if($responseCode == 200) {
        $error = false;
    }

    $object = json_decode($result);

    $array = json_decode(json_encode($object->data), true);

    $temp = array_values($array);

    usort($temp, "cmp");

    return json_encode($temp);

}

function request_single($url, $parameters = []) {
    global $key;
    $parameters["api_key"] = $key;
    $i = 0;
    $j = 0;
    foreach ($parameters as $name => $value) {
        $i++;
        if($i > 1) {$url .= '&';}
        else {$url .= '?';}
        if(is_array($value))
        {
            foreach($value as $parameter) {
                $j++;
                if($j > 1) {$url .= '&';}
                $url .= $name . '=' . $parameter;
            }

        }
        else
        {
            $url .= $name . '=' . $value;
        }
    }
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $result = curl_exec($ch);
    $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $error = true;
    if($responseCode == 200) {
        $error = false;
    }

    $object = json_decode($result);
    $array = json_decode(json_encode($object), true);

    return json_encode($array);
}

function cmp($a, $b)
{
    return strcmp($a["name"], $b["name"]);
}