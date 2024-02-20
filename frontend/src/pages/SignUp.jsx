import { document } from "postcss";
import { Data } from "./components/Data";
import { SignUpBtn } from "./components/SignUpBtn";

export function SignUp() {


    return (
        <div className="flex justify-center bg-gray-200 h-screen">
             <div className="flex flex-col justify-around m-10 gap-3 box-border w-64 rounded-lg border-5 bg-white ">

                <div className="m-2">   
                    <div className="font-large font-bold text-xl "> Sign Up</div>
                    <div className="text-xs pl-4">Enter the information to create the account </div>
                </div>
              
                <div><Data id ={"FirstName"} Title={'First Name'} TextBoxPlaceHolder={'John'}/></div> 
                <div><Data id={"LastName"} Title={"Last Name"} TextBoxPlaceHolder={'Doe'}/></div> 
                <div> <Data id={"Email"} Title={'Email'} TextBoxPlaceHolder={"joohdoes@example.com"}/></div> 
                <div> <Data id={"Password"} Title={'Password'}/></div> 

               
                <SignUpBtn/>
                <div className="flex text-center ml-8 mb-2 text-sm ">
                    <div className=""> Already have an account? </div>
                    <div className="u   nderline pl-1"> Login</div>
                </div>
            </div>
        </div>
       
    )
}