import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { RootState } from '../store';
import { v4 as uuidv4 } from 'uuid';
import { GridSelectionModel } from '@mui/x-data-grid';

interface tableItem {
    id: string,
    name: string,
    age: number
}

interface tableData {
    items: tableItem[],
    selectedItems: GridSelectionModel | [],
    editData: tableItem | null,
    dialogOpen: boolean
};

interface selectedItems {
    selectedItems: GridSelectionModel | []
}


const initialState: tableData = {
    items: [],
    selectedItems: [],
    editData: null,
    dialogOpen: false
};

export const tableDataSlice: Slice = createSlice({
    name: 'TableData',
    initialState,
    reducers: {
        addItem: (state: RootState, action: PayloadAction<tableItem>) => {
            const newItem = {...action.payload, id: uuidv4() }
            state.items.push(newItem);
        },
        removeItem: (state: RootState, action: PayloadAction<selectedItems>) => {
            const selected_ids: GridSelectionModel = action.payload.selectedItems;

            let updatedItems: tableItem[] = state.items.filter((item: tableItem) => !selected_ids.includes(item.id));
            return {
                ...state,
                items: updatedItems,
                selectedItems: [],
            }
        },
        editItem: (state: RootState, action: PayloadAction<tableItem>) => {
            let updatedItems = state.items.map((item: tableItem) => {
                if(item.id === action.payload.id) {
                    return action.payload
                } else return item
            });
            state.items = updatedItems;
            state.editData = null;
        },
        updateSelectedItems: (state: RootState, action: PayloadAction<selectedItems>) => {
            state.selectedItems = action.payload.selectedItems || [];
        },
        updateEditData: (state: RootState, action: PayloadAction<tableItem>) => {
            state.editData = {
                id: action.payload.id,
                name: action.payload.name,
                age: action.payload.age,
            }
        },
        openDialog: (state: RootState, action: PayloadAction<selectedItems>) => {
            state.dialogOpen = true;
        },
        closeDialog: (state: RootState, action: PayloadAction<selectedItems>) => {
            state.dialogOpen = false;
        },
    },
})

//exporting the action creators
export const { addItem, removeItem, editItem, updateSelectedItems, updateEditData, openDialog, closeDialog } = tableDataSlice.actions;

//Selector functions (used inside useSelector)
export const selectTableData = (state: RootState) => state.items;
export const selectSelectedItems = (state: RootState) => state.selectedItems;
export const selectEditData = (state: RootState) => state.editData;
export const selectDialogOpen = (state: RootState) => state.dialogOpen;

export default tableDataSlice.reducer;