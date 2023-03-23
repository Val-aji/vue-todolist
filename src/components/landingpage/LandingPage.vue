<script>
    import "./index.css"
    import NavBar from "../models/navigasi/NavBar.vue";
    import AccountTodo from "../models/account/AccountTodo.vue";
    import NavbarHP from "./NavbarHp.vue";
    import ComponentCard from "../models/card/ComponentCard.vue";
    import {optionAxios, urlAPI} from "../../../config/instance.js"
    import Cookies from "js-cookie"
    import axios from "axios";

    export default {
        name: "LandingPage",
        data() {
           return {
               isLogin: false,
               posisi: "antrian",
               data: [],
               listData: []
           }
        },

        watch: {
            isLogin(res) {
               if(res) {
                  this.getDataAPI()
               } 
            },
            data(newData) {
                this.listData = newData.slice().reverse().filter(item => !item.status)
            },
            posisi(resNew) {
                
                let value;
                if(resNew === "proses") {
                    value = false
                } else {
                    value = true
                }

                const newData = this.data.slice().filter(item => item.status === value)
                this.listData = newData
            }
        },
        methods: {
           async getDataAPI() {
                  const username = Cookies.get("username")
                  const formData = new FormData()
                  formData.append("username", username)

                  const result = await axios.post(urlAPI+"/getData", formData, optionAxios())

                  this.data = result.data.data
             },
            setData(res) {
                const newData = this.data.slice()
                newData.push({...res, id: this.data.length})

                this.data = newData.slice()
            },
            async eventData(event, id) {
                const newData = this.data.slice()

                if(!optionAxios()) {
                    if(event === "delete") {
                        const result = newData.filter(item => {
                            return item.id !== id
                        })

                        this.data = result
                    } else if(event === "selesai") {
                        newData.map(item => {
                            if(item.id == id) {
                                item.status = true
                            }
                            return item
                        })

                        this.data = newData
                    }
                } else {
                    try {
                        const username = Cookies.get("username")

                        const formData = new FormData()
                        formData.append("username", username)
                        formData.append("id", id)

                        if(!username || !id) {
                            return false
                        }

                        if(event === "delete") {
                            try {
                                await axios.post(urlAPI+"/todolist/delete", formData, optionAxios())    
                            } catch (error) {
                                console.log({error})
                                alert("Delete Data Invalid")
                                return false
                            }

                        } else if(event === "selesai") {
                            try {
                                await axios.post(urlAPI+"/selesai", formData, optionAxios())
                            } catch (error) {
                                console.log({error})
                                alert("error in server")
                                return false
                            }
                        }
                        
                        this.setIsLogin(false)
                        setTimeout(() => {
                            this.setIsLogin(true)
                        }, 100)
                    } catch (error) {
                        
                    }
                }
                
                
            },
            setIsLogin(res) {
               this.isLogin = res
            },
            setPosisi(res) {
                this.posisi = res
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
        <NavBar @setPosisi="setPosisi"/>
    
        <div class="LandingPage">
            <AccountTodo @setIsLogin="setIsLogin"  @setData="setData"/>
            <NavbarHP @setData="setData"  @setPosisi="setPosisi" @setIsLogin="setIsLogin"/>
            <ComponentCard :data="listData" @eventData="eventData"/>
        </div>
    
</template>
