import React, { useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { FaTrash } from "react-icons/fa";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

type ColDef = {
    field: string;
} & (
    {
        headerName: string;
        valueGetter: string;
    } | {
        headerName?: undefined;
        valueGetter?: undefined;
        cellRenderer?: string;
        cellRendererParams?: any;
    }
);


export const DeleteButtonRenderer = ({ api, rowIndex }: any) => {
    const handleDelete = () => {
      api.applyTransaction({ remove: [api.getRowNode(rowIndex).data] });
    };
  
    return (
      <button onClick={handleDelete} className="px-1 h-5 items-center">
        <FaTrash className="w-3 h-3" />
      </button>
    );
};

const RuleTable = ({data , index} : any) => {
    const rowData = useMemo(() => {
        return data.map((row: any) => {
          const parameterObj = row.parameters.reduce((acc: any, param: any, index: number) => {
            acc[`Parameter ${index + 1}`] = param.parameter || "";
            return acc;
          }, {});
          return Object.assign({}, row, parameterObj);
        });
    }, [data]);

    const maxParameters = useMemo(() => {
        let max = 0;
        for (const row of data) {
            if (row.parameters.length > max) {
                max = row.parameters.length;
            }
        }
        return max;
    }, [data]);

    const columnDefs : ColDef[] = useMemo(
        () => {
            const defs : ColDef[] = [
                { field: "rowIndex", headerName: "Rule", valueGetter: "node.rowIndex + 1" },
                { field: "fieldOption", headerName: "Field" as any, },
                { field: "operatorOption", headerName: "Operator", },
            ];
            for (let i = 1; i <= maxParameters; i++) {
                defs.push({ field: `Parameter ${i}` });
            }
            defs.push({ field: "Revenue", valueFormatter: (params: any) => `${params.value === undefined || params.value === "" ? 0 : params.value}%` } as any);
            defs.push({ 
                field: "Action", 
                cellRenderer: "deleteButtonRenderer",
                cellRendererParams: { api: data, rowIndex: index },
            });
            return defs;
        },
        [maxParameters]
    );

    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
        width: 120,
    }), []);
    console.log(data)
  return (
    <div className='w-full h-[200px]'>  
        <AgGridReact 
            className="ag-theme-alpine"
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowData={rowData}
            frameworkComponents={{ deleteButtonRenderer: DeleteButtonRenderer }}
        />
    </div>
  )
}

export default RuleTable