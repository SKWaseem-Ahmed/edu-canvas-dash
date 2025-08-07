import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen, Award, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto mb-8 flex items-center justify-center float">
            <GraduationCap className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            Student Management
            <br />
            Made Beautiful
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Effortlessly manage your students with our modern, intuitive platform. 
            Add, edit, and track student information with beautiful animations and smooth interactions.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild variant="premium" size="xl" className="gap-2">
              <Link to="/students">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl">
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          <Card className="hover-glow text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-6 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Student Management</h3>
              <p className="text-muted-foreground">
                Easily add, edit, and manage student profiles with comprehensive information tracking.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-glow text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-full bg-gradient-secondary mx-auto mb-6 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">Academic Tracking</h3>
              <p className="text-muted-foreground">
                Monitor grades, enrollment dates, and academic progress with detailed insights.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-glow text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-full bg-accent mx-auto mb-6 flex items-center justify-center">
                <Award className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-accent-foreground">Beautiful Interface</h3>
              <p className="text-muted-foreground">
                Enjoy a modern, responsive design with smooth animations and intuitive interactions.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-20"
        >
          <Card className="glass-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold gradient-text mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of educators who trust our platform for student management.
              </p>
              <Button asChild variant="premium" size="lg" className="gap-2">
                <Link to="/students">
                  Manage Students
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
