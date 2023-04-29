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
$sql = "SELECT program_management.*, 
COUNT(DISTINCT assign_program_member.id) AS totalmember, 
COUNT(DISTINCT program_participant.id) AS totalparticipants,
faculty.fullname as program_lead
FROM program_management 
LEFT JOIN assign_program_faculty ON program_management.pid = assign_program_faculty.pid 
LEFT JOIN assign_program_member ON program_management.pid = assign_program_member.pid 
LEFT JOIN program_participant ON program_management.pid = program_participant.pid 
LEFT JOIN faculty ON assign_program_faculty.fid = faculty.fid
GROUP BY program_management.pid";
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
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-grid.css" />
    <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-theme-alpine.css" />
    <script src="https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.js"></script>
	<style>
		.height10{
			height:10px;
		}
		.mtop10{
			margin-top:10px;
		}
		.modal-label{
			position:relative;
			top:7px
		}
	</style>
</head>
<body>
<a href="#addlead" style="margin-left:10px; margin-top:10px; background-color:#590000; margin-bottom: 10px; border-color:#590000;" data-toggle="modal" class="btn btn-primary"><span class="glyphicon glyphicon-user"></span> 1). ADD PROGRAM LEAD</a>
<a href="#addmember" style="margin-left:10px; margin-top:10px; background-color:#590000; margin-bottom: 10px; border-color:#590000;" data-toggle="modal" class="btn btn-primary"><span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-user"></span> 2). ADD PROGRAM MEMBER</a>
<a href="#addparticipant" style="margin-left:10px; margin-top:10px; background-color:#590000; margin-bottom: 10px; border-color:#590000;" data-toggle="modal" class="btn btn-primary"><span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-user"></span></span> 3). ADD PROGRAM PARTICIPANTS</a>
<div id="myGrid" style="height: 500px; width:100%;" class="ag-theme-alpine"></div>
    <script>
     var columnDefs = [
        { headerName: "PID", field: "pid", width: 100,  cellRenderer: function(params) {
            return '<a href="program_view.php/diff-page.php?pid=' + params.value + '">' + params.value + '</a>';
        },  filter: true, resizable: true  },
        { headerName: "Program Title", field: "program_title", width: 100,   filter: true, resizable: true  },
        { headerName: "Program Start", field: "start", width: 100,    filter: true, resizable: true },
        { headerName: "Program End", field: "end", width: 100,  filter: true, resizable: true },
        { headerName: "Place", field: "place", width: 100,  filter: true, resizable: true },
        { headerName: "Program Lead", width: 200, field: "program_lead",  cellRenderer: function(params) {
            if (!params.value) {
            return '<span style="background-color: maroon; color: white;">No assigned lead</span>';
            } else {
            return params.value;
            }
        }, filter: true, resizable: true },
        { headerName: "Members", field: "totalmember", width: 100,  cellStyle: function(params) {
            if (params.value == 0) {
            return { backgroundColor: "maroon" }; // or "red"
            }
        },  filter: true, resizable: true },
        { headerName: "Participants", field: "totalparticipants",  cellStyle: function(params) {
            if (params.value == 0) {
            return { backgroundColor: "maroon" }; // or "red"
            }
        }, width: 100,  filter: true, resizable: true },
        { headerName: "Status", field: "status", width: 100, filter: true, resizable: true },
        {
            headerName: "",
            field: "edit",
            cellRenderer: function(params) {
            return '<button class="edit-btn">Edit</button>';
            }
        }
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

<script>
    // Get the modal
    var modal = document.getElementById("edit-modal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    document.querySelector("#myGrid").addEventListener("click", function(e) {
        if (e.target.className === "edit-btn") {
            modal.style.display = "block";
        }
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
</script>
<?php include('modal/add_modal.php') ?>
<script src="jquery/jquery.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>

</body>
</html>
