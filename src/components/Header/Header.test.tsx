import { screen } from '@testing-library/react'
import Header from './Header'
import { renderWithTheme } from '../../utils/test-utils'

const renderHeader = () => renderWithTheme(<Header />)

describe('Header Component', () => {
  it('renders the logo', () => {
    renderHeader()
    const logo = screen.getByText('Tasklet')
    expect(logo).toBeInTheDocument()
  })

  it('renders the search input and button', () => {
    renderHeader()
    const searchButton = screen.getByLabelText('search-button')
    const searchInput = screen.getByRole('textbox')

    expect(searchButton).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
  })

  it('renders the user profile button', () => {
    renderHeader()
    const userProfileButton = screen.getByLabelText('user-profile-button')

    expect(userProfileButton).toBeInTheDocument()
  })
})
