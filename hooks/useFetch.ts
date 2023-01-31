'use client'
import useStore from '../store'
import supabase from '../utils/supabase'

//Phoneデータ取得
export const useFetch = () => {
    const { setPhones } = useStore((state) => state)
    const fetchPhone = async () => {
        const { data } = await supabase
            .from('subusers')
            .select('*')
            .order('created_at', { ascending: true })

        if (data === null) return
        setPhones(data)
    }
    return {
        fetchPhone,
    }
}
