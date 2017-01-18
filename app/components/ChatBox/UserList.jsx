import React, { PropTypes } from 'react'
import Time from 'react-time'


function UserList ({ message, userModal }) {
  let displaynames = message.displayName
  console.log(displaynames);
  return (
    <div>
      <div className="row" onClick={userModal}>
         {message.displayName}
       </div>
    </div>
  )
}


export default UserList
