<template>
  <Line v-if="data.loaded === true" :data="data" :options="options" />
</template>

<script lang="ts">
import { getDiagnosis } from '@/data/diagnosis'
import type { _diagnosis } from '@/interfaces/interface'
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
  PointElement
} from 'chart.js'
import { Bar, Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'App',
  components: {
    Line
  },
  data() {
    return {
      data: {
        loaded: false,
        labels: [''],
        datasets: [
          {
            label: 'pi',
            data: [0],
            borderColor: '#FFCA28 ',
            backgroundColor: '#FFCA28 ',
            hidden: false
          },
          {
            label: 'p1',
            data: [0],
            borderColor: '#8BC34A  ',
            backgroundColor: '#8BC34A',
            hidden: true
          },
          {
            label: 'p2',
            data: [0],
            borderColor: '#DCEDC8',
            backgroundColor: '#DCEDC8',
            hidden: true
          },
          {
            label: 'p3',
            data: [0],
            borderColor: '#FFECB3 ',
            backgroundColor: '#FFECB3 ',
            hidden: true
          },
          {
            label: 'pf',
            data: [0],
            borderColor: '#FFCA28  ',
            backgroundColor: '#FFCA28  ',
            hidden: false
          },
          {
            label: 'result',
            data: [0],
            borderColor: '#42A5F5  ',
            backgroundColor: '#42A5F5  ',
            hidden: false
          },
          {
            label: 'ideal',
            data: [0],
            borderColor: '#388E3C ',
            backgroundColor: '#388E3C ',
            hidden: true
          }
        ]
      },
      options: {
        responsive: true
      }
    }
  },
  methods: {
    async _getDiagnosis() {
      const diagnosisData = await getDiagnosis()
      console.log(diagnosisData?.data)
      let sortRes: Array<_diagnosis> = []
      let sortRes1: Array<_diagnosis> = []
      const res = await diagnosisData?.data.results.filter(
        (p: _diagnosis) => p.patient === this.$route.params.name
      )

      sortRes[0] = res.filter((t: _diagnosis) => t.test === 'LDH/DHL')[0]
      sortRes[1] = res.filter((t: _diagnosis) => t.test === 'GLUCOSA')[0]
      sortRes[2] = res.filter((t: _diagnosis) => t.test === 'COL. TOTAL')[0]
      sortRes[3] = res.filter((t: _diagnosis) => t.test === 'TRIGLICERIDOS')[0]
      sortRes[4] = res.filter((t: _diagnosis) => t.test === 'UREA')[0]
      sortRes[5] = res.filter((t: _diagnosis) => t.test === 'Co2')[0]
      sortRes[6] = res.filter((t: _diagnosis) => t.test === 'VCM')[0]
      sortRes[8] = res.filter((t: _diagnosis) => t.test === 'RDW ADE IDE')[0]
      sortRes[9] = res.filter((t: _diagnosis) => t.test === 'GGTP')[0]
      sortRes[10] = res.filter((t: _diagnosis) => t.test === 'TGO AST')[0]
      sortRes[11] = res.filter((t: _diagnosis) => t.test === 'TGP ALT')[0]
      sortRes[12] = res.filter((t: _diagnosis) => t.test === 'ACIDO URICO')[0]
      sortRes[13] = res.filter((t: _diagnosis) => t.test === 'HEMOGLOBINA')[0]

      /*sortRes[0] = res.filter((t: _diagnosis) => t.test === "LDH/DHL")[0];
      sortRes[1] = res.filter((t: _diagnosis) => t.test === "COL. TOTAL")[0];
      sortRes[2] = res.filter((t: _diagnosis) => t.test === "TRIGLICERIDOS")[0];
      sortRes[3] = res.filter((t: _diagnosis) => t.test === "GLUCOSA")[0];
      sortRes[4] = res.filter((t: _diagnosis) => t.test === "UREA")[0];
      sortRes[5] = res.filter((t: _diagnosis) => t.test === "Co2")[0];
      sortRes[6] = res.filter((t: _diagnosis) => t.test === "VCM")[0];
      sortRes[8] = res.filter((t: _diagnosis) => t.test === "RDW ADE IDE")[0];
      sortRes[9] = res.filter((t: _diagnosis) => t.test === "GGTP")[0];
      sortRes[10] = res.filter((t: _diagnosis) => t.test === "TGO AST")[0];
      sortRes[11] = res.filter((t: _diagnosis) => t.test === "TGP ALT")[0];
      sortRes[12] = res.filter((t: _diagnosis) => t.test === "ACIDO URICO")[0];
      sortRes[13] = res.filter((t: _diagnosis) => t.test === "HEMOGLOBINA")[0];*/

      for (let index = 0; index < sortRes.length; index++) {
        const element = sortRes[index]
        console.log(element)
        if (element !== undefined) {
          sortRes1.push(element)
        }
      }
      console.log(sortRes1)
      this.data.labels = sortRes1.map((row: _diagnosis) => row.test)
      this.data.datasets[0].data = sortRes1.map((row: _diagnosis) => row.pi)
      this.data.datasets[1].data = sortRes1.map((row: _diagnosis) => row.p1)
      this.data.datasets[2].data = sortRes1.map((row: _diagnosis) => row.p2)
      this.data.datasets[3].data = sortRes1.map((row: _diagnosis) => row.p3)
      this.data.datasets[4].data = sortRes1.map((row: _diagnosis) => row.pf)
      this.data.datasets[5].data = sortRes1.map((row: _diagnosis) => parseFloat(row.result))
      this.data.datasets[6].data = sortRes1.map((row: _diagnosis) => row.ideal)
      //console.log(this.data.labels);
    }
  },
  async mounted() {
    this.data.loaded = false
    await this._getDiagnosis()
    this.data.loaded = true
  }
}
</script>
