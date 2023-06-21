import Success from './Success'
import Error from './Error'

const PageComponent = ({ title, children, successMessage, errorMessage }) => {

  return (
    <div className="pagecomponent">
      <h1 className="title">{title}</h1>
      <Success message={successMessage}/>
      <Error message={errorMessage}/>
      {children}
    </div>)
}

export default PageComponent
