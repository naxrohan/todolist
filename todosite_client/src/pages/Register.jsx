import styled from "styled-components"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255,200,200,0.3)
    ), url("https://images.pexels.com/photos/2300334/pexels-photo-2300334.jpeg?auto=compress&cs=tinysrgb&w=1000&h=700&dpr=1")
    center;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 50%;
    background-color: white;
`
const Title = styled.h1`
    font-weight: 400;
    font-size: 24px;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Input = styled.input`
    flex: 1;
    min-width: 30%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`
const TermsPrivacy = styled.p`
    font-size: 12px;
    padding: 20px 0px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin: 10px 0px;
`

const Register = () => {
  return (
    <Container>
        <Wrapper>
        <Title>Create An Form</Title>
            <Form>
                <Input placeholder="First Name"></Input>
                <Input placeholder="Last Name"></Input>
                <Input placeholder="UserName"></Input>
                <Input placeholder="Email-Id"></Input>
                <Input placeholder="Password"></Input>
                <Input placeholder="Confirm Password"></Input>
                <TermsPrivacy>
                    By Creating this account I agree to the processing of my personal data as per the Privacy Policy
                </TermsPrivacy>
                <Button >Create</Button>
            </Form>
        </Wrapper>

    </Container>
  )
}

export default Register