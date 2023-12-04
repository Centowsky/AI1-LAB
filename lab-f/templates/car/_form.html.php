<?php
/** @var $car ?\App\Model\Car */
?>

<div class="form-group">
    <label for="brand">Brand</label>
    <input type="text" id="brand" name="car[brand]" value="<?= $car ? $car->getBrand() : '' ?>">
</div>

<div class="form-group">
    <label for="model">Model</label>
    <textarea id="model" name="car[model]"><?= $car ? $car->getModel() : '' ?></textarea>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
