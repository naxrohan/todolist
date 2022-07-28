import {createSlice} from "@reduxjs/toolkit";


const notesSlice = createSlice({
    name : 'notes',
    initialState: {
        notesActive: [],
        totalActive: 0,
        totalArchived: 0,
        totalDeleted: 0,
        isFetching: false,
        error: false,
        message : ""
    },
    reducers : {

        // Get All
        getNotesStart : (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getNotesSuccess : (state, action) => {
            state.notesActive = action.payload;
            state.isFetching = false;
            state.totalActive = action.payload.length;
        },
        getNotesFailure : (state) => {
            state.isFetching = false;
            state.error = true;
        },
        
        //Delete 
        deleteNoteStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteNoteSuccess: (state, action) => {
            state.isFetching = false;
            state.error= false;
            state.notesActive.splice(
                state.notesActive.findIndex( (item) => item._id === action.payload),
                1
            )
            state.totalActive -= 1 ;
            state.totalDeleted += 1;
            state.message = "note was delete.."
        },
        deleteNoteFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        
        // Add
        createNoteStart: (state) => {
            state.isFetching = false;
            state.error = false;
        },
        createNoteFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        createNoteSuccess: (state, action) => {
           state.totalActive += 1;
           state.totalArchived = action.payload.totalActive;
           state.notesActive.push(action.payload);
           state.message = "new note was created.."
        },

        //Edit
        updateNoteStart: (state) => {
            state.isFetching = false;
            state.error = false;
        },
        updateNoteFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        updateNoteSuccess: (state, action) => {
           state.totalArchived = action.payload.totalActive;
           //todo: update item in state array
           state.message = "new note was updated.."
        },

        loggedOutNotes: (state) => {
            state.notesActive = [];
            state.totalActive = 0;
            state.totalArchived = 0;
            state.totalDeleted = 0;
            state.message  = '';
            state.isFetching = false;
            state.currentUser = null;
            state.error = false;
        }

    }
});

export const {
    createNoteStart,
    createNoteFailure,
    createNoteSuccess,
    getNotesStart,
    getNotesSuccess,
    getNotesFailure,
    deleteNoteStart,
    deleteNoteFailure,
    deleteNoteSuccess,
    updateNoteFailure,
    updateNoteStart,
    updateNoteSuccess,
    loggedOutNotes } = notesSlice.actions;
export default notesSlice.reducer;