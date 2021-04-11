import { orderQueries, tradeQueries } from './queries'
import { orderType, tradeType } from './types'
import { orderMutations, tradeMutations } from './mutations'

const orderTypeDefs = [orderQueries, orderType, orderMutations]
const tradeTypeDefs = [tradeQueries, tradeType, tradeMutations]

const typeDefs = [...orderTypeDefs, ...tradeTypeDefs]

export default typeDefs
