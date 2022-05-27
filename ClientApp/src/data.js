
// Privarte implementation of the actual http calls
// we could have used axios or any other lib
async function getJson(url) {
    const response = await fetch(url);
    const parsed = await response.json();
    return parsed;
}
async function postObject(url, obj) {
    const response = await fetch(url, {
        method:"POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(obj)
    });
    if(response.ok) {
        const parsed = await response.json();
        return parsed;
    }
    else {
        const txt = await response.text();
        const errObj = JSON.parse(txt);
        console.log(errObj)
        throw errObj;
    }
}
async function deleteObject(url) {
    await fetch(url, {method:"DELETE"});
}

// The exported object that views will interact with
export const CarePlansClient = {
    Empty: ()=>{ return {
            Title:"",
            PatientName:"",
            UserName: "",
            ActualStartDate: null,
            TargetDate: null,
            Reason: "",
            Action: "",
            Completed: false,
            EndDate: null,
            Outcome: ""
        };
    },
    All: async() => {
        return await getJson("https://localhost:44390/careplan");
    },
    GetById: async(id)=>{
        return await getJson(`https://localhost:44390/careplan/${id}`);
    },
    Save: async(plan)=>{
        return await postObject("https://localhost:44390/careplan", plan);
    },
    Delete: async(id)=>{
        return await deleteObject(`https://localhost:44390/careplan/${id}`);
    }
}