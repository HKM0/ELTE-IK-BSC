<?php 
session_start(); //kapsolat a többi fájlal

    $hiba=$_SESSION["errors"]??""; // a kapcsolat egy elemének kiolvasása.
    
    //echo $hiba;
    unset($_SESSION["errors"]); //tároló ürítése hogy ne maradjon benne frissítésnél.

?>

<form action="check.php" method="GET">
    Hány éves vagy?
    <input type="text" name="eletkor">
    
    <button type="submit">Mehet</button>
<?php if ($hiba != ''): ?>
        <div style="color: red; border: 1px solid red; padding: 10px;">
            <?= $hiba ?>
        </div>
    <?php endif; ?>
</form>
