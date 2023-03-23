<script>
    import "./index.css"
    import RegisterToDo from "./register/RegisterToDo.vue";
    import LoginToDo from "./login/LoginToDo.vue"
    import InputTodo from "../inputTodo/InputTodo.vue";
    import { cekLogin, optionAxios, urlAPI } from "../../../../config/instance";
    import Cookies from "js-cookie";
    import axios from "axios";

    export default {
        name: "AccountTodo",
        data() {
            return {
                isLogin: false,
                posisi: "account",
                namaLengkap: "Guest",
                bio: "Bot Computer",
                isUbah: false
            }

        },
        watch: {
           isLogin(res) {
              this.$emit("setIsLogin", res)
           }
        },
        emits: ["setIsLogin", "setData"],
        async created() {
            try {
                const result = await cekLogin()
                if(result && result.data.status === 200) {
                    const {namaLengkap, bio} = result.data.data
                    this.isLogin = true
                    this.namaLengkap = namaLengkap
                    this.bio = bio || ""
                } 
            } catch (error) {
                this.isLogin = false
                console.log({error})
            }
        },
        components: {
            RegisterToDo,
            LoginToDo,
            InputTodo
        },
        methods: {  
            setIsLogin(res) {
                this.isLogin = res
            },
            setPosisi(res) {
                this.posisi = res
            },
            handleLogout() {
                Cookies.remove("username")
                Cookies.remove("token")
                location.reload()
            },
            async ubahData() {
                this.isUbah = !this.isUbah

                const {isUbah} = this
                if(!isUbah) {
                    try {
                        const username = Cookies.get("username")
                        const {namaLengkap, bio} = this

                        if(bio.length > 20) {
                            alert("Bio maksimal 20 karakter")
                            alert("change data gagal!")
                            location.reload()
                            return false
                        } else if(namaLengkap.length > 50){
                            alert("Nama Lengkap maksimal 50 karakter")
                            alert("change data gagal!")
                            location.reload()
                            return false
                        }
                        const formData = new FormData()
                        formData.append("username", username)
                        formData.append("namaLengkap", namaLengkap)
                        formData.append("bio", bio)

                        await axios.post(urlAPI+"/client/changeData", formData, optionAxios())
                        
                        alert("change data success")
                    } catch (error) {
                        alert("change data invalid")
                        console.log({error})
                    }
                }
            }
        }
    }

</script>

<template>
    <div class="border-b w-full border-green-500 ">
        <LoginToDo v-if="posisi === 'login'" @setPosisi="setPosisi"  @setIsLogin="setIsLogin"/>

        <RegisterToDo v-else-if="posisi === 'register'" @setPosisi="setPosisi"/>
            
        <div class="containerAccount" v-else>
            <div class="containerInputTodoAccount w-[40%] hidden sm:block mx-auto">
                <InputTodo @setIsLogin="setIsLogin" 
                class="w-full flex  h-max" @setData="(res) => $emit('setData', res)" 
                />
            </div>
            
            <div class="Account" >
                <img 
                    class="gambarProfile" 
                    src="../../../../public/Asset/gambarProfile.png" 
                    alt="my profile"
                >
                
                <div class="identitas">
                    <input type="text" 
                        class="INTER namaProfile bg-inherit border-none outline-none"
                        v-model="namaLengkap"
                        :readonly="!isUbah"
                        :class="isUbah ? 'inputActive' : ''"
                        :placeholder="isUbah ? 'your fullname...' : ''"
                    />   
                    <input type="text" 
                        class="OPENSANS bioProfile w-full  bg-inherit border-none outline-none text-center"
                        v-model="bio"
                        :readonly="!isUbah"
                        :class="isUbah ? 'inputActive' : ''"
                        :placeholder="isUbah ? 'your bio...' : ''"
                    />
                    <div class="tombol w-full">
                        <div class="login" v-if="isLogin">
                            <button 
                                class="POPPINS tombolLogin bg-dark dark:bg-white text-light dark:text-dark mt-4 mb-2"
                                @click="ubahData"
                            >
                                {{(isUbah) ? "save profile" : "ubah profilemu"}}
                                
                            </button>
                            <button 
                                v-if="!isUbah"
                                class="tombolLogin bg-green-500 POPPINS "
                                @click="handleLogout"
                                >  
                                Logout
                            </button>
                        </div>
                        
                        
                        <div 
                            v-if="!isLogin" 
                            class="noLogin"
                        >
                            <button 
                                class="daftar POPPINS bg-dark dark:bg-light dark:text-black text-light"
                                @click="() => setPosisi('register')"
                            >
                                Daftar Baru
                            </button>
                            <button 
                                class="login POPPINS bg-green-500 text-light dark:text-dark "
                                @click="() => setPosisi('login')"
                            >
                                Login
                            </button>
                        </div>
                        
                    </div>       

                </div>
            </div>
        </div>
        
    </div>
    

</template>
