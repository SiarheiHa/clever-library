import { useEffect } from 'react';

import { useGetCategoriesQuery } from '../../../api';
import {
  useGetCurrentUserQuery,
  useUpdateUserAvatarMutation,
  useUploadFileMutation,
} from '../../../api/current-user-api';
import { ReactComponent as CatAvatar } from '../../../assets/images/cat-avatar.svg';
import { ReactComponent as PhotoIcon } from '../../../assets/images/icons/photo.svg';
import {
  hideLoader,
  selectLoaderVisibility,
  showLoader,
  showToast,
  useAppDispatch,
  useAppSelector,
} from '../../../store';
import { UserDetail } from '../../../types/types';
import { getURI } from '../../../utils';

import styles from './main-user-data.module.scss';

const MainUserData: React.FC<Pick<UserDetail, 'avatar' | 'firstName' | 'lastName' | 'id'>> = ({
  avatar,
  firstName,
  id,
  lastName,
}) => {
  const { isLoading: isCategoryLoading } = useGetCategoriesQuery('');
  const [uploadFile, { data: uploadFileData, isSuccess, reset, isLoading: isFileLoading, isError: isFileUploadError }] =
    useUploadFileMutation();
  const [updateAvatar, { isLoading: isAvatarUpdating, isError: isAvatarUpdatingError }] = useUpdateUserAvatarMutation();
  const isLoaderVisible = useAppSelector(selectLoaderVisibility);
  const dispatch = useAppDispatch();

  const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    if (e.target?.files?.[0]) {
      const img = e.target.files[0];

      const formData = new FormData();

      formData.append('files', img);

      uploadFile(formData);
    }
  };

  useEffect(() => {
    if (uploadFileData?.length && isSuccess) {
      reset();
      updateAvatar({
        id: String(id),
        data: {
          avatar: uploadFileData[0].id,
        },
      });
    }
  }, [id, isSuccess, reset, updateAvatar, uploadFileData]);

  useEffect(() => {
    if (!isLoaderVisible && (isFileLoading || isAvatarUpdating)) {
      console.log(isLoaderVisible);
      console.log('show');
      dispatch(showLoader());
    } else if (isLoaderVisible && !isFileLoading && !isAvatarUpdating && !isCategoryLoading) {
      dispatch(hideLoader());
      console.log('hide');
    }
  }, [dispatch, isAvatarUpdating, isCategoryLoading, isFileLoading, isLoaderVisible]);

  useEffect(() => {
    if (isSuccess && !isFileLoading && !isAvatarUpdating) {
      reset();
      dispatch(showToast({ mode: 'success', message: 'Фото успешно сохранено!' }));
    } else if (isFileUploadError || isAvatarUpdatingError) {
      reset();
      dispatch(showToast({ mode: 'warning', message: 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!' }));
    }
  }, [dispatch, isAvatarUpdating, isAvatarUpdatingError, isFileLoading, isFileUploadError, isSuccess, reset]);

  return (
    <div className={styles.wrapper} data-test-id='profile-avatar'>
      <input
        className={styles.input}
        type='file'
        name='file-upload'
        id='file-upload'
        accept='image/*'
        onChange={changeAvatar}
      />
      <div className={styles.avatar_input}>
        <div className={styles.image_wrapper}>
          {avatar ? (
            <img src={getURI(avatar)} alt='ava' className={styles.avatar} />
          ) : (
            <CatAvatar className={styles.avatar} />
          )}
        </div>

        <label htmlFor='file-upload' className={styles.icon_wrapper}>
          <div className={styles.backdrop} />
          <PhotoIcon className={styles.icon} />
        </label>
      </div>
      <h2 className={styles.name}>{`${lastName} ${firstName}`}</h2>
    </div>
  );
};

export { MainUserData };
