function Input({code, value, label, changeHandler, type}) {
    return (
        <div className="form-group mb-1">
            <label htmlFor={code}>{label}</label>
            <input value={value||""} onChange={changeHandler} 
                type={type} className="form-control" id={code} />
        </div>
    )
}

export function Text({code, value, label, changeHandler}) {
    return Input({code:code, value:value, label:label, changeHandler:changeHandler, type:"text"})
}

export function Date({code, value, label, changeHandler}) {
    let dtValue = value;
    if(dtValue && dtValue.length>10) dtValue = dtValue.substring(0,10);
    return Input({code:code, value:dtValue, label:label, changeHandler:changeHandler, type:"date"})
}

export function YesNo({code, value, label, changeHandler}) {
    function yesNoHandler(evt){
        // create pseudo-event object that contains bool value
        if(changeHandler) {
            changeHandler({target:{value:evt.target.value=="1"}})
        }
    }
    return (
        <div className="form-group mb-1">
            <label htmlFor={code}>{label}</label>
            <select className="form-select" value={value?"1":"0"} onChange={yesNoHandler} id={code}>
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>
        </div>
    );
}