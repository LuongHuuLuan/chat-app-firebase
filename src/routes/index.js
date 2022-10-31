import ChatRoom from "../components/ChatRoom";
import Login from "../components/Login";

const routes = [
    {path: '/login', component: Login},
    {path: '/', component: ChatRoom}
]

export {routes};