import styled from 'styled-components'
import React from 'react'

const StyledSidebarSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
      {children}
    </StyledSidebarSectionTitle>
  )
}
