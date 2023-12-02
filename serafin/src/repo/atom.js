import { atom } from 'jotai'

export const useShowLogin = atom(true)
export const isFirstTime = atom(true)
export const user = atom(null)
export const userName = atom(null)
export const isLogged = atom(false)