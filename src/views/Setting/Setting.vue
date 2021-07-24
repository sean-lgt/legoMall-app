<template>
    <div class="seting-box">
        <s-header :name="'账号管理'"></s-header>
        <div class="input-item">
            <van-field v-model="nickName"
                       label="昵称"></van-field>
            <van-field v-model="introduceSign"
                       label="个性签名"></van-field>
            <van-field v-model="password"
                       type="password"
                       label="修改密码"></van-field>
        </div>
        <van-button round
                    class="save-btn"
                    color="#1baeae"
                    type="primary"
                    @click="save"
                    block>保存</van-button>
        <van-button round
                    class="save-btn"
                    color="#1baeae"
                    type="primary"
                    @click="handleLogout"
                    block>退出登录</van-button>
    </div>

</template>
<script>
import { reactive,onMounted,toRefs } from 'vue';
import md5 from 'js-md5';
import SHeader from '@/components/SimpleHeader.vue';
import { getUserInfo,EditUserInfo,logout } from '@/service/user'
import { setLocal } from '@/common/js/utils'
import { Toast } from 'vant';
export default {
    name: 'setting',
    components: {
        SHeader
    },
    setup() {
        const state=reactive({
            nickName: '',
            introduceSign: '',
            password: ''
        })

        onMounted(async () => {
            const { data }=await getUserInfo();
            state.nickName=data.nickName;
            state.introduceSign=data.introduceSign
        })

        const save=async () => {
            const params={
                introduceSign: state.introduceSign,
                nickName: state.nickName
            }
            if(state.password) {
                params.passwordMd5=md5(state.password)
            }
            // 调用接口，传递信息
            await EditUserInfo(params)
            Toast.success('保存成功');
        }

        const handleLogout=async () => {
            const { resultCode }=await logout();
            if(resultCode==200) {
                setLocal('token','');
                // 回到首页 
                window.location.href='/home';
            }
        }


        return {
            ...toRefs(state),
            save,
            handleLogout
        }
    }
}
</script>

<style lang="less">
.seting-box {
    .save-btn {
        width: 80%;
        margin: 20px auto;
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