import { render, screen } from '@src/test/utils'
import '@testing-library/jest-dom/extend-expect'

import CollectionBox from './index'


describe('components/CollectionBox', () => {
  test('should render successfully', () => {
    expect(() => render(
      <CollectionBox />,
    )).not.toThrow()
  })


  test('should use predefined Test ID Prefix', () => {
    const testIdPrefix = 'test-id'
    render(<CollectionBox testIdPrefix={testIdPrefix} />)

    expect(screen.getByTestId(`${testIdPrefix}.CollectionBox`)).toBeInTheDocument()
  })


  test('should use predefined CSS class', () => {
    const testIdPrefix = 'test-id'
    const className = 'test-css-class'
    render(<CollectionBox testIdPrefix={testIdPrefix} className={className} />)

    expect(screen.getByTestId(`${testIdPrefix}.CollectionBox`)).toHaveClass(className)
  })
})
