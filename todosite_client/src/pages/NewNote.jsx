import React from 'react'
import styled from 'styled-components'
import CreateNotesPad from '../components/CreateNotesPad'
import Navbar from '../components/Navbar'
import SidebarMenu from '../components/SidebarMenu'
import RefreshToken from '../components/RefreshToken';

const Container = styled.div``
const MainBody = styled.div`
  display: flex;
`

const NewNote = () => {
  return (
    <Container>
      <RefreshToken />
        <Navbar />
        <MainBody>
          <SidebarMenu />
          <CreateNotesPad />
        </MainBody>
    </Container>
  )
}

export default NewNote