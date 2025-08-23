-- Fix the column name mapping issue and create profiles table for authentication

-- First, let's see what the actual column name is and rename it properly
ALTER TABLE public.students RENAME COLUMN "Cross/Main" TO cross_main;

-- Create profiles table for user authentication
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Update students table to require authentication
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Remove the existing "Allow all operations" policy and create authenticated user policies
DROP POLICY IF EXISTS "Allow all operations on students" ON public.students;

CREATE POLICY "Authenticated users can view all students" 
ON public.students 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can create students" 
ON public.students 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update students" 
ON public.students 
FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can delete students" 
ON public.students 
FOR DELETE 
TO authenticated 
USING (true);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();