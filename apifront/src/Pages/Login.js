import React from 'react';
import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState(); 
    const [password, setPassword] = useState(); 

    const Register = () => {


    }

    return (
        <div>
        <div class="container">  
        <div id="contact">
            <h3>Login Tester</h3>
            <h4>[Faculty,Admin,SuperAdmin]</h4>
            <fieldset>
            <input placeholder="Your Email" type="email" tabindex="1" onChange={(event) => {setEmail(event.target.value)}} required autofocus/>
            </fieldset>
            <fieldset>
            <input placeholder="Your Password" type="password" tabindex="2" onChange={(event) => {setPassword(event.target.value)}} required/>
            </fieldset>
            <fieldset>
            <button  type="submit" id="contact-submit" onClick={ Register }>SUBMIT</button>
            </fieldset>
        </div>
        </div>
    </div>
    );
}

export default Login;