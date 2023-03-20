<script>
    import "./index.css"
    import NavBar from "../models/navigasi/NavBar.vue";
    import AccountTodo from "../models/account/AccountTodo.vue";
    import NavbarHP from "./NavbarHp.vue";
    import ComponentCard from "../models/card/ComponentCard.vue";
    import {ref} from "vue";
    import {instance} from "../../../config/instance.js"
    import Cookies from "js-cookie"


    export default {
        name: "LandingPage",
        data() {
           return {
               isLogin: false
           }
        },
        watch: {
            isLogin(res) {
               if(res) {
                  this.getDataAPI()
               } else {
                  this.setValueData([])
               }
            }
        },
        setup() {
            //title, tanggalMulai, tanggalBerakhir, status
            const data = ref([])
            const setValueData = res => {
                data.value = res
            }
            const setData = res => {
                data.value.push({...res, id: data.value.length})
            }
            const deleteData = id => {
                const newData = data.value.filter(item => item.id != id)
                data.value = newData
            }
            const selesai = id => {
                const newData = data.value.map(item => {
                    const obj = {...item}
                    if(item.id == id) {
                        obj.status = true
                    }
                    return obj
                })
                data.value = newData
            }
            return {data, setData, deleteData, selesai, setValueData}
            
        },
        methods: {
           async getDataAPI() {
                  const username = Cookies.get("username")
                  const formData = new FormData()
                  formData.append("username", username)
                  const result = await instance().post("/getData", formData)
                  this.setValueData(result.data.data)
             },
            setIsLogin(res) {
               this.isLogin = res
            }
        },
        components: {
            NavBar,
            AccountTodo,
            NavbarHP,
            ComponentCard
        },
    }
</script>

<template>
        <NavBar />
    
        <div class="LandingPage">
            <AccountTodo @setIsLogin="setIsLogin" />
            <NavbarHP @setData="setData"  />
            <ComponentCard :data="data" @deleteData="deleteData" @selesai="selesai" />
        </div>
    
</template>
