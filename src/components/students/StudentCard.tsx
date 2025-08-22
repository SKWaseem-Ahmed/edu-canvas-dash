import { motion } from "framer-motion";
import { Student } from "@/types/student";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/enhanced-button";
import { Edit, Trash2, Laptop, Mail, Phone, GraduationCap } from "lucide-react";

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onView: (student: Student) => void;
}

export const StudentCard = ({ student, onEdit, onView }: StudentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'studying': return 'bg-success text-success-foreground';
      case 'IT': return 'bg-warning text-warning-foreground';
      case 'non-IT': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover-glow cursor-pointer group h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Laptop className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {student.name}
                </CardTitle>
                <Badge className={getStatusColor(student.status)} variant="secondary">
                  {student.status}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>{student.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <GraduationCap className="w-4 h-4" />
              <span>Grade {student.grade} • Age {student.age}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-3 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onView(student);
              }}
              className="flex-1"
            >
              View
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(student);
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};