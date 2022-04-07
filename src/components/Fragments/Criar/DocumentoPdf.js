import react from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import htmlToPdfmake from 'html-to-pdfmake'
import pngwing from './images/pngwing.png'

function DocumentoPdf(pdf){
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    var html = htmlToPdfmake(pdf.conteudo, {
        defaultStyles: {
            table: {
            }
        }
    })
    const reportTitle =  {
        columns: [{
          table: {
            margin: [15, 0, 15, 100],
            widths: ['33%', '33%', '33%'],
            body: [
              [
                {
                    image: pngwing,
                    width: 80,
                    margin: [15,0,0,0],
                    alignment: 'right'
                },
                
            
                {
                    text: pdf.filial,
                    alignment: 'center',
                    margin: [10,15,0,0]
                },

                {
                    text: ' ',
                    alignment: 'justify',
                    margin: [10,15,0,0]
                }

              ]
            ]
          },
          layout: 'noBorders'
        }]
      }

    const details = [
        html
    ]
    const footer = [
        {canvas: [ { type: 'line', x1: 16, y1: 0, x2: 575, y2: 0, lineWidth: 0.5 } ]},
        {
            
            text: pdf.endereco,
            alignment: 'center'
        }
    ];
    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 80, 15, 60],
        header: [reportTitle],
        content: [details],
        footer: [footer]
        
    }

    pdfMake.createPdf(docDefinitions).download()
    
}

export default DocumentoPdf