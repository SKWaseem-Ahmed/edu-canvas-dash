export interface Student {
  id: string;
  name: string;
  phone: string;
  age: number | null;
  grade: string | null;
  address: string | null;
  status: 'studying' | 'IT' | 'non-IT';
  crossMain: string;
}

export interface StudentFormData extends Omit<Student, 'id'> {}