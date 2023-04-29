<?php

// Check if file has been uploaded
if(isset($_FILES["file"])) {
  
  // Define target folder to save uploaded file
  $target_dir = "uploads/";
  
  // Generate a unique filename
  $target_file = $target_dir . uniqid() . '_' . basename($_FILES["file"]["name"]);

  // Check file type
  $file_type = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
  if($file_type != "csv") {
    die("Only CSV files are allowed");
  }

  // Move uploaded file to target directory
  if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    echo "The file ". htmlspecialchars( basename( $_FILES["file"]["name"])). " has been uploaded.";

    // Read CSV file and insert data into database
    require_once('path/to/csvtojson.php'); // Include the csvtojson library
    $source = csvtojson(array('file'=>$target_file));

    // Fetching the data from each row and inserting to the table "program_participant"
    for ($i = 0; $i < count($source); $i++) {
      $pid = $source[$i]["pid"];
      $fullname = $source[$i]["fullname"];
      $email = $source[$i]["email"];
      $contact = $source[$i]["contact"];

      // Verify if the pid exists in program_management table
      $selectStatement = "SELECT * FROM program_management WHERE pid = ?";
      $items = [$pid];

      $stmt = $conn->prepare($selectStatement);
      $stmt->execute($items);
      $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

      if ($results) {
        // If pid exists, insert data into program_participant table
        $insertStatement = "INSERT INTO program_participant (pid, fullname, email, contact) VALUES (?, ?, ?, ?)";
        $participantItems = [$pid, $fullname, $email, $contact];

        $stmt = $conn->prepare($insertStatement);
        $stmt->execute($participantItems);
      } else {
        // If pid does not exist, skip this row
        echo "Skipping participant at row ", $i + 1, " because program with pid ", $pid, " does not exist.";
      }
    }
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}
?>