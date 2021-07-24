<!--
 * @Description: 
 * @Author: lgt
 * @Date: 2021-06-06 13:37:07
 * @LastEditTime: 2021-07-24 12:24:14
 * @LastEditors: xxx
-->

<template>
    <div class="order-box">
        <s-header :name="'我的订单'"
                  :back="'/user'"></s-header>
        <van-tabs @click="onChangeTab"
                  :color="'#1baeae'"
                  :title-active-color="'#1baeae'"
                  class="order-tab"
                  v-model="status">
            <van-tab title="全部"
                     name=''></van-tab>
            <van-tab title="待付款"
                     name="0"></van-tab>
            <van-tab title="待确认"
                     name="1"></van-tab>
            <van-tab title="待发货"
                     name="2"></van-tab>
            <van-tab title="已发货"
                     name="3"></van-tab>
            <van-tab title="交易完成"
                     name="4"></van-tab>
        </van-tabs>
        <div class="content">
            <van-pull-refresh v-model="refreshing"
                              @refresh="onRefresh"
                              class="order-list-refresh">
                <van-list v-model:loading="loading"
                          :finished="finished"
                          finished-text="没有更多了"
                          @load="onLoad"
                          @offset="10">
                    <div v-for="(item, index) in list"
                         :key="index"
                         class="order-item-box"
                         @click="goTo(item.orderNo)">
                        <div class="order-item-header">
                            <span>订单时间：{{ item.createTime }}</span>
                            <span>{{ item.orderStatusString }}</span>
                        </div>
                        <van-card v-for="one in item.newBeeMallOrderItemVOS"
                                  :key="one.orderId"
                                  :num="one.goodsCount"
                                  :price="one.sellingPrice"
                                  desc="全场包邮"
                                  :title="one.goodsName"
                                  :thumb="$filters.prefix(one.goodsCoverImg)" />
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
import { reactive,toRefs } from 'vue';
import sHeader from '@/components/SimpleHeader.vue'
import { getOrderList } from '@/service/order'
import { useRouter } from 'vue-router';
export default {
    components: {
        sHeader
    },
    setup() {
        const router=useRouter()
        const state=reactive({
            status: '',
            loading: false,
            finished: false,
            refreshing: false,
            list: [],
            page: 1,
            totalPage: 0
        })

        const loadData=async () => {
            const { data,data: { list } }=await getOrderList({ pageNumber: state.page,pageSize: 1000,status: state.status })
            state.list=state.list.concat(list)
            state.totalPage=data.totalPage
            state.loading=false;
            if(state.page>=data.totalPage) state.finished=true
        }

        const onChangeTab=(name) => {
            // 这里 Tab 最好采用点击事件，@click，如果用 @change 事件，会默认进来执行一次。
            state.status=name
            onRefresh()
        }

        const goTo=(id) => {
            router.push({ path: '/order-detail',query: { id } })
        }

        const goBack=() => {
            router.go(-1)
        }

        const onLoad=() => {
            if(!state.refreshing&&state.page<state.totalPage) {
                console.log(state.page)
                console.log(state.totalPage)
                state.page=state.page+1
            }
            if(state.refreshing) {
                state.list=[];
                state.refreshing=false;
            }
            loadData()
        }

        const onRefresh=() => {
            state.refreshing=true
            state.finished=false
            state.loading=true
            state.page=1
            onLoad()
        }

        return {
            ...toRefs(state),
            onChangeTab,
            goTo,
            goBack,
            onLoad,
            onRefresh
        }
    }
}
</script>

<style lang="less">
@import url("../../common/css/mixin.less");
.order-box {
    .order-header {
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
        border-bottom: 1px solid #dcdcdc;
        .order-name {
            font-size: 14px;
        }
    }
    .order-tab {
        position: fixed;
        left: 0;
        z-index: 1000;
        width: 100%;
        border-bottom: 1px solid #e9e9e9;
    }
    .skeleton {
        margin-top: 60px;
    }
    .content {
        height: calc(~"(100vh - 70px)");
        overflow: hidden;
        overflow-y: scroll;
        margin-top: 34px;
    }
    .order-list-refresh {
        .van-card__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .van-pull-refresh__head {
            background: #f9f9f9;
        }
        .order-item-box {
            margin: 20px 10px;
            background-color: #fff;
            .order-item-header {
                padding: 10px 20px 0 20px;
                display: flex;
                justify-content: space-between;
            }
            .van-card {
                background-color: #fff;
                margin-top: 0;
            }
        }
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