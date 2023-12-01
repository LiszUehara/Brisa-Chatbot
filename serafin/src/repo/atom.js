import { atom } from 'jotai'

export const useShowLogin = atom(true)
export const isFirstTime = atom(true)
export const user = atom(null)