import { ArrowBackSharp } from '@material-ui/icons';
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {useSelector} from "react-redux"

const MainWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background-color: #000000cc;
    color: white;
    height: 50px;
`
const SearchBox = styled.div`
    flex:2;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
`
const Input = styled.input`
    flex: 6;
    border: none;
    height: 30px;
    width: 80%;
    &:focus{
        border: none;
    }
`
const LogoBox = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: space-around;
`
const LogoText = styled.h2`
    flex:5;
    font-weight: 900;
    text-align: center;
    cursor: pointer;
`
const MenuHide = styled.span`
    flex: 1;
    cursor: pointer;
    margin: 5px;
    padding-left: 10px;
`
const RightLinkBox = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: end;
`
const LinkItem = styled.span`
    font-size: 12px;
    margin-right: 10px;
    cursor: pointer;
    color: white;
`

const Navbar = () => {
    const userData = useSelector((state) => state.user.user);
    const currentUser = userData.currentUser;
  return (
    <MainWrapper>
        <LogoBox>
            <MenuHide>
                <ArrowBackSharp />
            </MenuHide>
            <LogoText>
                📖&nbsp;Notes
            </LogoText>
        </LogoBox>
        <SearchBox>
            &nbsp;
            <Input  placeholder='Search Notes' />
        </SearchBox>

          <RightLinkBox>
            { currentUser === null && 
                    <Link to={`/register`}><LinkItem>Sign-Up</LinkItem></Link> }
            { currentUser === null && 
                    <Link to={`/login`}><LinkItem>Login</LinkItem></Link> }
            { currentUser !== null && 
                    <Link to={`/logout`}><LinkItem>Logout</LinkItem></Link>}
          </RightLinkBox>
    </MainWrapper>
  )
}

export default Navbar