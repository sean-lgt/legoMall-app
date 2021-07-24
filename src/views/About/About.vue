<!--
 * @Description: 
 * @Author: lgt
 * @Date: 2021-05-11 17:08:14
 * @LastEditTime: 2021-07-24 11:42:26
 * @LastEditors: xxx
-->
<template>
    <div class="about">
        <s-header :name="'关于我们'"></s-header>
        <div class="about-body">
            <van-divider :style="{ color: '#1baeae', borderColor: '#1baeae', fontSize: '20px', fontWeight: 500 }">关于我们</van-divider>
        </div>
    </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader.vue'
export default {
    components: {
        sHeader
    },

}
</script>
<style lang="less">
.about {
    box-sizing: border-box;
    padding: 20px;
    .intro-img {
        width: 100%;
    }
    .about-body {
        font-size: 16px;
        a {
            color: #007fff;
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