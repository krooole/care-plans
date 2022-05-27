import React, { Component } from 'react';

export function CarePlanList({plans, currentPlanId, onPlanSelected}) {
    return <div className="list-group">
        {(plans && plans.length)?
            plans.map((plan)=>{
                return <div className={"list-group-item"+(plan.Id==currentPlanId?" active":"")} key={plan.Id} 
                            onClick={()=>{ 
                                console.log(`click on ${plan.Id}`);
                                if(onPlanSelected) onPlanSelected(plan.Id) 
                            }}>
                        <h4>{plan.Title}</h4>
                        <p>{plan.PatientName}</p>
                    </div>
            })
            :
            <div className="list-item">
                No content yet. Create new care plans and they will be listed here.
            </div>
        }
    </div>
}