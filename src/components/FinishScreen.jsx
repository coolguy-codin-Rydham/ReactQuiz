/* eslint-disable react/prop-types */
const FinishScreen = ({ points, maxPossiblePoints, highscore }) => {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji = null;
  let text= null;
  if (percentage === 100) {
    emoji = "🥇 "
    text = 'Bro you are God';
  } else if (percentage >= 80) {
    emoji = "🥈"
     text = 'Bro you are pretty good at this';
  } else if (percentage >= 50) {
    emoji = "🥉 ";
    text = 'Bro you are something keep up the good work'
  } else {
    emoji = "📚 ";
    text = 'You gotta pick the books up'
  }

  return (
    <>
    <p className="result">
      <span>{emoji}</span>You Scored <strong>{points}</strong> out of {maxPossiblePoints} (
      {Math.ceil(percentage)}%) <br />
      <span style={{opacity:0.8, fontSize:'70%'}}>({text})</span>
    </p>
    <p className="highscore">(Highscre: {highscore} points)</p>
    </>
  );
};

export default FinishScreen;
