<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">
                            <i class="fas fa-clipboard-list"></i> Productos
                        </h4>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Codigo</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(items, indice) in producto" :key="indice">
                                        <td>{{ indice + 1 }}</td>
                                        <td>{{ items.codigo }}</td>
                                        <td>{{ items.nombre }}</td>
                                        <td>{{ items.precio_venta }}</td>
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-group" @click="verProd(items.id)">
                                                    <i class="fas fa-cart-plus"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-12 d-flex justify-content-center">
                    <nav aria-label="...">
                        <ul class="pagination">
                            <li class="page-item" :class="{ disabled: paginacion.prev == false }">
                                <button type="button" class="page-link" @click="anteriorPagina">
                                    Previous
                                </button>
                            </li>

                            <li class="page-item" :class="{ disabled: paginacion.next == false }">
                                <button type="button" class="page-link" @click="siguientePagina">
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title"><i class="fas fa-cart-plus">Carrito</i></h4>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, indice) in carrito" :key="item.id">
                                        <td>{{ indice + 1 }}</td>
                                        <td>{{ item.nombre }}</td>
                                        <td>{{ item.precio_unitario }}</td>
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-danger btn-sm"
                                                    @click="reducirCantidad(indice)">
                                                    ➖
                                                </button>
                                                <button type="button" class="btn btn-outline-primary btn-sm">
                                                    {{ item.cantidad }}
                                                </button>
                                                <button type="button" class="btn btn-success btn-sm"
                                                    @click="incrementarCantidad(indice)">
                                                    ➕
                                                </button>
                                            </div>
                                        </td>
                                        <td>{{ item.precio_total }}</td>
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-group" @click="eliCart(indice)">
                                                    <i class="fas fa-ban"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>TOTAL</th>
                                        <th>{{ total }}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div class="card-footer text-right">
                        <button type="button" class="btn btn-danger text-white" @click="cancelar()">Candelar</button>
                        <button type="button" class="btn btn-warning text-white" @click="terminarProceso">
                            Terminar Proceso
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import router from "@/router";
export default {
    setup() {
        const datos = ref({
            codigo: "",
            nombre: "",
            descripcion: "",
            precio_venta: "",
        });
        let urlBase = "https://api.repuestosangel.net/api/";
        const idProd = ref(null);
        const total = ref(null);
        const usuer = {
            username: "spiritviking@gmil.com",
            password: "123654789",
        };
        const carrito = ref([]);
        const basicAuth = btoa(usuer.username + ":" + usuer.password);
        const headers = {
            "Content-Tipe": "aplication/json",
            Accept: "aplication/json",
            Authorization: "Basic " + basicAuth,
        };
        const producto = ref([]);
        const paginacion = ref({
            pagina: 1,
            next: true,
            prev: false,
            last_page: null,
        });
        onMounted(() => {
            listar();
        });
        const listar = async () => {
            try {
                const {
                    data: { datos },
                } = await axios.get(
                    urlBase + "productos-activos?page=" + paginacion.value.pagina,
                    { headers }
                );
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
                if (localStorage.getItem("carrito")) {
                    carrito.value = JSON.parse(localStorage.getItem("carrito"));
                    sumaTotal();
                }
            } catch (error) {
                console.log(error);
            }
        };
        const verProd = async (param) => {
            try {
                const { data } = await axios.get(urlBase + "productos/" + param, {
                    headers,
                });
                idProd.value = param;
                if (!EvalProd(data.datos.id)) {
                    carrito.value.push({
                        producto_id: data.datos.id,
                        nombre: data.datos.nombre,
                        precio_unitario: data.datos.precio_venta,
                        cantidad: 1,
                        precio_total: data.datos.precio_venta,
                    });
                    localStorage.setItem("carrito", JSON.stringify(carrito.value));
                    sumaTotal();
                } else {
                    alert("El producto ya se encuentra registrado");
                }
            } catch (error) {
                console.log(error);
            }
        };
        const EvalProd = (parametro) => {
            let existe = false;
            carrito.value.forEach((element) => {
                if (element.producto_id === parametro) {
                    existe = true;
                }
            });
            return existe;
        };
        const sumaTotal = () => {
            total.value = 0;
            if (carrito.value.length > 0) {
                carrito.value.forEach((item) => {
                    total.value += parseFloat(item.precio_total);
                    total.value = total.value
                })
            }
        };
        const eliCart = (param) => {
            const confirmacion = confirm("eliminara este producto");
            if (confirmacion) {
                carrito.value.splice(param, 1);
                if (carrito.value.length > 0) {
                    localStorage.setItem('carrito', JSON.stringify(carrito.value));
                } else {
                    localStorage.removeItem('carrito')
                }
                sumaTotal();
            }
        };
        const incrementarCantidad = (param) => {
            carrito.value[param].cantidad++;
            carrito.value[param].precio_total = (carrito.value[param].cantidad * carrito.value[param].precio_unitario).toFixed(2);
            localStorage.setItem('carrito', JSON.stringify(carrito.value));
            sumaTotal();
        };

        const reducirCantidad = (param) => {
            if (carrito.value[param].cantidad > 1) {
                carrito.value[param].cantidad--;
                carrito.value[param].precio_total = (carrito.value[param].cantidad * carrito.value[param].precio_unitario).toFixed(2);
                localStorage.setItem('carrito', JSON.stringify(carrito.value));
                sumaTotal();
            }
        };

        const terminarProceso = () => {
            if (carrito.value.length > 0) {
                let informacion = {
                    total: total.value,
                    detalle: carrito.value
                };
                const confirmacion = confirm("¿Está seguro de Finalizar la VENTA?");
                if (confirmacion) {
                    try {
                        const respuesta = axios.post(urlBase + 'ventas', informacion, { headers });
                        localStorage.removeItem('carrito');
                        cancelar();
                    } catch (error) {
                        console.log(error);
                    }
                }
            } else {
                alert("Debe agregar al menos 1 producto a la tabla carrito, Gracias");
            }
        };

        const cancelar = () => {
            router.push({ path: '/product' });
        }


        return {
            listar,
            datos,
            producto,
            paginacion,
            verProd,
            carrito,
            total,
            sumaTotal,
            eliCart,
            incrementarCantidad,
            reducirCantidad,
            terminarProceso,
            cancelar
        }
    }
}
</script>
<style></style>