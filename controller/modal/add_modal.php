<!-- Add New -->
<div class="modal fade" id="addlead" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="  background: transparent !important;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="false">&times;</button>
                <center><h4 class="modal-title" id="myModalLabel">ADD PROGRAM LEAD</h4></center>
            </div>
            <div class="modal-body">
			<div class="container-fluid">
			<form method="POST" action="modal/action/add_lead.php">
				<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">PROGRAM:</label>
					</div>
					<div class="col-sm-10">
						<select class="form-control" name="mypid" required>
							<?php
							
							$conn = mysqli_connect("localhost", "root", "", "test_app");
                            $result = mysqli_query($conn, "SELECT *,program_management.pid as mypid FROM program_management 
                               LEFT JOIN assign_program_faculty ON program_management.pid = assign_program_faculty.pid 
                               LEFT JOIN faculty ON assign_program_faculty.fid = faculty.fid 
                               WHERE assign_program_faculty.fid IS NULL");


							while ($row = mysqli_fetch_assoc($result)) {
								echo '<option value="' . $row['mypid'] . '">' . $row['program_title'] . ' | ' . $row['mypid'] . '</option>';
							}

							?>
						</select>
					</div>
				</div>
				<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">FACULTY:</label>
					</div>
					<div class="col-sm-10">
					<select class="form-control" name="fid" required>
							<?php
							
							$conn = mysqli_connect("localhost", "root", "", "test_app");
                            $result = mysqli_query($conn, "SELECT * FROM faculty WHERE status = 'APPROVED'");


							while ($row = mysqli_fetch_assoc($result)) {
								echo '<option value="' . $row['fid'] . '">' . $row['fullname'] . ' | ' . $row['fid'] . '</option>';
							}

							?>
						</select>
					</div>
				</div>
            </div> 
			</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
                <button type="submit" name="add" class="btn btn-primary" style="background-color:#590000;"><span class="glyphicon glyphicon-floppy-disk"></span> Save</a>
			</form>
            </div>

        </div>
    </div>
</div>






<!-- Add New -->
<div class="modal fade" id="addmember" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="  background: transparent !important;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="false">&times;</button>
                <center><h4 class="modal-title" id="myModalLabel">ADD PROGRAM MEMBER</h4></center>
            </div>
            <div class="modal-body">
			<div class="container-fluid">
			<form method="POST" action="modal/action/add_member.php">
				<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">PROGRAM:</label>
					</div>
					<div class="col-sm-10">
						<select class="form-control" name="mypid" required>
							<?php
							
							$conn = mysqli_connect("localhost", "root", "", "test_app");
                            $result = mysqli_query($conn, "SELECT * FROM program_management 
							LEFT JOIN assign_program_faculty ON program_management.pid = assign_program_faculty.pid 
							LEFT JOIN faculty ON assign_program_faculty.fid = faculty.fid 
							WHERE assign_program_faculty.fid IS NOT NULL");


							while ($row = mysqli_fetch_assoc($result)) {
								echo '<option value="' . $row['pid'] . '">' . $row['program_title'] . '</option>';
							}

							?>
						</select>
					</div>
				</div>
				<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">FACULTY:</label>
					</div>
					<div class="col-sm-10">
					<select class="form-control" name="fid" required>
							<?php
							
							$conn = mysqli_connect("localhost", "root", "", "test_app");
                            $result = mysqli_query($conn, "SELECT * FROM faculty WHERE status = 'APPROVED'");


							while ($row = mysqli_fetch_assoc($result)) {
								echo '<option value="' . $row['fid'] . '">' . $row['fullname'] . '</option>';
							}

							?>
						</select>
					</div>
				</div>
            </div> 
			</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
                <button type="submit" name="add" class="btn btn-primary" style="background-color:#590000;"><span class="glyphicon glyphicon-floppy-disk"></span> Save</a>
			</form>
            </div>

        </div>
    </div>
</div>