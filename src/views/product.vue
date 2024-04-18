<template>
    <div>
        <div class="container">
            <div class="row">
            <div class="col-md-6 col-sm-6">
                <h1 class="text-left">Agregar producto</h1>
            </div>
            <div class="col-md-6 col-sm-6">
                <!--<button class="btn card1 float-right" data-toggle="modal" data-target="#modalId">Agregar</button>-->
                <button type="button" class="btn btn-primary btn-lg float-right" @click="nuevoRegistro()">Agregar</button>
            </div>
        </div>
            <div class="row">
            <div class="col-12 mt-3">
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead class="table-info">
                                    <tr>
                                        <th>Item</th>
                                        <th>Codigo</th>
                                        <th>Nombre</th>
                                        <th>Precio venta</th>
                                        <th>Descripcion</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(items, indice) in producto" :key="items.idProd">
                                        <td>{{ indice + 1 }}</td>
                                        <td>{{ items.codigo }}</td>
                                        <td>{{ items.nombre }}</td>
                                        <td>{{ items.precio_venta }}</td>
                                        <td>{{ items.descripcion }}</td>
                                        <td><span class="badge" :class="items.estado ? 'bg-success' : 'bg-danger'">{{ items.estado ? 'Activo' : 'Inactivo' }}</span></td>
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-sm" @click="verProd(items.id)"><i class="far fa-edit"></i></button>
                                                <button type="button" class="btn btn-sm" @click="eliminarProd(items.id, 'Inactivar')" v-if="items.estado"><i class="far fa-trash-alt"></i></button>
                                                <button type="button" class="btn btn-sm" @click="eliminarProd(items.id, 'Activar')" v-else><i class="fas fa-check"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 d-flex justify-content-center">
                <nav aria-label="...">
                    <ul class="pagination">
                      <li class="page-item" :class="{ 'disabled': paginacion.prev == false }">
                        <button type="button" class="page-link"  @click="anteriorPagina">Previous</button>
                      </li>
                      
                      <li class="page-item" :class="{ 'disabled': paginacion.next == false }">
                        <button type="button" class="page-link" @click="siguientePagina">Next</button>
                      </li>
                    </ul>
                  </nav>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
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
        const producto = ref([]);
        const detectados = ref({});
        const idProd = ref(null);
        const paginacion = ref({
            pagina: 1,
            next: true,
            prev: false,
            last_page: null
        });

        onMounted(() => {
            listar();
        })
        const listar = async () => {
            try {
                const { data: { datos } } = await axios.get(urlBase + 'productos?page=' + paginacion.value.pagina, { headers });
                producto.value = datos.data;
                //datos.value = data;
                paginacion.value.last_page = datos.last_page;
                if (paginacion.value.last_page == paginacion.value.pagina) {
                    paginacion.value.next = false;
                } else {
                    paginacion.value.next = true;
                }
                if (paginacion.value.pagina == 1) {
                    paginacion.value.prev = false;
                } else {
                    paginacion.value.prev = true;
                }
            } catch (error) {
                console.log(error);
            }
        };
        const siguientePagina = () => {
            if (paginacion.value.last_page > paginacion.value.pagina) {
                paginacion.value.pagina++;
                listar();
            }
        }
        const anteriorPagina = () => {
            if (paginacion.value.pagina > 1) {
                paginacion.value.pagina--;
                listar();
            }
        }
        const nuevoRegistro = () => {
            router.push({ path: '/formulario' });

        };
        const verProd = async (param) => {
            router.push('/formulario/' + param);
            //detectados.value = {};
            /*try {
                const { data } = await axios.get(urlBase + 'productos/' + param, { headers })
                datos.value = {
                    codigo: data.datos.codigo,
                    nombre: data.datos.nombre,
                    descripcion: data.datos.descripcion,
                    precio_venta: data.datos.precio_venta,
                }
                idProd.value = param;
                $('#modelId').modal('show');
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Contacte con el soporte de sistemas, Gracias",
                    icon: "error"
                });
            }*/

        };

        const eliminarProd = async (param, accion) => {

            const confirmacion = confirm('esta seguro de ' + accion + '?');
            if (confirmacion) {
                try {
                    const { data } = await axios.delete(urlBase + 'productos/' + param, { headers });
                    listar();
                } catch (error) {
                    console.log(error)
                }
            }
        };


        return {
            datos,
            listar,
            producto,
            siguientePagina,
            paginacion,
            anteriorPagina,
            nuevoRegistro,
            eliminarProd,
            verProd
        }
    }

}
</script>
<style>

</style>