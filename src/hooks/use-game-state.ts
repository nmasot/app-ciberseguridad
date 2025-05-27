import { useState, useCallback } from "react";
import {
  GameQuestion,
  getRandomQuestions,
  calculateScore,
  getBadgeForScore,
} from "@/lib/game-data";
import { updateUser, getCurrentUser } from "@/lib/auth";

export interface GameState {
  questions: GameQuestion[];
  currentQuestionIndex: number;
  answers: number[];
  isGameStarted: boolean;
  isGameFinished: boolean;
  score: number;
  timeSpent: number;
}

export interface GameResults {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  pointsEarned: number;
  badge: {
    type: "bronze" | "silver" | "gold";
    name: string;
    icon: string;
  };
  timeSpent: number;
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    isGameStarted: false,
    isGameFinished: false,
    score: 0,
    timeSpent: 0,
  });

  const [startTime, setStartTime] = useState<number>(0);

  const startGame = useCallback((questionCount: number = 3) => {
    const questions = getRandomQuestions(questionCount);
    setGameState({
      questions,
      currentQuestionIndex: 0,
      answers: [],
      isGameStarted: true,
      isGameFinished: false,
      score: 0,
      timeSpent: 0,
    });
    setStartTime(Date.now());
  }, []);

  const answerQuestion = useCallback(
    (answerIndex: number) => {
      setGameState((prev) => {
        const newAnswers = [...prev.answers, answerIndex];
        const isLastQuestion =
          prev.currentQuestionIndex === prev.questions.length - 1;

        if (isLastQuestion) {
          // Calculate final results
          const correctAnswers = newAnswers.reduce((count, answer, index) => {
            return (
              count + (answer === prev.questions[index].correctAnswer ? 1 : 0)
            );
          }, 0);

          const score = calculateScore(correctAnswers, prev.questions.length);
          const timeSpent = Math.round((Date.now() - startTime) / 1000);
          const pointsEarned =
            correctAnswers * 50 + (score >= 90 ? 100 : score >= 70 ? 50 : 25);

          // Update user data
          const currentUser = getCurrentUser();
          if (currentUser) {
            const badge = getBadgeForScore(score);
            const newBadge = {
              id: `game-${Date.now()}`,
              name: badge.name,
              description: `Obtenido con ${score}% de aciertos`,
              icon: badge.icon,
              earnedAt: new Date(),
              type: badge.type,
            };

            updateUser({
              totalPoints: currentUser.totalPoints + pointsEarned,
              badges: [...currentUser.badges, newBadge],
              completedLevels: currentUser.completedLevels + 1,
              lastActivity: new Date(),
            });
          }

          return {
            ...prev,
            answers: newAnswers,
            isGameFinished: true,
            score,
            timeSpent,
          };
        } else {
          return {
            ...prev,
            answers: newAnswers,
            currentQuestionIndex: prev.currentQuestionIndex + 1,
          };
        }
      });
    },
    [startTime],
  );

  const resetGame = useCallback(() => {
    setGameState({
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      isGameStarted: false,
      isGameFinished: false,
      score: 0,
      timeSpent: 0,
    });
    setStartTime(0);
  }, []);

  const getResults = useCallback((): GameResults | null => {
    if (!gameState.isGameFinished) return null;

    const correctAnswers = gameState.answers.reduce((count, answer, index) => {
      return (
        count + (answer === gameState.questions[index].correctAnswer ? 1 : 0)
      );
    }, 0);

    const pointsEarned =
      correctAnswers * 50 +
      (gameState.score >= 90 ? 100 : gameState.score >= 70 ? 50 : 25);
    const badge = getBadgeForScore(gameState.score);

    return {
      score: gameState.score,
      correctAnswers,
      totalQuestions: gameState.questions.length,
      pointsEarned,
      badge,
      timeSpent: gameState.timeSpent,
    };
  }, [gameState]);

  const getCurrentQuestion = useCallback(() => {
    if (
      !gameState.isGameStarted ||
      gameState.currentQuestionIndex >= gameState.questions.length
    ) {
      return null;
    }
    return gameState.questions[gameState.currentQuestionIndex];
  }, [gameState]);

  return {
    gameState,
    startGame,
    answerQuestion,
    resetGame,
    getResults,
    getCurrentQuestion,
  };
};
