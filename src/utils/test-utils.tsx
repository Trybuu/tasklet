import { render, RenderOptions } from '@testing-library/react'
import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { GlobalStyles } from '../styles/GlobalStyles'

const renderWithTheme = (ui: ReactNode, options?: RenderOptions) =>
  render(
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </>,
    options,
  )

export { renderWithTheme }
