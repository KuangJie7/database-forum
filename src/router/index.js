import Login from "@/components/user/Login.vue";
import Register from "@/components/user/Register.vue";
import Portal from "@/components/content/Portal.vue";
import Thread from "@/components/content/thread/Thread.vue";
import Threadlist from "@/components/content/thread/Threadlist.vue";
import Content from "@/components/content/Content.vue"
import UserCenter from "@/components/user/UserCenter.vue"

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/section",
        component: Content,
        redirect: "/section",
        children: [
            {
                path: "/",
                component: Portal
            },
            {
                path: ":sid",
                component: Threadlist,
                props: true,
            },
            {
                path: ":sid/:tid",
                component: Thread,
                props: true
            }
        ]
    },
    {
        path: "/usercenter/:mid",
        component: UserCenter,
        props: true
    }
]

export default routes;