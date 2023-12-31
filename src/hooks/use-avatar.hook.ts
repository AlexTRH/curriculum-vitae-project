import { useParams } from 'react-router-dom'
import { MutationFunction, useMutation } from '@apollo/client'
import { DELETE_AVATAR, UPLOAD_AVATAR } from 'graphql/profile'
import { UploadAvatarResult } from 'graphql/profile/profile.types'
import { USER } from 'graphql/users'

export const useAvatarUpload = (): [
  MutationFunction<UploadAvatarResult>,
  boolean,
] => {
  const { id } = useParams()

  const [uploadAvatar, { loading }] = useMutation<UploadAvatarResult>(
    UPLOAD_AVATAR,
    {
      refetchQueries: [{ query: USER, variables: { id } }],
    }
  )

  return [uploadAvatar, loading]
}

export const useAvatarDelete = (): [MutationFunction, boolean] => {
  const { id } = useParams()

  const [deleteAvatar, { loading }] = useMutation(DELETE_AVATAR, {
    refetchQueries: [{ query: USER, variables: { id } }],
  })

  return [deleteAvatar, loading]
}
