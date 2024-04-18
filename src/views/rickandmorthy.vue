<template lang="">
    <div>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-6" v-for="(item) in arrayResultados">
                    <div class="card m-2">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img :src="item.image" alt="" width="100%">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{{item.name}}</h5>
                                <P class="card-text">
                                    <b class="text-success">{{item.status}}</b>
                                    -
                                    <b>{{item.species}}</b>
                                </P>                                
                                <div class="text-right">
                                    <button @click="vermas( item.id )" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Ver mas</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="col-12 d-flex justify-content-center">
                    <nav aria-label="...">
                        <ul class="pagination pagination-sm">
                          <li class="page-item" :class="{'disabled' : paginacion.prev == false}">
                            <button type="button" class="page-link" aria-label="Previous" @click="anterior">      
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                          </li>
                          <li class="page-item" v-for="count in paginacion.pages">
                            <button type="button" class="page-link" @click="pagina(count)">{{count}}</button>
                        </li>
                          
                        <li class="page-item">      
                            <button type="button" class="page-link" aria-label="Next" @click="siguiente">        
                                <span aria-hidden="true">&raquo;</span>      
                            </button>    
                        </li>
                        </ul>
                      </nav>
                </div>
            <!-- Button trigger modal -->
            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-if="Object.keys(personaje).length > 0">
                    <div class="text-center">
                        <img :src="personaje.image" width="100%" class="rounded-circle" :class="(personaje.status == 'Alive') ? 'border border-success' : 'border border-danger'"><br>
                        <span class="badge badge-pill" :class="(personaje.status == 'Alive') ? 'bg-success' : 'bg-danger'">{{personaje.status}}</span><br>
                            {{personaje.name}}
                        </div>
                        <div class="d-flex flex-column">
                            -
                            <br>
                            <div class="d-flex justify-content-between m-1">
                                <span class="badge bg-primary">GENERO</span>
                                <span>{{ personaje.gender }}</span>
                            </div>
                            <div class="d-flex justify-content-between m-1">
                                <span class="badge bg-primary">ESPECIE</span>
                                <span>{{ personaje.species }}</span>
                            </div>
                            <div class="d-flex justify-content-between m-1">
                                <span class="badge bg-primary">ESTADO</span>
                                <span>{{ personaje.status }}</span>
                            </div>
                            <div class="d-flex justify-content-between m-1">
                                <span class="badge bg-primary">ORIGEN</span>
                                <span>{{ personaje.origin.name }}</span>
                            </div>
                            <div class="d-flex justify-content-between m-1">
                                <span class="badge bg-primary">LOCACION</span>
                                <span>{{ personaje.location.name }}</span>
                            </div>
                            -
                        </div>
                    </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>
</div>
</template>
<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
export default {
    setup() {
        const arrayResultados = ref([]);
        const personaje = ref({});
        const paginacion = ref({});
        let urlAPI = "https://rickandmortyapi.com/api/character/";
        let urlDetalle = "https://rickandmortyapi.com/api/character/";
        onMounted(() => {
            cargarDatos();
        });

        const cargarDatos = async () => {
            axios.get(urlAPI).then(respuesta => {
                //console.log(respuesta.data);
                arrayResultados.value = respuesta.data.results;
                paginacion.value = respuesta.data.info;
                //console.log(respuesta.data.info);

            });
        };
        const vermas = (id) => {
            //alert('ver mas:' + id);
            axios.get(urlDetalle + id)
            .then(respuesta => {
                console.log(respuesta.data); 
                personaje.value = respuesta.data;
                //$('#staticBackdrop').modal('show');
            })
        };
        const pagina = (param)=>{
            //alert(param);
            urlAPI = urlDetalle +'?page=' + param;
            cargarDatos();
        }
        const siguiente = () =>{
                    if(paginacion.value.next != null){
                        urlAPI =paginacion.value.next;
                        cargarDatos();
                    }
                }
                const anterior = ()=> {
                    if(paginacion.value.prev != null){
                        urlAPI =paginacion.value.prev;
                        cargarDatos();
                    }
                }
        return {
            cargarDatos,
            arrayResultados,
            vermas,
            personaje,
            paginacion,
            siguiente,
            anterior,
            pagina
        }
    }
}
</script>
<style lang="">

</style>