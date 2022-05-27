import React, { Component, useEffect, useState } from 'react';
import { CarePlansClient } from '../data';
import * as Forms from "./Forms";

export function CarePlanDetail({currentPlanId, onPlanModified}) {
    const [plan, setPlan] = useState(null);

    console.log(`render con ${currentPlanId}`)
    useEffect(async()=>{
        console.log(`useEffect con ${currentPlanId}`)
        if(currentPlanId) {
            const remotePlan = await CarePlansClient.GetById(currentPlanId);
            setPlan(remotePlan);
        }
        else {
            setPlan(CarePlansClient.Empty());
        }
    }, [currentPlanId])

    function fieldChange(updatedPlan) {
        setPlan(updatedPlan);
        if(onPlanModified) onPlanModified(updatedPlan);
    }
    return (<>
        {plan?<div>
            <form>
                <Forms.Text value={plan.Title} changeHandler={(evt)=>fieldChange({...plan, Title:evt.target.value})} 
                    code="planTitle" label="Title" />
                <Forms.Text value={plan.PatientName} changeHandler={(evt)=>fieldChange({...plan, PatientName:evt.target.value})} 
                    code="planPatientName" label="Patient name" />
                <Forms.Text value={plan.UserName} changeHandler={(evt)=>fieldChange({...plan, UserName:evt.target.value})} 
                    code="planUserName" label="User name" />
                
                <Forms.Date value={plan.ActualStartDate} changeHandler={(evt)=>fieldChange({...plan, ActualStartDate:evt.target.value})} 
                    code="planStartDate" label="Start date" />
                <Forms.Date value={plan.TargetDate} changeHandler={(evt)=>fieldChange({...plan, TargetDate:evt.target.value})} 
                    code="planTargetDate" label="Target date" />
                
                <Forms.Text value={plan.Reason} changeHandler={(evt)=>fieldChange({...plan, Reason:evt.target.value})} 
                    code="planReason" label="Reason" />
                <Forms.Text value={plan.Action} changeHandler={(evt)=>fieldChange({...plan, Action:evt.target.value})} 
                    code="Action" label="Action" />

                <Forms.YesNo value={plan.Completed} changeHandler={(evt)=>fieldChange({...plan, Completed:evt.target.value})}
                    code="planCompleted" label="Completed"/>

                {plan.Completed && <Forms.Date value={plan.EndDate} changeHandler={(evt)=>fieldChange({...plan, EndDate:evt.target.value})} 
                    code="planTargetDate" label="End date" />}

                {plan.Completed && <Forms.Text value={plan.Outcome} changeHandler={(evt)=>fieldChange({...plan, Outcome:evt.target.value})} 
                    code="Outcome" label="Outcome" />}
            </form>
        </div>
        :
        <div>Select an existing plan or create a new one to start editing</div>
        }
    </>
    )
}