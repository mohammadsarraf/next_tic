import React from 'react';

interface ScoreBoardProps {
    scores: {
        playerOne: number;
        playerTwo: number;
    };
    names: {
        playerOneName: string;
        playerTwoName: string;
    };
    ID: string;
    playerXPlaying: boolean;
}

const ScoreBoard: React.FC<ScoreBoardProps> = (props) => {
// export default function ScoreBoard(props: any) {
    const { playerOne, playerTwo } = props.scores;
    const { playerOneName, playerTwoName } = props.names;
    
    return (
        <div className="flex flex-col items-center justify-between w-64 text-lg bg-white shadow-md rounded-md font-bold my-2 mb-auto">
            <div className="score-header">Game Room: {props.ID}</div>
            <section className="flex w-full">
                <span className={`w-1/2 py-3 text-center text-purple-700 ${!props.playerXPlaying ? "border-b-[6px] border-transparent": "border-b-[6px] border-purple-700"}`}>
                    {playerOneName} - {playerOne}
                </span>
                <span className={`w-1/2 py-3 text-center text-green-700  ${!props.playerXPlaying ? "border-b-[6px] border-green-700": "border-b-[6px] border-transparent"}`}>
                    {playerTwoName} - {playerTwo}
                </span>
            </section>
        </div>
    );
};

export default ScoreBoard;
