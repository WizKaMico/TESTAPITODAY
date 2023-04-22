const mysql = require('mysql')
const express = require('express')
const app = express() 
const bodyParser = require('body-parser')
const cors = require('cors')
const csvtojson = require('csvtojson')
const port =  process.env.PORT || 3002
const md5 = require('md5')
const crypto = require('crypto');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// const upload = multer({ dest: 'uploads/' });
// const upload = multer({ dest: 'uploads/', limits: { fileSize: 1000000 }, fileFilter: fileFilter }).single('file');



app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const conn = mysql.createConnection({
    host : 'localhost',
    user: 'root', 
    password : '', 
    database : 'test_app'
})

//EVERYTHING ABOUT SUPERADMIN : START
// GET : http://localhost:3002/SuperAdmin
app.get('/SuperAdmin', (req, res) => {
    conn.query('SELECT * FROM super_admin', (err, result) => {
        if(err){
            throw err;
        }else{
            res.send(result)
        }
    })
})

app.post('/SuperAdminCreation', (req, res) => {

    // POST : http://localhost:3002/SuperAdminCreation
    // {
    //     "fullname":"Gerald Mico Facistol", 
    //     "email":"tricore012@gmail.com", 
    //     "password": "micotothemoon"
    // }

    const fullname = req.body.fullname 
    const email = req.body.email 
    const password = req.body.password
    const rpass = crypto.createHash('md5').update(password).digest('hex');
    // getting date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    const date_created = today
    
    console.log(date_created)

    // Check if email already exists
    conn.query("SELECT * FROM super_admin WHERE email = ?", [email], (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length > 0) {
            res.send('Email already exists in the database');
        } else {
            // Email does not exist, insert new record
            conn.query("INSERT INTO super_admin (fullname, email, password, date_created) VALUES (?,?,?,?)", [fullname, email, rpass, date_created], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Super admin has been inserted successfully in the database ' + fullname);
                }
            });
        }
    });
});


app.delete('/SuperAdminDeletion', (req, res) => {

    // DELETE : http://localhost:3002/SuperAdminDeletion
    // {
    //     "email":"tricore012@gmail.com"
    // }     

    const email = req.body.email 
    conn.query("SELECT * FROM super_admin WHERE email = ?", [email], (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length === 0) {
            res.send('Email does not exist in the database');
        } else {
            // Email exists, delete record
            conn.query("DELETE FROM super_admin WHERE email = ?", [email], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Super admin has been deleted successfully from the database');
                }
            });
        }
    });
});

app.put('/SuperAdminUpdate', (req, res) => {
    
    // PUT : http://localhost:3002/SuperAdminUpdate
    // {
    //     "fullname":"Gerald Mico", 
    //     "email":"tricore012@gmail.com", 
    //     "password": "micotothemooonandback"
    // }


    const fullname = req.body.fullname 
    const email = req.body.email 
    const password = req.body.password
    const rpass = crypto.createHash('md5').update(password).digest('hex');

    conn.query("SELECT * FROM super_admin WHERE email = ?", [email], (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length === 0) {
            res.send('Email does not exist in the database');
        } else {
            // Email exists, update record
            conn.query("UPDATE super_admin SET fullname = ?, password = ?  WHERE email = ?", [fullname, rpass, email], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Super admin has been updated successfully in the database');
                }
            });
        }
    });
});

//EVERYTHING ABOUT SUPERADMIN : END

//EVERYTHING ABOUT SIDEADMIN : START 

app.get('/SideAdmin', (req, res) => {
    // GET : http://localhost:3002/SideAdmin

    conn.query('SELECT * FROM admin', (err, result) => {
        if(err){
            throw err; 
        }else{
            res.send(result);
        }
    })
})

