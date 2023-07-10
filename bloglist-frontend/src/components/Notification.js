const Notification = ({ info }) => {
  const notification = {
    color : info.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (!info.message) {
    return null
  } else {
    return (
      <div style={notification}>
        {info.message}
      </div>
    )
  }
}

export default Notification
