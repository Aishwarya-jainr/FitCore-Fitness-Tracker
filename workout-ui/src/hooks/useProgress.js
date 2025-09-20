import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'

export const useProgress = (ownerId, from, to) => {
  return useQuery({
    queryKey: ['progress', ownerId, from, to],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (ownerId) params.append('ownerId', ownerId)
      if (from) params.append('from', from)
      if (to) params.append('to', to)
      
      const response = await api.get(`/api/progress?${params}`)
      return response.data
    },
    enabled: !!ownerId,
  })
}

export const useCreateProgress = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (progressData) => {
      const response = await api.post('/api/progress', progressData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] })
    },
  })
}

export const useDeleteProgress = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (progressId) => {
      await api.delete(`/api/progress/${progressId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] })
    },
  })
}