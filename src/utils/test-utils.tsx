import { render, RenderOptions } from '@testing-library/react'
import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'

const renderWithTheme = (ui: ReactNode, options?: RenderOptions) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options)

export { renderWithTheme }
