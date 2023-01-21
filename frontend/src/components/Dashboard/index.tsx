import Loc from "../../assets/images/geo-alt.svg";
import Arrow from "../../assets/images/arrow-right.svg";
import Calendar from "../../assets/images/calendar.svg";
import { ReactComponent as Min } from "../../assets/images/minus-circle.svg";
import { ReactComponent as Max } from "../../assets/images/minus-circle-plus.svg";
import { AlertText, Botoes, Box, BoxPedido, Header } from "./styles";
import {
  ContainerCalendar,
  ContainerEndereco,
  ContainerInfos,
  End,
  Seta,
} from "../FretesAvailable/BoxFretes/styles";
import { IPedido } from "../../interfaces";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useToggle } from "../../hooks/useToggle";
import Loading from "../Global/Loading";
import { AuthContext } from "../../context/Auth/AuthContext";
import useApi from "../../hooks/useApi";
import { useMutation, useQueryClient } from "react-query";

interface IBoxDashBoard {
  pedidos: IPedido[] | undefined;
  status: string;
  initialToggleValue?: boolean;
  isLoading: boolean;
  isError: boolean;
}

const BoxDashboard = ({
  pedidos,
  status,
  initialToggleValue,
  isLoading,
  isError,
}: IBoxDashBoard) => {
  const { toggle, value, setAsTrue } = useToggle(initialToggleValue);
  const { user } = useContext(AuthContext);
  const { deletePedido } = useApi();
  const client = useQueryClient();

  const formatDate = (pedido: any) => {
    const date = pedido.data_entrega.replaceAll("-", "/");
    const year = date.slice(0, 4);
    const day = date.slice(8);
    const month = date.slice(4, 8);
    return `${day}${month}${year}`;
  };

  const [color, setColor] = useState("");
  const changeColor = (status: string) => {
    switch (status) {
      case "Em negociação":
        setColor("#FF7B00");
        break;
      case "Aguardando coleta":
        setColor("#FFBF00");
        break;
      case "Em trânsito":
        setColor("#00A3FF");
        break;
      case "Concluído":
        setColor("#2EC34F");
        break;
      case "Cancelado":
        setColor("#FF0000");
    }
  };

  useEffect(() => {
    changeColor(status);
  }, [status]);

  const deletePedidoMutation = useMutation(
    "pedidosEN",
    (id: number) => deletePedido(id),
    {
      onSuccess: () => {
        client.refetchQueries("pedidosEN");
      },
    },
  );

  const handleClick = (e: any, id: number) => {
    e.preventDefault();
    deletePedidoMutation.mutate(id);
  };

  return (
    <Box>
      <Header status={color}>
        <div>
          <span></span>
          <h1>{status}</h1>
        </div>
        <button className="ShowFretes" onClick={toggle}>
          {value ? <Min /> : <Max />}
        </button>
      </Header>
      {isError && value === true && (
        <AlertText>Houve um erro, tente novamente!</AlertText>
      )}
      {isLoading && value === true && <Loading />}
      {!isLoading && pedidos && pedidos.length === 0 && value === true && (
        <AlertText>Não há pedidos</AlertText>
      )}
      {!isLoading &&
        pedidos &&
        pedidos.map((pedido) => (
          <BoxPedido key={pedido.id} active={value}>
            <ContainerInfos>
              <p>
                {pedido.cliente_first_name} {pedido.cliente_last_name}
              </p>
              <h2>{pedido.produto.nome}</h2>
              <ContainerEndereco>
                <End>
                  <img src={Loc} alt="Localização" />
                  <span>{`${pedido.origem.rua}, ${pedido.origem.numero} - ${pedido.origem.bairro}, ${pedido.origem.cidade}/${pedido.origem.estado}`}</span>
                </End>
                <Seta src={Arrow} alt="Seta" />
                <End>
                  <img src={Loc} alt="Localização" />
                  <span>{`${pedido.destino.rua}, ${pedido.destino.numero} - ${pedido.destino.bairro}, ${pedido.destino.cidade}/${pedido.destino.estado}`}</span>
                </End>
              </ContainerEndereco>
              <ContainerCalendar>
                <img src={Calendar} alt="Calendária" />
                <span>Entregar até {formatDate(pedido)}</span>
              </ContainerCalendar>
            </ContainerInfos>
            <Botoes>
              <Link to={`/fretes/${pedido.id}`}>Visualizar</Link>
              {user?.id === pedido.cliente && pedido.status === "TR" && (
                <button>Alterar status</button>
              )}
              {user?.id === pedido.cliente && pedido.status === "EN" && (
                <button
                  className="btnRed"
                  onClick={(e) => handleClick(e, pedido.id)}
                >
                  Excluir pedido
                </button>
              )}
            </Botoes>
          </BoxPedido>
        ))}
    </Box>
  );
};

export default BoxDashboard;
