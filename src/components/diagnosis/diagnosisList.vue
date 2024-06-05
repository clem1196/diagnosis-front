<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div class="container-fluid mt-3">
    <!--FORM ADD EDIT, list diagnosis-->
    <div class="row m-1">
      <div class="col-3">
        <!--form-->
        <diagnosisPatientList></diagnosisPatientList>
        <form @submit.prevent="add_edit_Diagnosis" @keyup="_validData">
          <div class="card card-title">
            <!--Title-->
            <div v-if="$route.params.id !== undefined">Editar Diagnosis</div>
            <div v-else-if="$route.params.name !== undefined">Agregar Diagnosis</div>
            <div v-else>Crear Diagnosis</div>
          </div>
          <div class="card card-body">
            <!--patient-->
            <div v-if="$route.params.name === undefined" class="col-auto">
              <label for="patient">Paciente</label>
              <input v-model="dataObject.patient" type="text" class="form-control input-size" id="patient" />
              <small v-if="fields.validatePatient === '' || fields.validatePatient === 'Opcional'"
                class="text-alert-optional">
                {{ fields.validatePatient }}
              </small>
              <small v-else class="text-alert-error">{{ fields.validatePatient }}</small>
            </div>
            <!--Sex-->
            <div v-if="$route.params.name === undefined" class="col-auto">
              <label for="Sex">Género</label>
              <select v-model="dataObject.sex" class="form-select select-size" id="Sex">
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
            </div>

            <!--test-->
            <div class="col-auto">
              <label for="test">Test</label>
              <select v-model="dataObject.test" class="form-select select-size" id="test">
                <option v-if="$route.params.name !== undefined" v-for="t in arrayTest.values" :key="t" :value="t">
                  {{ t }}
                </option>
                <option v-else v-for="te in arrayTest" :key="te" :value="te">
                  {{ te }}
                </option>
              </select>
            </div>
            <!--result-->
            <div class="col-auto">
              <label for="result">Result</label>
              <input @click="_validData" v-model="dataObject.result" type="text" class="form-control input-size"
                id="result" />

              <small v-if="fields.validateResult === '' || fields.validateResult === 'Opcional'"
                class="text-alert-optional">
                {{ fields.validateResult }}
              </small>
              <small v-else class="text-alert-error">{{ fields.validateResult }}</small>
            </div>
            <!--condition-->
            <div v-if="$route.params.id !== undefined" class="col-auto">
              <label for="condition">Condición</label>
              <select v-model="dataObject.condition" class="form-select select-size" id="condition">
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
            <!--observation-->
            <div class="col-auto">
              <label for="observation">Observación</label>
              <textarea v-model="dataObject.observation" type="text" class="form-control input-size" id="observation"
                placeholder="" />
              <small v-if="dataObject.observation !== null && dataObject.observation.length > 2083"
                class="text-alert-error">
                No se aceptan mas caracteres
              </small>
            </div>
          </div>

          <div class="card card-footer">
            <button v-if="$route.params.id !== undefined" type="submit" class="btn btn-save m-2">
              Actualizar
            </button>
            <button v-else-if="$route.params.name !== undefined" type="submit" class="btn btn-save m-2">
              Agregar
            </button>
            <button v-else type="submit" class="btn btn-save m-2">Crear</button>
            <RouterLink v-if="$route.params.name !== undefined" to="/diagnosis" class="btn btn-secondary">Terminar
            </RouterLink>
            <button v-if="$route.params.id !== undefined" @click="returnBack" class="btn btn-light">
              Cancelar
            </button>
            <RouterLink v-if="$route.params.id === undefined" to="/diagnosis" class="btn btn-light">Cancelar
            </RouterLink>
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
      <div class="col-9">
        <p v-if="$route.params.name === undefined && $route.params.id === undefined" class="myp">
          Crea un diagnóstico
        </p>
        <!--Detail for patient-->
        <diagnosisPatientDetail v-if="$route.params.name !== undefined"></diagnosisPatientDetail>
        <diagnosisGraphics v-if="$route.params.name != undefined"></diagnosisGraphics>
      </div>
    </div>
    <!--LIST for details-->
  </div>
</template>
<script setup lang="ts">
//import usersList from './usersList.vue'
import diagnosisGraphics from '@/components/diagnosis/diagnosisGraphics.vue'
import { getDiagnosis, addDiagnosis, editDiagnosis, getDiag } from '@/data/diagnosis'
import diagnosisPatientDetail from '@/components/diagnosis/diagnosisPatientDetail.vue'
import diagnosisPatientList from '@/components/diagnosis/diagnosisPatientList.vue'
import { onMounted, reactive, ref } from 'vue'
import type { _diagnosis } from '@/interfaces/interface'
import { useRoute } from 'vue-router'
import router from '@/router'
import { fieldPatient, fieldResult } from '@/validation/diagnosis'

const route: any = useRoute()
const diagnosisOne: Array<_diagnosis> = reactive([])
let arrayTest = reactive([
  'LDH/DHL',
  'GLUCOSA',
  'COL. TOTAL',
  'TRIGLICERIDOS',
  'UREA',
  'Co2',
  'VCM',
  'RDW ADE IDE',
  'GGTP',
  'TGO AST',
  'TGP ALT',
  'ACIDO URICO',
  'HEMOGLOBINA'
])

