import React from 'react';

export const ScoreBoard = ({ names, scores, playerXPlaying, ID }) => {
    const { playerOne, playerTwo } = scores;
    const { playerOneName, playerTwoName } = names;

    return (
        <div className="flex flex-col items-center justify-between w-64 text-lg bg-white shadow-md rounded-md font-bold my-2 mb-44">
            <div className="score-header">Game Room: {ID}</div>
            <section className="flex w-full">
                <span className={`w-1/2 py-3 text-center text-purple-700 ${!playerXPlaying ? "border-b-[6px] border-transparent": "border-b-[6px] border-purple-700"}`}>
                    {playerOneName} - {playerOne}
                </span>
                <span className={`w-1/2 py-3 text-center text-green-700  ${!playerXPlaying ? "border-b-[6px] border-green-700": "border-b-[6px] border-transparent"}`}>
                    {playerTwoName} - {playerTwo}
                </span>
            </section>
        </div>
    );
};
