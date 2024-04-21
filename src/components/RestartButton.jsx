/* eslint-disable react/prop-types */
const RestartButton = ({dispatch}) => {
  return (
    <button style={{margin:'0 auto'}} className="btn btn-ui" onClickCapture={()=>{
        dispatch({type:'restart'})
    }}>
      Restart
    </button>
  )
}

export default RestartButton
