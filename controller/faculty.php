<?php

// Establish a connection to the database
$host = 'localhost';
$dbname = 'test_app';
$username = 'root';
$password = '';

$dsn = "mysql:host=$host;dbname=$dbname";
$options = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
);

try {
    $db = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
    exit;
}

// Execute a SELECT statement to retrieve the data
$sql = "SELECT * FROM faculty";
$stmt = $db->query($sql);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Build an array of objects representing the data
$data = array();
foreach ($results as $row) {
    $data[] = (object) $row;
}

// Encode the data as JSON
$jsonData = json_encode($data);

?>

<!DOCTYPE html>
<html>
<head>
    <title>ag-Grid Example</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-grid.css" />
    <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-theme-alpine.css" />
    <script src="https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.js"></script>
</head>
<body>
    <div id="myGrid" style="height: 500px; width:100%;" class="ag-theme-alpine"></div>
    <script>
        var columnDefs = [
            { headerName: "Fullname", field: "fullname",  filter: true, resizable: true  },
            { headerName: "Email", field: "email",  filter: true, resizable: true },
            { headerName: "Contact", field: "contact",  filter: true, resizable: true },
            { headerName: "Department", field: "department",  filter: true, resizable: true },
            { headerName: "Status", field: "status",  filter: true, resizable: true }
        ];

        var rowData = <?php echo $jsonData; ?>;

        var gridOptions = {
            columnDefs: columnDefs,
            rowData: rowData,
            pagination: true,
            paginationPageSize: 10,
            enableFilter: true,
            enableSorting: true,
            enableQuickFilter: true
        };

        var gridDiv = document.querySelector('#myGrid');
        new agGrid.Grid(gridDiv, gridOptions);
    </script>
</body>
</html>
