import { inputTextData } from "./Data"
// const axios = require('axios')
import axios from 'axios';

export function SignUpBtn() {

    async function SignUpButtonClicked(){
        //alert("Hi There")
        console.log("SignUpButtonClicked");
        // use inputTextData structure { FirstName : String, LastName : String, Email:String, Password: String}
        // I will have this object ready before user clicks SignUp.
        const {FirstName, LastName, Email, Password} = inputTextData;
        console.log(inputTextData);
        //use axios to send a signup request to the endpoint: /api/v1/users/signup
       try {
            const result = await axios.post('http://localhost:3000/api/v1/user/signup', {
                username: Email,
                firstname:  FirstName,
                lastname: LastName,
                password: Password
            })

            //show dashboard

       } catch(error) {
            alert("Error! : ", error);
       }
      
    }
    return (
        <div className="ml-4 mr-4">
            <button className="w-full bg-black text-white text-small rounded-md p-2" onClick={SignUpButtonClicked}>Sign Up</button>
        </div>
    )
}