import PropTypes from 'prop-types'

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

PageComponent.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PageComponent
