import axios from "axios";
import { Balance } from "./components/Balance";
import { SeachEntry, Search } from "./components/Search";
import { Title } from "./components/Title";
import { UserAction } from "./components/UserAction";
import {token} from './components/SignInButton'
import { useEffect, useState } from "react";



export  function Dashboard({setbenificiery, sessionToken}) {


    const [users, updateUsers] = useState([]);
    const [balance, updateBalance] = useState(0);
    const [searchUser, updateSearchUser] = useState('');
    useEffect(()=> {
        async function fetchData(){
            try {
                console.log("token ",sessionToken);
                const result = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: { Authorization: `Bearer ${sessionToken}` }
                });
                console.log("result ",result.data.balance);
                updateBalance(result.data.balance);
            } catch(err) {
                console.log("error: ",err);
            }   
        }
       fetchData();
    },[])
    

    useEffect(()=>{
        async function fetchUsers(){
            console.log("searchUser: ", searchUser);
            try {
                const result = await axios.get('http://localhost:3000/api/v1/user/bulk', {
                    params: {
                        filter: searchUser,
                    },
                    headers: { Authorization: `Bearer ${sessionToken}` }
                })
                console.log("result:  ", result);
                updateUsers(result.data.documents);
            } catch(err) {
                console.log("error: ",err);
            }
           
        }
        fetchUsers();
    },[searchUser])
    

    return (
        <div className="flex flex-grow flex-col gap-4">
            
            <Title />
            <Balance balance={balance}/>
            <Search updateSearchUser={updateSearchUser}/>
            
            {/* Inside list of users 
            iterate through users and create the following UserAction for each user*/}
            {users.map(
                user => 
                    <UserAction username={user.firstName} userId={user._id} setbenificiery={setbenificiery}/>
            )}
         

        </div>
    )
}