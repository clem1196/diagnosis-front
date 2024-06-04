<template>
  <div v-if="$route.params.name !== undefined" class="container-fluid">
    <div v-if="diagnosis.values.length === 13" class="card card-title">
      <i class="bi-check-circle-fill text-success">{{ $route.params.name + ': ' }}Test Completo</i>
    </div>
    <div v-else class="card card-title">
      {{ $route.params.name + `(${diagnosis.values.length} de 13)` }}
    </div>
    <!--LIST-->
    <div>
      <!--Form-->
      <div class="card card-search">
        <div class="row row-search">
          <!--Add-->
          <a :href="'/diagnosis/' + $route.params.name" class="col-1 icon-add" title="Add diagnosis"
            ><i class="bi-person-fill-add"> </i
          ></a>
          <!--Switch-->
          <div class="col-auto">
            <div class="form-switch form-check" title="Clasic mode">
              <label class="form-check-label" for="switDiagnosisPatient"></label>
              <input
                @click="changeFilter"
                type="checkbox"
                name="inputNameSwitch"
                class="form-check-input myCheck"
                id="switDiagnosisPatient"
              />
            </div>
          </div>
          <!--Search-->
          <div class="col-auto">
            <!--Search mode 1-->
            <form v-if="filter == true" @keyup="getSearchDiagnosis">
              <div class="row m-2">
                <div class="col-auto">
                  <i class="bi-search"></i>
                  <input
                    v-model="text"
                    type="search"
                    id="inputMode1"
                    name="inputMode1"
                    class="form-control form-control-sm search"
                  />
                </div>
              </div>
            </form>
            <!--search mode 2-->
            <form v-else @submit.prevent="getSearchDiagnosis">
              <div class="row">
                <div class="col-auto">
                  <button type="submit" class="btn-form">Search</button>
                </div>
                <div class="col-auto">
                  <button
                    v-if="success.length > 0 || err.length > 0"
                    @click="getDataPages(1)"
                    type="button"
                    class="btn-form cancel"
                  >
                    Exit
                  </button>
                  <button v-else disabled type="button" class="btn-form">Exit</button>
                </div>
                <div class="col-auto mt-1">
                  <i class="bi-search"></i>
                  <input
                    v-model="text"
                    id="inputMode2"
                    name="inputMode2"
                    class="form-control form-control-sm search"
                    type="search"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="col-auto icon-print" title="Print">
            <a @click="printPage" type="button"><i class="bi-printer"></i></a>
          </div>
        </div>
      </div>
      <!--Table-->
      <div class="scale-table">
        <table class="table table-hover text-center">
          <thead>
            <tr class="thead-tr">
              <th>
                <i class="bi-filter"></i>
                <button @click="sortId" class="btn btn-sm th-font-size">Id</button>
              </th>

              <th>
                <i class="bi-filter"></i>
                <button @click="sortTest" class="btn btn-sm th-font-size">Test</button>
              </th>
              <th>
                <i class="bi-filter"></i>
                <button @click="sortResult" class="btn btn-sm th-font-size">Result</button>
              </th>
              <th>
                <i class="bi-filter"></i>
                <button @click="sortRangeInitial" class="btn btn-sm th-font-size">Ri</button>
              </th>
              <th>
                <i class="bi-filter"></i>
                <button @click="sortIdeal" class="btn btn-sm th-font-size">Ideal</button>
              </th>
              <th>
                <i class="bi-filter"></i>
                <button @click="sortRangeEnd" class="btn btn-sm th-font-size">Rf</button>
              </th>

              <th>
                <i class="bi-filter"></i>
                <button @click="sortInterpretation" class="btn btn-sm th-font-size">
                  Interpretation
                </button>
              </th>
              <th>
                <button class="btn btn-sm th-font-size">Action</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="search in searchDiagnosis.values"
              :key="search['diagnosis_id']"
              class="tbody-tr"
            >
              <td class="color-td">{{ search['diagnosis_id'] }}</td>
              <td class="color-td">{{ search['test'] }}</td>
              <td class="color-td">{{ search['result'] }}</td>
              <td class="color-td">{{ search['pi'] }}</td>
              <td class="color-td">{{ search['ideal'] }}</td>
              <td class="color-td">{{ search['pf'] }}</td>
              <td class="color-td">{{ search['interpretation'] }}</td>
              <td>
                <a :href="'/diagnosis/detail/' + search['diagnosis_id']" title="Detail">
                  <i class="bi-card-checklist size-checklist"></i>
                </a>
                |
                <a :href="'/diagnosis/edit/' + search['diagnosis_id']" title="Edit">
                  <i class="bi-pencil-fill size-pencil"></i>
                </a>
                |
                <a :href="'/diagnosis/delete/' + search['diagnosis_id']" title="Delete">
                  <i class="bi-trash-fill size-trash"></i>
                </a>
              </td>
            </tr>
          </tbody>
          <!--Messages-->
          <small v-if="success.length > 0" class="text-success">{{ success }}</small>
          <small v-if="err.length > 0" class="text-danger">{{ err }}</small>
        </table>
      </div>
      <!--Pagination-->
      <nav @click="color_td" aria-label="Page navigation">
        <ul v-if="pagination" class="pagination justify-content-center">
          <li class="page-item disabled">
            <button class="page-link size">Pages</button>
          </li>
          <!--First page-->
          <li v-if="currentPage >= 2" @click="getFirstPage" class="page-item">
            <button type="button" class="page-link size">First</button>
          </li>
          <li v-else @click="getFirstPage" class="page-item disabled">
            <button type="button" class="page-link size">First</button>
          </li>
          <!--Previous-->
          <li v-if="currentPage >= 2" @click="getPrevious" class="page-item">
            <button class="page-link size" type="button">
              <i class="bi-chevron-left"></i>
            </button>
          </li>
          <li v-else @click="getPrevious" class="page-item disabled">
            <button type="button" class="page-link size">
              <i class="bi-chevron-left"></i>
            </button>
          </li>
          <!--Pages-->
          <li
            v-for="pag in totalPages()"
            :key="pag"
            @click="getDataPages(pag)"
            class="page-item"
            :class="isActive(pag)"
          >
            <button
              v-if="currentPage - 1 < pag && pag < currentPage + 3"
              type="button"
              class="page-link size"
            >
              {{ pag }}
            </button>
          </li>
          <!--Next-->
          <li v-if="currentPage < totalPages()" @click="getNext" class="page-item">
            <button v-if="currentPage < totalPages()" type="button" class="page-link size">
              <i class="bi-chevron-right"></i>
            </button>
          </li>
          <li v-else @click="getNext" class="page-item disabled">
            <button type="button" class="page-link size">
              <i class="bi-chevron-right"></i>
            </button>
          </li>
          <!--Last page-->
          <li v-if="currentPage < totalPages()" @click="getLastPage" class="page-item">
            <button type="button" class="page-link size">Last</button>
          </li>
          <li v-else @click="getLastPage" class="page-item disabled">
            <button type="button" class="page-link size">Last</button>
          </li>
          <!--Total-->
          <li class="page-item disabled">
            <button class="page-link size">Total: {{ diagnosis.values.length }}</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { _diagnosis } from '../../interfaces/interface'
