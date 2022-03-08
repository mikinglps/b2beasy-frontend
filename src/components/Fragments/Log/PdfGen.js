import react from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function PdfGen(pdf){
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    const reportTitle = [
        {
            text: 'Relatório dos Últimos 7 Dias',
            fontSize: 14,
            bold: true,
            margin: [15, 20, 0, 45]
        }
    ];

    const data = pdf.map((value, index) => {
        return[
            {text: value.nome, fontSize: 9},
            {text: value.cpf, fontSize: 9},
            {text: value.data, fontSize: 9},
            {text: value.acao, fontSize: 9}
        ]
    })

    const details = [{
        table:{
            headerRows: 1,
            widths: ['*','*','*','*'],
            body: [
                [
                    {text: 'Usuario', style: 'tableHeader', fontSize: 12},
                    {text: 'CPF', style: 'tableHeader', fontSize: 12},
                    {text: 'Horario', style: 'tableHeader', fontSize: 12},
                    {text: 'Acao', style: 'tableHeader', fontSize: 12}
                ],
                ...data
            ]
        },
        layout: 'headerLineOnly'
    }];
    const footer = [];
    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 50],
        header: [reportTitle],
        content: [details],
        footer: [footer]
    }

    pdfMake.createPdf(docDefinitions).download()
}

export default PdfGen