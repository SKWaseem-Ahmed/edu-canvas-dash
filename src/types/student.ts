export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  grade: string;
  address: string;
  enrollmentDate: string;
  gpa?: number;
  status: 'active' | 'inactive' | 'graduated';
}

export interface StudentFormData extends Omit<Student, 'id'> {}