import { useState } from 'react'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { LuPlus } from 'react-icons/lu'
import { MdDashboardCustomize } from 'react-icons/md'

export const NewBoardButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <LuPlus />
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        icon={<MdDashboardCustomize />}
        title="Dodaj nową tablicę"
      >
        <h2>Modal Content</h2>
      </Modal>
    </>
  )
}
