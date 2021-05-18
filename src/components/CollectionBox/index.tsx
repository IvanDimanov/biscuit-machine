import { ReactNode, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import memoize from 'lodash.memoize'
import styled from '@emotion/styled'

import BoxSound from './BoxSound'
import ImageBox from './images/box.png'

const PopUp = styled.div`
  position: absolute;

  @keyframes popUpMove {
    0% {
      bottom: 0;
    }

    100% {
      bottom: 100px;
    }
  }

  @keyframes popUpOpacity {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  animation: popUpMove 3s cubic-bezier(0.33, 1, 0.68, 1) forwards,
             popUpOpacity 3s cubic-bezier(0.65, 0, 0.35, 1) forwards;
`

type Item = {
  key: string
  node: ReactNode
}

export type CollectionBoxProps = {
  testIdPrefix?: string
  className?: string
  item?: Item
}

const CollectionBox = ({
  testIdPrefix,
  className,
  item,
}: CollectionBoxProps) => {
  const [items, setItems] = useState<Item[]>([])

  const addRef = useMemo(
    () => memoize((key) => (node: HTMLDivElement | null) => {
      if (!node) {
        return
      }

      node.addEventListener('animationend', () => {
        setItems((state) => state.filter((item) => item.key !== key))
      })
    }),
    [])


  useEffect(() => item && setItems((state) => [
    ...state,
    {
      ...item,
      node: (
        <PopUp ref={addRef(item.key)}>
          {item.node}
          <BoxSound />
        </PopUp>
      ),
    },
  ]), [item, addRef])


  return (
    <div
      data-testid={`${testIdPrefix}.CollectionBox`}
      className={className}
    >
      <div className="relative inline-block">
        <div className="absolute bottom-28 left-1/3">
          <div className="relative">
            {items.map(({ key, node }) => (
              <div key={key}>
                {node}
              </div>
            ))}
          </div>
        </div>

        <img
          data-testid={`${testIdPrefix}.CollectionBox.Box`}
          className="w-64"
          src={ImageBox}
          alt="Collection box"
        />
      </div>

    </div>
  )
}


CollectionBox.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
  item: PropTypes.shape({
    key: PropTypes.string.isRequired,
    node: PropTypes.node.isRequired,
  }),
}

CollectionBox.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
  item: undefined,
}

CollectionBox.displayName = 'CollectionBox'


export default CollectionBox
