<?php
require_once 'todo/app/init.php';

$itemsQuery = $db->prepare("
    SELECT id, name, done
    FROM items
    WHERE user = :user
    ORDER BY done
  "); 

$itemsQuery->execute([
  'user' => $_SESSION['user_id']
  ]);

$items = $itemsQuery->rowCount() ? $itemsQuery : [];
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>To do list</title>

  <link href="http://fonts.googleapis.com/css?family=Alegreya+Sans:400,900" rel="stylesheet">
    <link rel="stylesheet" href="todo/css/normalize.css">
    <link rel="stylesheet" href="todo/css/main.css">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript" src="jquery-1.11.2.js"> </script> 
     <script type="text/javascript" src="todojsaddin.js"> </script>
  </head>   

<body>
    <div class="list">
      <h1 class="header">To do:</h1>

          <form class="item-add" id="add-form" action="add.php">
            <input type="text" id="addItemValue"  name="name" placeholder="Add item here" class="input" required>
            <input type="submit" id="addItem" value="Add" class="submit">
          </form>

     <ul class="item-ul" id="notDone">

          <?php 
                $reachedDone = false;
                foreach($items as $item):
                if($item['done']==0): 
          ?>

          <li>
            <span class="item-li"><?php echo $item['name']; ?></span>
            <a href="mark.php?as=delete&item=<?php echo $item['id']; ?>" class="delete">Delete Item</a>
            <a href="mark.php?as=done&item=<?php echo $item['id']; ?>" class="mark-complete">Mark as complete</a>
          </li> 


          <?php 
            else:
            if(!$reachedDone):
          ?> 
      </ul>

      <h1 id="header-done"> Done: </h1>  

      <ul class="item-ul" id="donePile">
           
        <?php 
          $reachedDone=true;
          endif;
        ?>      
              <li>
                <span class="item-li" id="doneElement"><?php echo $item['name']; ?></span>
                <a href="mark.php?as=delete&item=<?php echo $item['id']; ?>" class="delete">Delete Item</a>
                <a href="mark.php?as=incomplete&item=<?php echo $item['id']?>" class="mark-incomplete">Mark INCOMPLETE</a>
              </li>

        <?php 
          endif;
          endforeach; 
        ?>

      </ul>
      </div>

<div id="footer">&copy Brendan R. Graff <?php echo " " .date("Y"); ?> </div>

</body>




</html> 




