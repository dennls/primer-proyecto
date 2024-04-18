<template>
    <div class="paginaLogin">
        <div class="contenedorLogin" id="container" :class="{ 'active': contenedor }">
            <div class="form-container sign-up">
                <form action="#">
                    <h1>Create Account</h1>
                    <div class="social-icons">
                        <a href="#" class="icon"><i class='bx bxl-facebook'></i></a>
                        <a href="#" class="icon"><i class='bx bxl-google'></i></a>
                        <a href="#" class="icon"><i class='bx bxl-linkedin'></i></a>
                        <a href="#" class="icon"><i class='bx bxl-github'></i></a>
                    </div>
                    <samp>or use your email for registration</samp>
                    <input type="text" placeholder="Name" v-model="registro.name">
                    <input type="email" placeholder="Email" v-model="registro.email">
                    <input type="password" placeholder="Password" v-model="registro.password">
                    <input type="password" placeholder="Password confirmation" v-model="registro.password_confirmation">
                    <button type="button" @click="nuevoRegistro()">registrar</button>
                </form>
            </div>
            <div class="form-container sign-in">
                <form action="#">
                    <h1>Sign In</h1>
                    <div class="social-icons">
                        <a href="#" class="icon"><i class='bx bxl-facebook'></i></a>
                        <a href="#" class="icon"><i class='bx bxl-google'></i></a>
                        <a href="#" class="icon"><i class='bx bxl-linkedin'></i></a>
                        <a href="#" class="icon"><i class='bx bxl-github'></i></a>
                    </div>
                    <samp>or use your email Password</samp>
                    <input type="email" placeholder="Email" v-model="inicio.email">
                    <input type="password" placeholder="Password" v-model="inicio.password">
                    <a href="#" class="fp">Forget password?</a>
                    <button type="button" @click="iniciarSecion()">Sign In</button>
                    <button type="button" @click="cerrarSecion()">Log out</button>
                </form>
            </div>
            <div class="toggle-container">
                <div class="toggle">
                    <div class="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button class="hidden" id="login" @click="contenedor = false">Sign In</button>
                    </div>
                    <div class="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button class="hidden" id="register" @click="contenedor = true">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
export default {
    setup() {
        const router = useRoute();
        const contenedor = ref(false);
        const registro = ref({
            name: '',
            email: '',
            password: '',
            password_confiamtion: ''
        });
        const inicio = ref({
            email: '',
            password: ''
        })
        let urlBase = 'https://api.repuestosangel.net/api/';

        //verificar si existe el usuario y el token en el local storage
        onMounted(() => {
            let usuario = localStorage.getItem('usuario');
            let token = localStorage.getItem('token');
            if(usuario != null && token != null){
                router.push('/home')
            }
        });
        const nuevoRegistro = async () => {
            if (registro.value.name != '' && registro.value.email != '' && registro.value.password != '' && registro.value.password_confiamtion != '') {
                try {
                    const { data } = await axios.post(urlBase + 'usuario', registro.value);
                    registro.value = {
                        name: '',
                        email: '',
                        password: '',
                        password_confiamtion: ''
                    };
                    contenedor = false;
                } catch (error) {
                    console.log(error);
                }
            } else {
                alert('Revise los datos')
            }

        };
        const iniciarSecion = async () => {
            try {
                let access_token = null;
                let usuario = null;
                const { data } = await axios.post(urlBase + 'login', inicio.value);
                access_token = data.access_token;
                usuario = data.user;
                localStorage.setItem('token', access_token);
                localStorage.setItem('usuario', JSON.stringify(usuario));

                //verificar usuario y redirecionar a home
                if(usuario == null && access_token == null){
                    router.push('home');
                }

            } catch (error) {
                console.log(error)
            }
        };

        const cerrarSecion = async () => {
            try{
                let token = localStorage.getItem('token');
                let post = {};
                const { data } = await axios.post(urlBase + 'logout', {
                    Authorization
                })
            }catch(error){

            }
        }



        return {
            contenedor,
            registro,
            nuevoRegistro,
            iniciarSecion,
            inicio
        }
    }
}
</script>
<style>
@import '@/assets/style.css';
</style>