import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import CustomerManagement from './views/UserManagement/CustomerManagement.vue'
import CustomerDetails from './views/UserManagement/CustomerDetails.vue'
import UserManagement from './views/UserManagement/UserManagement.vue'
// import UserManagement from './views/UserManagement/UserDetails.vue'
import BuyingManagement from './views/UserManagement/BuyingManagement.vue'
import BuyingDetails from './views/UserManagement/BuyingDetails.vue'
import ConsultancyManagement from './views/UserManagement/ConsultancyManagement.vue'
import ConsultancyDetails from './views/UserManagement/ConsultancyDetails.vue'
import GoodsManagement from './views/GoodsManagement/GoodsManagement.vue'
import GoodsAdd from './views/GoodsManagement/GoodsAdd.vue'
import Test from './views/GoodsManagement/Test.vue'



let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    }, 
    //{ path: '/main', component: Main },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航一',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/table', component: Table, name: 'Table' },
    //         { path: '/form', component: Form, name: 'Form' },
    //         { path: '/user', component: user, name: '列表' },
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // }, 
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/', component: Page6, name: '概况' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/', component: Page6, name: '订单管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/', component: Page6, name: '批量发货' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/', component: Page6, name: '批量发货' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/', component: Page6, name: '批量退款' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/', component: Page6, name: '快速打单' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '商品管理',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/GoodsManagement', component: GoodsManagement, name: '商品管理' }
        ]
    },
    {
        path: '/GoodsAdd',
        component: Home,
        name: '商品管理',
        hidden: true,
        children: [
            { path: '/GoodsAdd', component: GoodsAdd, name: '发布新产品' }
        ]
    }, 
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/UserManagement', component: UserManagement, name: '用户管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/CustomerManagement', component: CustomerManagement, name: '顾客管理' }
        ]
    },
    {
        path: '/CustomerDetails',
        component: Home,
        name: '顾客管理',
        hidden: true,
        children: [
            { path: '/CustomerDetails', component: CustomerDetails, name: '顾客详情' }
        ]
    }, 
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/BuyingManagement', component: BuyingManagement, name: '买手管理' }
        ]
    },
    {
        path: '/BuyingDetails',
        component: Home,
        name: '顾客管理',
        hidden: true,
        children: [
            { path: '/BuyingDetails', component: BuyingDetails, name: '买手详情' }
        ]
    }, 
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/ConsultancyManagement', component: ConsultancyManagement, name: '顾问管理' }
        ]
    },
    {
        path: '/ConsultancyDetails',
        component: Home,
        name: '顾问管理',
        hidden: true,
        children: [
            { path: '/ConsultancyDetails', component: ConsultancyDetails, name: '顾问详情' }
        ]
    }, 
    
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;