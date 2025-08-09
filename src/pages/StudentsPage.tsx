import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Student, StudentFormData } from "@/types/student";
import { useStudents } from "@/hooks/useStudents";
import { StudentForm } from "@/components/students/StudentForm";
import { StudentDetails } from "@/components/students/StudentDetails";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Users, GraduationCap, UserCheck, UserX, Eye, Edit, Trash2, Loader2 } from "lucide-react";

const StudentsPage = () => {
  const { students, isLoading, createStudent, updateStudent, deleteStudent } = useStudents();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [detailsStudent, setDetailsStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.grade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddStudent = (data: StudentFormData) => {
    createStudent(data);
    setIsFormOpen(false);
  };

  const handleEditStudent = (data: StudentFormData) => {
    if (!selectedStudent) return;
    
    updateStudent({ id: selectedStudent.id, data });
    setSelectedStudent(null);
    setIsFormOpen(false);
  };

  const handleDeleteStudent = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const confirmed = window.confirm(`Are you sure you want to delete ${student.name}?`);
    if (confirmed) {
      deleteStudent(studentId);
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
    const studying = students.filter(s => s.status === 'studying').length;
    const working = students.filter(s => s.status === 'working').length;
    const graduated = students.filter(s => s.status === 'graduated').length;
    return { studying, working, graduated, total: students.length };
  };

  const stats = getStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-lg">Loading students...</span>
        </div>
      </div>
    );
  }

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
          <Card className={`hover-glow cursor-pointer transition-all ${statusFilter === 'all' ? 'ring-2 ring-primary shadow-glow' : ''}`} onClick={() => setStatusFilter('all')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">All Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`hover-glow cursor-pointer transition-all ${statusFilter === 'studying' ? 'ring-2 ring-success shadow-glow' : ''}`} onClick={() => setStatusFilter('studying')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-success-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">{stats.studying}</p>
                  <p className="text-sm text-muted-foreground">Studying</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`hover-glow cursor-pointer transition-all ${statusFilter === 'working' ? 'ring-2 ring-warning shadow-glow' : ''}`} onClick={() => setStatusFilter('working')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-warning flex items-center justify-center">
                  <UserX className="w-5 h-5 text-warning-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning">{stats.working}</p>
                  <p className="text-sm text-muted-foreground">Working</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`hover-glow cursor-pointer transition-all ${statusFilter === 'graduated' ? 'ring-2 ring-secondary shadow-glow' : ''}`} onClick={() => setStatusFilter('graduated')}>
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

          <Button variant="premium" onClick={openAddForm} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Student
          </Button>
        </motion.div>

        {/* Students Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-lg border shadow-sm"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredStudents.map((student, index) => (
                  <TableRow
                    key={student.id}
                    className="hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          student.status === 'studying' ? 'default' : 
                          student.status === 'working' ? 'secondary' : 
                          'outline'
                        }
                        className={
                          student.status === 'studying' ? 'bg-success text-success-foreground' :
                          student.status === 'working' ? 'bg-warning text-warning-foreground' :
                          'bg-secondary text-secondary-foreground'
                        }
                      >
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDetailsStudent(student)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditForm(student)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteStudent(student.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
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