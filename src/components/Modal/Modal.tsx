import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const StyledDialog = styled.dialog`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 200px;
  width: 300px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.lightGray};
  background-color: white;
`

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
`

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const modalRoot = document.getElementById('modal-root')
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (dialogRef.current && open) {
      dialogRef.current.showModal()
    } else if (dialogRef.current) {
      dialogRef.current.close()
    }
  }, [open])

  useEffect(() => {
    const handleCancel = (e: Event) => {
      e.preventDefault()
      onClose()
    }

    const dialog = dialogRef.current
    dialog?.addEventListener('cancel', handleCancel)

    return () => dialog?.removeEventListener('cancel', handleCancel)
  }, [onClose])

  useEffect(() => {
    const handleBackdropClick = (e: MouseEvent) => {
      const dialog = dialogRef.current

      if (!dialog) return

      const rect = dialog.getBoundingClientRect()
      const isInDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY <= rect.bottom &&
        e.clientY >= rect.top

      if (!isInDialog) {
        dialog.close()
        onClose()
      }
    }

    const dialog = dialogRef.current
    dialog?.addEventListener('click', handleBackdropClick)

    return () => dialog?.removeEventListener('click', handleBackdropClick)
  }, [onClose])

  if (!modalRoot) return null

  return ReactDOM.createPortal(
    <>
      {open && <Backdrop onClick={onClose} />}
      <StyledDialog ref={dialogRef}>
        {children}
        <button onClick={onClose}>Close</button>
      </StyledDialog>
    </>,
    modalRoot,
  )
}
