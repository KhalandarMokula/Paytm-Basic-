import { useNavigate } from "react-router-dom";

export function UserAction({username, userId, setbenificiery}){
    const navigate = useNavigate();

    function LoadTransactionPage(){ 
        console.log("redirecting to transaction page to send money to the user: ",username);
        setbenificiery({name: username, id: userId});
        navigate('/send');
    }
    return (
        <div className="flex flex-grow justify-between"> 
            <div className="flex flex-grow  gap-2"> 
                <div className="rounded-full bg-gray-200 p-2">{username[0]}</div>
                <div className="text-md p-2"> {username} </div>
            </div>
            <button onClick={LoadTransactionPage} className="p-2 bg-black text-white text-small rounded-md"> Send Money</button>
        </div>
    )
} 