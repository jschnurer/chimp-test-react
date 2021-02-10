import React, { useEffect, useState } from "react";

const numDigits = 9;
const boardHeight = 5;
const boardWidth = 8;

const Game = () => {
  const [positions, setPositions] = useState([]);
  
  useEffect(() => {
    let pos = [];

    for (let y = 0; y < boardHeight; y++) {
      for (let x = 0; x < boardWidth; x++) {
        pos.push({ x, y });
      }
    }

    setPositions(pos);
  }, [setPositions]);

  return {

  };
}