app.post('/SideAdminCreation', (req, res) => {

    // POST : http://localhost:3002/SideAdminCreation
    // {
    //     "fullname":"Gerald Mico Facistol", 
    //     "email":"tricore012@gmail.com",
    //     "contact": "09166513189",  
    //     "password": "micotothemoon",
    //     "department":"I.T DEPARTMENT"    
    // }

    const fullname = req.body.fullname;
    const email = req.body.email;
    const contact = req.body.contact;  
    const password = req.body.password;
    const rpass = crypto.createHash('md5').update(password).digest('hex');
    const department = req.body.department;
    const status = 'UN-APPROVED';

    // getting date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    const date_created = today

    try {
        // Check if email already exists
        conn.query("SELECT * FROM admin WHERE email = ?", [email], (err, rows) => {
            if (err) {
                throw err;
            } else if (rows.length > 0) {
                res.send('Email already exists in the database');
            } else {
                // Email does not exist, insert new record
                conn.query("INSERT INTO admin (fullname, email, contact, password, department, status, date_created) VALUES (?,?,?,?,?,?,?)", [fullname, email, contact, rpass, department, status, date_created], (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        res.send('Admin has been inserted successfully in the database ' + fullname);
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred while processing your request.');
    }
});


app.delete('/SideAdminDelete', (req, res) => {

     // DELETE : http://localhost:3002/SideAdminDelete
    // {
    //     "email":"tricore012@gmail.com"
    // }     

    const email = req.body.email 
    conn.query("SELECT * FROM admin WHERE email = ?", [email], (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length === 0) {
            res.send('Email does not exist in the database');
        } else {
            // Email exists, delete record
            conn.query("DELETE FROM admin WHERE email = ?", [email], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Admin has been deleted successfully from the database');
                }
            });
        }
    });
})

app.put('/SideAdminUpdate', (req, res) => {
    
    // PUT : http://localhost:3002/SideAdminUpdate
    // {
    //     "fullname":"Gerald Mico Facistol", 
    //     "email":"tricore012@gmail.com",
    //     "contact": "09166513189",  
    //     "password": "micotothemoon",
    //     "department":"I.T DEPARTMENT"    
    // }

    const fullname = req.body.fullname;
    const email = req.body.email;
    const contact = req.body.contact;  
    const password = req.body.password;
    const rpass = crypto.createHash('md5').update(password).digest('hex');
    const department = req.body.department;

    conn.query("SELECT * FROM admin WHERE email = ?", [email], (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length === 0) {
            res.send('Email does not exist in the database');
        } else {
            // Email exists, update record
            conn.query("UPDATE admin SET fullname = ?, contact = ?, password = ?, department = ?  WHERE email = ?", [fullname, contact, rpass, department, email], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Admin has been updated successfully in the database');
                }
            });
        }
    });
});


app.put('/SideAdminApproval', (req, res) => {

    // PUT : http://localhost:3002/SideAdminApproval
    // {
    //     "email":"tricore012@gmail.com"    
    // }
     
    const email = req.body.email;
    const status = 'APPROVED'

    conn.query("SELECT * FROM admin WHERE email = ?", [email], (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length === 0) {
            res.send('Email does not exist in the database');
        } else {
            // Email exists, update record
            conn.query("UPDATE admin SET status = ?  WHERE email = ?", [status, email], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Admin has been Approved successfully in the database');
                }
            });
        }
    });
})

app.put('/SideAdminDisApproved', (req, res) => {

    // PUT : http://localhost:3002/SideAdminDisApproved
    // {
    //     "email":"tricore012@gmail.com"    
    // }
     
    const email = req.body.email;
    const status = 'UN-APPROVED'

    conn.query("SELECT * FROM admin WHERE email = ?", [email], (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length === 0) {
            res.send('Email does not exist in the database');
        } else {
            // Email exists, update record
            conn.query("UPDATE admin SET status = ?  WHERE email = ?", [status, email], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Admin has been UN-Approved successfully in the database');
                }
            });
        }
    });

})
//EVERYTHING ABOUT SIDEADMIN : END

//EVERYTHING ABOUT FACULTY : START 

app.get('/Faculty', (req, res) => {
    // GET : http://localhost:3002/SideAdmin

    conn.query('SELECT * FROM faculty', (err, result) => {
        if(err){
            throw err; 
        }else{
            res.send(result);
        }
    })
})

