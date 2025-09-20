import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'

export const useSessions = (ownerId, from, to) => {
  return useQuery({
    queryKey: ['sessions', ownerId, from, to],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (ownerId) params.append('ownerId', ownerId)
      if (from) params.append('from', from)
      if (to) params.append('to', to)
      
      const response = await api.get(`/api/sessions?${params}`)
      return response.data
    },
    enabled: !!ownerId,
  })
}

export const useCreateSession = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (sessionData) => {
      const response = await api.post('/api/sessions', sessionData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    },
  })
}

export const useDeleteSession = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (sessionId) => {
      await api.delete(`/api/sessions/${sessionId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    },
  })
}