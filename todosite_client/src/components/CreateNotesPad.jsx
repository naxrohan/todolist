import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AddSharp, ArchiveOutlined, BrushSharp, DeleteOutlineOutlined, SaveOutlined, CloseSharp } from '@material-ui/icons'
import ColorDrop from './ColorDrop'
import {useDispatch, useSelector} from 'react-redux'
import {createNote} from '../redux/apiCalls'
import { mobile } from '../responsive'


const Container = styled.div`
    width: 80%;
    height: 100vh;
    background-color: #000000bb;
    display: flex;
    align-items: flex-start;
    justify-content: start;
    flex-direction: column;
`
const NotesPadHolder = styled.div``
const NoteItem = styled.div`
  width: 550px;
  height: 100%;
  border: 0.5px solid whitesmoke;
  border-radius: 10px;
  display: flex;
  /* align-items: flex-start; */
  /* justify-content: flex-start; */
  flex-direction: column;
  margin: 10px 0px 0px 20px;
  background-color: ${props => props.color};

  max-height: 90vh;
  min-height: 50vh;
  ${mobile({width: "auto"})}
`
const NoteTitle = styled.input`
  height: 30px;
  /* width: 100%; */
  padding: 10px;
  margin: 5px 10px 20px 5px;
  color: white;
  background-color: transparent;
  font-weight: 400;
  font-size: 20px;
  border: none;

  &:focus {
    outline: none;
  }
  ${mobile({padding: "5px 0px 5px 0px", margin: '0px 0px 5px 15px'})}

`
const NotePreview = styled.div`
  padding: 1px;
  min-height: 35vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {width: 5px;}
  ::-webkit-scrollbar-track {background: #555;}
  ::-webkit-scrollbar-thumb {background: #999;}
  ::-webkit-scrollbar-thumb:hover {background: #555;}
`
const NotePreviewItem = styled.div`
  color: #ffffffcc;
  font-size: 15px;
  margin-left: 0px;
  margin-bottom: 5px;
  width: 100%;
  text-overflow: clip;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    border-bottom: 0.1px solid gray;
  }
`
const NoteItemCb = styled.input`
  width: 20px;
  height: 20px;
  margin: 0 10px 0 10px;
`
const NoteItemTx = styled.input`
  width: 100%;
  color: white;
  background-color: transparent;
  font-size: 15px;
  border: none;

  &:focus {
    outline: none;
  }
  text-decoration: ${(props) => props.done===true ? 'line-through' : ''};
`
const NoteItemDel = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  opacity: 0;
  &:hover {
    opacity: 0.7;
    transform: scale(1.1);
  }
`
const NoteActionIcons = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const NoteIconBox = styled.div`
    height: 30px;
    width: 30px;
    margin-left: 30px;
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

const CreateNotesPad = () => {
  const userData = useSelector((state) => state.user.user);
  const currentUser = userData.currentUser;


  const [todoTitle, setTodoTitle] = useState("Title");
  const [todoColor, setTodoColor] = useState("darkbrown");
  const [todoItems, setTodoItems] = useState([]);
  const dispatch = useDispatch();
  
  const handleTitleChange = (e) => {
    let titleNote = e.target.value;
    setTodoTitle(titleNote)
  }
  
  const onColorChange = (e) => {
    let color = e.target.value;
    setTodoColor(color)
  }

  const handleSave = async (e) => {
    e.preventDefault();
    const newNoteFieldData = {
      title: todoTitle,
      color: todoColor,
      list: todoItems,
      userId: currentUser.id 
    };
    createNote( currentUser.id, newNoteFieldData , dispatch );

  }

  useEffect(() => {
    setTodoItems([
      {
        id: Math.floor(Math.random()*1000),
        taskName : 'Task',
        done: ''
      }
    ])
  },[]);

  //Add new task items
  const addNewItem = () => {
    const blankItem = {
      id: Math.floor(Math.random()*1000),
      taskName : 'Task',
      done: ''
    }
    setTodoItems(oldList => [...oldList, blankItem]);
  }

  // Handle changes to the task List
  const handleItemChange = async (id , e) => {
    let itemValue = e.target.type === 'checkbox' ? e.target.checked:  e.target.value;
    const updatedTodoItem = todoItems.map((itemX) => {
      if(itemX.id === id) {
        if (e.target.type === 'checkbox') {
          return  {...itemX, done: itemValue}
        }else {
          return  {...itemX, taskName: itemValue}
        }
      }
      return itemX;
    })
    setTodoItems(updatedTodoItem);
  }

  // handle item delete operation
  const handleItemDelete = (delid, e) => {
    e.preventDefault();
    console.log(delid);
    const filteredItems = todoItems.filter((itemY) => itemY.id !== delid);
    
    setTodoItems(filteredItems);
  }


  return (
    <Container>
        <NotesPadHolder>
        <NoteItem color={todoColor}>
            <NoteTitle onChange={handleTitleChange} value={todoTitle} />
            <NotePreview>
              { todoItems.map((item) =>  (
                  <NotePreviewItem key={item.id}>
                    <NoteItemCb 
                      type='checkbox' 
                      onChange={(e) => handleItemChange(item.id, e)} 
                      checked={ item.done=== true ? 'checked' : '' } />
                    <NoteItemTx 
                      onChange={(e) => handleItemChange(item.id, e)} 
                      value={item.taskName} 
                      done={ item.done=== true ? true : false } />
                    <NoteItemDel 
                      onClick={(e) => handleItemDelete(item.id, e)}>
                      <CloseSharp />
                    </NoteItemDel>
                  </NotePreviewItem>
                )) }

              <NotePreviewItem>
                <NoteIconBox onClick={addNewItem}>
                  <AddSharp />
                </NoteIconBox>
              </NotePreviewItem>

            </NotePreview>
            <NoteActionIcons>

                <NoteIconBox onClick={handleSave}>
                    <SaveOutlined />
                </NoteIconBox>

                <NoteIconBox >
                  <BrushSharp/>
                  <ColorDrop onColorChange={onColorChange} />
                </NoteIconBox>

                <NoteIconBox>
                  <ArchiveOutlined />
                </NoteIconBox>

                <NoteIconBox>
                  <DeleteOutlineOutlined/>
                </NoteIconBox>

            </NoteActionIcons>
          </NoteItem>
        </NotesPadHolder>
    </Container>
  )
}

export default CreateNotesPad