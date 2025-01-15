import { useState } from 'react'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { LuPlus } from 'react-icons/lu'
import { FaLayerGroup } from 'react-icons/fa'

export const NewGroupButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <LuPlus />
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        icon={<FaLayerGroup />}
        title="Dodaj nową grupę"
      >
        <p>Lorem ipsum dolor</p>
      </Modal>
    </>
  )
}
