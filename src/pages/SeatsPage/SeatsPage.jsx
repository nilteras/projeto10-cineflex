import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components"
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";

export default function SeatsPage() {

    const parametro = useParams();

    const [seatsSession, setSeatsSession] = useState(null);
    const [color, setColor] = useState("#C3CFD9");
    const [clientName, setClientName] = useState('');
    const [clientCpf, setClientCpf] = useState('');
    const [clicked, setClicked] = useState('');
    const [nameMovie, setNameMovie] =useState('');
    const [dateMovie, setDateMovie] =useState('');
    const [timeMovie, setTimeMovie] =useState('');
   

    const navigate = useNavigate();


    useEffect(() => {

        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametro.idSession}/seats`


        const promise = axios.get(URL);

        promise.then((resposta) => {
            setSeatsSession(resposta.data);
            console.log(resposta.data.seats);



        }
        );
        promise.catch((erro) => {
            console.log(erro.response.data);
            console.log('ta dando erro');
        });
    }, []);

    function selectSeat(number) {
        setColor("#1AAE9E");
         const newArray = ([...clicked, number])
         setClicked(newArray)
         console.log(newArray)
    

    if (color === "#1AAE9E") {
        setColor("#C3CFD9")


    }
}

if (seatsSession === null) {
    return (

        <div>Carregando...</div>

    )
}

// function turnIdentifications(){
//     setNameMovie(seatsSession.movie.title)
//     setDateMovie(seatsSession.day.date)
//     setTimeMovie(seatsSession.name)
// }

// turnIdentifications();

function addInfClient(e) {
    e.preventDefault();

    const informations = { ids: clicked, name: clientName, cpf: clientCpf };
    console.log(informations);

    const url_post = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
    const promise = axios.post(url_post, informations)

    promise.then(navigate("/sucesso"))
    promise.catch(err => console.log(err.response.data))

}

return (
    <PageContainer>
        Selecione o(s) assento(s)

        <SeatsContainer>
            {seatsSession.seats.map((s) => (
                (s.isAvailable ? (
                    <SeatItem color={color} key={s.id} data-test="seat" onClick={() => selectSeat(s.id)}>
                        {s.name}
                    </SeatItem>
                ) : (
                    <SeatItem color={"#FBE192"} key={s.id} data-test="seat" onClick={() => alert('Esse assento não está disponível')} >
                        {s.name}
                    </SeatItem>
                ))
            ))}

        </SeatsContainer>

        <CaptionContainer>
            <CaptionItem>
                <CaptionCircle green />
                Selecionado
            </CaptionItem>
            <CaptionItem>
                <CaptionCircle gray />
                Disponível
            </CaptionItem>
            <CaptionItem>
                <CaptionCircle yellow />
                Indisponível
            </CaptionItem>
        </CaptionContainer>

        <form onSubmit={addInfClient} >
            <FormContainer>
                <Title forHtml="name">Nome do comprador:</Title>
                <input
                    data-test="client-name"
                    id="name"
                    type="text"
                    placeholder="Digite seu nome..."
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    required
                />


                <Title forHtml="cpf">CPF do comprador:</Title>
                <input
                    data-test="client-cpf"
                    placeholder="Digite seu CPF..."
                    id="cpf"
                    type="text"
                    maxLength={11}
                    minLength={11}
                    value={clientCpf}
                    onChange={e => setClientCpf(e.target.value)}
                    required
                />
                <button data-test="book-seat-btn" type="submit" >Reservar Assento(s)</button>
            </FormContainer>
        </form>

        <FooterContainer data-test="footer">
            <Footer
                image={seatsSession.movie.posterURL}
                title={seatsSession.movie.title}
                day={seatsSession.day.weekday}
                time={seatsSession.name}

            />
        </FooterContainer>

    </PageContainer>
)
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const Title = styled.label`

    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #293845;
`

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: #C3CFD9;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;

    ${props =>
        props.green && css`
   background-color: #1AAE9E;
   border: 1px solid #1AAE9E;
  `};

  ${props =>
        props.gray && css`
   background-color:#C3CFD9;
   border: 1px solid #C3CFD9;
  `};
  ${props =>
        props.yellow && css`
   background-color:#FBE192;
   border: 1px solid #FBE192;
  `};
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: ${props => props.color};     // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    cursor: pointer;
    /* ${props =>
        props.green && css`
   background-color: #1AAE9E;
   border: 1px solid #1AAE9E;
  `};

  ${props =>
        props.gray && css`
   background-color:#C3CFD9;
   border: 1px solid #C3CFD9;
  `};
  ${props =>
        props.yellow && css`
   background-color:#FBE192;
   border: 1px solid #FBE192;
  `}; */
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`