import { getDiagnosis } from '@/data/diagnosis'
import { useRoute } from 'vue-router'
const route: any = useRoute()
defineProps({
  title: { type: String, default: 'Detalles' }
})

onMounted(async () => {
  if (route.params.name !== undefined) {
    const diagnosisData = await getDiagnosis()
    if (diagnosisData?.statusText == 'OK') {
      //diagnosisByPatient
      console.log(route.params.name)
      let diagnosisByPatientData = await diagnosisData?.data.results.filter(
        (element: _diagnosis) => element.patient === route.params.name
      )
      diagnosis.values = diagnosisByPatientData
    }
    console.log(diagnosis)
    getDataPages(currentPage.value)
    color_td()
  }
})

//LIST
/*======================================================================*/
const diagnosis: Array<_diagnosis> = reactive([])
//pagination
const currentPage = ref(1)
const rows = ref(3)
const pagination = ref(true)
//search
const filter = ref(true)
let searchDiagnosis: Array<_diagnosis> = reactive([])
const text = ref('')
//Messages
const err = ref('')
const success = ref('')
const sortValue = ref(false)

const color_td = async () => {
  let myColor: HTMLCollection = await document.getElementsByClassName('color-td')

  for (let index = 0; index < myColor.length; index++) {
    const element = myColor[index]

    if (element.textContent === 'Saludable' || element.textContent === 'Normal') {
      element.setAttribute('style', 'background-color: #4CAF50; color:white;')
    }

    if (
      element.textContent === 'Riesgo inicial' ||
      element.textContent === 'Riesgo final' ||
      element.textContent === 'Bajo' ||
      element.textContent === 'Alto' ||
      element.textContent === 'Severo'
    ) {
      element.setAttribute('style', 'background-color: #FF9800; color:white;')
    }
    if (
      element.textContent === 'Peligro inicial' ||
      element.textContent === 'Peligro final' ||
      element.textContent === 'Muy alto'
    ) {
      element.setAttribute('style', 'background-color: #FF5722; color:white;')
    }
    if (element.textContent === 'Leve' || element.textContent === 'Moderado') {
      element.setAttribute('style', 'background-color: #CDDC39 ; color:white;')
    }
    if (element.textContent === 'Leve' || element.textContent === 'Moderado') {
      element.setAttribute('style', 'background-color: #CDDC39 ; color:white;')
    }
  }

  console.log(typeof myColor[6].textContent)
}

