export  function Title({username}) {
    return (
        <div className="flex flex-grow justify-between  border-b-2" > 
            <div className="inline-block m-2 font-bold text-lg"> Payments App</div>
            <div className="flex m-2">   
                <div> Hello, {"mary"} </div>
                {/* Make circle here */}
                <div className="rounded-full pl-2"> {'M'} </div>
            </div>
        </div>
    )
}