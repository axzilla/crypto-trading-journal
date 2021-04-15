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
        .sort((a, b): number => {
          if (new Date(a.date) > new Date(b.date)) return -1
          else if (new Date(a.date) < new Date(b.date)) return 1
          else return 0
        })
        .map(order => {
          const { side, price, quantity, date, _id } = order

          return {
            side: <Tag type="warning">{side.toUpperCase()}</Tag>,
            quantity: formatQuantity(quantity),
            price: formatCurrency(price),
            value: formatCurrency(price * quantity),
            date: nbs(moment(date).format('MMMM D, YYYY, h:mm')),
            actions: (
              <Grid.Container wrap="nowrap">
                <Button
                  disabled={orders.length < 2}
                  onClick={() => handleDeleteOrder(_id)}
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
      _id: string
      side: string
      date: Date
      price: number
      quantity: number
    }
  ]
  handleUpdateOrder?: (e: { side: string; date: Date; price: number; quantity: number }) => void
  handleDeleteOrder?: (e: string) => void
}

OrderTable.propTypes = {
  orders: PropTypes.array.isRequired,
  handleUpdateOrder: PropTypes.func.isRequired,
  handleDeleteOrder: PropTypes.func.isRequired
}

export default OrderTable
