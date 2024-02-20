
import { useNavigate } from "react-router-dom";
import { Dashboard } from "../Dashboard";
import { inputTextData } from "./Data"
// const axios = require('axios')
import axios from 'axios';
export const token = {tk: ""};

export function SignInBtn({updateToken}) {

    const navigate = useNavigate();
    async function SignInButtonClicked(){
        //alert("Hi There")
        console.log("SignInButtonClicked");
        // use inputTextData structure { FirstName : String, LastName : String, Email:String, Password: String}
        // I will have this object ready before user clicks SignUp.
        const {FirstName, LastName, Email, Password} = inputTextData;
        console.log(inputTextData);
        //use axios to send a signup request to the endpoint: /api/v1/users/signup
       try {
            const result = await axios.get('http://localhost:3000/api/v1/user/signin', {
                params:{
                    username: Email,
                    password: Password,
                }
            })  
            console.log("result ", result.data.token);
            token['tk'] = result.data.token;
            updateToken(result.data.token);
            console.log("token ", token['tk']);
            console.log(result.data.token ==  token['tk']);  
            //show dashboard
           navigate('/dashboard');

       } catch(err) {
            console.log(err);
            alert("Error! : ", err.message);
       }
      
    }
    return (
        <div className="ml-4 mr-4 mt-4">
            <button className="w-full bg-black text-white text-small rounded-md p-2" onClick={SignInButtonClicked}>Sign In</button>
        </div>
    )
}