import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLists } from '../../utils/api';

const initialState = {
  tempLists: [],
  lists: [],
  selectedLists: [],
  status: 'idle',
  error: null,
  mode: 'view'
};
export const getLists = createAsyncThunk('lists/fetchLists', async () => {
  const response = await fetchLists();
  return response.data;
});

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    toggleSelectList(state, action) {
      const id = action.payload;
      if (state.selectedLists.includes(id)) {
        state.selectedLists = state.selectedLists.filter((item) => item !== id);
      } else {
        if (state.selectedLists.length < 2) {
          state.selectedLists.push(id);
        }
      }
    },
    startListCreation(state) {
      const first = state.lists.filter((item) => item.list_number === state.selectedLists[0]);
      const second = state.lists.filter((item) => item.list_number === state.selectedLists[1]);
      const addrightsideKey = first.map((item) => {
        return {
          ...item,
          side: 'right'
        };
      });
      const addleftsideKey = second.map((item) => {
        return {
          ...item,
          side: 'left'
        };
      });
      state.tempLists = [
        { id: 1, lists: addrightsideKey },
        { id: 2, lists: [] },
        { id: 3, lists: addleftsideKey }
      ];
      state.mode = 'create';
    },
    moveItem(state, action) {
      const { fromIndex, toIndex, itemId } = action.payload;
      const item = state.tempLists[fromIndex].lists.find((i) => i.id === itemId);
      state.tempLists[fromIndex].lists = state.tempLists[fromIndex].lists.filter((i) => i.id !== itemId);
      state.tempLists[toIndex].lists.push(item);
    },
    cancelListCreation(state) {
      state.tempLists = [];
      state.selectedLists = [];
      state.mode = 'view';
    },
    updateListCreation(state) {
      let updatedLists = [];
      updatedLists = [
        ...state.tempLists[0].lists.map((item) => ({
          ...item,
          list_number: state.selectedLists[0],
          side: 'right'
        })),

        ...state.tempLists[2].lists.map((item) => ({
          ...item,
          list_number: state.selectedLists[1],
          side: 'left'
        }))
      ];
      state.lists = updatedLists;
      state.tempLists = [];
      state.mode = 'view';
      state.selectedLists = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getLists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists = action.payload.lists;
      })
      .addCase(getLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { toggleSelectList, startListCreation, cancelListCreation, moveItem, updateListCreation } = listsSlice.actions;

export default listsSlice.reducer;
