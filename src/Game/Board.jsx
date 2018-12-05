import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {

        };
    }

    render() {
        return (
            <div>
                Board
                <Square />
            </div>
        );
    }
}