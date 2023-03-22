<script>
    import {ref} from "vue";
    import InputTodo from "../models/inputTodo/InputTodo.vue";

    export default {
        name:"NavbarHP",
        data() {
            return {
                navbarHP: [
                    {id: 0, name: "proses", status: true},
                    {id: 1, name: "selesai", status: false}
                ],
                posisi: "proses"
            }
        },
        components: {
            InputTodo
        },
        beforeMount() {
            this.$emit("setPosisi", this.posisi)
        },
        emits: [ "setData", "setPosisi"],
        methods: {
            setStatus(index) {
                const newNav = this.navbarHP.slice().map(item => {
                    const obj = {...item}
                    if(item.id === index) {
                        obj.status = true
                        this.posisi = obj.name
                    } else {
                        obj.status = false
                    }
                    return obj
                })
                this.$emit("setPosisi", this.posisi)
                this.navbarHP = newNav
            },
            setData(res) {
                this.$emit("setData", res)
            },
            
        }
    }

</script>

<template>
    <div class="block sm:hidden">
        <div class="navbarHP w-full">
            <div class="containerNavbarHP flex w-full justify-center mt-[1vh]">
                <button 
                    v-for="item in navbarHP"
                    :key="item.id"
                    class="text-dark dark:text-light   w-1/2 py-[1vh] pb-[2vh] border-dark dark:border-light "
                    :class="item.status ? 'border-b' : ''"
                    @click="() => {
                        setStatus(item.id)
                    }"
                >
                    {{ item.name }}
                </button>
                
            </div>
        </div>
        <InputTodo class="w-5/6 flex sm:hidden' : ''" @setData="(res) => $emit('setData', res)" />
    </div>
    

</template>