onMounted(async () => {
  await _getDiagnosis()
  _validData()
  getDataPages(currentPage.value)
})

//ADD and EDIT
/*======================================================================*/
//Original data
const dataObject = reactive({
  patient: '',
  sex: 'F',
  test: 'LDH/DHL',
  result: '0.0',
  treatment: '0.0',
  condition: 'activo',
  observation: ''
})
//Data to validate
const fields = reactive({
  validatePatient: '',
  validateResult: ''
})
//server or catch messages
const message = reactive({
  success: '',
  warning: '',
  err: ''
})
const _validData = async () => {
  fields.validatePatient = await fieldPatient(dataObject.patient)
  fields.validateResult = await fieldResult(dataObject.result)
}
const add_edit_Diagnosis = async () => {
  try {
    if (route.params.id === undefined && route.params.name === undefined) {
      let res = await addDiagnosis(dataObject)
      if (res?.statusText === 'Created') {
        message.success = res.data.Message
        message.err = ''
        console.log(res.data.results.patient)
        location.replace(`/diagnosis/${res.data.results.patient}`)
        //router.back()
      }
    } else if (route.params.name !== undefined) {
      let res = await addDiagnosis(dataObject)
      if (res?.statusText === 'Created') {
        message.success = res.data.Message
        setTimeout(() => {
          message.success = ''
        }, 1500)
        message.err = ''
        location.replace('/diagnosis/' + route.params.name)
      }
    } else {
      let res = await editDiagnosis(route.params.id, dataObject)
      if (res?.statusText === 'Created') {
        message.success = res.data.Message
        message.err = ''
        router.back()
      } else {
        console.log('no hubo cambios')
        message.warning = 'Modifique algo o presione cancelar'
      }
    }
  } catch (error: any | undefined) {
    message.success = ''
    message.err = error.response.data.Message
    console.log(error.response.data.Message)
  }
}

//LIST
/*======================================================================*/
const diagnosis: Array<_diagnosis> = reactive([])
//pagination
const currentPage = ref(1)
const rows = ref(3)
const pagination = ref(true)
//search
let searchDiagnosis: Array<_diagnosis> = reactive([])
const text = ref('')
//Messages
const err = ref('')
const success = ref('')

const _getDiagnosis = async () => {
  //console.log(route.params.name);
  const diagnosisData = await getDiagnosis()
  if (diagnosisData?.statusText == 'OK') {
    //diagnosis
    diagnosis.values = diagnosisData?.data.results
    console.log(diagnosisData?.data.results)
  }

  if (route.params.id !== undefined) {
    const diagnosisOneData = await getDiag(route.params.id)
    if (diagnosisOneData?.statusText == 'OK') {
      diagnosisOne.values = diagnosisOneData?.data.results
    }
    const myDiagnosis = JSON.parse(JSON.stringify(diagnosisOne.values))[0]
    console.log(JSON.parse(JSON.stringify(diagnosisOne.values))[0])
    console.log(myDiagnosis['test'])
    //fill fields diagnosis
    dataObject.patient = myDiagnosis['patient']
    dataObject.sex = myDiagnosis['sex'] === 'M' ? 'M' : 'F'
    dataObject.test = myDiagnosis['test']
    dataObject.result = myDiagnosis['result']
    dataObject.treatment = myDiagnosis['treatment']
    dataObject.condition = myDiagnosis['condition'] === 'activo' ? 'activo' : 'inactivo'
    dataObject.observation = myDiagnosis['observation']
  }
  if (route.params.name !== undefined) {
    let res = await diagnosisData?.data.results.filter(
      (element: _diagnosis) => element.patient === route.params.name
    )

    //fill fields patient
    dataObject.patient = route.params.name
    dataObject.sex = res[0]?.sex
    dataObject.condition = res[0]?.condition
    //console.log(res);

    //get newDiagnosis
    const newArrayTest: Array<string> = []
    for (let index = 0; index < res.length; index++) {
      const element = res[index]
      newArrayTest.push(element.test)
    }
    const resulTest = arrayTest.reduce((previous: any, current: string) => {
      const item = newArrayTest.find((element: string) => element === current)
      //console.log(item);
      if (!item) previous = [...previous, current]
      return previous
    }, [])

    arrayTest.values = resulTest
    //console.log(arrayTest.values.length);
    if (arrayTest.values.length === 0) {
      message.success = 'En hora buena ya tienes tus tests completo'
      setTimeout(() => {
        message.success = ''
      }, 5000)
    }
  }
}
const returnBack = () => {
  router.back()
}
//get number of pages
const getDataPages = async (numPage: number) => {
  let arrayEmpty: _diagnosis[] = []
  searchDiagnosis.values = arrayEmpty.values
  text.value = ''
  err.value = ''
  success.value = ''
  pagination.value = true
  currentPage.value = numPage
  if (searchDiagnosis.values.length > 0) {
    let init = numPage * rows.value - rows.value
    let end = numPage * rows.value
    searchDiagnosis.slice(init, end)
  } else {
    let init = numPage * rows.value - rows.value
    let end = numPage * rows.value
    let diagnosisValues: any = diagnosis.values
    searchDiagnosis.values = diagnosisValues.slice(init, end)
  }
}
</script>

<style></style>
