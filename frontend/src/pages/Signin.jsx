import { Data } from "./components/Data";
import { SignInBtn } from "./components/SignInButton";

export function SignIn({updateToken}) {
    return (
        
        <div className="flex justify-center bg-gray-200 ">
            <div className="flex flex-col m-10   box-border w-64 rounded-lg border-5 bg-white ">

                <div className="m-2">   
                    <div className="font-large font-bold text-xl "> Sign In</div>
                    <div className="text-xs pl-4">Enter your credentials to access your account</div>
                </div>
                
                <div> <Data id={"Email"} Title={'Email'} TextBoxPlaceHolder={"joohdoes@example.com"}/></div> 
                <div> <Data id={"Password"} Title={'Password'}/></div> 

              
                <SignInBtn updateToken={updateToken}/>
                <div className="flex text-center ml-8 mb-2 mt-2 text-sm ">
                    <div className=""> Don't have an account? </div>
                    <div className="underline pl-1"> Signup</div>
                </div>
            </div>
        </div>
    )
}