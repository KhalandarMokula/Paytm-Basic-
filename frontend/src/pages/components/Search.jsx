
export const SeachEntry = {item: ""};

export function Search({updateSearchUser}) {
    
    function InputReceived(event){
        const {id, value} = event.target;
        console.log("key ", value);
        SeachEntry['item'] = value;
        updateSearchUser(value);    // not a good approach , optimize this
    }
    return (
        <div className="text-start"> 
            <div className="font-bold"> Users </div>
            <input onChange={InputReceived} type="text" className="border-2 w-full" placeholder="Search users..."></input>
        </div>
    )
}