app.post('/FacultyCreation', (req, res) => {

    // POST : http://localhost:3002/FacultyCreation
    // {
    //     "fullname":"Gerald Mico Facistol", 
    //     "email":"tricore012@gmail.com",
    //     "contact": "09166513189",  
    //     "password": "micotothemoon",
    //     "department":"I.T DEPARTMENT"    
    // }

    const fullname = req.body.fullname;
    const email = req.body.email;
    const contact = req.body.contact;  
    const password = req.body.password;
    const rpass = crypto.createHash('md5').update(password).digest('hex');
    const department = req.body.department;
    const status = 'UN-APPROVED';

    // getting date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    const date_created = today

    try {
        // Check if email already exists
        conn.query("SELECT * FROM faculty WHERE email = ?", [email], (err, rows) => {
            if (err) {
                throw err;
            } else if (rows.length > 0) {
                res.send('Email already exists in the database');
            } else {
                // Email does not exist, insert new record
                conn.query("INSERT INTO faculty (fullname, email, contact, password, department, status, date_created) VALUES (?,?,?,?,?,?,?)", [fullname, email, contact, rpass, department, status, date_created], (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        res.send('faculty has been inserted successfully in the database ' + fullname);
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred while processing your request.');
    }
});


app.delete('/FacultyDelete', (req, res) => {

     // DELETE : http://localhost:3002/FacultyDelete
    // {
    //     "email":"tricore012@gmail.com"
    // }     

    const email = req.body.email 
    conn.query("SELECT * FROM faculty WHERE email = ?", [email], (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length === 0) {
            res.send('Email does not exist in the database');
        } else {
            // Email exists, delete record
            conn.query("DELETE FROM admin WHERE email = ?", [email], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Admin has been deleted successfully from the database');
                }
            });
        }
    });
})

app.put('/FacultyUpdate', (req, res) => {
    
    // PUT : http://localhost:3002/FacultyUpdate
    // {
    //     "fullname":"Gerald Mico Facistol", 
    //     "email":"tricore012@gmail.com",
    //     "contact": "09166513189",  
    //     "password": "micotothemoon",
    //     "department":"I.T DEPARTMENT"    
    // }

    const fullname = req.body.fullname;
    const email = req.body.email;
    const contact = req.body.contact;  
    const password = req.body.password;
    const rpass = crypto.createHash('md5').update(password).digest('hex');
    const department = req.body.department;

    conn.query("SELECT * FROM faculty WHERE email = ?", [email], (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length === 0) {
            res.send('Email does not exist in the database');
        } else {
            // Email exists, update record
            conn.query("UPDATE faculty SET fullname = ?, contact = ?, password = ?, department = ?  WHERE email = ?", [fullname, contact, rpass, department, email], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Faculty has been updated successfully in the database');
                }
            });
        }
    });
});


app.put('/FacultyApproval', (req, res) => {

    // PUT : http://localhost:3002/FacultyApproval
    // {
    //     "email":"tricore012@gmail.com"    
    // }
     
    const email = req.body.email;
    const status = 'APPROVED'

    conn.query("SELECT * FROM faculty WHERE email = ?", [email], (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length === 0) {
            res.send('Email does not exist in the database');
        } else {
            // Email exists, update record
            conn.query("UPDATE faculty SET status = ?  WHERE email = ?", [status, email], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Faculty has been Approved successfully in the database');
                }
            });
        }
    });
})

app.put('/FacultyDisApproved', (req, res) => {

    // PUT : http://localhost:3002/FacultyDisApproved
    // {
    //     "email":"tricore012@gmail.com"    
    // }
     
    const email = req.body.email;
    const status = 'UN-APPROVED'

    conn.query("SELECT * FROM faculty WHERE email = ?", [email], (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length === 0) {
            res.send('Email does not exist in the database');
        } else {
            // Email exists, update record
            conn.query("UPDATE faculty SET status = ?  WHERE email = ?", [status, email], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Faculty has been UN-Approved successfully in the database');
                }
            });
        }
    });

})


