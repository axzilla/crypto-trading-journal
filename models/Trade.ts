import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TradeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  //
  type: { type: String, required: true },
  leverage: { type: Number, required: true },
  exchange: { type: String, required: true },
  symbol: { type: String, required: true },
  side: { type: String, required: true },
  status: { type: String, required: true, default: 'Open' },
  //
  quantityTotal: { type: Number, required: true },
  quantityOpen: { type: Number, required: true },
  cost: { type: Number, required: true },
  avgEntry: { type: Number, required: true },
  avgExit: { type: Number, required: true },
  returnTotal: { type: Number, required: true },
  returnPercent: { type: Number, required: true },
  //
  orders: [
    {
      side: { type: String, required: true },
      date: { type: Date, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      fees: { type: Number, required: true }
    }
  ],
  //
  setups: { type: Array },
  mistakes: { type: Array },
  notes: { type: String },
  images: { type: Array },
  //
  dateCreated: { type: Date, required: true, default: Date.now() },
  dateUpdated: { type: Date, required: true, default: Date.now() }
})

export default mongoose.models.Trade || mongoose.model('Trade', TradeSchema)
