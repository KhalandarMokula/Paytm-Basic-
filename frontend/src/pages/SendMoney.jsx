import axios from "axios";

export function SendMoney({sessionToken, benificiery}) {

    let Amount = 0;
    console.log("benificiery: ", benificiery);
    function CaptureAmount(event) {
        console.log("CaptureAmount");
        const {id, value} = event.target;
        console.log("Amount: ", value);
        Amount  = value;// final value after button click will be used to transfer money
    }

    async function Transfer() {
        console.log("token ",sessionToken);
        try {
            console.log("transfering amount: ", Amount);
            //now comes axios
            console.log("token ",sessionToken);
            const result = await axios.post('http://localhost:3000/api/v1/account/transfer',{
                params: {
                    toUserId: benificiery.id,
                    amount: Amount
                },
                headers: {Authorization: `Bearer ${sessionToken}`}
            });

            console.log("Result: ", result);
            alert("Transaction Successfull");

        } catch(err) {
            console.log("error: ", err);
        }
    }

    return (
        <div className="bg-gray-200 h-screen flex items-center justify-center">
            <div className="bg-white rounded  "> 
                <div className="flex flex-col   flex-grow  w-64  gap-10">
                    <div className="text-2xl font-bold m-4"> Send Money</div>

                    <div className=" m-4 flex flex-col gap-4 "> 
                        <div>
                            <div className="flex justify-start gap-2 items-center "> 
                                <div className="bg-green-400 h-10 w-10 rounded-full flex items-center justify-center text-xl text-white font-bold"> A </div>
                                <div className="font-bold text-xl"> {benificiery.name} </div>
                            </div>
                       <div className="flex justify-start  text-sm font-medium"> Amount (in $)</div>
                        </div>
                        
                       <input type="text" placeholder="Enter Amount " className="w-full  box border-2 rounded"
                            onChange={CaptureAmount}>
                        </input>
                        <button className="bg-green-400 w-full rounded font-medium text-white text-sm p-1 "
                            onClick={Transfer}>Intiate Transfer</button>
                    </div>
                </div>
            </div>

        </div>
    )
}