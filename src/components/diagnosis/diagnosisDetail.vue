<template>
  <div class="container mt-4">
    <a @click="router.back()" class="col-1 icon-arrow" title="Return"
      ><i class="bi-arrow-left-square-fill"> </i
    ></a>
    <div class="card card-title">{{ title }}</div>
    <ul v-for="diag in diagnosis.values" :key="diag['diagnosis_id']">
      <li>Test:{{ '  ' + diag['test'] }}</li>
      <li>Paciente:{{ '  ' + diag['patient'] }}</li>
      <li>Sex:{{ '  ' + diag['sex'] }}</li>
      <li>Pi:{{ '  ' + diag['pi'] }}</li>
      <li>P1:{{ '  ' + diag['p1'] }}</li>
      <li>P2:{{ '  ' + diag['p2'] }}</li>
      <li>P3:{{ '  ' + diag['p3'] }}</li>
      <li>Pf:{{ '  ' + diag['pf'] }}</li>
      <li>Ideal:{{ '  ' + diag['ideal'] }}</li>
      <li>Result:{{ '  ' + diag['result'] }}</li>
      <li>Interpretacion:{{ '  ' + diag['interpretation'] }}</li>
      <li>Condition:{{ '  ' + diag['condition'] }}</li>
      <li>Observation:{{ '  ' + diag['observation'] }}</li>
      <li>Created:{{ '  ' + new Date(diag['created']).toLocaleString('pe-PE') }}</li>
      <li v-if="diag['updated'] === null">Updated:{{ '  ' + diag['updated'] }}</li>
      <li v-else>Updated:{{ '  ' + new Date(diag['updated']).toLocaleString('pe-PE') }}</li>
      <div>
        <div class="card card-title">Receta y/o recomendación</div>
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-sm btn-save mt-2"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Editar
        </button>
        <!-- Modal -->
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar tratamiento</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="_editTreatment" @keyup="_validData">
                  <!--treatment-->
                  <div class="col-auto">
                    <textarea
                      v-model="dataObject.treatment"
                      type="textarea"
                      class="form-control input-size"
                      id="observation"
                      placeholder=""
                    />
                    <small>{{
                      dataObject.treatment.length + ' ' + 'de' + ' ' + 2083 + ' ' + 'caracteres'
                    }}</small>
                    <small
                      v-if="
                        fields.validateTreatment === '' || fields.validateTreatment === 'Opcional'
                      "
                      class="text-alert-optional"
                    >
                      {{ fields.validateTreatment }}
                    </small>
                    <small v-else class="text-alert-error">{{ fields.validateTreatment }}</small>
                  </div>
                  <div class="modal-footer">
                    <button type="submit" class="btn btn-save m-2">Actualizar</button>
                    <a href="" class="btn btn-light">Cancelar</a>
                  </div>
                </form>
                <p v-if="message.success.length > 0" class="alert alert-success mt-2" role="alert">
                  <i class="bi-check-circle-fill m-1"></i>{{ message.success }}
                </p>
                <p v-if="message.warning.length > 0" class="alert alert-warning mt-2" role="alert">
                  <i class="bi-exclamation-triangle-fill m-1"></i>{{ message.warning }}
                </p>
                <p v-if="message.err.length > 0" class="alert alert-danger mt-2">
                  <i class="bi-exclamation-triangle-fill m-1"></i>{{ message.err }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="container mt-4">{{ '  ' + diag['treatment'] }}</div>
      </div>
    </ul>
  </div>
  <!--Pagination-->
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import type { _diagnosis } from '../../interfaces/interface'
import { useRoute } from 'vue-router'
import { editDiagnosis, getDiag, getDiagnosis } from '@/data/diagnosis'
import router from '@/router'
import { fieldTreatment } from '@/validation/diagnosis'

defineProps({
  title: { type: String, default: 'Diagnosis Details' }
})
const route: any = useRoute()
//list
const diagnosis: Array<_diagnosis> = reactive([])

onMounted(async () => {
  //const diagnosisData = await getDiagnosis();
  const diagnosisOneData = await getDiag(route.params.id)
  if (diagnosisOneData?.statusText == 'OK') {
    diagnosis.values = diagnosisOneData?.data.results
    dataObject.treatment = diagnosisOneData?.data.results[0].treatment

    //fill fields diagnosis
    dataObject.patient = diagnosisOneData?.data.results[0]['patient']
    dataObject.sex = diagnosisOneData?.data.results[0]['sex'] === 'M' ? 'M' : 'F'
    dataObject.test = diagnosisOneData?.data.results[0]['test']
    dataObject.result = diagnosisOneData?.data.results[0]['result']
    dataObject.treatment = diagnosisOneData?.data.results[0]['treatment']
    dataObject.condition =
      diagnosisOneData?.data.results[0]['condition'] === 'activo' ? 'activo' : 'inactivo'
    dataObject.observation = diagnosisOneData?.data.results[0]['observation']
  }
})
//Original data
const dataObject = reactive({
  patient: '',
  sex: 'F',
  test: 'LDH/DHL',
  result: '0.0',
  treatment: '',
  condition: 'activo',
  observation: ''
})
//Data to validate
const fields = reactive({
  validateTreatment: ''
})
//server or catch messages
const message = reactive({
  success: '',
  warning: '',
  err: ''
})
const _validData = async () => {
  fields.validateTreatment = await fieldTreatment(dataObject.treatment)
}
const _editTreatment = async () => {
  try {
    let res = await editDiagnosis(route.params.id, dataObject)
    if (res?.statusText === 'Created') {
      message.success = res.data.Message
      message.err = ''
      location.replace('/diagnosis/detail/' + route.params.id)
    } else {
      console.log('no hubo cambios')
      message.warning = 'Modifique algo o presione cancelar'
    }
  } catch (error: any | undefined) {
    message.success = ''
    message.err = error.response
    console.log(error.response)
  }
}
</script>

<style></style>
