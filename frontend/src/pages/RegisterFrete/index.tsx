import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Form from '../../components/RegisterFreteComponents/Form';
import { Wrapper } from '../../styles/globalStyles';
import { ContainerPrincipal } from './styles';

const index = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <ContainerPrincipal>
        <Wrapper bgColor="#f5f5f5">
          <Form />
        </Wrapper>
      </ContainerPrincipal>
      <Footer />
    </>
  );
};

export default index;
