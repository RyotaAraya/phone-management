'use client'
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import type { Database } from '../../../database.types'

const TAX_RATE = 0.07

function ccyFormat(num: number) {
    return `${num.toFixed(2)}`
}

function priceRow(qty: number, unit: number) {
    return qty * unit
}

function createRow(desc: string, qty: number, unit: number) {
    const price = priceRow(qty, unit)
    return { desc, qty, unit, price }
}

interface Row {
    desc: string
    qty: number
    unit: number
    price: number
}
type Subuser = Database['public']['Tables']['subusers']['Row']

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

function subtotal(items: readonly Row[]) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0)
}

const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
]

const invoiceSubtotal = subtotal(rows)
const invoiceTaxes = TAX_RATE * invoiceSubtotal
const invoiceTotal = invoiceTaxes + invoiceSubtotal

export default function PhoneTable({ rows }: any) {
    console.log('rows', rows)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            Details
                        </TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">使用者</TableCell>
                        <TableCell align="left">電話番号</TableCell>
                        <TableCell align="left">契約開始日</TableCell>
                        <TableCell align="left">契約終了日</TableCell>
                        <TableCell align="left">契約状況</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: any) => (
                        <TableRow key={row.id}>
                            <TableCell align="left">
                                {row.subuser_name}
                            </TableCell>
                            <TableCell align="left">{row.tel}</TableCell>
                            <TableCell align="left">
                                {row.contract_start_date}
                            </TableCell>
                            <TableCell align="left">
                                {row.contract_end_date}
                            </TableCell>
                            <TableCell align="left">
                                {row.complete ? '終了' : '契約中'}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">
                            {ccyFormat(invoiceSubtotal)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Tax</TableCell>
                        <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                            0
                        )} %`}</TableCell>
                        <TableCell align="right">
                            {ccyFormat(invoiceTaxes)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">
                            {ccyFormat(invoiceTotal)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
