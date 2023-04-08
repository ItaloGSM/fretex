import {
  Container,
  Content,
  Negotiation,
  Content1,
  Content2,
  Content2Info,
} from './styles';
import caixas from '../../../assets/images/caixas.png';
import perfil from '../../../assets/images/perfil.svg';
import { ReactComponent as Arrowleft } from '../../../assets/images/arrow-left-circle.svg';
import geoalt from '../../../assets/images/geo-alt.svg';
import info from '../../../assets/images/info-circle.svg';
import { Link, useNavigate } from 'react-router-dom';
import {
  type ICliente,
  type IFreteiro,
  type IPedido,
  type IProposta,
} from '../../../interfaces';
import { Seta } from '../../RegisterFreteComponents/Form/styles';
import NegociationComponent from '../NegociationComponent';
import useApi from '../../../hooks/useApi';
import { useQuery } from 'react-query';
import Loading from '../../Global/Loading';
import { formatDate } from '../../../utils/formatDate';

interface IFreteDetail {
  pedido: IPedido;
  clientePedido: ICliente;
  actualUser: IFreteiro | ICliente;
  propostas: IProposta[];
}

const formatTurno = (turno: string): string => {
  switch (turno) {
    case 'TA':
      return 'Tarde';
    case 'MA':
      return 'Manhã';
    case 'NO':
      return 'Noite';
    default:
      return 'Turno não informado';
  }
};

const FreteDetailComponent = ({
  pedido,
  clientePedido,
  actualUser,
  propostas,
}: IFreteDetail): JSX.Element => {
  const navigate = useNavigate();
  const { tiposVeiculo } = useApi();

  const { data: tipoVeiculos, isLoading } = useQuery(
    ['tiposVeiculo'],
    tiposVeiculo,
  );
  const filteredArray =
    !isLoading &&
    tipoVeiculos.data.filter((element: any) =>
      pedido.tipo_veiculo.includes(element.id),
    );

  if (isLoading) return <Loading />;
  return (
    <Container>
      <div>
        <h1>Detalhes de frete</h1>
        <Seta
          onClick={() => {
            navigate(-1);
          }}
        >
          <Arrowleft /> Voltar
        </Seta>
      </div>
      <Content>
        <Content1>
          {pedido.produto?.imagem_url ? (
            <img src={pedido?.produto?.imagem_url} alt="caixas" />
          ) : (
            <img src={caixas} alt="caixas" />
          )}
          <div>
            <Link to={`/perfil/${pedido.cliente}`} className="userLink">
              {clientePedido.url_foto ? (
                <img
                  src={clientePedido.url_foto}
                  alt={clientePedido.first_name}
                />
              ) : (
                <img src={perfil} alt={clientePedido.first_name} />
              )}

              <span>
                {pedido.cliente_first_name} {pedido.cliente_last_name}
              </span>
            </Link>
            <h3>{pedido.produto.nome}</h3>
            <p>Pedido realizado em: {formatDate(pedido.criado_em)}</p>{' '}
          </div>
        </Content1>
        <Content2>
          <Content2Info>
            <img src={geoalt} alt="localização" />
            <div>
              <h4>Dados de coleta </h4>
              <p>
                <span>Cidade:</span> {pedido.origem.cidade}
              </p>
              <p>
                <span>Bairro:</span> {pedido.origem.bairro}
              </p>
              <p>
                <span>Rua:</span> {pedido.origem.rua}
              </p>
              <p>
                <span>Número:</span> {pedido.origem.numero}
              </p>
              <p>
                <span>Turno:</span> {formatTurno(pedido.turno_entrega)}
              </p>
            </div>
          </Content2Info>
          <Content2Info>
            <img src={geoalt} alt="localização" />
            <div>
              <h4>Dados de Entrega </h4>
              <p>
                <span>Cidade:</span> {pedido.origem.cidade}
              </p>
              <p>
                <span>Bairro:</span> {pedido.origem.bairro}
              </p>
              <p>
                <span>Rua:</span> {pedido.origem.rua}
              </p>
              <p>
                <span>Número:</span> {pedido.origem.numero}
              </p>
              <p>
                <span>Turno:</span> {formatTurno(pedido.turno_coleta)}
              </p>
            </div>
          </Content2Info>
          <Content2Info>
            <img src={info} alt="info" />
            <div>
              <h4>Informações adicionais </h4>
              <p>
                <span>Tipos de veículos aceitos:</span>{' '}
                {filteredArray.length > 0 &&
                  filteredArray.map((p: any) => `${p.descricao}/`)}
              </p>
              <p>
                <span>Data máxima de entrega:</span>{' '}
                {formatDate(pedido.data_entrega)}
              </p>
              <p>
                <span>Data de coleta:</span> {formatDate(pedido.data_coleta)}
              </p>
              <p>
                <span>Nome do recebedor:</span> {pedido.nomeDestinatario}
              </p>
              <p>
                <span>Observações:</span>{' '}
                {pedido.observacao
                  ? pedido.observacao
                  : 'Não possui observações'}
              </p>
            </div>
          </Content2Info>
        </Content2>
      </Content>

      <Negotiation>
        <NegociationComponent
          actualUser={actualUser}
          pedidoId={pedido.id}
          propostas={propostas}
          ownerPedido={pedido.cliente}
          pedidoVeiculos={pedido.tipo_veiculo}
        />
      </Negotiation>
    </Container>
  );
};

export default FreteDetailComponent;
