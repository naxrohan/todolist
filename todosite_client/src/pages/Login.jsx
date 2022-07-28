import { useState } from "react"
import styled from "styled-components"
import { login, logout } from "../redux/apiCalls"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(155, 55, 255, 0.5),
        rgba(255,100,100,0.3)
    );
    /* background-size: cover; */
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: white;
`
const Title = styled.h1`
    font-weight: 400;
    font-size: 24px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    min-width: 20%;
    margin: 20px 0px 0px 0px;
    padding: 10px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin: 10px 0px;

    &:disabled {
        cursor: none;
        background-color: gray;
    }
`
const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`

const Error = styled.span`
    color: red;
`

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const {isFetching, error} = useSelector((state) => state.user.user)

    const handleLogin = (e) => {
        e.preventDefault();

        login(dispatch, {username, password});
    }

    // logout logic
    const location = useLocation();
    let pathParts = location.pathname.split("/");
    const logoutAction = pathParts.length === 2 ? pathParts[1] : "";
    if(logoutAction === "logout"){
        logout(dispatch);
    }


  return (
    <Container>
        <Wrapper>
        <Title>Sign-In</Title>
            <Form >
                <Input placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />

                <Button 
                    onClick={handleLogin} 
                    disabled={isFetching}>Login</Button>
                
                
                <Link>Forgot Password ?</Link>
                <Link>Create Account</Link>

                {error && <Error>Invalid Login Credentials!!!</Error>}
            </Form>
        </Wrapper>

    </Container>
  )
}

export default Login