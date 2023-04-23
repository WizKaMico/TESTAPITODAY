import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function Super() {

    const [fullname, setFullname] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const Register = () => {
        axios
          .post("http://localhost:3002/SuperAdminCreation", {
            fullname: fullname,
            email: email,
            password: password,
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
                <h3>Create SuperAdmin</h3>
                <h4>[Create,Read,Update,Delete]</h4>
                <fieldset>
                <input placeholder="Your name" type="text" tabindex="1" onChange={(event) => {setFullname(event.target.value)}} required autofocus/>
                </fieldset>
                <fieldset>
                <input placeholder="Your Email Address" type="email" tabindex="2" onChange={(event) => {setEmail(event.target.value)}} required/>
                </fieldset>
                <fieldset>
                <input placeholder="Your Password" type="password" tabindex="3" onChange={(event) => {setPassword(event.target.value)}} required/>
                </fieldset>
                <fieldset>
                <button  type="submit" id="contact-submit" onClick={ Register }>REGISTER</button>
                </fieldset>
            </div>
            </div>
        </div>
    );
}

export default Super;