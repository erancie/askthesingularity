const Button = (props) => {
  return(
    <button className={`btn ${props.type} btn-lg p-5 m-5`}
            onClick={props.onclick} >
      {props.message}
    </button>
  )
}
export default Button