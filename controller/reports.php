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

// Execute the SQL query
$sql = "SELECT program_management.program_title, program_management.status, faculty.fullname, COUNT(program_participant.pid) AS total_participants
        FROM program_management
        LEFT JOIN assign_program_faculty ON program_management.pid = assign_program_faculty.pid
        LEFT JOIN faculty ON assign_program_faculty.fid = faculty.fid
        LEFT JOIN program_participant ON program_management.pid = program_participant.pid
        GROUP BY program_management.program_title";
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
    <div id="myGrid" style="height: 500px;" class="ag-theme-alpine"></div>
    <script>
        var columnDefs = [
            { headerName: "Program Title", field: "program_title",  filter: true, resizable: true  },
            { headerName: "Status", field: "status",  filter: true, resizable: true },
            { headerName: "Faculty Name", field: "fullname",  filter: true, resizable: true },
            { headerName: "Total Participants", field: "total_participants",  filter: true, resizable: true }
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
