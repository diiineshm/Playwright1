const ExcelJs = require("exceljs");

async function writeExcelTest(searchText, replaceText,change, sheetName, filePath) {

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)//Use forward slashes . backward slashes- javascript treat as escape
    const worksheet = workbook.getWorksheet(sheetName);
    const output = await readExcel(worksheet, searchText);

    if (output.row == -1) {
        console.log(searchText + "not found in " + sheetName);
        return;
    }

    const cell = worksheet.getCell(output.row, output.column+change.colchange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
    //make sure to close the excel sheet before we run this function

    console.log("Excel updated successfully");
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 }; //javascript object with dummy data
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            //To print all cell values
            //console.log(cell.value)

            //Requirement - if the expected cell value found, print the co-ordinates
            // if (cell.value === "Apple") {
            //     console.log(rowNumber, colNumber)
            // }
            if (cell.value?.toString().trim() === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}


//Change cell value
//writeExcelTest("Banana", "Republic", "Sheet1", "C:/Users/ramil/Downloads/excelTest.xlsx");

//change cell value - two columns near value to corresponding row
//update Mango Price to 350
writeExcelTest("Mango", 350,{rowChange:0,colchange:2}, "Sheet1", "C:/Users/ramil/Downloads/excelTest.xlsx");


//using Promise then function instead of async and await
// const workbook1 = new ExcelJs.Workbook();
// workbook1.xlsx.readFile("C:/Users/ramil/Downloads/exceldownloadTest.xlsx").then(function ()
// {
//     const worksheet1 = workbook1.getWorksheet('Sheet1');
//     worksheet1.eachRow((row, rowNumber) =>
//     {
//         row.eachCell((cell, colNumber) =>
//        {
//             //To print all cell values
//             console.log(cell.value)
//         })
//     })

// });


