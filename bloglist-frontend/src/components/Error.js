const Error = ({message}) => {
    if (message === null) {
        return null
    } else {
        return (
            <div className="errorMessage">{message}</div>
        )
    }
}

export default Error
