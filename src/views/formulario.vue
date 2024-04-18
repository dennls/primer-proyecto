<template>
    <div class="container mt-5">
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Nuevo Registro</h4>
                    <div class="form-goup">
                        <div class="row mb-3">
                            <label for="codigo" class="col-sm-2 col-form-label">Codigo</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="codigo" v-model="datos.codigo"
                                    :class="{ 'border-danger': detectados.codigo }">
                            </div>

                        </div>
                        <div class="row mb-3">
                            <label for="nombre" class="col-sm-2 col-form-label">Producto</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="nombre" v-model="datos.nombre"
                                    :class="{ 'border-danger': detectados.nombre }">
                            </div>

                        </div>
                        <div class="row mb-3">
                            <label for="precio" class="col-sm-2 col-form-label">Precio</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="precio" placeholder=""
                                    v-model="datos.precio_venta"
                                    :class="{ 'border-danger': detectados.precio_venta }"><small class="text-danger"
                                    v-show="detectados.precio_venta"></small>
                            </div>

                        </div>
                        <div class="row mb-3">
                            <label for="descripcion" class="col-sm-2 col-form-label">Descripcion</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" name="descripcion" id="descripcion" cols="3" rows="3"
                                    v-model="datos.descripcion"></textarea>
                            </div>

                        </div>
                        <div class="card-footer text-end">
                            <button type="button" class="btn btn-dark" @click="cancelar()">Candelar</button>
                            <button type="button" class="btn btn-primary" @click="guardarProd()">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import router from '@/router';
export default {
    setup() {
        const router = useRouter();
        const datos = ref({
            codigo: '',
            nombre: '',
            descripcion: '',
            precio_venta: '',
        });
        const usuer = {
            username: 'spiritviking@gmil.com',
            password: '123654789',
        };
        const basicAuth = btoa(usuer.username + ':' + usuer.password);
        const headers = {
            'Content-Tipe': 'aplication/json',
            'Accept': 'aplication/json',
            'Authorization': 'Basic ' + basicAuth
        };
        let urlBase = 'https://api.repuestosangel.net/api/';
        const producto = ref({
            nombre: '',
            codigo: '',
            descripcion: '',
            precio_venta: '',
        });
        const detectados = ref({});
        let productId = router.currentRoute.value.params.idProd;
        onMounted(() => {
            if (productId != '') {
                editProd();
            }
        })

        const cancelar = () => {
            router.push({ path: '/product' });
        }

        const guardarProd = async () => {
            detectados.value = {};
            try {
                const { data } = await axios.post(urlBase + 'productos', datos.value, { headers });
                cancelar();
            } catch (error) {
                if (error.response.status == 422) {
                    detectados.value = error.response.data.errors;
                } else {
                    alert("Contacte con el soporte de sistemas, Gracias");
                }
            }
        };
        const editProd = async () => {
            detectados.value = {};
            try {
                const { data } = await axios.get(urlBase + 'productos/' + productId, { headers });
                console.log(data)
                datos.value = {
                    codigo: data.datos.codigo,
                    nombre: data.datos.nombre,
                    descripcion: data.datos.descripcion,
                    precio_venta: data.datos.precio_venta,

                }
            } catch (error) {
                console.log(error);
            }
        };

        return {
            guardarProd,
            detectados,
            cancelar,
            datos,
            editProd

        }
    }
}
</script>
<style lang="">

</style>