
import { getCart } from '../service/cart'

export default {
    async updateCart(ctx){
        console.log("aaaaa")
        const { data } = await getCart();
        ctx.commit('addCart',{
            count:data.list.length || 0
        })
    }
}