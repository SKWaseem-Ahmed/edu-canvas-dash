import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, ArrowRight } from "lucide-react";

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
            className="flex justify-center"
          >
            <Button asChild variant="premium" size="xl" className="gap-2">
              <Link to="/students">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>


      </div>
    </div>
  );
};

export default Index;
