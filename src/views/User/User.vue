<!--
 * @Description: 
 * @Author: lgt
 * @Date: 2021-05-11 11:45:27
 * @LastEditTime: 2021-07-24 12:27:38
 * @LastEditors: xxx
-->
<template>
    <div class="user-box">
        <s-header :name="'我的'"></s-header>
        <van-skeleton title
                      :avatar="true"
                      :row="3"
                      :loading="loading">
            <div class="user-info">
                <div class="info">
                    <img src="https://s.yezgea02.com/1604040746310/aaaddd.png" />
                    <div class="user-desc">
                        <span>昵称：{{ user.nickName }}</span>
                        <span>登录名：{{ user.loginName }}</span>
                        <span class="name">个性签名：{{ user.introduceSign }}</span>
                    </div>
                </div>
            </div>
        </van-skeleton>
        <ul class="user-list">
            <li class="van-hairline--bottom"
                @click="goTo('/order')">
                <span>我的订单</span>
                <van-icon name="arrow" />
            </li>
            <li class="van-hairline--bottom"
                @click="goTo('/setting')">
                <span>账号管理</span>
                <van-icon name="arrow" />
            </li>
            <li class="van-hairline--bottom"
                @click="goTo('/address', { from: 'mine' })">
                <span>地址管理</span>
                <van-icon name="arrow" />
            </li>
            <li @click="goTo('/about')">
                <span>关于我们</span>
                <van-icon name="arrow" />
            </li>
        </ul>
        <nav-bar></nav-bar>
    </div>
</template>

<script>
import { reactive,onMounted,toRefs } from 'vue'
import navBar from '@/components/NavBar.vue'
import sHeader from '@/components/SimpleHeader.vue'
import { getUserInfo } from '@/service/user'
import { useRouter } from 'vue-router'
// import NavBar from '../../components/NavBar.vue'
export default {
    components: {
        navBar,
        sHeader
    },
    setup() {
        const router=useRouter();
        const state=reactive({
            user: {},
            loading: true
        })
        onMounted(async () => {
            const { data }=await getUserInfo();
            state.user=data;
            state.loading=false;
        })
        const goBack=() => {
            router.go(-1);
        }
        const goTo=(r,query) => {
            router.push({ path: r,query: query||{} })
        }
        return {
            ...toRefs(state),
            goBack,
            goTo
        }
    },
}
</script>

<style lang="less">
@import url("../../common/css/mixin.less");
.user-box {
    .user-header {
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
        .user-name {
            font-size: 14px;
        }
    }
    .user-info {
        width: 94%;
        margin: 10px;
        height: 115px;
        background: linear-gradient(90deg, @primary, #51c7c7);
        box-shadow: 0 2px 5px #269090;
        border-radius: 6px;
        .info {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            padding: 25px 20px;
            .boxSizing();
            img {
                .wh(60px, 60px);
                border-radius: 50%;
                margin-top: 4px;
            }
            .user-desc {
                display: flex;
                flex-direction: column;
                margin-left: 10px;
                line-height: 20px;
                font-size: 14px;
                color: #fff;
                span {
                    color: #fff;
                    font-size: 14px;
                    padding: 2px 0;
                }
            }
            .account-setting {
                position: absolute;
                top: 10px;
                right: 20px;
                font-size: 13px;
                color: #fff;
                .van-icon-setting-o {
                    font-size: 16px;
                    vertical-align: -3px;
                    margin-right: 4px;
                }
            }
        }
    }
    .user-list {
        padding: 0 20px;
        margin-top: 20px;
        li {
            height: 40px;
            line-height: 40px;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            .van-icon-arrow {
                margin-top: 13px;
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