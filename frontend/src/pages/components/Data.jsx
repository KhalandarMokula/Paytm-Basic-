import React, {useState} from 'react';

export const inputTextData = {
    FirstName : "",
    LastName: "", 
    Email: "",
    Password: ""
};
export function Data({id, Title, TextBoxPlaceHolder}) {

    const [inputData, setInputData] = useState({});

    function onInputinTextBox(event){
        const {id, value} = event.target;
        // setInputData(prevData=> ({
        //     ...prevData, 
        //         "id" : id,
        //         "value" :value
        // }))
        inputTextData[id] = value;
    }
    return (
        <div > 
            <div className="font-medium text-start pl-9"> {Title}</div>
            <input id={id} onChange={onInputinTextBox} type="text" className="border-2 w-25" placeholder={TextBoxPlaceHolder}/>
        </div>
        
    )
} 

