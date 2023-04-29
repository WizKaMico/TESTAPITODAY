<?php
	session_start();
    $pid = $_GET['pid'];
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="datatable/dataTable.bootstrap.min.css">
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
<div class="container">
	<div class="row">
		<div class="col-sm-12">
			<div class="row">
			<?php
				if(isset($_SESSION['error'])){
					echo
					"
					<div class='alert alert-danger text-center'>
						<button class='close'>&times;</button>
						".$_SESSION['error']."
					</div>
					";
					unset($_SESSION['error']);
				}
				if(isset($_SESSION['success'])){
					echo
					"
					<div class='alert alert-success text-center'>
						<button class='close'>&times;</button>
						".$_SESSION['success']."
					</div>
					";
					unset($_SESSION['success']);
				}
			?>
			</div>
			<div class="row">
            <h5>PROGRAM LEAD</h5>    
			</div>
			<div class="height10">
			</div>
			<div class="row">
            <form method="POST" action="modal/action/program_lead_cert.php">
                <table id="myTable" class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>FULLNAME</th>
                            <th>EMAIL</th>
                            <th>CONTACT</th>
                            <th>DEPARTMENT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            $conn = new mysqli('localhost', 'root', '', 'test_app');
                            if($conn->connect_error){
                                die("Connection failed: " . $conn->connect_error);
                            }
                            $sql = "SELECT *,faculty.fid as fidel FROM assign_program_faculty 
                                    LEFT JOIN faculty ON assign_program_faculty.fid = faculty.fid 
                                    WHERE assign_program_faculty.pid = '$pid'";

                            $query = $conn->query($sql);
                            while($row = $query->fetch_assoc()){
                                echo 
                                "<tr>
                                    <td><input type='checkbox' name='selected[]' value='".$row['fidel']."'>".$row['fidel']."</td>
                                    <td>".$row['fullname']."</td>
                                    <td>".$row['email']."</td>
                                    <td>".$row['contact']."</td>
                                    <td>".$row['department']."</td>
                                </tr>";
                            }
                        ?>
                    </tbody>
                </table>
                <button type="submit">Submit</button>
            </form>

			</div>

            <hr>
            <br />   
            <div class="row">
            <h5>PROGRAM MEMBERS</h5>    
			</div>            
            <div class="height10">
            
                <br />
			</div>
			<div class="row">
            <form method="POST" action="modal/action/program_lead_cert.php">
                <table id="anotherTable" class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>FULLNAME</th>
                            <th>EMAIL</th>
                            <th>CONTACT</th>
                            <th>DEPARTMENT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            $conn = new mysqli('localhost', 'root', '', 'test_app');
                            if($conn->connect_error){
                                die("Connection failed: " . $conn->connect_error);
                            }
                            $sql = "SELECT *,faculty.fid as fidel FROM assign_program_member
                            LEFT JOIN faculty ON assign_program_member.fid = faculty.fid 
                            WHERE assign_program_member.pid = '$pid'";

                            $query = $conn->query($sql);
                            while($row = $query->fetch_assoc()){
                                echo 
                                "<tr>
                                    <td><input type='checkbox' name='selected[]' value='".$row['fidel']."'>".$row['fidel']."</td>
                                    <td>".$row['fullname']."</td>
                                    <td>".$row['email']."</td>
                                    <td>".$row['contact']."</td>
                                    <td>".$row['department']."</td>
                                </tr>";
                            }
                        ?>
                    </tbody>
                </table>
                <button type="submit">Submit</button>
            </form>
			</div>

            <hr>
            <br />   
            <div class="row">
            <h5>PROGRAM PARTICIPANTS</h5>    
			</div>            
            <div class="height10">
            
                <br />
			</div>
			<div class="row">
            <form method="POST" action="modal/action/program_participant_cert.php">
                <table id="anotherTable1" class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>FULLNAME</th>
                            <th>EMAIL</th>
                            <th>CONTACT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            $conn = new mysqli('localhost', 'root', '', 'test_app');
                            if($conn->connect_error){
                                die("Connection failed: " . $conn->connect_error);
                            }
                            $sql = "SELECT *, id as fidel FROM program_participant
                            WHERE pid = '$pid'";

                            $query = $conn->query($sql);
                            while($row = $query->fetch_assoc()){
                                echo 
                                "<tr>
                                    <td><input type='checkbox' name='selected[]' value='".$row['fidel']."'>".$row['fidel']."</td>
                                    <td>".$row['fullname']."</td>
                                    <td>".$row['email']."</td>
                                    <td>".$row['contact']."</td>
                                </tr>";
                            }
                        ?>
                    </tbody>
                </table>
                <button type="submit">Submit</button>
            </form>
				
			</div>
		</div>
	</div>
</div>

<script src="jquery/jquery.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="datatable/jquery.dataTables.min.js"></script>
<script src="datatable/dataTable.bootstrap.min.js"></script>
<!-- generate datatable on our table -->
<script>
$(document).ready(function(){
	//inialize datatable
    $('#myTable').DataTable();
    $('#anotherTable').DataTable();
    $('#anotherTable1').DataTable();
    
    

    //hide alert
    $(document).on('click', '.close', function(){
    	$('.alert').hide();
    })
});
</script>
</body>
</html>