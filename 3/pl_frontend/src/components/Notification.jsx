const Notification = ({ message, isError }) => {
    console.log(message);
    console.log(isError);

    if (message === null) {
      return null
    }
  
    return (
      <div className= {isError ? 'error' : 'notError'}>
        {message}
      </div>
    )
  }

  export default Notification;