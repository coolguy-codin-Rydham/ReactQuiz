/* eslint-disable react/prop-types */

const StartScreen = ({numQuestions, dispatch}) => {
  return (
    <div>
      <h2 className="text-center">Welcome to the React Quiz</h2>
      <h3 className="text-center">{numQuestions} questions to test your React Mastery</h3>
      <button style={{margin:"0 auto"}} className="btn btn-ui" onClick={()=>dispatch({type:"start"})}>Let&apos;s Start</button>
    </div>
  )
}

export default StartScreen
