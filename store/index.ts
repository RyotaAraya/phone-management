//globalで管理するもの
import create from 'zustand'

type EditedTask = {
    id: string
    title: string | null
}
type LoginUser = {
    id: string | undefined
    email: string | undefined
}
type SubUser = {
    id: string
    name: string
}
type State = {
    editedTask: EditedTask
    updateEditedTask: (payload: EditedTask) => void
    resetEditedTask: () => void
    loginUser: LoginUser
    updateLoginUser: (payload: LoginUser) => void
    resetLoginUser: () => void
    subUser: SubUser
    subUsers: SubUser[]
    updateSubUser: (payload: SubUser) => void
    resetSubUser: () => void
    addSubUser: (payload: SubUser) => void
}
const useStore = create<State>((set, get) => ({
    editedTask: { id: '', title: '' },
    updateEditedTask: (payload) =>
        set({
            editedTask: payload,
        }),
    resetEditedTask: () => set({ editedTask: { id: '', title: '' } }),
    loginUser: { id: '', email: '' },
    updateLoginUser: (payload) =>
        set({
            loginUser: payload,
        }),
    resetLoginUser: () => set({ loginUser: { id: '', email: '' } }),
    subUser: { id: '', name: '', userId: '' },
    updateSubUser: (payload) =>
        set({
            subUser: payload,
        }),
    resetSubUser: () => set({ subUser: { id: '', name: '' } }),
    subUsers: [],
    addSubUser: (payload) =>
        set((state) => ({ subUsers: [...state.subUsers, payload] })),
}))
export default useStore
