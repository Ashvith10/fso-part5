const Success = ({ message }) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className="successMessage">{message}</div>
    )
  }
}

export default Success
