package egovframework.example.cmmn.web;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellReference;

public class ExcelCellRef {

    public static String getName(Cell cell, int cellIndex) {
        int cellNum = 0;
        if(cell != null) {
            cellNum = cell.getColumnIndex();
        }
        else {
            cellNum = cellIndex;
        }
 
        return CellReference.convertNumToColString(cellNum);
    }
 
    @SuppressWarnings("deprecation")
    public static String getValue(Cell cell, Workbook wb2) {
        String value = "";
 
        if(cell == null) {
            value = "";
        }
        else {
            if( cell.getCellType() == Cell.CELL_TYPE_FORMULA ) {
            	FormulaEvaluator formulaEval = wb2.getCreationHelper().createFormulaEvaluator(); 
            	
            	if (formulaEval.evaluate(cell).getCellType() == Cell.CELL_TYPE_NUMERIC) {
            		value = (int)cell.getNumericCellValue() + "";
            	}else if(formulaEval.evaluate(cell).getCellType() == Cell.CELL_TYPE_STRING){
            		if(cell.getStringCellValue().equals("") || cell.getStringCellValue() == null || cell.getStringCellValue() == "" || cell.getStringCellValue().length() == 0) {
            		}else {
            			value = cell.getStringCellValue();
            		}
            		
            	}else {
            	}
            }
            else if( cell.getCellType() == Cell.CELL_TYPE_NUMERIC ) {
                value = (int)cell.getNumericCellValue() + "";
            }
            else if( cell.getCellType() == Cell.CELL_TYPE_STRING ) {
                value = cell.getStringCellValue();
            }
            else if( cell.getCellType() == Cell.CELL_TYPE_BOOLEAN ) {
                value = cell.getBooleanCellValue() + "";
            }
            else if( cell.getCellType() == Cell.CELL_TYPE_ERROR ) {
                value = cell.getErrorCellValue() + "";
            }
            else if( cell.getCellType() == Cell.CELL_TYPE_BLANK ) {
                value = "";
            }
            else {
                value = cell.getStringCellValue();
            }
        }
        return value;
    }
}
