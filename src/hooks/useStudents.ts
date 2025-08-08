import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { studentService } from '@/services/studentService'
import type { Student, StudentFormData } from '@/types/student'
import { useToast } from '@/hooks/use-toast'

export const useStudents = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const {
    data: students = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['students'],
    queryFn: studentService.getAll,
  })

  const createStudentMutation = useMutation({
    mutationFn: studentService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast({
        title: "Success",
        description: "Student added successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add student",
        variant: "destructive",
      })
      console.error('Error creating student:', error)
    },
  })

  const updateStudentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: StudentFormData }) =>
      studentService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast({
        title: "Success",
        description: "Student updated successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update student",
        variant: "destructive",
      })
      console.error('Error updating student:', error)
    },
  })

  const deleteStudentMutation = useMutation({
    mutationFn: studentService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast({
        title: "Success",
        description: "Student deleted successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete student",
        variant: "destructive",
      })
      console.error('Error deleting student:', error)
    },
  })

  return {
    students,
    isLoading,
    error,
    createStudent: createStudentMutation.mutate,
    updateStudent: updateStudentMutation.mutate,
    deleteStudent: deleteStudentMutation.mutate,
    isCreating: createStudentMutation.isPending,
    isUpdating: updateStudentMutation.isPending,
    isDeleting: deleteStudentMutation.isPending,
  }
}