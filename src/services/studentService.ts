import { supabase } from '@/lib/supabase'
import type { Student, StudentFormData } from '@/types/student'

export const studentService = {
  async getAll(): Promise<Student[]> {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching students:', error)
      throw error
    }
    
    return data.map(student => ({
      ...student,
      enrollmentDate: student.enrollment_date
    }))
  },

  async create(studentData: StudentFormData): Promise<Student> {
    const { data, error } = await supabase
      .from('students')
      .insert({
        ...studentData,
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating student:', error)
      throw error
    }
    
    return {
      ...data,
      enrollmentDate: data.enrollment_date
    }
  },

  async update(id: string, studentData: StudentFormData): Promise<Student> {
    const { data, error } = await supabase
      .from('students')
      .update({
        ...studentData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating student:', error)
      throw error
    }
    
    return {
      ...data,
      enrollmentDate: data.enrollment_date
    }
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting student:', error)
      throw error
    }
  }
}