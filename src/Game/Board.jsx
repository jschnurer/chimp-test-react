import React from 'react';
import Square from './Square';

export default function Board (props) {
    let rows = Array.apply(null, {length: props.height}).map(Number.call, Number);
    let cells = Array.apply(null, {length: props.width}).map(Number.call, Number);

    let getNumOrNull = (arr) => {
        if(!arr.length) {
            return null;
        }

        return arr[0];
    }

    return (
        <table>
            <tbody>
            {
                rows.map(row => 
                    <tr key={row}>
                        {
                            cells.map(cell => 
                                <td key={cell}>
                                    <Square
                                        hidden={props.gameState === 'PLAY'}
                                        number={!props.numbers.length
                                            ? null
                                            : getNumOrNull(props.numbers
                                            .filter(n => n.position.x === cell && n.position.y === row ? n.number : null))}
                                        onNumberClick={props.onNumberClick}
                                        onBlankClick={props.onBlankClick} />
                                </td>
                            )
                        }
                    </tr>
                )
            }
            </tbody>
        </table>
    );
}