import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function Theme() {

    const [name, setName] = useState()
    const [color_scheme, setColorScheme] = useState()

    const Register = () => {
        axios
          .post("http://localhost:3002/theme", {
            name: name,
            color_scheme: color_scheme
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
            <h3>Create Theme</h3>
            <h4>[Create,Read,Update,Delete]</h4>
            <fieldset>
            <input placeholder="Your theme name" type="text" tabindex="1" onChange={(event) => {setName(event.target.value)}} required autofocus/>
            </fieldset>
            <fieldset>
            <input placeholder="Your color scheme" type="text" tabindex="2" onChange={(event) => {setColorScheme(event.target.value)}} required/>
            </fieldset>
            <fieldset>
            <button  type="submit" id="contact-submit" onClick={ Register }>SUBMIT</button>
            </fieldset>
        </div>
        </div>
    </div>
    );
}

export default Theme;