import { Link } from "react-router-dom"
import styled from "styled-components"


export default function SuccessPage({ clicked, clientName, clientCpf, nameMovie, dateMovie, timeMovie, setClicked, setClientName, setClientCpf, setNameMovie, setDateMovie, setTimeMovie }) {
    if (clicked === []) {
        return (
            <div>Carregando...</div>
        )
    }

    function clearInfos() {
        setClicked([])
        setClientName("")
        setClientCpf("")
        setNameMovie("")
        setDateMovie("")
        setTimeMovie("")
    }

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{nameMovie}</p>
                <p>{dateMovie} - {timeMovie}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                <p>Assento 01</p>

            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {clientName}</p>
                <p>CPF: {clientCpf}</p>
            </TextContainer>
            <Link to="/">
                <button data-test="go-home-btn" onClick={(clearInfos)}>Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`