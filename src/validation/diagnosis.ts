import type { _diagnosis } from '@/interfaces/interface'
import { getDiagnosis } from '@/data/diagnosis'
import router from '@/router'
import { isNumber } from 'chart.js/helpers'

const namesRegex = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]{2,36}$/ /*solo letras y espacios*/
//patients
export const fieldPatient = async (patient: undefined | string) => {
  if (patient === undefined || patient.length === 0) {
    return 'Requerido'
  } else if (!Number.isInteger(parseInt(patient)) && !namesRegex.test(patient)) {
    return 'Solo letras y espacios mínimo 2 y máximo 36 caracteres.'
  } else if (Number.isInteger(parseInt(patient)) && patient.length !== 8) {
    return 'Ingrese número de 8 digitos.'
  } else {
    const myId = router.currentRoute.value.params.id
    const diagnosis = await getDiagnosis()
    let diagnosisField = diagnosis?.data.results.filter(
      (element: _diagnosis) => element.patient === patient
    )
    if (myId !== undefined && typeof myId === 'string') {
      diagnosisField = await diagnosis?.data.results.filter(
        (element: _diagnosis) =>
          element.patient === patient && element.diagnosis_id !== parseInt(myId)
      )
      console.log(await diagnosisField, myId)
    }
    //console.log(await diagnosisField, myId)
    if ((await diagnosisField.length) > 0) {
      return 'Este nombre o DNI ya existe '
    } else {
      return ''
    }
  }
}
//result
export const fieldResult = async (result: undefined | string) => {
  if (result === undefined || result.length === 0) {
    return 'Requerido'
  } else if (!isNumber(parseFloat(result))) {
    return 'Ingrese un número válido.'
  } else {
    return ''
  }
}
//treatment
export const fieldTreatment = async (treatment: undefined | string) => {
  if (treatment !== undefined && treatment.length > 2083) {
    return 'No se aceptan mas caracteres'
  } else {
    return ''
  }
}
