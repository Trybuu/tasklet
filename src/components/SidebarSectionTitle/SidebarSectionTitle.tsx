import styled from 'styled-components'
import React from 'react'

const StyledSidebarSectionTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
`

interface SidebarSectionTitleProps {
  title: string
  children?: React.ReactNode
}

export const SidebarSectionTitle: React.FC<SidebarSectionTitleProps> = ({
  title,
  children,
}) => {
  return (
    <StyledSidebarSectionTitle>
      <h3>{title}</h3>
      <StyledButtonsContainer>{children}</StyledButtonsContainer>
    </StyledSidebarSectionTitle>
  )
}
