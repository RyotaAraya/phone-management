//globalで管理するもの
import create from 'zustand'

//import { devtools } from 'zustand/middleware'
//import { immer } from 'zustand/middleware/immer'

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
type Phone = {
    id: string
    name: string
    user_id: string
    created_at: string
}
type CreatingPhone = {
    id: string | undefined
    user_id: string | undefined
    name: string
    created_at: string
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
    originPhonesList: Phone[]
    editedPhonesList: Phone[]
    creatingPhone: Phone
    resetCreatingPhone: () => void
    createPhone: (id: string, name: any) => void
    updatePhones: (paylod: Phone[]) => void
    setPhones: (payload: Phone[]) => void
    addPhone: (payload: Phone) => void
    deletePhone: (payload: string) => void
}
//開発用
// const log = (config: any) => (set, get) =>
//     config((...args: any) => {
//         console.log('  applying', args)
//         set(...args)
//         console.log('  new state', get())
//     }, get)
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
    originPhonesList: [],
    editedPhonesList: [],
    creatingPhone: { id: '', name: '', user_id: '', created_at: '' },
    resetCreatingPhone: () =>
        set({
            creatingPhone: {
                id: '',
                name: '',
                user_id: '',
                created_at: '',
            },
        }),
    createPhone: (id, name) =>
        set({
            creatingPhone: {
                id: '',
                user_id: id,
                name: name,
                created_at: '',
            },
        }),
    setPhones: (payload) => set({ originPhonesList: payload }),
    updatePhones: (payload) => set({ editedPhonesList: payload }),
    addPhone: (payload) => {
        set((state) => ({
            originPhonesList: [...state.originPhonesList, payload],
        }))
    },
    deletePhone: (payload) =>
        set((state) => ({
            originPhonesList: state.originPhonesList.filter(
                (phone) => phone.id !== payload
            ),
        })),
}))
export default useStore
