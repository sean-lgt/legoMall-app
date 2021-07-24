<!--
 * @Description: 
 * @Author: lgt
 * @Date: 2021-06-06 13:48:06
 * @LastEditTime: 2021-07-24 12:24:22
 * @LastEditors: xxx
-->
<template>
    <div class="order-detail-box">
        <s-header :name="'订单详情'"
                  @callback="close"></s-header>
        <div class="order-status">
            <div class="status-item">
                <label>订单状态：</label>
                <span>{{ detail.orderStatusString }}</span>
            </div>
            <div class="status-item">
                <label>订单编号：</label>
                <span>{{ detail.orderNo }}</span>
            </div>
            <div class="status-item">
                <label>下单时间：</label>
                <span>{{ detail.createTime }}</span>
            </div>
            <!-- <van-button v-if="[1,2,3].includes(detail.orderStatus)" style="margin-bottom: 10px" color="#1baeae" block @click="confirmOrder(detail.orderNo)">确认订单</van-button> -->
            <van-button v-if="detail.orderStatus == 0"
                        style="margin-bottom: 10px"
                        color="#1baeae"
                        block
                        @click="showPayFn">去支付</van-button>
            <van-button v-if="!(detail.orderStatus < 0 || detail.orderStatus == 4)"
                        block
                        @click="handleCancelOrder(detail.orderNo)">取消订单</van-button>
        </div>
        <div class="order-price">
            <div class="price-item">
                <label>商品金额：</label>
                <span>¥ {{ detail.totalPrice }}</span>
            </div>
            <div class="price-item">
                <label>配送方式：</label>
                <span>普通快递</span>
            </div>
        </div>
        <van-card v-for="item in detail.newBeeMallOrderItemVOS"
                  :key="item.goodsId"
                  style="background: #fff"
                  :num="item.goodsCount"
                  :price="item.sellingPrice"
                  desc="全场包邮"
                  :title="item.goodsName"
                  :thumb="$filters.prefix(item.goodsCoverImg)" />
        <van-popup v-model:show="showPay"
                   position="bottom"
                   :style="{ height: '24%' }">
            <div :style="{ width: '90%', margin: '0 auto', padding: '20px 0' }">
                <van-button :style="{ marginBottom: '10px' }"
                            color="#1989fa"
                            block
                            @click="handlePayOrder(detail.orderNo, 1)">支付宝支付</van-button>
                <van-button color="#4fc08d"
                            block
                            @click="handlePayOrder(detail.orderNo, 2)">微信支付</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { reactive,toRefs,onMounted } from 'vue'
import sHeader from '@/components/SimpleHeader.vue'
import { getOrderDetail,cancelOrder,confirmOrder,payOrder } from '@/service/order'
import { Dialog,Toast } from 'vant'
import { useRoute } from 'vue-router'
export default {
    name: 'OrderDetail',
    components: {
        sHeader
    },
    setup () {
        const route=useRoute()
        const state=reactive({
            detail: {},
            showPay: false
        })

        onMounted(() => {
            init()
        })

        const init=async () => {
            Toast.loading({
                message: '加载中...',
                forbidClick: true
            });
            const { id }=route.query
            const { data }=await getOrderDetail(id)
            state.detail=data
            Toast.clear()
        }

        const handleCancelOrder=(id) => {
            Dialog.confirm({
                title: '确认取消订单？',
            }).then(() => {
                cancelOrder(id).then(res => {
                    if(res.resultCode==200) {
                        Toast('删除成功')
                        init()
                    }
                })
            }).catch(() => {
                // on cancel
            });
        }

        const handleConfirmOrder=(id) => {
            Dialog.confirm({
                title: '是否确认订单？',
            }).then(() => {
                confirmOrder(id).then(res => {
                    if(res.resultCode==200) {
                        Toast('确认成功')
                        init()
                    }
                })
            }).catch(() => {
                // on cancel
            });
        }

        const showPayFn=() => {
            state.showPay=true
        }

        const handlePayOrder=async (id,type) => {
            Toast.loading
            await payOrder({ orderNo: id,payType: type })
            state.showPay=false
            init()
        }

        const close=() => {
            Dialog.close()
        }

        return {
            ...toRefs(state),
            handleCancelOrder,
            handleConfirmOrder,
            showPayFn,
            handlePayOrder,
            close
        }

    }
}
</script>
<style lang="less">
@import url("../../common/css/mixin.less");
.order-detail-box {
    background: #f7f7f7;
    .order-status {
        background: #fff;
        padding: 20px;
        font-size: 15px;
        .status-item {
            margin-bottom: 10px;
            label {
                color: #999;
            }
            span {
            }
        }
    }
    .order-price {
        background: #fff;
        margin: 20px 0;
        padding: 20px;
        font-size: 15px;
        .price-item {
            margin-bottom: 10px;
            label {
                color: #999;
            }
            span {
            }
        }
    }
    .van-card {
        margin-top: 0;
    }
    .van-card__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
.nav-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    padding: 5px 0;
    z-index: 1000;
    background: #fff;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    .nav-list {
        width: 100%;
        .fj();
        flex-direction: row;
        padding: 0;
        .nav-list-item {
            display: flex;
            flex: 1;
            flex-direction: column;
            text-align: center;
            color: #666;
            &.router-link-active {
                color: @primary;
            }
            i {
                text-align: center;
                font-size: 22px;
            }
            span {
                font-size: 12px;
            }
            .van-icon-shopping-cart-o {
                margin: 0 auto;
                margin-bottom: 2px;
            }
        }
    }
}
.simple-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    .simple-header-name {
        font-size: 14px;
    }
}
.block {
    height: 44px;
}
</style>