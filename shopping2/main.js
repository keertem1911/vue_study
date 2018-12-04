import Vue from 'vue'
import VueRouter from 'vue-router'
import Routers from './router.js'
import Vuex from 'vuex'
import App from './app.vue'
import './style.css'
import product_data from './product.js'
Vue.use(VueRouter);
Vue.use(Vuex);
const RouterConfig= {
    mode:'history',
    routes: Routers
};
function getFilterArray(array) {
    let _self=[];
    let json={};
    for (let i = 0; i < array.length; i++) {
        if(!json[array[i]]){
            _self.push(array[i]);
            json[array[i]]=1;
        }
    }
    return _self;
}
const router= new VueRouter(RouterConfig);

router.beforeEach((to,from,next)=>{
    window.document.title= to.meta.title;
    next();
});

router.afterEach((to,from,next) =>{
    window.scrollTo(0,0);
});

const store =new Vuex.Store({
    state:{
        productList:[],
        cartList:[]
    },
    getters:{
            brands:state=>{
                const brands= state.productList.map(b=>b.brand);
                return getFilterArray(brands);
            },
        colors: state=>{
                const colors =state.productList.map(c=>c.color);
                return getFilterArray(colors);
        }
    },
    mutations:{
        setProductList(state,data){
            state.productList=data
        }
    },
    actions:{
        getProductList(context){
            setTimeout(()=>{
                context.commit('setProductList',product_data);
            },500)
        }
    }
});
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h=>{
        return h(App)
    }
});
