<script>
    import "./index.css";
    import { logoTambah } from "../../../assets/logo";
    import { optionAxios, urlAPI } from "../../../../config/instance";
    import Cookies from "js-cookie";
    import axios from "axios";

    export default {
        name: "inputTodo",
        data() {
            return {
                logoTambah,
                title: "",
            }
        },
        props: {
            layarHP: Boolean
        },
        emits: ["setData", "setIsLogin"],
        methods: {
            async tambahData() {
                if(!this.title) {
                    return false
                }
                
                const username = Cookies.get("username")
                if(!optionAxios || !username) {

                    const tanggalMulai = new Date().toLocaleString("ID-id", {timezone: "asia/jakarta"})
                    const obj = {
                        title: this.title,
                        status: false,
                        tanggalMulai,
                        tanggalBerakhir: null
                    }

                    this.$emit("setData", obj)
                } else {
                    const formData = new FormData()
                    formData.append("username", username)
                    formData.append("title", this.title)

                    try {
                        await axios.post(urlAPI+"/todolist", formData, optionAxios())

                        this.$emit("setIsLogin", false)
                        setTimeout(() => {
                            this.$emit("setIsLogin", true)
                        }, 100)
                    } catch (error) {
                        console.log({error})
                    }
                    
                }
                this.title = ""
            }
        }
    }
</script>

<template>
    <div class="inputTodo" :class="layarHP ? 'flex sm:hidden' : ''">
        <input type="text" class="inputUser INTER" placeholder="add your actvity ...." v-model.trim()="title">
        <button @click="tambahData" v-html="logoTambah" class="logoTambah" @class="tambahData"></button>
    </div>
</template>
