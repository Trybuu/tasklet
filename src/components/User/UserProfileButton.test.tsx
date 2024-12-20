import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test-utils'
import { UserProfileButton } from './UserProfileButton'

describe('UserProfileButton component', () => {
  it('renders button with first letter of username', () => {
    renderWithTheme(<UserProfileButton username="Mark" />)
    const userProfileButton = screen.getByRole('button')
    expect(userProfileButton).toHaveTextContent('M')
  })
})
