<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/about">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/rickandmorthy">Api morty</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Sistema ventas
                            </a>
                            <ul class="dropdown-menu">
                                <li><router-link class="dropdown-item" to="/productos">Producto</router-link></li>
                                <li><router-link class="dropdown-item" to="/ventas">Ventas</router-link></li>
                                <li><router-link class="dropdown-item" to="/carrito">Carrito</router-link></li>
                                <li><router-link class="dropdown-item" to="/clientes">Clientes</router-link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <form class="form-inline my-2 my-lg-0">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <img :src="usuario.foto_perfil != null ? urlBase + 'imagenes/' + usuario.foto_perfil : 'https://ui-avatars.com/api/?background=cef2ef&color=00685f&name=' + usuario.name"
                                    style="width: 30px; height: 30px;" class="rounded-circle border border-dark" alt="">
                                {{ usuario.name }}
                            </a>
                            <ul class="dropdown-menu">
                                <li><router-link class="dropdown-item" to="/perfil">Perfil</router-link></li>
                                <li><button type="button" class="dropdown-item" @click="cerrarSesion">Salir</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </form>
            </div>
        </nav>
        <router-view />
    </div>

</template>
<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup() {
        const usuario = ref({});
        const router = useRouter()
        const urlBase = ref("https://api.repuestosangel.net/");
        let token = null;
        onMounted(() => {
            // verificar si existe usuario y token en el localStorage
            let usuarioStorage = localStorage.getItem("usuario");
            token = localStorage.getItem("token");
            if (usuarioStorage == null && token == null) {
                router.push("/login");
            }
            usuario.value = JSON.parse(usuarioStorage);
        })
        const cerrarSesion = async () => {
            try{
                let post = {};
                let cabecera = {
                    Authorization: "Bearer " + token,
                };
                const { data } =  await axios.post(urlBase.value+'api/logout', post, { headers: cabecera });
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
                router.push("/login");
            }catch(error){
                console.log(error);
            }
        }
        return {
            usuario,
            urlBase,
            cerrarSesion,
        }
    }
}
</script>
<style></style>