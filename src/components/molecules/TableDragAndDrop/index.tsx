import SortableList, { SortableItem } from 'react-easy-sort'
import arrayMove from 'array-move'
import { useEffect, useState } from "react";
import { TableDragAndDropProps } from "./types";
import TintoBlockEntry from '../../atoms/TintoBlockEntry';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


export const TableDragAndDrop: React.FC<TableDragAndDropProps> = (
    {onPositionUpdate, removeTintoBlockEntry, updateTintoBlockEntry, updateTintoBlock, tableHeaders, tableDragAndDropElements}
  ) => {
  const [items, setItems] = useState<any>(tableDragAndDropElements);

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setItems((array: any) => arrayMove(array, oldIndex, newIndex))
    const data = {old_position: oldIndex, new_position: newIndex}
    onPositionUpdate(data)
  }

  useEffect(() => {
    setItems(tableDragAndDropElements)
  }, [tableDragAndDropElements])

  return (
    <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell width={header.width} align="center">{header.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: any) => (
              <SortableItem key={item.id}>
                <TintoBlockEntry 
                  updateTintoBlock={updateTintoBlock}
                  removeTintoBlockEntry={removeTintoBlockEntry} 
                  updateTintoBlockEntry={updateTintoBlockEntry} 
                  item={item}
                />
              </SortableItem>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SortableList>
  );
};

export default TableDragAndDrop;