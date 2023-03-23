import axios from "axios"
import Cookies from "js-cookie";

export const urlAPI = "https://backend-vue-todolist.vercel.app"

export const cekLogin = async() => {
    const token = Cookies.get("token")
    const username = Cookies.get("username")
    if(!username || !token ) {
        return false
    }
    const formData = new FormData()
    formData.append("username", username)
    formData.append("token", token)
    
    try {
        const result = await axios.post(`${urlAPI}/client/cekLogin`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        return result
    } catch (error) {
        return false
    }
    
}

export const optionAxios = () => {
    try {
        const token = Cookies.get("token")
        if(!token) return false

        const result = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": token
            }
        }
        return result

    } catch (error) {
        console.log({error})
        return false
    }
}
