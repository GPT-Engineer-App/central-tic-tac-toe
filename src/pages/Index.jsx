import React, { useState } from 'react';
import { Box, Flex, Text, Button, VStack } from '@chakra-ui/react';

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  const handleClick = (index) => {
    const newBoard = [...board];
    if (newBoard[index] || calculateWinner(board)) return;
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    if (calculateWinner(newBoard)) {
      updateScores(xIsNext ? 'player1' : 'player2');
    }
  };

  const updateScores = (player) => {
    const newScores = { ...scores };
    newScores[player] += 1;
    setScores(newScores);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const renderSquare = (i) => (
    <Button colorScheme={board[i] === 'X' ? 'red' : 'blue'} onClick={() => handleClick(i)} size="lg" w="40px" h="40px">
      {board[i]}
    </Button>
  );

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    console.log("Board has been reset");
  };

  const resetAll = () => {
    setBoard(Array(9).fill(null));
    setScores({ player1: 0, player2: 0 });
    console.log("Board and scores have been reset");
  };

  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Flex justify="space-between" w="100%" p="4">
        <Text fontSize="xl">Player 1: {scores.player1}</Text>
        <Text fontSize="xl">Player 2: {scores.player2}</Text>
      </Flex>
      <VStack spacing={4}>
        <Flex>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </Flex>
        <Flex>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </Flex>
        <Flex>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </Flex>
        <Flex>
          <Button colorScheme="teal" onClick={resetBoard}>Reset</Button>
          <Button colorScheme="orange" onClick={resetAll}>Reset All</Button>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default Index;