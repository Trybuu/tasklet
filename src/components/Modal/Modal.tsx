import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { IoClose } from 'react-icons/io5'
import styled from 'styled-components'
import { Button } from '../Button'

const StyledDialog = styled.dialog`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80%;
  width: 100%;
  /* padding: 2rem; */
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;

  @media screen and (min-width: 1024px) {
    width: 50%;
  }
`

const StyledDialogTopSection = styled.div`
  padding: 1rem;
`

const StyledDialogMiddleSection = styled.div`
  color: ${({ theme }) => theme.colors.gray100};
  background-color: ${({ theme }) => theme.colors.gray200};
  padding: 4rem;
  text-align: center;
  text-transform: lowercase;

  svg {
    color: ${({ theme }) => theme.colors.gray100};
    font-size: 1.5rem;
  }
`

const StyledDialogBottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
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
  title: string
  icon: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  title,
  icon,
}) => {
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
        <StyledDialogTopSection>
          <Button onClick={onClose}>
            <IoClose />
          </Button>
        </StyledDialogTopSection>

        <StyledDialogMiddleSection>
          {icon}
          <h2>{title}</h2>
        </StyledDialogMiddleSection>

        <StyledDialogBottomSection>{children}</StyledDialogBottomSection>
      </StyledDialog>
    </>,
    modalRoot,
  )
}
