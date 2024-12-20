import { screen } from '@testing-library/react'
import Header from './Header'
import { renderWithTheme } from '../../utils/test-utils'

describe('Header Component', () => {
  it('renders the logo', () => {
    renderWithTheme(<Header />)
    const logo = screen.getByText('Tasklet')
    expect(logo).toBeInTheDocument()
  })
})
