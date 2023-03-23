<script>
    import "./index.css";
    import { logoHapus, logoSelesai, logoSelesaiDouble } from "../../../assets/logo";
    import InputTodo from "../inputTodo/InputTodo.vue";
    
    export default {
        name: "ComponentCard",
        data() {
            return {
                logoHapus,
                logoSelesai,
                logoSelesaiDouble,
            }
        },
        emits: ["eventData"],
        props: {
            text: String,
            data: Object,
        },
        components: {
            InputTodo
        },
    }
</script>

<template>
    <div class="ComponentCard">
        <div class="cardTodo w-full flex flex-wrap justify-end">
            <p v-if="data.length === 0" class="POPPINS mx-auto mt-[20vh]">Data tidak ditemukan</p>
            <div v-for="(dat, indexx) of data"
                class="card border border-[2px]" 
                :class="dat.status ? 'border-green-600  dark:border-green-400' : 'border-red-600 dark:border-dark-400'"
                :key="indexx"
            >
                <div class="containerTitle">
                    <p class="title INTER">{{ dat.title }}</p>
                    <p class="tanggal POPPINS w-max">{{dat.tanggalMulai}}</p>
                    <p class="tanggal POPPINS w-full  text-end" v-if="dat.status">{{ dat.tanggalBerakhir }}</p>
                </div>

                <button v-html="logoSelesaiDouble" class="dark:text-green-500 text-green-400" v-if="dat.status"></button>
                <div class="containerTombol" v-else>
                    <button 
                        v-html="logoHapus"
                        class="text-red-700" 
                        @click="() => $emit('eventData', 'delete', dat.id)"
                    >
                    </button>
                    <button 
                        v-html="logoSelesai"
                        class="text-green-700" 
                        @click="() => $emit('eventData', 'selesai', dat.id)"
                    >
                    </button>    
                </div>
                
            </div>
        </div>
    </div>
</template>

