import axios from 'axios'
const urlServer = 'https://app-9b469618-a559-4dee-8227-d373db6461c1.cleverapps.io'
//USERS
//All
export const getDiagnosis = async () => {
  const result = await axios({
    method: 'GET',
    /*url: "http://localhost:3000/diagnosis/"*/ //para desarrollo locl
    url: `${urlServer}/diagnosis` /*url para la nube*/
  })
  return result
}
export const getDiag = async (id: number) => {
  const result = await axios({
    method: 'GET',
    url: `${urlServer}/diagnosis/` + id
  })
  return result
}
//Add
export const addDiagnosis = async (dataObject: object) => {
  const result = await axios({
    method: 'POST',
    url: `${urlServer}/diagnosis`,
    data: dataObject
  })
  return result
}
//Edit
export const editDiagnosis = async (id: number, dataObject: object) => {
  const result = await axios({
    method: 'PUT',
    url: `${urlServer}/diagnosis/` + id,
    data: dataObject
  })
  return result
}
//Delete
export const deleteDiagnosis = async (id: number) => {
  const result = await axios({
    method: 'DELETE',
    url: `${urlServer}/diagnosis/` + id
  })
  return result
}
