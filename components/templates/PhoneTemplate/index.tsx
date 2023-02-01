import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../../../database.types'
import { PhoneList } from '../../organisms/PhoneList'
import PhoneCreate from '../../organisms/PhoneCreate'
import PhoneTable from '../../organisms/PhoneTable'

export default async function PhoneTemplate() {
    const supabase = createServerComponentSupabaseClient<Database>({
        headers,
        cookies,
    })
    const { data } = await supabase.from('subusers').select(`
            *,
            numbers(
                *,
                contracts(
                    *
                )
            )
        `)
    console.log('list', list(data))
    return (
        <>
            <PhoneCreate />
            {data && <PhoneTable rows={data} />}
        </>
    )
}

export const list = (rows: any) => {
    type data = {
        no: number
        id: string
        subuser_name: string
        tel: string
        created_at: string
        contract_start_date: string
        contract_end_date: string
        complete: boolean | null
    }
    let data: data
    let list: data[] = []
    let count = 0

    for (let i = 0; i < rows.length; i++) {
        if (rows[i].numbers.length >= 1) {
            for (let j = 0; j < rows[i].numbers.length; j++) {
                if (rows[i].numbers[j].contracts.length >= 1) {
                    for (
                        let k = 0;
                        k < rows[i].numbers[j].contracts.length;
                        k++
                    ) {
                        data = {
                            no: count,
                            id: rows[i]?.id,
                            subuser_name: rows[i]?.name,
                            tel: rows[i]?.numbers[j]?.tel,
                            created_at: rows[i]?.created_at,
                            contract_start_date:
                                rows[i]?.numbers[j]?.contracts[k]?.start_date,
                            contract_end_date:
                                rows[i]?.numbers[j]?.contracts[k]?.end_date,
                            complete:
                                rows[i]?.numbers[j]?.contracts[k]?.completed,
                        }
                        list.push(data)
                        count++
                    }
                } else {
                    data = {
                        no: count,
                        id: rows[i]?.id,
                        subuser_name: rows[i]?.name,
                        tel: rows[i]?.numbers[j]?.tel,
                        created_at: rows[i]?.created_at,
                        contract_start_date: '',
                        contract_end_date: '',
                        complete: null,
                    }
                    list.push(data)
                    count++
                }
            }
        } else {
            data = {
                no: count,
                id: rows[i]?.id,
                subuser_name: rows[i]?.name,
                tel: '',
                created_at: rows[i]?.created_at,
                contract_start_date: '',
                contract_end_date: '',
                complete: null,
            }
            list.push(data)
            count++
        }
    }
    return list
}
