import mongoose from 'mongoose'

const TradeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this pet.'],
    maxlength: [20, 'Name cannot be more than 60 characters']
  }
})

export default mongoose.models.Trade || mongoose.model('Trade', TradeSchema)
