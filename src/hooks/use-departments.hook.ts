import { useQuery } from '@apollo/client'
import { DepartmentsResult } from 'graphql/departments/departments.types'
import { IDepartment } from 'interfaces/department.interface'
import { DEPARTMENTS } from 'graphql/departments'

export const useDepartments = (): [IDepartment[], boolean] => {
  const { data, loading } = useQuery<DepartmentsResult>(DEPARTMENTS)

  return [data?.departments || [], loading]
}
