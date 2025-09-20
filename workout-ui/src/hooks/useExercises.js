import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'

export const useExercises = () => {
  return useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      const response = await api.get('/api/exercises')
      return response.data
    },
  })
}

export const useCreateExercise = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (exerciseData) => {
      const response = await api.post('/api/exercises', exerciseData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] })
    },
  })
}