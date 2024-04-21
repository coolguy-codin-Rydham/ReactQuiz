import { useEffect, useReducer } from "react";
import Header from "./Header";
import Mainn from "./Mainn";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import RestartButton from "./RestartButton";
import Timer from "./Timer";
import Footer from "./Footer";
const SECS_PER_QUESTION=30
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" , secondsRemaining:state.questions.length * SECS_PER_QUESTION};
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished": {
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    }
    case "restart":
      return {...initialState, questions:state.questions, status:'ready'}
    case "tick":
      return {...state, secondsRemaining:state.secondsRemaining-1, status:state.secondsRemaining===0?'finished':state.status}

    default:
      throw new Error("Unknown action");
  }
};
const initialState = {
  questions: [],
  //Loading, Error, Ready, Active and finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining:null,
};

function App() {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      // eslint-disable-next-line no-unused-vars
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />

      <Mainn>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Progress
            index={index}
            numQuestions={numQuestions}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            answer={answer}
          />
        )}
        {status === "active" && (
          <>
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            <Footer>

            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>

            <NextButton
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
              />
              </Footer>
          </>
        )}

        {status === "finished" && (
          <>
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            />
            <RestartButton dispatch={dispatch}/>
          </>
        )}
        {/* {status ==='restart' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )} */}
      </Mainn>
    </div>
  );
}

export default App;
