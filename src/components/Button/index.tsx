import { ReactNode, MouseEvent, useMemo } from 'react'
import PropTypes from 'prop-types'


export type ButtonProps = {
  testIdPrefix?: string
  className?: string
  variant: 'primary' | 'default'
  size: 'small' | 'medium' | 'large'
  children?: ReactNode
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  disabled: boolean
}

const Button = ({
  testIdPrefix,
  className,
  variant,
  size,
  children,
  onClick,
  disabled,
}: ButtonProps) => {
  const colorClasses = useMemo(() => {
    let className = `
      text-gray-800 hover:text-gray-500
      bg-white
      ring-1 ring-inset ring-green-700 hover:ring-green-300
    `

    if (variant === 'primary') {
      className = `
        text-white
        bg-green-700
        hover:bg-green-500
      `
    }

    return `${className} ${disabled ? 'pointer-events-none opacity-50' : ''}`
  }, [variant, disabled])

  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'small':
        return 'px-2 py-1'
      case 'medium':
        return 'px-3 py-2'
      case 'large':
        return 'px-4 py-3'
    }
  }, [size])


  return (
    <button
      data-testid={`${testIdPrefix}.Button`}
      className={`
        cursor-pointer
        inline-flex items-center justify-center content-center
        transition-all duration-300 ease-in-out
        rounded-lg
        ${colorClasses}
        ${sizeClasses}
        ${className || ''}
      `}
      onClick={onClick}
      aria-pressed="false"
      aria-disabled={disabled}
      disabled={disabled}
    >
      {children}
    </button>
  )
}


Button.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'default']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
  variant: 'default',
  size: 'medium',
  children: 'Test Button Content',
  onClick: () => {},
  disabled: false,
}

Button.displayName = 'Button'


export default Button
