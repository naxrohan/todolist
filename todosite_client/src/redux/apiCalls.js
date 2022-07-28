import { privateRequest, publicRequest } from '../requestMethods';
import { createNoteFailure, createNoteStart, createNoteSuccess, deleteNoteFailure, deleteNoteStart, deleteNoteSuccess, getNotesFailure, getNotesStart, getNotesSuccess, loggedOutNotes, updateNoteFailure, updateNoteStart, updateNoteSuccess } from './notesRedux';
import { loggedOutUser, loginFailure, loginStart, loginSuccess, refreshFailure, refreshStart, refreshSuccess} from './userRedux'

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login",user);
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure());
    }
}

export const refreshToken = async (dispatch, token) => {
    dispatch(refreshStart());
    try {
        const res = await publicRequest.post("/auth/refresh/",token);
        dispatch(refreshSuccess(res.data))
    } catch (error) {
        dispatch(refreshFailure());
    }
}

export const logout = async(dispatch) => {
    dispatch(loggedOutNotes());
    dispatch(loggedOutUser());
}

export const getAllNotes = async (dispatch) => {
    dispatch(getNotesStart());
    try {
        const res = await privateRequest.get(`/notes`);
        dispatch(getNotesSuccess(res.data))
    } catch (error) {
        dispatch(getNotesFailure());
    }
}

export const deleteANote = async (id, dispatch) => {
    dispatch(deleteNoteStart());
    try {
        //todo: uncomment the delete API
        //const res = await privateRequest.delete(`/notes/${id}`);
        dispatch(deleteNoteSuccess(id))
    } catch (error) {
        dispatch(deleteNoteFailure());
    }
}

export const createNote = async (userId,noteData,dispatch) => {
    dispatch(createNoteStart());
    try {
        const res = await privateRequest.post(`/notes/${userId}`,noteData);
        dispatch(createNoteSuccess(res.data))
    } catch (error) {
        dispatch(createNoteFailure());
    }
}

export const updateNote = async (noteId,noteData,dispatch) => {
    dispatch(updateNoteStart());
    try {
        const res = await privateRequest.post(`/notes/update/${noteId}`,noteData);
        dispatch(updateNoteSuccess(res.data))
    } catch (error) {
        dispatch(updateNoteFailure());
    }
}