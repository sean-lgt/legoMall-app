
import { createApp } from 'vue'
import { ActionBar, ActionBarIcon, ActionBarButton, Divider, Popup, Overlay, Loading, Dialog, ContactCard, Form, AddressEdit, AddressList, Field, CellGroup, Cell, SwipeCell, Icon, Stepper, Card, Checkbox, CheckboxGroup, Button, Swipe, SwipeItem, PullRefresh, List, Tab, Tabs, SubmitBar, Toast, Skeleton } from 'vant'
import App from './App.vue'
import store from './store'
import router from './router'
import 'lib-flexible/flexible'
import 'vant/lib/index.css'; // 全局引入样式
import config from '../config/index';

const app = createApp(App) // 创建app实例

// 全局过滤器 全局过滤函数
// config.globalProperties  可以全局挂载变量函数 类似vue2中的Vue.prototype.$common
app.config.globalProperties.$filters = {
//   格式化URL
  prefix(url) {
    http://127.0.0.1:4002
    if(url && url.startsWith('http://127.0.0.1:4002')){
        console.log("aaaa",url)
        let newUrl = url.replace("http://127.0.0.1:4002","http://mobile.seantao5.xyz/server/api");
        console.log("aaaa",newUrl)
        return newUrl;

    }else if (url && url.startsWith('http')) {
      return url
    } else {
        // return url;
      console.log("url",url)
      url = `http://backend-api-01.newbee.ltd${url}`
       console.log("格式化url",url)
      return url
    }
  }
}

// 使用vant中的组件
app.use(ActionBarButton)
  .use(ActionBarIcon)
  .use(ActionBar)
  .use(Divider)
  .use(Popup)
  .use(Overlay)
  .use(Loading)
  .use(Dialog)
  .use(Toast)
  .use(ContactCard)
  .use(Form)
  .use(AddressEdit)
  .use(AddressList)
  .use(Field)
  .use(CellGroup)
  .use(Cell)
  .use(SwipeCell)
  .use(Icon)
  .use(Stepper)
  .use(Card)
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(PullRefresh)
  .use(List)
  .use(Tab)
  .use(Tabs)
  .use(SubmitBar)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Skeleton)

app.use(router)
app.use(store)

app.mount('#app')
