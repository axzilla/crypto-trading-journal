// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

// Geist UI
import { Grid, Card, Description } from '@geist-ui/react'

// Global Components
import { OrderModal } from 'components'

// Utils
import nbs from 'utils/nbs'
import formatCurrency from '@utils/formatCurrency'
import formatQuantity from 'utils/formatQuantity'

function Item({ order, handleCrdOrder, isLastItem }: ItemProps): JSX.Element {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  return (
    <>
      <Card hoverable onClick={() => setIsOrderModalOpen(true)}>
        <Grid.Container gap={2}>
          <Grid xs>
            <Description title="Side" content={order.side} />
          </Grid>
          <Grid xs>
            <Description title="Quantity" content={formatQuantity(order.quantity)} />
          </Grid>
          <Grid xs>
            <Description title="Price" content={formatCurrency(order.price)} />
          </Grid>
          <Grid xs>
            <Description title="Value" content={formatCurrency(order.price * order.quantity)} />
          </Grid>
          <Grid xs>
            <Description
              title="Date"
              content={nbs(moment(order.date).format('MMMM D, YYYY, h:mm'))}
            />
          </Grid>
        </Grid.Container>
      </Card>

      <OrderModal
        isOrderModalOpen={isOrderModalOpen}
        setIsOrderModalOpen={setIsOrderModalOpen}
        order={order}
        handleCrdOrder={handleCrdOrder}
        isLastItem={isLastItem}
      />
    </>
  )
}

type ItemProps = {
  order: { date: Date; side: string; price: number; quantity: number; _id: string }
  handleCrdOrder: (order: unknown, type: string) => void
  isLastItem: boolean
}

Item.propTypes = {
  order: PropTypes.object.isRequired,
  handleCrdOrder: PropTypes.func.isRequired,
  isLastItem: PropTypes.bool.isRequired
}

export default Item
