import React, { Component, useEffect, useState } from 'react';
import { CarePlansClient } from '../data';
import { CarePlanList } from './CarePlanList';
import { CarePlanDetail } from "./CarePlanDetail"

export function CarePlanHome() {
    const [carePlans, setCarePlans] = useState([]);
    const [currentPlanId, setCurrentPlanId] = useState(null);
    const [hasCurrentPlan, setHasCurrentPlan] = useState(false);
    const [pendingChanges, setPendingChanges] = useState(null);
    const [errorMessages, setErrorMessages] = useState([]);

    // This will be invoked once at the start to fetch the initial list of plans
    useEffect(async()=>{
        const plans = await CarePlansClient.All();
        setCarePlans(plans);
    }, [])

    function createPlan() {
        setCurrentPlanId(null);
        setPendingChanges(null);
        setErrorMessages([]);
        setHasCurrentPlan(true);
    }

    function planSelected(existingPlanId) {
        setCurrentPlanId(existingPlanId);
        setPendingChanges(null);
        setErrorMessages([]);
        setHasCurrentPlan(true);
    }

    function currentModified(newValues) {
        setPendingChanges(newValues);
        setErrorMessages([]);
    }

    function deleteCurrent(){
        if(window.confirm(`Do you really want to delete the current plan?`)) {
            CarePlansClient.Delete(currentPlanId).then(async()=>{
                setPendingChanges(null);
                setCurrentPlanId(null);
                setHasCurrentPlan(false);
                setCarePlans(await CarePlansClient.All());
            }).catch((ex)=>{
                if(ex && ex.errors) {
                    setErrorMessages(Object.values(ex.errors).flat());
                }
            });
        }
    }

    function savePendingChanges() {
        const result = CarePlansClient.Save(pendingChanges).then(async(savedObject)=>{
            setPendingChanges(null);
            setCurrentPlanId(savedObject.Id);
            setCarePlans(await CarePlansClient.All());
        })
        .catch((ex)=>{
            if(ex && ex.errors) {
                setErrorMessages(Object.values(ex.errors).flat());
            }
        });
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <CarePlanList plans={carePlans} currentPlanId={currentPlanId} onPlanSelected={planSelected}></CarePlanList>
                        <div className="mt-3">
                            <button className="btn btn-primary" onClick={createPlan}>
                                Create new plan
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        {errorMessages && errorMessages.length>0 &&
                            <div className="alert alert-danger">
                                <ul>
                                {errorMessages.map((err, ix)=><li key={ix}>{err}</li>)}
                                </ul>
                            </div>
                        }
                        {hasCurrentPlan && <>
                        <div className="card">
                            <div className="card-body">
                                <div className="mt-1 mb-3 d-flex">
                                    { pendingChanges && <>
                                        <span className="flex-fill">Changes pending</span>
                                        <button className="btn btn-primary btn-sm" onClick={savePendingChanges}>Save</button>
                                    </>}
                                    { !pendingChanges && <>
                                        <span className="flex-fill">Care plan details</span>
                                        <button className="btn btn-danger btn-sm" onClick={deleteCurrent}>Delete</button>
                                    </>}
                                </div>
                            </div>
                        </div>                      
                        <CarePlanDetail currentPlanId={currentPlanId} onPlanModified={currentModified}></CarePlanDetail>
                        <div className="mb-3">&nbsp;</div>
                        </>}
                    </div>
                </div>
            </div>
        </div>
    )
}

