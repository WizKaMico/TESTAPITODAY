import React from 'react';
import { useState } from 'react';
import axios from 'axios';


function Partner() {

    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [contact_person, setContactPerson] = useState()
    const [contact_number, setContactNumber] = useState()
    const [contact_email, setContactEmail] = useState()
    const [start_date, setStart_date] = useState()
    const [expiration_date, setExpiration_date] = useState()


    const Register = () => {
        axios
          .post("http://localhost:3002/PartnersCreation", {
            name: name,
            address: address,
            contact_person: contact_person,
            contact_number: contact_number,
            contact_email: contact_email,
            start_date: start_date,
            expiration_date: expiration_date
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

        {/* // {
    //     "name":"ACCENTURE", 
    //     "address":"MAGICIAN AKO PERO HINDI KA SURE", 
    //     "contact_person": "Gerald",
    //     "contact_number": "09166513189",
    //     "contact_email": "tricore012@gmail.com",
    //     "start_date": "2022-04-20",
    //     "expiration_date": "2023-04-24"
    // } */}

            <h3>Create Partners</h3>
            <h4>[Create,Read,Update,Delete]</h4>
            <fieldset>
            <input placeholder="Name" type="text" tabindex="1" onChange={(event) => {setName(event.target.value)}} required autofocus/>
            </fieldset>
            <fieldset>
            <input placeholder="Address" type="text" tabindex="2" onChange={(event) => {setAddress(event.target.value)}} required autofocus/>
            </fieldset>
            <fieldset>
            <input placeholder="Contact Person" type="text" tabindex="3" onChange={(event) => {setContactPerson(event.target.value)}} required autofocus/>
            </fieldset>
            <fieldset>
            <input placeholder="Contact Number" type="text" tabindex="4" onChange={(event) => {setContactNumber(event.target.value)}} required autofocus/>
            </fieldset>
            <fieldset>
            <input placeholder="Contact Email" type="email" tabindex="5" onChange={(event) => {setContactEmail(event.target.value)}} required autofocus/>
            </fieldset>
            <fieldset>
            <input type="date" tabindex="6" onChange={(event) => {setStart_date(event.target.value)}} required/>
            </fieldset>
            <fieldset>
            <input type="date" tabindex="7" onChange={(event) => {setExpiration_date(event.target.value)}} required/>
            </fieldset>
            
            <fieldset>
            <button  type="submit" id="contact-submit" onClick={ Register }>REGISTER</button>
            </fieldset>
        </div>
        </div>
    </div>
    );
}

export default Partner;