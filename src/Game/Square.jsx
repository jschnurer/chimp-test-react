import React from 'react';

export default function Square (props) {
    let isHidden = props.hidden;

    if(props.number && props.number.revealed) {
        return <React.Fragment></React.Fragment>
    }

    return (
        <div
            className={"square" + (isHidden ? " hidden" : "")}
            onClick={() => {props.number ? props.onNumberClick(props.number.number) : props.onBlankClick()}}>
            {props.number &&
                props.number.number}
        </div>
    );
}