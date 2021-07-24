<template>
    <div class="home-wrapper">
        <header class="home-header wrap"
                :class="{'active': headerScroll}">
            <router-link tag="i"
                         to="./category">
                <van-icon name="apps-o" />
            </router-link>
            <div class="header-search">
                <span class="app-name">乐购商城</span>
                <!-- <van-icon name="search" /> -->
                <i class="van-icon van-icon-search icon-search"></i>
                <router-link tag="span"
                             class="search-title"
                             to="./product-list?from=home">输入关键词搜索</router-link>
            </div>
            <router-link class="login"
                         tag="span"
                         to="./login"
                         v-if="!isLogin">登录</router-link>
            <router-link class="login"
                         tag="span"
                         to="./user"
                         v-else>
                <van-icon name="manager-o"></van-icon>
            </router-link>
        </header>
        <!-- 放置导航栏 -->
        <nav-bar></nav-bar>
        <!-- 轮播图 -->
        <swiper :list="swiperList"></swiper>
        <!-- 区块 -->
        <div class="category-list">
            <div v-for="item in categoryList"
                 :key="item.categoryId"
                 @click="tips">
                <img :src="item.imgUrl">
                <span>{{item.name}}</span>
            </div>
        </div>
        <!-- 新品上线  使用骨架屏 -->
        <div class="good">
            <header class="good-header">新品上线</header>
            <!-- 使用骨架屏 -->
            <van-skeleton title
                          :row="3"
                          :loading="loading">
                <div class="good-box">
                    <div class="good-item"
                         v-for="item in newGoodses"
                         :key="item.goodsId"
                         @click="goToDetail(item)">
                        <img :src="$filters.prefix(item.goodsCoverImg)"
                             alt="">
                        <div class="good-desc">
                            <div class="title">{{ item.goodsName }}</div>
                            <div class="price">¥ {{ item.sellingPrice }}</div>
                        </div>
                    </div>
                </div>
            </van-skeleton>
        </div>
        <!-- 热门商品部分 使用骨架屏-->
        <div class="good">
            <header class="good-header">热门商品</header>
            <van-skeleton title
                          :row="3"
                          :loading="loading">
                <div class="good-box">
                    <div class="good-item"
                         v-for="item in hots"
                         :key="item.goodsId"
                         @click="goToDetail(item)">
                        <img :src="$filters.prefix(item.goodsCoverImg)"
                             alt="">
                        <div class="good-desc">
                            <div class="title">{{ item.goodsName }}</div>
                            <div class="price">¥ {{ item.sellingPrice }}</div>
                        </div>
                    </div>
                </div>
            </van-skeleton>
        </div>
        <!-- 最新推荐部分 使用骨架屏 -->
        <div class="good"
             :style="{ paddingBottom: '100px'}">
            <header class="good-header">最新推荐</header>
            <van-skeleton title
                          :row="3"
                          :loading="loading">
                <div class="good-box">
                    <div class="good-item"
                         v-for="item in recommends"
                         :key="item.goodsId"
                         @click="goToDetail(item)">
                        <img :src="$filters.prefix(item.goodsCoverImg)"
                             alt="">
                        <div class="good-desc">
                            <div class="title">{{ item.goodsName }}</div>
                            <div class="price">¥ {{ item.sellingPrice }}</div>
                        </div>
                    </div>
                </div>
            </van-skeleton>
        </div>
    </div>
</template>

