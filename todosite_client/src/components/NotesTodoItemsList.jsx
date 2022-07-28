import { AddSharp, CloseSharp } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const NotePreview = styled.div`
  padding: 1px;
`
const NotePreviewItem = styled.div`
  color: #ffffffcc;
  font-size: 15px;
  margin-left: 0px;
  margin-bottom: 5px;
  width: 540px;
  text-overflow: clip;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.1px solid transparent;
  &:hover {
    border-bottom: 0.1px solid gray;
  }
`
const NotePreviewItemLast = styled.div`
color: #ffffffcc;
font-size: 15px;
margin-left: 0px;
margin-bottom: 5px;
width: 540px;
text-overflow: clip;
display: flex;
align-items: center;
justify-content: space-between;
`
const NoteItemCb = styled.input`
  width: 20px;
  height: 20px;
  margin: 5px 10px 5px 10px;
`
const NoteItemTx = styled.input`
  width: 450px;
  color: white;
  background-color: transparent;
  font-size: 15px;
  border: none;

  &:focus {
    outline: none;
  }
  text-decoration: ${(props) => props.done === true ? 'line-through' : ''};
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

const NotesTodoItemsList = ({ todoItemsData }) => {

    const [todoItems, setTodoItems] = useState([]);

    useEffect(() => {
        setTodoItems(todoItemsData);
    }, [todoItemsData]);

    //Add new task items
    const addNewItem = () => {
        const blankItem = {
            id: Math.floor(Math.random() * 1000),
            taskName: 'Task',
            done: ''
        }
        setTodoItems(oldList => [...oldList, blankItem]);
    }

    // Handle changes to the task List
    const handleItemChange = async (id, e) => {
        let itemValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const updatedTodoItem = todoItems.map((itemX) => {
            if (itemX.id === id) {
                if (e.target.type === 'checkbox') {
                    return { ...itemX, done: itemValue }
                } else {
                    return { ...itemX, taskName: itemValue }
                }
            }
            return itemX;
        })
        setTodoItems(updatedTodoItem);
    }

    // handle item delete operation
    const handleItemDelete = (delid, e) => {
        e.preventDefault();
        const filteredItems = todoItems.filter((itemY) => itemY.id !== delid);

        setTodoItems(filteredItems);
    }

    return (
        <NotePreview>
            {todoItems?.map((item) => (
                <NotePreviewItem key={item.id}>
                    <NoteItemCb
                        type='checkbox'
                        onChange={(e) => handleItemChange(item.id, e)}
                        checked={item.done === true ? 'checked' : ''} />
                    <NoteItemTx
                        onChange={(e) => handleItemChange(item.id, e)}
                        value={item.taskName}
                        done={item.done === true ? true : false} />
                    <NoteItemDel
                        onClick={(e) => handleItemDelete(item.id, e)}>
                        <CloseSharp />
                    </NoteItemDel>
                </NotePreviewItem>
            ))}

            <NotePreviewItemLast>
                <NoteIconBox onClick={addNewItem}>
                    <AddSharp />
                </NoteIconBox>
            </NotePreviewItemLast>

        </NotePreview>
    )
}

export default NotesTodoItemsList