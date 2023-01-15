import React from 'react'


function useEdit() {
  const [isEditing, setIsEditing] = React.useState(false)

  return { isEditing, setIsEditing }
}

export default useEdit