//print
const printPage = () => {
  window.print()
}
//sort
const sortId = () => {
  const asc = (a: _diagnosis, b: _diagnosis) => {
    return a.diagnosis_id - b.diagnosis_id
  }
  const desc = (a: _diagnosis, b: _diagnosis) => {
    return b.diagnosis_id - a.diagnosis_id
  }
  const searchDiagnosisValues: any = searchDiagnosis.values
  if (sortValue.value) {
    sortValue.value = false
    return searchDiagnosisValues.sort(asc)
  } else {
    sortValue.value = true
    console.log(sortValue)
    return searchDiagnosisValues.sort(desc)
  }
}
const sortTest = () => {
  const asc = (a: _diagnosis, b: _diagnosis) => {
    return a.test.localeCompare(b.test)
  }
  const desc = (a: _diagnosis, b: _diagnosis) => {
    return b.test.localeCompare(a.test)
  }
  const searchDiagnosisValues: any = searchDiagnosis.values
  if (sortValue.value) {
    sortValue.value = false
    return searchDiagnosisValues.sort(asc)
  } else {
    sortValue.value = true
    return searchDiagnosisValues.sort(desc)
  }
}
const sortResult = () => {
  const asc = (a: _diagnosis, b: _diagnosis) => {
    return parseFloat(a.result) - parseFloat(b.result)
  }
  const desc = (a: _diagnosis, b: _diagnosis) => {
    return parseFloat(b.result) - parseFloat(a.result)
  }
  const searchDiagnosisValues: any = searchDiagnosis.values
  if (sortValue.value) {
    sortValue.value = false
    return searchDiagnosisValues.sort(asc)
  } else {
    sortValue.value = true
    console.log(sortValue)
    return searchDiagnosisValues.sort(desc)
  }
}
const sortRangeInitial = () => {
  const asc = (a: _diagnosis, b: _diagnosis) => {
    return a.pi - b.pi
  }
  const desc = (a: _diagnosis, b: _diagnosis) => {
    return b.pi - a.pi
  }
  const searchDiagnosisValues: any = searchDiagnosis.values
  if (sortValue.value) {
    sortValue.value = false
    return searchDiagnosisValues.sort(asc)
  } else {
    sortValue.value = true
    console.log(sortValue)
    return searchDiagnosisValues.sort(desc)
  }
}
const sortIdeal = () => {
  const asc = (a: _diagnosis, b: _diagnosis) => {
    return a.ideal - b.ideal
  }
  const desc = (a: _diagnosis, b: _diagnosis) => {
    return b.ideal - a.ideal
  }
  const searchDiagnosisValues: any = searchDiagnosis.values
  if (sortValue.value) {
    sortValue.value = false
    return searchDiagnosisValues.sort(asc)
  } else {
    sortValue.value = true
    console.log(sortValue)
    return searchDiagnosisValues.sort(desc)
  }
}
const sortRangeEnd = () => {
  const asc = (a: _diagnosis, b: _diagnosis) => {
    return a.pf - b.pf
  }
  const desc = (a: _diagnosis, b: _diagnosis) => {
    return b.pf - a.pf
  }
  const searchDiagnosisValues: any = searchDiagnosis.values
  if (sortValue.value) {
    sortValue.value = false
    return searchDiagnosisValues.sort(asc)
  } else {
    sortValue.value = true
    console.log(sortValue)
    return searchDiagnosisValues.sort(desc)
  }
}
const sortInterpretation = () => {
  const asc = (a: _diagnosis, b: _diagnosis) => {
    return a.interpretation.localeCompare(b.interpretation)
  }
  const desc = (a: _diagnosis, b: _diagnosis) => {
    return b.interpretation.localeCompare(a.interpretation)
  }
  const searchDiagnosisValues: any = searchDiagnosis.values
  if (sortValue.value) {
    sortValue.value = false
    return searchDiagnosisValues.sort(asc)
  } else {
    sortValue.value = true
    return searchDiagnosisValues.sort(desc)
  }
}

