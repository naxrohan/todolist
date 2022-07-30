import { ArchiveOutlined, DeleteOutlineOutlined, EditOutlined, PaletteOutlined } from '@material-ui/icons'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { deleteANote, getAllNotes } from '../redux/apiCalls'

const Container = styled.div`
    width: 80%;
    height: 100vh;
    background-color: #000000bb;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const TopBox = styled.div`
  flex: 1;
  width: 100%;
  margin-top: 10px;
`
const CreateNewNote = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
`

const BottomBox = styled.div`
  flex: 10;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &:-webkit-scrollbar {width: 5px;}
  &:-webkit-scrollbar-track {background: #f1f1f1;}
  &:-webkit-scrollbar-thumb {background: #888;}
  &:-webkit-scrollbar-thumb:hover {background: #555;}
`
const NotesListingHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
`
const NoteItem = styled.div`
  width: 250px;
  height: 100%;
  max-height: 400px;
  border: 0.5px solid whitesmoke;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin: 10px;
  background-color: ${props => props.color};
  cursor: pointer;
`
const NoteTitle = styled.h4`
  height: 30px;
  min-width: 200px;
  padding: 10px;
  color: white;
  font-weight: 400;
`
const NotePreview = styled.div`
  padding: 1px;
`
const NotePreviewItem = styled.div`
  color: #ffffffcc;
  font-size: 15px;
  margin-bottom: 15px;
  width: 240px;
  text-overflow: clip;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const NoteItemCb = styled.input`
  width: 20px;
  height: 20px;
  margin: 0 10px 0 10px;
`
const NoteItemTx = styled.input`
  color: white;
  background-color: transparent;
  font-size: 15px;
  border: none;

  &:focus {
    outline: none;
  }
  text-decoration:${props => props.done ? "line-through" : "none"};
`
const NoteActionIcons = styled.div`
  margin: 10px;
  display: flex;
  width: 200px;
  align-items: flex-end;
  justify-content: flex-end;
`
const NoteIconBox = styled.div`
    height: 30px;
    width: 30px;
    margin-left: 10px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    &:hover {
        background-color: #9Fafff;
        transform: scale(1.1);
    }
`

const NotesListing = () => {
  const notesData = useSelector((state) => state.user.note);
  const allNotes = notesData.notesActive;
  const dispatch = useDispatch();

  useEffect(() => {
    getAllNotes(dispatch);
  }, [dispatch]);

  const handelDelete = (e, itemD) => {
    e.preventDefault();
    deleteANote(itemD._id, dispatch);
  }

  return (
    <Container>
      <TopBox>
        <CreateNewNote>
          Create a Note
        </CreateNewNote>
      </TopBox>
      <BottomBox>
        <NotesListingHolder>
          { allNotes.length > 0 
            ? allNotes.map((item) => (
            <NoteItem color={item.color} key={item._id}>
              <Link to={`/note/${item._id}`}>
                <NoteTitle>{item.title}</NoteTitle>
              </Link>
              <NotePreview>
                {
                  item.list.map((todo, idx) => (
                    <NotePreviewItem key={idx}>
                      <NoteItemCb
                        type='checkbox'
                        defaultChecked={todo.done === true ? 'checked' : ''} />
                      <NoteItemTx
                        value={todo.taskName}
                        disabled
                        done={todo.done === true ? true : false} />
                    </NotePreviewItem>

                  )) 
                }
              </NotePreview>
              <NoteActionIcons>
                <Link to={`/note/${item._id}`}>
                  <NoteIconBox>
                    <EditOutlined />
                  </NoteIconBox>
                </Link>
                <NoteIconBox>
                  <PaletteOutlined />
                </NoteIconBox>
                <NoteIconBox>
                  <ArchiveOutlined />
                </NoteIconBox>
                <NoteIconBox onClick={(e) => handelDelete(e, item._id)}>
                  <DeleteOutlineOutlined />
                </NoteIconBox>
              </NoteActionIcons>
            </NoteItem>
          )) : null}
        </NotesListingHolder>
      </BottomBox>
    </Container>
  )
}

export default NotesListing