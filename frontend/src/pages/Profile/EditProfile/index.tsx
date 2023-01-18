import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContextProfile } from "..";
import {
  RegisterAddress,
  RegisterPerson,
} from "../../../components/RegisterComponents/RegisterFreteiroForm/styles";
import { useAddress } from "../../../hooks/useAddress";
import { useFreteiroForm } from "../../../hooks/useFreteiroForm";
import { useToggle } from "../../../hooks/useToggle";
import {
  ICliente,
  IClienteFormData,
  IFreteiro,
  IFreteiroFormData,
  IUserUpdateFormData,
} from "../../../interfaces";
import { schemaCliente, schemaFreteiro } from "../../ResgisterUser/schemas";
import perfil from "../../../assets/images/imgperfil.svg";
import User from "../../../assets/Svg/User";
import InputMask from "react-input-mask";
import Email from "../../../assets/Svg/Email";
import Password from "../../../assets/Svg/Password";
import ClosedEye from "../../../assets/Svg/ClosedEye";
import Eye from "../../../assets/Svg/Eye";
import { ContainerInfos } from "../../../components/FretesAvailable/BoxFretes/styles";
import { SpanYellow } from "../../../styles";
import Login from "../../Login";
import { BtnYellow } from "../../../components/RegisterComponents/RegisterClienteForm/styles";
import Loc from "../../../assets/Svg/Loc";
import {
  Container,
  GridContent,
  GridEndereco,
  InputsContainerGrid,
  PerfilImgUpdate,
} from "./styles";
import LabelInput from "../../../components/Profile/LabelInput";
import { isFreteiro } from "../../../utils/isFreteiro";
import { SubmitHandler } from "react-hook-form/dist/types";
import useApi from "../../../hooks/useApi";

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateCliente, updateFreteiro } = useApi();
  const [errorUpdate, setErrorUpdate] = useState("");
  const { user, handleSelectTab } = useContextProfile();
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const { value: password, toggle: togglePassword } = useToggle();
  const { value: confirmPassword, toggle: toggleConfirmPassword } = useToggle();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
    watch,
    getValues,
    completeAddress,
  } = useAddress<IUserUpdateFormData>(
    isFreteiro(user) ? schemaFreteiro : schemaCliente,
  );

  const onSubmit: SubmitHandler<IUserUpdateFormData> = (data) => {
    const formData: any = new FormData();
    const userUpdate = {
      full_name: data.full_name,
      email: data.email,
      cpf: data.cpf,
      url_foto: imagePreview,

    };
    if (isFreteiro(user)) {
      if (data.url_foto.length === 0) {
        setErrorUpdate("Imagem obrigatória!");
        return;
      }
      const { endereco } = data;
      console.log(endereco);
      Object.entries(userUpdate).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      Object.entries(endereco).forEach(([key, value]) => {
        if (value) formData.append(`endereco.${key}`, String(value));
      });
      updateFreteiro(user.id, formData)
        .then((res) => console.log(res))
        .catch((res) => console.log(res));
    } else {
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
    }
    //  colocar any no formdata caso queira fazer print
  /*  for (const [key, value] of formData) {
      console.log(`${key}: ${value}`);
    }*/
  };

  useEffect(() => {
    handleSelectTab(3);
  }, [handleSelectTab]);

  useEffect(() => {
    if (user) {
      setFocus("full_name");
      setImagePreview(user.url_foto);
      setValue("url_foto", user.url_foto);
      setValue("email", user.email);
      setValue("capa_foto", user.url_foto);
      setValue("full_name", `${user.first_name} ${user.last_name}`);
      setValue("cpf", user.cpf);

      if (isFreteiro(user)) {
        setValue("endereco.CEP", user.endereco.CEP);
        setValue("endereco.bairro", user.endereco.bairro);
        setValue("endereco.rua", user.endereco.rua);
        setValue("endereco.cidade", user.endereco.cidade);
        setValue("endereco.numero", user.endereco.numero);
        setValue("endereco.estado", user.endereco.estado);
        setValue("endereco.complemento", user.endereco.complemento);
      }
    }
  }, [user, setFocus, setValue]);

  const onChange = (e: any) => {
    const file = e.target.files[0];
    setValue("url_foto", file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handlePassword = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    togglePassword();
  };

  const handleConfirmPassword = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    toggleConfirmPassword();
  };

  if (!user) return <p>Carregando...</p>;
  // if (user && user.id !== Number(id)) navigate("/login");
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title">Edite seu perfil</h1>
        <PerfilImgUpdate>
          <label>
            <img src={imagePreview ? imagePreview : perfil} alt="perfil" />
            <input
              type="file"
              {...register("url_foto")}
              accept="image/jpeg,image/png,image/gif"
              onChange={onChange}
            />
            <p>Insira uma imagem</p>
          </label>

          <div>
            <h2>
              {watch("full_name")}{" "}
              {isFreteiro(user) &&
                `- ${watch("endereco.cidade")}/${watch("endereco.estado")}`}
            </h2>
            <p>{watch("email")}</p>
          </div>
        </PerfilImgUpdate>

        <InputsContainerGrid>
          <GridContent>
            <h2>Seus Dados</h2>
            <LabelInput
              Icon={User}
              isError={errors.full_name}
              errorMessage={errors.full_name?.message}
            >
              <input
                {...register("full_name")}
                type="text"
                placeholder="Seu nome completo"
              />
            </LabelInput>
            <LabelInput
              Icon={User}
              isError={errors.cpf}
              errorMessage={errors.cpf?.message}
            >
              <input
                {...register("cpf")}
                type="text"
                placeholder="Seu cpf"
                disabled
              />
            </LabelInput>
            <LabelInput
              Icon={Password}
              isError={errors.password}
              errorMessage={errors.password?.message}
            >
              <input
                type={password === true ? "text" : "password"}
                {...register("password")}
                placeholder="Digite sua senha para atualização"
              />
              <button type="button" onClick={handlePassword}>
                {password ? <ClosedEye /> : <Eye />}
              </button>
            </LabelInput>
            <LabelInput
              Icon={Password}
              isError={errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            >
              <input
                type={confirmPassword === true ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="Confirme sua senha para atualização"
              />
              <button type="button" onClick={handleConfirmPassword}>
                {confirmPassword ? <ClosedEye /> : <Eye />}
              </button>
            </LabelInput>
          </GridContent>
          {isFreteiro(user) && (
            <GridEndereco>
              <h2>Seu Endereço</h2>
              <div>
                <LabelInput
                  Icon={Loc}
                  isError={errors.endereco?.CEP}
                  errorMessage={errors.endereco?.CEP?.message}
                >
                  <InputMask
                    mask="99999-999"
                    {...register("endereco.CEP")}
                    placeholder="Seu CEP"
                    onBlur={completeAddress}
                  ></InputMask>
                </LabelInput>
                <LabelInput
                  Icon={Loc}
                  isError={errors.endereco?.rua}
                  errorMessage={errors.endereco?.rua?.message}
                >
                  <input
                    {...register("endereco.rua")}
                    type="text"
                    placeholder="Sua rua"
                  />
                </LabelInput>
                <LabelInput
                  Icon={Loc}
                  isError={errors.endereco?.numero}
                  errorMessage={errors.endereco?.numero?.message}
                >
                  <input
                    {...register("endereco.numero")}
                    type="text"
                    placeholder="Número da sua casa"
                  />
                </LabelInput>
              </div>
              <div>
                <LabelInput
                  Icon={Loc}
                  isError={errors.endereco?.bairro}
                  errorMessage={errors.endereco?.bairro?.message}
                >
                  <input
                    {...register("endereco.bairro")}
                    type="text"
                    placeholder="Seu bairro"
                  />
                </LabelInput>
                <LabelInput
                  Icon={Loc}
                  isError={errors.endereco?.cidade}
                  errorMessage={errors.endereco?.cidade?.message}
                >
                  <input
                    {...register("endereco.cidade")}
                    type="text"
                    placeholder="Sua cidade"
                  />
                </LabelInput>

                <LabelInput
                  Icon={Loc}
                  isError={errors.endereco?.estado}
                  errorMessage={errors.endereco?.estado?.message}
                >
                  <input
                    {...register("endereco.estado")}
                    type="text"
                    placeholder="Seu estado"
                  />
                </LabelInput>
              </div>
              <LabelInput
                Icon={Loc}
                isError={errors.endereco?.complemento}
                errorMessage={errors.endereco?.complemento?.message}
                style={{ gridColumn: "1/-1" }}
              >
                <input
                  {...register("endereco.complemento")}
                  type="text"
                  placeholder="Complemento"
                />
              </LabelInput>
            </GridEndereco>
          )}
        </InputsContainerGrid>
        <div className="containerButton">
          <BtnYellow>Atualizar Perfil</BtnYellow>
        </div>
      </form>
    </Container>
  );
};

export default EditProfile;
