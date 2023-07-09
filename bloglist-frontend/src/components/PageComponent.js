import PropTypes from 'prop-types'
import Notification from './Notification'

const PageComponent = ({ title, info, children }) => {
  return (
    <div className="pagecomponent">
      <h1 className="title">{title}</h1>
      <Notification info={info}/>
      {children}
    </div>)
}

PageComponent.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PageComponent
