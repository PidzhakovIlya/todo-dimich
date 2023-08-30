import React from 'react';

type SuperButtonPropsType = {
    name: string
    callBack: ()=>void

}
export const SuperButton:React.FC<SuperButtonPropsType> = (props) => {
    const onClickHandler = ()=>{
        props.callBack()
    }
    return (
        <button onClick={onClickHandler}>{props.name}</button>
    );
};

