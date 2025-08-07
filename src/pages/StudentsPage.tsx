import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Student, StudentFormData } from "@/types/student";
import { mockStudents } from "@/data/mockStudents";
import { StudentCard } from "@/components/students/StudentCard";
import { StudentForm } from "@/components/students/StudentForm";
import { StudentDetails } from "@/components/students/StudentDetails";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Users, GraduationCap, UserCheck, UserX } from "lucide-react";

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [detailsStudent, setDetailsStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.grade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddStudent = (data: StudentFormData) => {
    const newStudent: Student = {
      ...data,
      id: Date.now().toString()
    };
    setStudents([...students, newStudent]);
    setIsFormOpen(false);
    toast({
      title: "Student Added",
      description: `${newStudent.name} has been successfully added to the system.`,
    });
  };

  const handleEditStudent = (data: StudentFormData) => {
    if (!selectedStudent) return;
    
    const updatedStudent: Student = {
      ...selectedStudent,
      ...data
    };
    setStudents(students.map(s => s.id === selectedStudent.id ? updatedStudent : s));
    setSelectedStudent(null);
    setIsFormOpen(false);
    toast({
      title: "Student Updated",
      description: `${updatedStudent.name}'s information has been updated successfully.`,
    });
  };

  const handleDeleteStudent = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const confirmed = window.confirm(`Are you sure you want to delete ${student.name}?`);
    if (confirmed) {
      setStudents(students.filter(s => s.id !== studentId));
      toast({
        title: "Student Deleted",
        description: `${student.name} has been removed from the system.`,
        variant: "destructive",
      });
    }
  };

  const openEditForm = (student: Student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setSelectedStudent(null);
    setIsFormOpen(true);
  };

  const getStats = () => {
    const active = students.filter(s => s.status === 'active').length;
    const inactive = students.filter(s => s.status === 'inactive').length;
    const graduated = students.filter(s => s.status === 'graduated').length;
    return { active, inactive, graduated, total: students.length };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">Student Management</h1>
          <p className="text-muted-foreground text-lg">Manage your students efficiently and beautifully</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-success-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">{stats.active}</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-warning flex items-center justify-center">
                  <UserX className="w-5 h-5 text-warning-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning">{stats.inactive}</p>
                  <p className="text-sm text-muted-foreground">Inactive</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">{stats.graduated}</p>
                  <p className="text-sm text-muted-foreground">Graduated</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search students by name, email, or grade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="graduated">Graduated</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="premium" onClick={openAddForm} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Student
          </Button>
        </motion.div>

        {/* Students Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <StudentCard
                  student={student}
                  onEdit={openEditForm}
                  onDelete={handleDeleteStudent}
                  onView={setDetailsStudent}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredStudents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first student"}
            </p>
            {!searchTerm && statusFilter === "all" && (
              <Button variant="premium" onClick={openAddForm}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Student
              </Button>
            )}
          </motion.div>
        )}
      </div>

      {/* Forms and Modals */}
      <AnimatePresence>
        {isFormOpen && (
          <StudentForm
            student={selectedStudent}
            onSubmit={selectedStudent ? handleEditStudent : handleAddStudent}
            onCancel={() => {
              setIsFormOpen(false);
              setSelectedStudent(null);
            }}
          />
        )}

        {detailsStudent && (
          <StudentDetails
            student={detailsStudent}
            onClose={() => setDetailsStudent(null)}
            onEdit={(student) => {
              setDetailsStudent(null);
              openEditForm(student);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentsPage;