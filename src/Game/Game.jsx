import React from 'react';
import Board from './Board';
import './Game.css';

export default class Game extends React.Component {
    numDigits = 9;
    boardWidth = 8;
    boardHeight = 5;
    positions = [];

    constructor(props) {
        super(props);

        this.state = {
            gameState: 'MEMORIZE',
            turnNumber: 1,
            numbers: [],
            expectedNumber: 1,
        };

        for(let y = 0; y < this.boardHeight; y++) {
            for(let x = 0; x < this.boardWidth; x++) {
                this.positions.push({x, y});
            }
        }
    }

    componentDidMount() {
        this.restartGame();
    }

    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    restartGame = () => {
        let numbers = [];
        let possiblePositions = this.positions.slice();

        for(let i = 0; i < this.numDigits; i++) {
            numbers.push({
                number: i+1,
                position: possiblePositions.splice(this.getRandomInt(0, possiblePositions.length - 1), 1)[0],
                revealed: false,
            });
        }

        this.setState({
            gameState: 'MEMORIZE',
            turnNumber: 1,
            numbers,
            expectedNumber: 1,
        });
    }

    beginPlay = () => {
        this.setState({
            gameState: 'PLAY',
            expectedNumber: 1,
        });
    }

    onCorrectClick = (num) => {
        if(num === this.numDigits) {
            this.onGameWin();
        }

        let numbers = this.state.numbers.slice();
        numbers[num - 1].revealed = true;

        this.setState(prevState => ({
            expectedNumber: prevState.expectedNumber + 1,
            numbers,
        }));
    }

    onIncorrectClick = () => {
        this.setState({
            gameState: 'FAIL',
            numbers: [],
        });
    }

    onNumberClick = (num) => {
        if(this.state.gameState !== 'PLAY') {
            return;
        }

        if(num === this.state.expectedNumber) {
            this.onCorrectClick(num);
        } else {
            this.onIncorrectClick();
        }
    }

    onBlankClick = () => {
        if(this.state.gameState !== 'PLAY') {
            return;
        }

        this.onIncorrectClick();
    }

    onGameWin = () => {
        this.setState({
            gameState: 'WIN',
            numbers: [],
        });
    }

    render() {
        return (
            <div className="game">
                <Board
                    width={this.boardWidth}
                    height={this.boardHeight}
                    numbers={this.state.numbers}
                    gameState={this.state.gameState}
                    onNumberClick={this.onNumberClick}
                    onBlankClick={this.onBlankClick} />
                {this.state.gameState === 'MEMORIZE' &&
                    <button
                        className="startButton"
                        onClick={this.beginPlay}>
                        Start
                    </button>
                }
                { (this.state.gameState === 'FAIL' || this.state.gameState === 'WIN') && 
                    <div className="message">
                        {this.state.gameState}
                        
                        <button
                            className="startButton"
                            onClick={this.restartGame}>
                            Play again
                        </button>
                    </div>
                }
            </div>
        );
    }
}