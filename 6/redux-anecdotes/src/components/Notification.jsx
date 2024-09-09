import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (notification) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
      }, 5000) 
      return () => clearTimeout(timer)
    }
  }, [notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: visible ? 'block' : 'none'
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
