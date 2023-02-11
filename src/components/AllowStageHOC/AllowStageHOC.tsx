import React from 'react';
import { Navigate, useParams } from 'react-router';
import { useAppSelector } from '../../store/store';

interface RedirectHOCProps {
    children: React.ReactElement
    stage: number
}

function RedirectHOC({children, stage}: RedirectHOCProps) {
    const {applicationId: stateApplicationId, stage: stateStage} = useAppSelector(state => state.application);
    const {applicationId} = useParams();
    const numberApplicationId = Number(applicationId);
    if(numberApplicationId !== stateApplicationId || stateStage < stage) return <Navigate to={'/loan'}/>;

    return children;
}
export default RedirectHOC;