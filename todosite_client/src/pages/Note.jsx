import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import EditNotesPad from '../components/EditNotesPad'
import SidebarMenu from '../components/SidebarMenu'
import RefreshToken from '../components/RefreshToken';

const Container = styled.div``
const MainBody = styled.div`
  display: flex;
`

const Note = () => {
  return (
    <Container>
      <RefreshToken />
        <Navbar />
        <MainBody>
          <SidebarMenu />
          <EditNotesPad />
        </MainBody>
    </Container>
  )
}

export default Note