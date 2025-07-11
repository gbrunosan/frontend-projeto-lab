import { create } from 'zustand'

type Laboratorio = {
  id: string
  nome: string
  local: string
}

type Store = {
  laboratorio: Laboratorio | null
  setLaboratorio: (lab: Laboratorio) => void
}

export const useLaboratorioStore = create<Store>((set) => ({
  laboratorio: null,
  setLaboratorio: (lab) => set({ laboratorio: lab }),
}))
