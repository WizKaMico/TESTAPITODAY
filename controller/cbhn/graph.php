<?php

// Database configuration
$host = 'localhost';
$dbname = 'test_app';
$username = 'root';
$password = '';

// Connect to the database
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

// Group the results by program title
$programs = array();
foreach ($results as $row) {
    $programTitle = $row['program_title'];
    if (!isset($programs[$programTitle])) {
        $programs[$programTitle] = array(
            'status' => $row['status'],
            'faculties' => array(),
            'total_participants' => 0
        );
    }

    $facultyName = $row['fullname'];
    if (!isset($programs[$programTitle]['faculties'][$facultyName])) {
        $programs[$programTitle]['faculties'][$facultyName] = 0;
    }

    $programs[$programTitle]['faculties'][$facultyName]++;
    $programs[$programTitle]['total_participants'] += $row['total_participants'];
}

// Build the data arrays for the chart
$labels = array();
$statuses = array();
$datasets = array();

foreach ($programs as $programTitle => $programData) {
    $labels[] = $programTitle;
    $statuses[] = $programData['status'];

    $facultyCounts = array_values($programData['faculties']);
    $totalParticipants = $programData['total_participants'];

    $datasets[] = array(
        'label' => $programTitle,
        'backgroundColor' => 'rgba(255, 99, 132, 0.2)',
        'borderColor' => 'rgba(255, 99, 132, 1)',
        'borderWidth' => 1,
        'data' => $facultyCounts,
    );

    $datasets[] = array(
        'label' => $programTitle . ' Participants',
        'backgroundColor' => 'rgba(54, 162, 235, 0.2)',
        'borderColor' => 'rgba(54, 162, 235, 1)',
        'borderWidth' => 1,
        'data' => array($totalParticipants),
    );
}

// Output the chart using Chart.js
?>