import moment from "moment";
import imageCompression from "browser-image-compression";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ClearIcon from "@material-ui/icons/Clear";

import styled from "styled-components";
import { mainTheme } from "../../style/config";
import { Photograph, PhotosStoreContext } from "../../stores/GalleryStore";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { ButtonError, ButtonSuccess } from "../../componentsReusable/Buttons";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { TCreatePhotograph } from "../../models/Photograph";
import TextFieldC from "../../componentsReusable/Forms";
import { DATE_TIME_FORMAT } from "../../models/Global";

const ButtonRemoveLogoStyled = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${mainTheme.palette.primary.main};
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
`;

const LogoContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: fit-content;
  margin: 20px auto;
  position: relative;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const LogoStyled = styled.div<{
  src?: string;
}>`
  height: 200px;
  width: auto;
  min-width: 200px;
  background-size: cover;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 5px;
  ${(props) =>
    props.src
      ? `background-image: url("${props.src}");`
      : `display: flex;
  justify-content: center;
  align-items: center;`}
`;

const TournamentCreateLogoTextFieldStyled = styled.input`
  display: none;
`;

type TPhotographForm = Omit<TCreatePhotograph, "path" | "createdAt">;

export interface PhotoFormProps {
  image: any;
  setImage: (image: any) => void;
  open: boolean;
  handleClose: () => void;
  selectedPhotograph?: Photograph;
}

const PhotoForm: React.FC<PhotoFormProps> = ({
  image,
  setImage,
  open,
  handleClose,
  selectedPhotograph,
}) => {
  const photoStore = useContext(PhotosStoreContext);
  const { register, handleSubmit, reset } = useForm<TPhotographForm>();

  const handleChangeImage = async (e: any) => {
    const image = e.target.files[0];
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(image, options);
      setImage(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: TPhotographForm) => {
    const imageUrl = getUrl();
    console.log(imageUrl);
    photoStore.createPhoto({
      description: data.description,
      createdAt: moment().format(DATE_TIME_FORMAT),
      path: imageUrl ?? "",
    });
    handleCloseForm();
  };

  const onRemoveImage = () => {
    setImage(null);
  };

  const getUrl = () => {
    if (image) {
      return URL.createObjectURL(image);
    } else {
      return undefined;
    }
  };

  const clearForm = () => {
    reset({
      description: "",
    });
    setImage(undefined);
  };

  const handleCloseForm = () => {
    handleClose();
    clearForm();
  };

  const imgUrl = getUrl();
  return (
    <Dialog open={open} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {selectedPhotograph ? "Edit" : "Create"} Photograph
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <LogoContainerStyled>
                <TournamentCreateLogoTextFieldStyled
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleChangeImage}
                />
                <label htmlFor="file">
                  <LogoStyled src={imgUrl}>
                    {imgUrl ? null : <AddAPhotoIcon />}
                  </LogoStyled>
                </label>
                {imgUrl ? (
                  <ButtonRemoveLogoStyled onClick={onRemoveImage}>
                    <ClearIcon fontSize="small" />
                  </ButtonRemoveLogoStyled>
                ) : null}
              </LogoContainerStyled>
            </Grid>
            <Grid item>
              <TextFieldC
                inputRef={register}
                name="description"
                label="description"
                color="secondary"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonSuccess type="submit">
            {selectedPhotograph ? "Update" : "Create"}
          </ButtonSuccess>
          <ButtonError onClick={handleCloseForm}>Cancel</ButtonError>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PhotoForm;
