import PropTypes from 'prop-types'

import useCollectionBoxPart, { selectItem } from '@src/globalState/useCollectionBoxPart'

import { CollectionBox } from '@src/components'


type CollectionBoxPartProps = {
  testIdPrefix?: string
  className?: string
}

const CollectionBoxPart = ({
  testIdPrefix,
  className,
}: CollectionBoxPartProps) => {
  const item = useCollectionBoxPart(selectItem)

  return (
    <div
      data-testid={`${testIdPrefix}.CollectionBoxPart`}
      className={className}
    >
      <CollectionBox
        testIdPrefix={`${testIdPrefix}.CollectionBoxPart`}
        item={item}
      />
    </div>
  )
}


CollectionBoxPart.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
}

CollectionBoxPart.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
}

CollectionBoxPart.displayName = 'CollectionBoxPart'


export default CollectionBoxPart
