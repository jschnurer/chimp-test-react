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
                <h2>Chimp Memory Test</h2>
                <p>Inspired by <a href="https://www.youtube.com/watch?v=ktkjUjcZid0">MIND FIELD S3 E1 on Youtube.</a></p>
                <p>
                    You will be shown a series of numbers from 1-9.
                    When you click the Start button the field of numbers will be hidden.
                    You must then click the position of the hidden numbers from 1 to 9 in order.
                </p>
                <p>
                    There are chimpanzees that are able to memorize the positions of the numbers in under 1 second.
                    Good luck. :)
                </p>
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