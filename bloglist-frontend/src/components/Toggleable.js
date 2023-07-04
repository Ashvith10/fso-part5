import { useState } from 'react'
import PropTypes from 'prop-types'

const Toggleable = ({ affirmLabel, cancelLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  return (
    <div className="toggleable">
      <div style={hideWhenVisible}>
        <input className="affirm" type="button" onClick={toggleVisibility} value={affirmLabel} />
      </div>
      <div style={showWhenVisible}>
        {children}
        <input className="cancel" type="button" onClick={toggleVisibility} value={cancelLabel}/>
      </div>
    </div>
  )
}

Toggleable.propTypes = {
  affirmLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired
}

export default Toggleable
