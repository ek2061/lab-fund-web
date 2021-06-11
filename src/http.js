import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from '@/router'

let loading
function startLoading() {  // 開始加載動畫
    loading = Loading.service({
        lock: true,  // 是否鎖定
        text: '加載中請稍候',  // 執行時顯示文字
        background: 'rgba( 0, 0, 0, 0, 7)'

    })
}

function endLoading() {  // 結束動畫
    loading.close()
}

// 請求攔截
axios.interceptors.request.use(config => {
    // 開始請求時就加載動畫
    startLoading()

    // 設置統一的請求header
    if (localStorage.userToken) {
        config.headers.Authorization = "Bearer " + localStorage.userToken
    }
    return config
}, error => {  // 請求失敗時
    return Promise.reject(error)
})

// 回應攔截
axios.interceptors.response.use(response => {
    // 拿到回應就結束動畫
    endLoading()
    return response
}, error => {
    endLoading()
    // 錯誤提醒
    Message.error(error.response.data.msg)

    // 獲取狀態錯誤碼
    const {status} = error.response
    if (status == 401) {  // 請求時發現token失效
        Message.error('token失效請重新登入')
        // 清除token
        localStorage.removeItem('userToken')
        // 跳轉到登入頁面
        router.push('/login')
    }

    return Promise.reject(error)
})

export default axios