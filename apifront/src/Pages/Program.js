import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function Program() {

    const [program_title, setProgram_title] = useState()
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [program_details, setProgram_details] = useState()
    const [program_lead, setProgram_lead] = useState()
    const [program_member, setProgram_member] = useState()


    const Register = () => {
        axios
          .post("http://localhost:3002/UploadProgram", {
            program_title: program_title,
            start: start,
            end: end,
            program_details: program_details,
            program_lead: program_lead,
            program_member: program_member
          })
          .then((response) => {
            if (response.data.success) {
              alert(response.data.message);
            } else {
              alert('Error: ' + response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
    return (
        <div>
        <div class="container">  
        <div id="contact">

            <h3>Create Program</h3>
            <h4>[Create,Read,Update,Delete]</h4>
            <fieldset>
            <input placeholder="Program Title" type="text" tabindex="1" onChange={(event) => {setProgram_title(event.target.value)}} required autofocus/>
            </fieldset>
            <fieldset>
            <input type="date" tabindex="2" onChange={(event) => {setStart(event.target.value)}} required/>
            </fieldset>
            <fieldset>
            <input type="date" tabindex="3" onChange={(event) => {setEnd(event.target.value)}} required/>
            </fieldset>
            <fieldset>
            <input placeholder="Program Details" type="text" tabindex="4" onChange={(event) => {setProgram_details(event.target.value)}} required autofocus/>
            </fieldset>
             <fieldset>
             <input placeholder="Program Lead" type="text" tabindex="5" onChange={(event) => {setProgram_lead(event.target.value)}} required autofocus/>
             </fieldset>
              <fieldset>
              <input placeholder="Program Member" type="text" tabindex="6" onChange={(event) => {setProgram_member(event.target.value)}} required autofocus/>
              </fieldset>
            <fieldset>
            <button  type="submit" id="contact-submit" onClick={ Register }>REGISTER</button>
            </fieldset>
        </div>
        </div>
    </div>
    );
}

export default Program;