//search
const getSearchDiagnosis = () => {
  if (text.value.length == 0) {
    getDataPages(1)
  } else {
    const filterItems = (query: string) => {
      const diagnosisValues: any = diagnosis.values
      return diagnosisValues.filter(
        (diag: _diagnosis) =>
          (diag.diagnosis_id !== null &&
            diag.diagnosis_id !== undefined &&
            diag.diagnosis_id.toString().indexOf(query) > -1) ||
          (diag.patient !== null &&
            diag.patient !== undefined &&
            diag.patient.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
          (diag.test !== null &&
            diag.test !== undefined &&
            diag.test.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
          (diag.result !== null &&
            diag.result !== undefined &&
            diag.result.toString().indexOf(query) > -1) ||
          (diag.pi !== null && diag.pi !== undefined && diag.pi.toString().indexOf(query) > -1) ||
          (diag.ideal !== null &&
            diag.ideal !== undefined &&
            diag.ideal.toString().indexOf(query) > -1) ||
          (diag.pf !== null && diag.pf !== undefined && diag.pf.toString().indexOf(query) > -1) ||
          (diag.interpretation !== null &&
            diag.interpretation !== undefined &&
            diag.interpretation.toLowerCase().indexOf(query.toLowerCase()) > -1)
      )
    }
    if (filterItems(text.value).length > 0) {
      searchDiagnosis.values = filterItems(text.value)
      pagination.value = false
      success.value = searchDiagnosis.values.length + ' ' + 'records found'
      err.value = ''
    } else {
      let arrayEmpty: _diagnosis[] = []
      searchDiagnosis.values = arrayEmpty.values
      pagination.value = false
      success.value = ''
      err.value = 'No records found'
    }
  }
}
//Switch
const changeFilter = () => {
  if (filter.value == true) {
    filter.value = false
  } else {
    filter.value = true
  }
}
//pagination
const isActive = (numPage: number) => {
  return numPage == currentPage.value ? 'active' : ''
}
//total pages
const totalPages = () => {
  return Math.ceil(diagnosis.values.length / rows.value)
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
//First page
const getFirstPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
  getDataPages(1)
}
//Previous
const getPrevious = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
  getDataPages(currentPage.value)
}
//Next
const getNext = () => {
  if (currentPage.value < totalPages()) {
    currentPage.value++
  }
  getDataPages(currentPage.value)
}
//last page
const getLastPage = () => {
  if (currentPage.value < totalPages()) {
    currentPage.value++
  }
  getDataPages(totalPages())
}
</script>

<style></style>
