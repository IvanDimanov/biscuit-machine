/**
 * Credit goes to:
 *   https://testing-library.com/docs/react-testing-library/setup/#custom-render
 */
import { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import './i18n'

const AllTheProviders: FC = ({ children }) => (
  <>
    {children}
  </>
)

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
