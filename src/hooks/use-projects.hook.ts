import { MutationFunction, useMutation } from '@apollo/client'
import { CREATE_PROJECT, DELETE_PROJECT, PROJECTS } from 'graphql/projects'
import { CreateProjectResult } from 'graphql/projects/projects.types'
import { IProject } from 'interfaces/project.interface'

export const useProjectCreate = (): [
  MutationFunction<CreateProjectResult>,
  boolean,
] => {
  const [createProject, { loading }] = useMutation<CreateProjectResult>(
    CREATE_PROJECT,
    {
      refetchQueries: [PROJECTS],
    }
  )
  return [createProject, loading]
}

export const useProjectDelete = (
  item: IProject
): [MutationFunction, boolean] => {
  const [deleteProject, { loading }] = useMutation(DELETE_PROJECT, {
    update(cache) {
      const id = cache.identify({ id: item.id, __typename: 'Project' })
      cache.evict({ id })
      cache.gc()
    },
  })

  return [deleteProject, loading]
}
