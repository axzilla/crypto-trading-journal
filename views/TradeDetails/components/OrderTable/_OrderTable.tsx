// Packages
import PropTypes from 'prop-types'
import moment from 'moment'

// Geist UI
import { Table, Tag, Grid, Button, Spacer } from '@geist-ui/react'
import { Trash as TrashIcon } from '@geist-ui/react-icons'

// Local Components
import { EditOrder } from './components'

// Utils
import nbs from 'utils/nbs'
import formatCurrency from '@utils/formatCurrency'
import formatQuantity from 'utils/formatQuantity'

function OrderTable({
  orders,
  handleUpdateOrder,
  handleDeleteOrder
}: OrderTableProps): JSX.Element {
  return (
    <Table
      data={orders
        .sort((a, b) => Number(a.date) - Number(b.date))
        .map(order => {
          const { side, price, quantity, date, id } = order

          return {
            side: <Tag type="warning">{side.toUpperCase()}</Tag>,
            quantity: formatQuantity(Number(quantity)),
            price: `${formatCurrency(Number(price))}`,
            value: `${formatCurrency(Number(price) * Number(quantity))}`,
            date: nbs(moment.unix(Number(date) / 1000).format('MMMM D, YYYY, h:mm')),
            actions: (
              <Grid.Container wrap="nowrap">
                <Button
                  onClick={() => handleDeleteOrder(id)}
                  iconRight={<TrashIcon />}
                  auto
                  size="small"
                />
                <Spacer x={0.5} />
                <EditOrder order={order} handleUpdateOrder={handleUpdateOrder} />
              </Grid.Container>
            )
          }
        })}
    >
      <Table.Column prop="side" label="Side" />
      <Table.Column prop="quantity" label="Quantity" />
      <Table.Column prop="price" label="Price" />
      <Table.Column prop="value" label="Value" />
      <Table.Column prop="date" label="Date" />
      <Table.Column prop="actions" label="actions" />
    </Table>
  )
}

type OrderTableProps = {
  orders: [
    {
      id: string
      side: string
      date: Date
      price: string
      quantity: string
    }
  ]
  handleUpdateOrder?: (e: { side: string; date: Date; price: string; quantity: string }) => void
  handleDeleteOrder?: (e: string) => void
}

OrderTable.propTypes = {
  orders: PropTypes.array.isRequired,
  handleUpdateOrder: PropTypes.func.isRequired,
  handleDeleteOrder: PropTypes.func.isRequired
}

export default OrderTable
