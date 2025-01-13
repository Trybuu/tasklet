import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const StyledDialog = styled.dialog`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  height: 200px;
  width: 300px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.lightGray};
`

interface ModalProps {
  open: boolean
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ open, children }) => {
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
      dialogRef.current?.close()
    }

    const dialog = dialogRef.current
    dialog?.addEventListener('cancel', handleCancel)

    return () => dialog?.removeEventListener('cancel', handleCancel)
  }, [])

  if (!modalRoot) return null

  return ReactDOM.createPortal(
    <StyledDialog
      ref={dialogRef}
      onClick={(e) => {
        // DO POPRAWY ZAMYKANIE MODALA PRZY KLIKNIĘCIU W BACKDROP
        if (e.target === dialogRef.current) {
          return
        } else {
          dialogRef.current?.close()
        }
      }}
    >
      {children}
      <button onClick={() => dialogRef.current?.close()}>Close</button>
    </StyledDialog>,
    modalRoot,
  )
}
