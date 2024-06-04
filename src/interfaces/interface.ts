export type conditionType = 'activo' | 'inactivo'
export type sexType = 'F' | 'M'
export type testType =
  | 'LDH/DHL'
  | 'GLUCOSA'
  | 'COL. TOTAL'
  | 'TRIGLICERIDOS'
  | 'UREA'
  | 'Co2'
  | 'VCM'
  | 'RDW ADE IDE'
  | 'GGTP'
  | 'TGO AST'
  | 'TGP ALT'
  | 'ACIDO URICO'
  | 'HEMOGLOBINA'

//diagnosis

export interface _diagnosis {
  diagnosis_id: number
  patient: string
  sex: sexType
  test: testType
  pi: number
  p1: number
  p2: number
  p3: number
  pf: number
  ideal: number
  result: string
  interpretation: string
  treatment?: string
  condition: conditionType
  observation?: string
  created: Date
  updated?: Date
}