app.post('/FacultyGenerateReport', (req, res) => {
    // POST : http://localhost:3002/FacultyGenerateReport
    // {
    //     "email":"tricore012@gmail.com",
    //     "password":"admin"
    // }
  
    // Check if faculty email and password are valid
    const email = req.body.email 
    const password = req.body.password
    const rpass = md5(password)
    const checkQuery = `SELECT * FROM faculty WHERE email = '${email}' AND password = '${rpass}'`;
    conn.query(checkQuery, (error, results, fields) => {
      if (error) {
        console.error('Failed to retrieve data from MySQL:', error);
        res.status(500).send('Internal server error');
      } else {
        if (results.length === 0) {
          // Faculty email and password not valid
          res.send('Invalid account');
        } else {
          // Query the database to get the required information
          const query = `SELECT program_management.program_title, program_management.status, faculty.fullname, COUNT(program_participant.pid) AS total_participants
          FROM program_management
          LEFT JOIN assign_program_faculty ON program_management.pid = assign_program_faculty.pid
          LEFT JOIN faculty ON assign_program_faculty.fid = faculty.fid
          LEFT JOIN program_participant ON program_management.pid = program_participant.pid
          GROUP BY program_management.program_title`;
          conn.query(query, (error, results, fields) => {
            if (error) {
              console.error('Failed to retrieve data from MySQL:', error);
              res.status(500).send('Internal server error');
            } else {
              // Render the results on the web page
              const html = `
                <h1>Programs, Faculties, and Participants</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Program</th>
                      <th>Faculty</th>
                      <th>Status</th>
                      <th>Total Participants</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${results.map(result => `
                      <tr>
                        <td>${result.program_title}</td>
                        <td>${result.fullname}</td>
                        <td>${result.status}</td>
                        <td>${result.total_participants}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              `;
              res.send(html);
            }
          });
        }
      }
    });
  });
  
//EVERYTHING ABOUT FACULTY : END


//EVERYTHING ABOUT PROGRAM : START

app.get('/Program', (req, res) => {

    // GET :  http://localhost:3002/Program

    conn.query('SELECT * FROM program_management', (err, result) => {
        if(err){
            throw err;
        }else{
            res.send(result)
        }
    })
})

app.post('/UploadProgram', (req, res) => {

    // POST : http://localhost:3002/UploadProgram
    // {
    //     "program_title":"WHAT DOESNT KILL YOU MAKES YOU STRONGER",
    //     "start":"2023-04-22 14:30:00",
    //     "end":"2023-04-22 14:30:00",
    //     "place":"BULACAN",
    //     "program_details":"program_details",
    //     "program_lead":"program_lead",
    //     "program_member":"program_member"   
    // }

    const program_title = req.body.program_title; 
    const start = req.body.start; 
    const end = req.body.start; 
    const place = req.body.place; 
    const program_details = req.body.program_details; 
    const program_lead = req.body.program_lead; 
    const program_member = req.body.program_member; 
    
    conn.query("INSERT INTO program_management (program_title, start, end, place, program_details, program_lead, program_member) VALUES (?,?,?,?,?,?,?)", [program_title, start, end, place, program_details, program_lead, program_member], (err, result) => {
        if(err){
            throw err
        }else{
            res.send('Added Program Succesfully ' + program_title);
        }
    })
})

app.put('/UpdateProgram', (req, res) => {

    // PUT : http://localhost:3002/UpdateProgram
    // {
    //     "pid":1,
    //     "program_title":"WHAT DOESNT KILL YOU MAKES YOU STRONGER PART 2",
    //     "start":"2023-04-22 14:30:11",
    //     "end":"2023-04-22 14:30:12",
    //     "place":"BULACAN PH",
    //     "program_details":"program_details 1",
    //     "program_lead":"program_lead 1",
    //     "program_member":"program_member 1"   
    // }

    const pid = req.body.pid; 
    const program_title = req.body.program_title; 
    const start = req.body.start; 
    const end = req.body.start; 
    const place = req.body.place; 
    const program_details = req.body.program_details; 
    const program_lead = req.body.program_lead; 
    const program_member = req.body.program_member; 
    const status = 'IN-PROGRESS'

    conn.query("SELECT * FROM program_management WHERE pid = ?", [pid], (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length > 0) {
            // pid exists, update record
            conn.query("UPDATE program_management SET program_title = ?, start = ?, end = ?, place = ?, program_details = ?, program_lead = ?, program_member = ? WHERE pid = ?", [program_title, start, end, place, program_details, program_lead, program_member, pid], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Updated Program Successfully ' + program_title);
                }
            });
        } else {
            // pid does not exist, insert new record
            conn.query("INSERT INTO program_management (program_title, start, end, place, program_details, program_lead, program_member, status) VALUES (?,?,?,?,?,?,?,?)", [program_title, start, end, place, program_details, program_lead, program_member, status], (err, result) => {
                if(err){
                    throw err;
                }else{
                    res.send('Added Program Successfully ' + program_title);
                }
            });
        }
    });
})

app.delete('/DeleteProgram', (req, res) => {

    // DELETE : http://localhost:3002/DeleteProgram
   // {
   //     "pid": 1
   // }     

   const pid = req.body.pid;
   conn.query("SELECT * FROM program_management WHERE pid = ?", [pid], (err, rows) => {
       if (err) {
           throw err;
       } else if (rows.length > 0) {
            
        conn.query("DELETE FROM program_management WHERE pid = ?", [pid], (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send('Program has been deleted successfully from the database');
            }
        });
        
       } else {
           // Email exists, delete record
           res.send('Program does not exist in the database');   
       }
   });
})


app.put('/CompleteProgram', (req, res) => {

    // POST : http://localhost:3002/CompleteProgram
   // {
   //     "pid": 1
   // }     

   const pid = req.body.pid;
   conn.query("SELECT * FROM program_management WHERE pid = ?", [pid], (err, rows) => {
       if (err) {
           throw err;
       } else if (rows.length > 0) {
        const status = 'COMPLETE'
        conn.query("UPDATE program_management SET status = ? WHERE pid = ?", [status,pid], (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send('Program has been completed successfully from the database');
            }
        });
        
       } else {
           // Email exists, delete record
           res.send('Program does not exist in the database');   
       }
   });
})

app.put('/InCompleteProgram', (req, res) => {

    // POST : http://localhost:3002/InCompleteProgram
   // {
   //     "pid": 1
   // }     

   const pid = req.body.pid;
   conn.query("SELECT * FROM program_management WHERE pid = ?", [pid], (err, rows) => {
       if (err) {
           throw err;
       } else if (rows.length > 0) {
        const status = 'IN-PROGRESS'
        conn.query("UPDATE program_management SET status = ? WHERE pid = ?", [status,pid], (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send('Program has been set to IN-PROGRESS successfully from the database');
            }
        });
        
       } else {
           // Email exists, delete record
           res.send('Program does not exist in the database');   
       }
   });
})


app.post('/AssignProgramFaculty', (req, res) => {

    // POST : http://localhost:3002/AssignProgramFaculty
    // {
    //     "fid" : 2, 
    //     "pid" : 3
    // }

    const fid = req.body.fid; 
    const pid = req.body.pid; 

    conn.query("SELECT * FROM program_management WHERE pid = ?", [pid], (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length > 0) {
            conn.query("SELECT * FROM faculty WHERE fid = ?", [fid], (err, frows) => {
                if (err) {
                    throw err;
                } else if (frows.length > 0) {
                    conn.query("SELECT * FROM assign_program_faculty WHERE pid = ?", [pid], (err, arows) => {
                        if (err) {
                            throw err;
                        } else if (arows.length > 0) {
                            // pid already exists in assign_program_faculty table
                            const existingFid = arows[0].fid;
                            if (existingFid !== fid) {
                                // pid already exists with different fid, do not insert new record
                                res.send('pid already exists with different fid in assign_program_faculty table');
                            } else {
                                // pid and fid already exist in assign_program_faculty table, no need to insert new record
                                res.send('pid and fid already exist in assign_program_faculty table');
                            }
                        } else {
                            // insert new record in assign_program_faculty table
                            conn.query("INSERT INTO assign_program_faculty (fid, pid) VALUES (?, ?)", [fid, pid], (err, result) => {
                                if (err) {
                                    throw err;
                                } else {
                                    res.send(result);
                                }
                            });
                        }
                    });
                } else {
                    res.send('faculty does not exist in the database');
                }
            });
        } else {
            res.send('Program does not exist in the database');
        }
    });
});




app.post('/UploadProgramParticipants', (req, res) => {

    // POST : http://localhost:3002/UploadProgramParticipants
    // {
    //     "fileName":"participants/test_participant.csv"
    // }

    const fileName = req.body.fileName;

    csvtojson({ ignoreColumns: /(field[5-9]|field10)/ }).fromFile(fileName).then(source => {

        // Fetching the data from each row and inserting to the table "program_participant"
        for (var i = 0; i < source.length; i++) {
            var pid = source[i]["pid"],
                fullname = source[i]["fullname"],
                email = source[i]["email"],
                contact = source[i]["contact"]

            // Verify if the pid exists in program_management table
            var selectStatement = "SELECT * FROM program_management WHERE pid = ?";
            var items = [pid];

            conn.query(selectStatement, items,
                (err, results, fields) => {
                    if (err) {
                        console.log("Unable to verify participant at row ", i + 1);
                        return console.log(err);
                    }
                    // If pid exists, insert data into program_participant table
                    if (results.length > 0) {
                        console.log("participantItems before insertion:", participantItems);
                        var insertStatement = "INSERT INTO program_participant (pid, fullname, email, contact) VALUES (?, ?, ?, ?)";
                        var participantItems = [pid, fullname, email, contact];
                        console.log(participantItems)

                        conn.query(insertStatement, participantItems,
                            (err, results, fields) => {
                                if (err) {
                                    console.log("Unable to insert participant at row ", i + 1);
                                    return console.log(err);
                                }
                            });
                    } else {
                        console.log("Skipping participant at row ", i + 1, " because program with pid ", pid, " does not exist.");
                    }
                });
        }
        
        console.log("Participants inserted into database successfully...!!");
        res.send("Participants inserted into database successfully...!!");

    }).catch((err) => {
        console.log("Error: ", err);
        res.status(500).send("Error inserting participants into database.");
    });

})


// create a GET request handler
app.get('/GenerateReport', (req, res) => {
    // GET : http://localhost:3002/GenerateReport
    // query the database to get the required information
    const query = `SELECT program_management.program_title, program_management.status, faculty.fullname, COUNT(program_participant.pid) AS total_participants
    FROM program_management
    LEFT JOIN assign_program_faculty ON program_management.pid = assign_program_faculty.pid
    LEFT JOIN faculty ON assign_program_faculty.fid = faculty.fid
    LEFT JOIN program_participant ON program_management.pid = program_participant.pid
    GROUP BY program_management.program_title`;
    conn.query(query, (error, results, fields) => {
      if (error) {
        console.error('Failed to retrieve data from MySQL:', error);
        res.status(500).send('Internal server error');
      } else {
        // render the results on the web page
        const html = `
          <h1>Programs, Faculties, and Participants</h1>
          <table>
            <thead>
              <tr>
                <th>Program</th>
                <th>Faculty</th>
                <th>Status</th>
                <th>Total Participants</th>
              </tr>
            </thead>
            <tbody>
              ${results.map(result => `
                <tr>
                  <td>${result.program_title}</td>
                  <td>${result.fullname}</td>
                  <td>${result.status}</td>
                  <td>${result.total_participants}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
        res.send(html);
      }
    });
  });


//EVERYTHING ABOUT PROGRAM : END

//EVERYTHING ABOUT PARTNERS MANAGEMENT : START

app.post('/PartnersCreation', (req, res) => {

    // {
    //     "name":"ACCENTURE", 
    //     "address":"MAGICIAN AKO PERO HINDI KA SURE", 
    //     "contact_person": "Gerald",
    //     "contact_number": "09166513189",
    //     "contact_email": "tricore012@gmail.com",
    //     "start_date": "2022-04-20",
    //     "expiration_date": "2023-04-24"
        
    // }


    const name = req.body.name 
    const address = req.body.address 
    const contact_person = req.body.contact_person
    const contact_number = req.body.contact_number
    const contact_email = req.body.contact_email
    const start_date = req.body.start_date
    const expiration_date = req.body.expiration_date
    const date_created = new Date().toISOString().slice(0, 19).replace('T', ' ')

    // Calculate the number of days until the contract expires
    const today = new Date();
    const expiration = new Date(expiration_date);
    const timeDiff = Math.abs(expiration.getTime() - today.getTime());
    const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Determine the contract validity based on the number of remaining days
    let validity = '';
    if (remainingDays > 365) {
        validity = '1 year';
    } else if (remainingDays > 30) {
        const months = Math.floor(remainingDays / 30);
        validity = `${months} month${months > 1 ? 's' : ''}`;
    } else {
        validity = `${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
    }

    // Check if email already exists
    conn.query("SELECT * FROM partners_management WHERE contact_email = ? AND contact_number = ?", [contact_email,contact_number], (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length > 0) {
            res.send('Email / Contact already exists in the database');
        } else {
            // Email does not exist, insert new record
            conn.query("INSERT INTO partners_management (name,address,contact_person,contact_number,contact_email,start_date,expiration_date,valid,remaining_days,date_created) VALUES (?,?,?,?,?,?,?,?,?,?)", [name,address,contact_person,contact_number,contact_email,start_date,expiration_date,validity,remainingDays,date_created], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Partner has been inserted successfully in the database ' + name);
                }
            });
        }
    });
});

app.put('/PartnersUpdate', (req, res) => {

    // {
    //     "contact_number": "09166513189",
    //     "contact_email": "tricore012@gmail.com",
    //     "start_date": "2022-04-20",
    //     "expiration_date": "2023-04-24"
    // }

    const contact_number = req.body.contact_number
    const contact_email = req.body.contact_email
    const start_date = req.body.start_date
    const expiration_date = req.body.expiration_date

    // Calculate the number of days until the contract expires
    const today = new Date();
    const expiration = new Date(expiration_date);
    const timeDiff = Math.abs(expiration.getTime() - today.getTime());
    const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Determine the contract validity based on the number of remaining days
    let validity = '';
    if (remainingDays > 365) {
        validity = '1 year';
    } else if (remainingDays > 30) {
        const months = Math.floor(remainingDays / 30);
        validity = `${months} month${months > 1 ? 's' : ''}`;
    } else {
        validity = `${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
    }

    // Check if email already exists
    conn.query("SELECT * FROM partners_management WHERE contact_email = ? AND contact_number = ?", [contact_email, contact_number], (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length > 0) {

            // Update the record and set the new validity and remaining days
            conn.query("UPDATE partners_management SET start_date = ?, expiration_date = ?, valid = ?, remaining_days = ? WHERE contact_email = ? AND contact_number = ?", [start_date, expiration_date, validity, remainingDays, contact_email, contact_number], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Partner has been updated successfully in the database');
                }
            });
        } else {
            res.send('Email / Contact does not exist in the database');
        }
    });
});


// create a GET request handler
app.get('/PartnersReport', (req, res) => {
    // GET : http://localhost:3002/PartnersReport
    // query the database to get the required information
    const query = `SELECT * FROM partners_management`;
    conn.query(query, (error, results, fields) => {
      if (error) {
        console.error('Failed to retrieve data from MySQL:', error);
        res.status(500).send('Internal server error');
      } else {
        // render the results on the web page
        const html = `
          <h1>PARTNERS REPORTS</h1>
          <table>
            <thead>
              <tr>
                <th>PARTNER NAME</th>
                <th>CONTACT</th>
                <th>START</th>
                <th>END</th>
                <th>REMAINING DAYS</th>
                <th>VALIDITY</th>
              </tr>
            </thead>
            <tbody>
              ${results.map(result => `
                <tr>
                  <td>${result.name}</td>
                  <td>${result.contact_person}</td>
                  <td>${result.start_date}</td>
                  <td>${result.expiration_date}</td>
                  <td>${result.remaining_days}</td>
                  <td>${result.valid}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
        res.send(html);
      }
    });
  });



//EVERYTHING ABOUT PARTNERS MANAGEMENT : END

//EVERYTHING ABOUT THEME : START 

// Add a new theme
app.post('/theme', (req, res) => {

    // POST : http://localhost:3002/theme
    // {
    //     "name": "theme_test",
    //     "colorScheme": "#00000"
    // }



    const { name, colorScheme } = req.body;
    const sql = 'INSERT INTO themes (name, color_scheme) VALUES (?, ?)';
    conn.query(sql, [name, colorScheme], (err, result) => {
      if (err) {
        console.error('Error adding theme:', err);
        res.status(500).send('Error adding theme');
        return;
      }
      console.log('Added theme with ID', result.insertId);
      res.status(201).send('Theme added successfully');
    });
  });
  
  // Get all themes
  app.get('/themes', (req, res) => {
    // GET http://localhost:3002/themes
    const sql = 'SELECT * FROM themes';
    conn.query(sql, (err, results) => {
      if (err) {
        console.error('Error getting themes:', err);
        res.status(500).send('Error getting themes');
        return;
      }
      res.status(200).json(results);
    });
  });
  
  // Update a theme
  app.put('/theme/:id', (req, res) => {
    // PUT http://localhost:3002/theme/1
    // {
    //     "name":"1738",
    //     "colorScheme":"#F110101"
    // }
    const { id } = req.params;
    const { name, colorScheme } = req.body;
    const sql = 'UPDATE themes SET name = ?, color_scheme = ? WHERE id = ?';
    conn.query(sql, [name, colorScheme, id], (err, result) => {
      if (err) {
        console.error('Error updating theme:', err);
        res.status(500).send('Error updating theme');
        return;
      }
      console.log('Updated theme with ID', id);
      res.status(200).send('Theme updated successfully');
    });
  });
  


//EVERYTHING ABOUT THEME : END 





// UPLOADING CERTIFICATE : START


// UPLOADING CERTIFICATE : START


app.listen(port, ()=> {
    console.log('App is currently listening to the PORT ' + port)
})