<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Formulario de registro</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-md-6">
                                <div class="form-group">
                                    <label for="nombre">Nombre(s) <small class="text-danger">*</small></label>
                                    <input type="text" id="nombre" v-model="proveedor.nombre" class="form-control" placeholder="Escriba.." :class="{'border-danger':errores.nombre}">
                                    <small class="text-danger" v-show="errores.nombre">{{ errores.nombre }}</small>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="form-group">
                                    <label for="apellido">Apellido(s)</label>
                                    <input type="text" id="apellido" v-model="proveedor.apellido" class="form-control"
                                        placeholder="Escriba..">
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="form-group">
                                    <label for="identificacion">Identificacion <small class="text-danger">*</small></label>
                                    <input type="text" id="identificacion" v-model="proveedor.identificacion" class="form-control" placeholder="Escriba.." :class="{'border-danger':errores.identificacion}">
                                </div>
                                    <small class="text-danger" v-show="errores.identificacion">{{ errores.identificacion }}</small>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="form-group">
                                    <label for="contacto">Contacto <small class="text-danger">*</small></label>
                                    <input type="text" id="contacto" v-model="proveedor.contacto" class="form-control" placeholder="Escriba.." :class="{'border-danger':errores.contacto}">
                                    <small class="text-danger" v-show="errores.contacto">{{ errores.contacto }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-end bg-dark">
                        <button type="button" class="btn btn-danger" @click="cancelar">Cancelar</button>
                        <button class="btn btn-success" @click="guardar">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup() {
        const proveedor = ref({
            nombre: '',
            apellido: '',
            identificacion: '',
            contacto: ''
        });
        const router = useRouter();
        let token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        };
        const idProovedor = router.currentRoute.value.params.idProovedor;
        let urlBase = 'https://api.repuestosangel.net/api/';
        const errores = ref({});

        onMounted(() => {
            if (token == null) {
                router.push({ path: '/login' });
            } 
            if(idProovedor != null || idProovedor != undefined ){
                editarProovedor();
            }
        });

        const guardar = async () => {
            try {
                if(idProovedor != null || idProovedor != undefined ){
                    const { data } = await axios.put(urlBase + 'proveedores', proveedor.value, { headers });
                }else{
                    const { data } = await axios.post(urlBase + 'proveedores', proveedor.value, { headers });
                }                
                router.push({ path: '/proveedores' });
            } catch (error) {
                if(error.response.status == 422){
                    errores.value = error.response.data.errors;
                }else{
                    alert('¿Contacte con el soporte de sistemas, Gracias');
                }
                console.log(error);
            }
        };
        const editarProovedor = async () => {
            try{
                const {data} =  await axios.get(urlBase + 'proovedores/' + idProovedor, {headers});
                proveedor.value = data.datos;
            }catch(error){
                console.log(error)
            }
        }

        const cancelar = () => {
            router.push({ path: '/proveedores' });
        }
        return {
            proveedor,
            guardar,
            cancelar,
            errores,
            editarProovedor
        }
    }
}
</script>
<style></style>