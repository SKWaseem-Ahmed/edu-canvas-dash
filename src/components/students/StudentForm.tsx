import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Student, StudentFormData } from "@/types/student";
import { useStudents } from "@/hooks/useStudents";
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
  const { students } = useStudents();
  const { register, handleSubmit, setValue, watch, formState: { errors }, setError } = useForm<StudentFormData>({
    defaultValues: student ? {
      name: student.name,
      phone: student.phone,
      age: student.age,
      grade: student.grade,
      address: student.address,
      status: student.status
    } : {
      name: '',
      phone: '',
      age: 18,
      grade: '',
      address: '',
      status: 'studying' as const
    }
  });

  const currentStatus = watch('status');

  const onFormSubmit = (data: StudentFormData) => {
    console.log('Form submission data:', data);
    console.log('Current students:', students);
    
    // Check for duplicate name and phone combination
    const isDuplicate = students.some(existingStudent => {
      const nameMatch = existingStudent.name.toLowerCase() === data.name.toLowerCase();
      const phoneMatch = existingStudent.phone === data.phone;
      const isNotSelfEdit = existingStudent.id !== student?.id;
      
      console.log(`Checking student ${existingStudent.name}:`, {
        nameMatch,
        phoneMatch,
        isNotSelfEdit,
        existingName: existingStudent.name,
        newName: data.name,
        existingPhone: existingStudent.phone,
        newPhone: data.phone
      });
      
      return isNotSelfEdit && nameMatch && phoneMatch;
    });

    console.log('Is duplicate found:', isDuplicate);

    if (isDuplicate) {
      setError('name', { message: 'A student with this name and phone number already exists' });
      setError('phone', { message: 'A student with this name and phone number already exists' });
      return;
    }

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
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...register('phone', { required: 'Phone number is required' })}
                  placeholder="+91 9876543210"
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
                  {...register('age')}
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
                  {...register('grade')}
                  placeholder="12th Grade, Senior, etc."
                />
                {errors.grade && (
                  <p className="text-sm text-destructive">{errors.grade.message}</p>
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
                {...register('address')}
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