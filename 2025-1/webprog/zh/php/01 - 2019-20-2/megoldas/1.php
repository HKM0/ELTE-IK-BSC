<?php

$data = json_decode(file_get_contents("data.json"), TRUE);

function is_hour($value)
{
  return is_numeric($value) && intval($value) <= 24 && intval($value) >= 0;
}

$errors = [];
if (isset($_POST["day"]) && isset($_POST["from"]) && isset($_POST["to"])) {
  $day = $_POST["day"];
  $from = $_POST["from"];
  $to = $_POST["to"];

  if (!is_hour($from) || !is_hour($to)) {
    $errors[] = "Start or end time is not a valid hour";
  }

  if (intval($from) >= intval($to)) {
    $errors[] = "End time is earlier than from";
  }

  if (empty($errors)) {
    $data[] = ["day" => intval($day), "from" => intval($from), "to" => intval($to)];
    file_put_contents("data.json", json_encode($data, JSON_PRETTY_PRINT));
  }
}

$days = [0, 0, 0, 0, 0, 0, 0];
foreach ($data as $item) {
  $days[$item["day"] - 1] += $item["to"] - $item["from"];
}

//var_dump($days);

function hours_to_color($hours)
{
  $h = (8 - $hours) / 8 * 100;
  if ($hours > 8) {
    return "background: red";
  }
  return "background: hsl(120, 50%, ${h}%)";
}

?>

<style>
  th,
  td {
    width: 80px;
    height: 50px;
    border: solid gray 1px;
  }
</style>
<table>
  <tr>
    <th>Monday</th>
    <th>Tuesday</th>
    <th>Wednesday</th>
    <th>Thursday</th>
    <th>Friday</th>
    <th>Saturday</th>
    <th>Sunday</th>
  </tr>
  <tr>
    <?php foreach ($days as $day) : ?>
      <td style="<?= hours_to_color($day) ?>"></td>
    <?php endforeach; ?>
  </tr>
</table>

<form method="post">
  <select name="day">
    <option value="1">Monday</option>
    <option value="2">Tuesday</option>
    <option value="3">Wednesday</option>
    <option value="4">Thursday</option>
    <option value="5">Friday</option>
    <option value="6">Saturday</option>
    <option value="7">Sunday</option>
  </select>
  <input type="number" name="from">
  <input type="number" name="to">
  <button type="submit">Add</button>
</form>

<?php foreach ($errors as $error) : ?>
  <div><?= $error ?></div>
<?php endforeach; ?>