import BoxFretes from "../../components/FretesAvailable/BoxFretes";
import Filter from "../../components/FretesAvailable/Filter";
import { Wrapper } from "../../styles";
import { ContainerBg, ContainerMain, ContainerFretes, Search } from "./styles";
import SearchImg from "../../assets/images/search.svg";
import useApi from "../../hooks/useApi";
import { useContext, useEffect, useState } from "react";
import { IPedido } from "../../interfaces";
import Layout from "../../components/Layout";
import { useQuery } from "react-query";
import Loading from "../../components/Global/Loading";
import { AuthContext } from "../../context/Auth/AuthContext";
import LoadingPage from "../../components/Global/LoadingPage";

const FretesAvailable = () => {
  const { user } = useContext(AuthContext);
  const { getPedidos } = useApi();
  const [inputText, setInputText] = useState();
  const {
    data: pedidos,
    isLoading,
    isError,
  } = useQuery("pedidosDisponiveis", getPedidos, {
    enabled: !!user,
  });
/*
  const { data, status } = useQuery(['search', inputText], () => getPedidos(), {
    refetchOnWindowFocus: false
  });
*/
  const handleChange = (e: any) => {

  };

  if (!user) return <LoadingPage />;
  return (
    <Layout>
      <ContainerBg>
        <Wrapper bgColor="#f5f5f5">
          <h1>Fretes Disponíveis</h1>
          <Search>
            <img src={SearchImg} alt="" />
            <input
              type="text"
              placeholder="Material"
              onChange={(e) => handleChange(e.target.value)}
            />
          </Search>
          <ContainerMain>
            <Filter />
            <ContainerFretes>
              {isError && <p>Houve um erro, tente novamente!</p>}
              {!isLoading && pedidos.data.length === 0 && (
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "40px",
                    fontWeight: "bold",
                  }}
                >
                  Não há pedidos postados
                </p>
              )}
              {!isLoading && pedidos ? (
                pedidos.data.map((pedido: IPedido) => (
                  <BoxFretes key={pedido.id} pedido={pedido} />
                ))
              ) : (
                <Loading />
              )}
            </ContainerFretes>
          </ContainerMain>
        </Wrapper>
      </ContainerBg>
    </Layout>
  );
};

export default FretesAvailable;