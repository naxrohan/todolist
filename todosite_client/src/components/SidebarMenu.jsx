import React from 'react'
import styled from 'styled-components'
import { 
    NotesOutlined, 
    ArchiveOutlined, 
    DeleteOutline, 
    NoteAdd
} from '@material-ui/icons'
import { Link } from 'react-router-dom';
import { Badge } from '@material-ui/core';
import {useSelector} from "react-redux"
import { mobile } from '../responsive';

const Container = styled.div`
    width: 20%;
    height: 100vh;
    background-color: #000000aa;
    padding: 0px 11px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const MenuItemContainer = styled.div`
    width: 100%;
    height: 100%;
    flex: 20;
    padding: 40px 0px 0px 0px;
`
const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 30px;
    padding: 10px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    background-color: #9Fafaf;
    transition: all 0.5s ease;
    &:hover {
        background-color: #9Fafff;
        transform: scale(1.1);
    }
`
const Icon = styled.span`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const MenuText = styled.div`
    flex: 2;
    cursor: pointer;
    margin-left: 10px;
    font-size: 15px;
    ${mobile({visibility: "hidden"})}
`
const MenuFooter = styled.div`
    flex: 1;
`
const FooterText = styled.div`
    font-size: 12px;
`

const SidebarMenu = () => {
    const notesData = useSelector(state => state.user.note);
    const totalActive =  notesData.totalActive;
    const totalAchived = notesData.totalAchived;
    const totalDeleted = notesData.totalDeleted;
    
  return (
      <Container>
          <MenuItemContainer>
              <Link to={`/note`} style={{textDecoration: 'none'}}>
                  <MenuItem>
                      <Icon>
                            <NoteAdd />
                      </Icon>
                      <MenuText>Create&nbsp;Note</MenuText>
                  </MenuItem>
              </Link>
              <Link to={`/`} style={{textDecoration: 'none'}}>
                  <MenuItem>
                      <Icon>
                        <Badge badgeContent={totalActive} color="primary">
                          <NotesOutlined />
                        </Badge>
                      </Icon>
                      <MenuText>My&nbsp;Notes</MenuText>
                  </MenuItem>
              </Link>
              <MenuItem>
                  <Icon>
                    <Badge badgeContent={totalAchived} color="primary">
                      <ArchiveOutlined />
                    </Badge>
                  </Icon>
                <MenuText>Archives</MenuText>
            </MenuItem>
            <MenuItem>
                <Icon>
                    <Badge badgeContent={totalDeleted} color="primary">
                        <DeleteOutline />
                    </Badge>
                </Icon>
                <MenuText>Trash</MenuText>
            </MenuItem>
        </MenuItemContainer>
        <MenuFooter>
            <FooterText>v0.1</FooterText>
        </MenuFooter>
    </Container>
  )
}

export default SidebarMenu