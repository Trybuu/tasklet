import { useState } from 'react'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { LuPlus } from 'react-icons/lu'

export const NewGroupButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <LuPlus />
      </Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Modal Content</h2>
      </Modal>
    </>
  )
}