<script>
import { reactive,onMounted,toRefs,nextTick } from 'vue'
import { useRouter } from 'vue-router'
import swiper from '@/components/Swiper.vue'
import navBar from '@/components/NavBar.vue'
import { getHome } from '@/service/home'
import { getLocal } from '@/common/js/utils'
import { Toast } from 'vant'
export default {
    name: 'home',
    components: {
        swiper,
        navBar
    },
    setup() {
        const router=useRouter()
        const state=reactive({
            swiperList: [], // 轮播图列表
            isLogin: false, // 是否已登录
            headerScroll: false, // 滚动透明判断
            hots: [],
            newGoodses: [],
            recommends: [],
            categoryList: [
                {
                    name: '乐购超市',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png',
                    categoryId: 100001
                },{
                    name: '乐购服饰',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png',
                    categoryId: 100003
                },{
                    name: '全球购',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png',
                    categoryId: 100002
                },{
                    name: '乐购生鲜',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png',
                    categoryId: 100004
                },{
                    name: '乐购到家',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png',
                    categoryId: 100005
                },{
                    name: '充值缴费',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png',
                    categoryId: 100006
                },{
                    name: '9.9元拼',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/9.9%402x.png',
                    categoryId: 100007
                },{
                    name: '领劵',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png',
                    categoryId: 100008
                },{
                    name: '省钱',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png',
                    categoryId: 100009
                },{
                    name: '全部',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png',
                    categoryId: 100010
                }
            ],
            loading: true
        })
        onMounted(async () => {
            const token=getLocal('token')
            if(token) {
                state.isLogin=true
            }
            Toast.loading({
                message: '拼命加载中...',
                forbidClick: true
            });
            const { data }=await getHome();
            console.log("首页数据",data)
            state.swiperList=data.carousels
            state.newGoodses=data.newGoodses
            state.hots=data.hotGoodses
            state.recommends=data.recommendGoodses
            state.loading=false
            Toast.clear()
        })

        nextTick(() => {
            window.addEventListener('scroll',() => {
                let scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop
                scrollTop>100? state.headerScroll=true:state.headerScroll=false
            })
        })

        const goToDetail=(item) => {
            router.push({ path: `/product/${item.goodsId}` })
        }

        const tips=() => {
            Toast('暂未开放，敬请期待');
        }

        return {
            ...toRefs(state),
            goToDetail,
            tips
        }
    },
}
</script>


<style lang="less">
@import url("../../common/css/mixin.less");
.home-header {
    position: fixed;
    left: 0;
    top: 0;
    .wh(100%, 50px);
    .fj();
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #fff;
    z-index: 10000;
    .nbmenu2 {
        color: @primary;
    }
    .van-icon.van-icon-apps-o {
        color: @primary;
        font-size: 20px;
        line-height: 50px;
    }
    &.active {
        background: @primary;
        .nbmenu2 {
            color: #fff;
        }
        .van-icon.van-icon-apps-o {
            color: #fff;
        }
        .login {
            color: #fff;
        }
    }

    .header-search {
        display: flex;
        .wh(74%, 20px);
        line-height: 20px;
        margin: 10px 0;
        padding: 5px 0;
        color: #232326;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 20px;
        .app-name {
            padding: 0 10px;
            color: @primary;
            font-size: 20px;
            font-weight: bold;
            border-right: 1px solid #666;
        }
        .icon-search {
            padding: 0 10px;
            font-size: 17px;
        }
        .search-title {
            font-size: 12px;
            color: #666;
            line-height: 21px;
        }
    }
    .icon-iconyonghu {
        color: #fff;
        font-size: 22px;
    }
    .login {
        color: @primary;
        line-height: 52px;
        .van-icon-manager-o {
            font-size: 20px;
            vertical-align: -3px;
        }
    }
}
.category-list {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 13px;
    div {
        display: flex;
        flex-direction: column;
        width: 20%;
        text-align: center;
        img {
            .wh(36px, 36px);
            margin: 13px auto 8px auto;
        }
    }
}
.good {
    .good-header {
        background: #f9f9f9;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: @primary;
        font-size: 16px;
        font-weight: 500;
    }
    .good-box {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .good-item {
            box-sizing: border-box;
            width: 50%;
            border-bottom: 1px solid #e9e9e9;
            padding: 10px 10px;
            img {
                display: block;
                width: 120px;
                margin: 0 auto;
            }
            .price {
                text-align: center;
                color: @primary;
            }
            .good-desc {
                text-align: center;
                font-size: 14px;
                padding: 10px 0;
                .title {
                    color: #222333;
                }
                .price {
                    color: @primary;
                }
            }
            &:nth-child(2n + 1) {
                border-right: 1px solid #e9e9e9;
            }
        }
    }
}
.floor-list {
    width: 100%;
    padding-bottom: 50px;
    .floor-head {
        width: 100%;
        height: 40px;
        background: #f6f6f6;
    }
    .floor-content {
        display: flex;
        flex-shrink: 0;
        flex-wrap: wrap;
        width: 100%;
        .boxSizing();
        .floor-category {
            width: 50%;
            padding: 10px;
            border-right: 1px solid #dcdcdc;
            border-bottom: 1px solid #dcdcdc;
            .boxSizing();
            &:nth-child(2n) {
                border-right: none;
            }
            p {
                font-size: 17px;
                color: #333;
                &:nth-child(2) {
                    padding: 5px 0;
                    font-size: 13px;
                    color: @primary;
                }
            }
            .floor-products {
                .fj();
                width: 100%;
                img {
                    .wh(65px, 65px);
                }
            }
        }
    }
}
</style>