import { useEffect } from 'react';

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
import { getURI } from '../../../utils';

import styles from './main-user-data.module.scss';

const MainUserData = () => {
  const { data: currentUserData } = useGetCurrentUserQuery('1');
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
    if (uploadFileData?.length && currentUserData && isSuccess) {
      reset();
      updateAvatar({
        id: String(currentUserData.id),
        data: {
          avatar: uploadFileData[0].id,
        },
      });
    }
  }, [currentUserData, isSuccess, reset, updateAvatar, uploadFileData]);

  useEffect(() => {
    if (!isLoaderVisible && (isFileLoading || isAvatarUpdating)) {
      console.log(isLoaderVisible);
      console.log('show');
      dispatch(showLoader());
    } else if (isLoaderVisible && !isFileLoading && !isAvatarUpdating) {
      dispatch(hideLoader());
      console.log('hide');
    }
  }, [dispatch, isAvatarUpdating, isFileLoading, isLoaderVisible]);

  useEffect(() => {
    if (isSuccess && !isFileLoading && !isAvatarUpdating) {
      reset();
      dispatch(showToast({ mode: 'success', message: 'Фото успешно сохранено!' }));
    } else if (isFileUploadError || isAvatarUpdatingError) {
      reset();
      dispatch(showToast({ mode: 'warning', message: 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!' }));
    }
  }, [dispatch, isAvatarUpdating, isAvatarUpdatingError, isFileLoading, isFileUploadError, isSuccess, reset]);

  if (!currentUserData) {
    return null;
  }
  const { firstName, lastName, avatar } = currentUserData;

  return (
    <div className={styles.wrapper}>
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

        <input
          className={styles.input}
          type='file'
          name='file-upload'
          id='file-upload'
          accept='image/*'
          onChange={changeAvatar}
        />
      </div>
      <h2 className={styles.name} data-test-id='profile-avatar'>{`${lastName} ${firstName}`}</h2>
    </div>
  );
};

export { MainUserData };
