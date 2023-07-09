const Notification = ({ info }) => {
  if (!info.message) {
    return null
  } else {
    return (
      <div className={`notification ${info.type}`}>
        {info.message}
      </div>
    )
  }
}

export default Notification
