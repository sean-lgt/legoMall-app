<!--
 * @Description: 
 * @Author: lgt
 * @Date: 2021-06-05 20:41:15
 * @LastEditTime: 2021-07-14 16:54:15
 * @LastEditors: xxx
-->
<template>
    <div ref="wrapper"
         class="scroll-wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    props: {
        /** 
         * 1、滚动的时候会派发scroll事件，会截流
         * 2、滚动的时候会实时派发scroll事件 不会截流
         * 3、除了实时派发 scroll 事件，在swiper的情况下仍然能实时派发scroll事件
         */
        probeType: {
            type: Number,
            default: 1
        },
        //点击列表是否派发 click 事件
        click: {
            type: Boolean,
            default: true
        },
        //是否开启横向滚动
        scrollX: {
            type: Boolean,
            default: false
        },
        // 是否派发滚动事件
        listenScroll: {
            type: Boolean,
            default: false
        },
        // 列表的数据
        scrollData: {
            type: Array,
            default: false
        },
        // 是否派发滚动到底部的事件，用于上拉加载
        pullup: {
            type: Boolean,
            default: false
        },
        // 是否派发顶部下拉的事件，用于下拉刷新
        pulldown: {
            type: Boolean,
            default: false
        },
        // 是否派发列表滚动开始的事件
        beforeScroll: {
            type: Boolean,
            default: false
        },
        // 当数据更新后，刷新scroll的延时
        refreshDelay: {
            type: Number,
            default: 20
        }

    },
    mounted() {
        // 在 DOM 渲染完毕后初始化 better-scroll
        this.$nextTick(() => {
            this.initScroll();
        })
    },
    methods: {
        initScroll() {
            // better-scroll 初始化
            this.bs=new BScroll(this.$refs.wrapper,{
                probeType: 3,
                click: true
            })
            this.bs.on('scroll',() => {
                console.log("【监听scroll】scrolling--")
            })
            this.bs.on('scrollEnd',() => {
                console.log("【停止scroll】scrollingEnd--")
            })
        }
    }

}
</script>

<style lang="less" scoped>
.scroll-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
}
</style>