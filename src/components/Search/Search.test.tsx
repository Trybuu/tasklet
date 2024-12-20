import { fireEvent, screen } from '@testing-library/react'
import { Search } from './Search'
import { renderWithTheme } from '../../utils/test-utils'

describe('Search component', () => {
  it('renders search button', () => {
    renderWithTheme(<Search />)
    const searchButton = screen.getByRole('button')
    const searchInput = screen.getByRole('textbox')

    expect(searchButton).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
  })

  it('toggles input visibility on button click', () => {
    renderWithTheme(<Search />)
    const searchButton = screen.getByRole('button')
    const searchInput = screen.getByRole('textbox')

    expect(searchInput).toHaveStyle({ opacity: '0', transform: 'scaleX(0)' })

    fireEvent.click(searchButton)
    expect(searchInput).toHaveStyle({ opacity: '1', transform: 'scaleX(1)' })

    fireEvent.click(searchButton)
    expect(searchInput).toHaveStyle({ opacity: '0', transform: 'scaleX(0)' })
  })

  it('focuses input when expanded', () => {
    renderWithTheme(<Search />)
    const searchButton = screen.getByRole('button')
    const searchInput = screen.getByRole('textbox')

    fireEvent.click(searchButton)
    expect(document.activeElement).toBe(searchInput)
  })
})
