import React, { useState } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

export default function CustomModal ({modalTrigger, header, content, onValidate, onCancel }) {
  const [open, setOpen] = useState(false)

  const handleValidation = async () => {
    if (onValidate) {
      await onValidate()
      setOpen(false)
    }
    setOpen(false)
  }

  const handleCancellation = async () => {
    if (onCancel){
      await onCancel()
      setOpen(false)
    }
    setOpen(false)
  }

  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={modalTrigger}
      >
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>
          <p>{content}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' inverted onClick={() => handleCancellation()}>
            <Icon name='remove' /> Non
          </Button>
          <Button color='green' inverted onClick={() => handleValidation()}>
            <Icon name='checkmark' /> Oui
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}