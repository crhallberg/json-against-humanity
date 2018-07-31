<?php
  $deck = json_decode(utf8_encode(file_get_contents('./data/cah.json')), true);
  $selected = $_POST['decks'];
  if(empty($selected)) {
    header('Content-type: text/plain');
    echo 'b(^-^)d';
    return;
  }

  if($_POST['type'] == 'JSON') {
    header('Content-type: application/json');
    $ret = array("blackCards"=>array(), "whiteCards"=>array());
    for($i=0;$i<count($selected);$i++) {
      $d = $deck[$selected[$i]];
      $temp = array(
        "name" => $d["name"],
        "black" => array(),
        "white" => array()
      );
      if(isset($d['icon'])) {
        $temp["icon"] = $d['icon'];
      }
      for($j=0;$j<count($d['black']);$j++) {
        $bc = $deck['blackCards'][$d['black'][$j]];
        if($bc['text'] == null) {
          continue;
        }
        array_push($temp['black'], array_search($bc, $ret['blackCards']) ?: array_push($ret['blackCards'], $bc)-1);
      }
      for($j=0;$j<count($d['white']);$j++) {
        $wc = $deck['whiteCards'][$d['white'][$j]];
        if($wc == null) {
          continue;
        }
        array_push($temp['white'], array_search($wc, $ret['whiteCards']) ?: array_push($ret['whiteCards'], $wc)-1);
      }
      $ret[$selected[$i]] = $temp;
    }
    sort($temp['black']);
    sort($temp['white']);
    $ret["order"] = $selected;
    echo json_encode($ret);

  } else {
    header('Content-type: text/plain');
    $white = "";
    for($i=0;$i<count($selected);$i++) {
      $d = $deck[$selected[$i]];
      for($j=0;$j<count($d['black']);$j++) {
        echo $deck['blackCards'][$d['black'][$j]]['text'] . "\n";
      }
      for($j=0;$j<count($d['white']);$j++) {
        $white .= $deck['whiteCards'][$d['white'][$j]] . "\n";
      }
    }
    echo "\n" . $white;
  }
?>
