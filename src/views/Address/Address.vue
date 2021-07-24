<!--
 * @Description: 
 * @Author: lgt
 * @Date: 2021-06-06 12:54:36
 * @LastEditTime: 2021-07-24 11:41:11
 * @LastEditors: xxx
-->
<template>
    <div class="address-box">
        <s-header :name="'地址管理'"
                  :back="from == 'create-order'?'':'/user'"></s-header>
        <div class="address-item">
            <van-address-list v-if="from != 'mine'"
                              v-model="chosenAddressId"
                              :list="list"
                              default-tag-text="默认"
                              @add="onAdd"
                              @edit="onEdit"
                              @select="select"></van-address-list>
            <van-address-list v-else
                              v-model="chosenAddressId"
                              :list="list"
                              default-tag-text="默认"
                              @add="onAdd"
                              @edit="onEdit"></van-address-list>
        </div>
    </div>
</template>

<script>
import { reactive,onMounted,toRefs,} from 'vue'
import sHeader from '@/components/SimpleHeader.vue'
import { getAddressList } from '@/service/address'
import { useRoute,useRouter } from 'vue-router'

export default {
    components: {
        sHeader
    },
    setup () {
        const route=useRoute()
        const router=useRouter()
        const state=reactive({
            chosenAddressId: '1',
            list: [],
            from: route.query.from
        })

        onMounted(async () => {
            const { data }=await getAddressList()
            if(!data) {
                state.list=[];
                return
            }
            state.list=data.map(item => {
                return {
                    id: item.addressId,
                    name: item.userName,
                    tel: item.userPhone,
                    address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
                    isDefault: !!item.defaultFlag
                }
            })
        })

        const onAdd=() => {
            router.push({ path: '/address-edit',query: { type: 'add',from: state.from } })
        }

        const onEdit=(item) => {
            router.push({ path: 'address-edit',query: { type: 'edit',addressId: item.id,from: state.from } })
        }

        const select=(item) => {
            router.push({ path: 'create-order',query: { addressId: item.id,from: state.from } })
        }

        return {
            ...toRefs(state),
            onAdd,
            onEdit,
            select
        }
    }
}
</script>

<style lang="less">
@import url("../../common/css/mixin.less");
.address-box {
    .van-radio__icon {
        display: none;
    }
    .address-item {
        .van-button {
            background: @primary;
            border-color: @primary;
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