/*
  # Create posts table for blog application

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text, required)
      - `author` (text, required)
      - `created_at` (timestamp with time zone, auto-generated)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on posts table
    - Add policies for:
      - Anyone can read posts
      - Authenticated users can create posts
      - Users can update and delete their own posts
*/

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read posts"
  ON posts
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);