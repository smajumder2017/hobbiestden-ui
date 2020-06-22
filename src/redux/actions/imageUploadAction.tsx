import { GetActionTypes, createAsyncAction } from '../../utils/actionCreators';
import * as api from '../../apis';

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';


const ImageUploadActions = {
  uploadImage: createAsyncAction([UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE], 
    api.uploadImage),
};

export default ImageUploadActions;
export type AuthActionsType = GetActionTypes<typeof ImageUploadActions>;
