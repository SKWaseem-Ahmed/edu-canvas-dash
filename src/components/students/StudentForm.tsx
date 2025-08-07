import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Student, StudentFormData } from "@/types/student";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

interface StudentFormProps {
  student?: Student;
  onSubmit: (data: StudentFormData) => void;
  onCancel: () => void;
}

export const StudentForm = ({ student, onSubmit, onCancel }: StudentFormProps) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<StudentFormData>({
    defaultValues: student ? {
      name: student.name,
      email: student.email,
      phone: student.phone,
      age: student.age,
      grade: student.grade,
      address: student.address,
      enrollmentDate: student.enrollmentDate,
      gpa: student.gpa,
      status: student.status
    } : {
      name: '',
      email: '',
      phone: '',
      age: 18,
      grade: '',
      address: '',
      enrollmentDate: new Date().toISOString().split('T')[0],
      gpa: undefined,
      status: 'studying' as const
    }
  });

  const currentStatus = watch('status');

  const onFormSubmit = (data: StudentFormData) => {
    onSubmit(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl gradient-text">
            {student ? 'Edit Student' : 'Add New Student'}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Enter student's full name"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  placeholder="student@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...register('phone', { required: 'Phone number is required' })}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  {...register('age', { 
                    required: 'Age is required',
                    min: { value: 16, message: 'Age must be at least 16' },
                    max: { value: 100, message: 'Age must be less than 100' }
                  })}
                  placeholder="18"
                />
                {errors.age && (
                  <p className="text-sm text-destructive">{errors.age.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Grade/Class</Label>
                <Input
                  id="grade"
                  {...register('grade', { required: 'Grade is required' })}
                  placeholder="12th Grade, Senior, etc."
                />
                {errors.grade && (
                  <p className="text-sm text-destructive">{errors.grade.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gpa">GPA (Optional)</Label>
                <Input
                  id="gpa"
                  type="number"
                  step="0.01"
                  {...register('gpa', { 
                    min: { value: 0, message: 'GPA must be positive' },
                    max: { value: 4, message: 'GPA cannot exceed 4.0' }
                  })}
                  placeholder="3.75"
                />
                {errors.gpa && (
                  <p className="text-sm text-destructive">{errors.gpa.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="enrollmentDate">Enrollment Date</Label>
                <Input
                  id="enrollmentDate"
                  type="date"
                  {...register('enrollmentDate', { required: 'Enrollment date is required' })}
                />
                {errors.enrollmentDate && (
                  <p className="text-sm text-destructive">{errors.enrollmentDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={currentStatus} onValueChange={(value) => setValue('status', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="studying">Studying</SelectItem>
                    <SelectItem value="working">Working</SelectItem>
                    <SelectItem value="graduated">Graduated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                {...register('address', { required: 'Address is required' })}
                placeholder="Enter student's address"
                rows={3}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address.message}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button type="submit" variant="premium" className="flex-1">
                {student ? 'Update Student' : 'Add Student'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};