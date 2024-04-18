<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">
                            <i class="fas fa-clipboard-list"></i> Ventas
                        </h4>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead class="bg-info">
                                    <tr>
                                        <th>Item</th>
                                        <th>Total</th>
                                        <th>Usuario</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, indice) in producto" :key="item.id">
                                        <td>{{ indice + 1 }}</td>
                                        <td>{{ item.total }}</td>
                                        <td>{{ item.usuarios.name }}</td>
                                        <td>
                                            <span class="badge" :class="item.estado ? 'bg-success' : 'bg-danger'">{{
                                                item.estado ? "Activo" : "Inactivo" }}</span>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <nav aria-label="...">
                            <ul class="pagination">
                                <li class="page-item" :class="{'disabled' : paginacion.prev == false}">
                                    <button type="button" class="page-link" @click="anteriorPagina">Anterior</button>
                                </li>
                                <li class="page-item" :class="{'disabled' : paginacion.next == false}">
                                    <button type="button" class="page-link" @click="siguientePagina">Siguiente</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from "vue";
import axios from "axios";
export default {
    setup() {
        const producto = ref([]);
        const usuario = {
            username: 'spiritviking@gmil.com',
            password: '123654789'
        };
        const basicAuth = btoa(usuario.username + ':' + usuario.password);
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + basicAuth
        }
        let urlBase = 'https://api.repuestosangel.net/api/';
        const paginacion = ref({
            pagina: 1,
            next: true,
            prev: false,
            last_page: null
        });
        const detalle = ref({});
        onMounted(() => {
            listar();
        });
        const listar = async () => {
            try {
                const { data: { datos } } = await axios.get(urlBase + 'ventas?page=' + paginacion.value.pagina, { headers });
                producto.value = datos.data;
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
                console.log(error)
            }
        };
        const verDetalle = async (param) => {
            try {
                const { data: { datos } } = await axios.get(urlBase + 'ventas/' + param, { headers });
                detalle.value = datos[0];
            } catch (error) {
                console.log(error)
            }
        }
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
        return {
            detalle,
            producto,
            listar,
            verDetalle,
            siguientePagina,
            anteriorPagina,
            paginacion,
        }
    }

};
</script>
<style></style>