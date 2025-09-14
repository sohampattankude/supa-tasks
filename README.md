# SupaTasks

A simple task management app I built using React Native and Supabase. I wanted to create something that actually works well on mobile and doesn't require a complex backend setup.

## What it does

- Sign up/sign in with email and password
- Add, edit, and delete your personal tasks
- Tasks sync in real-time across devices
- Each user only sees their own tasks (security built-in)
- Works on Android, iOS, and web

## Tech I used

- React Native with Expo (because it's fast to develop with)
- Supabase for backend (auth + database + real-time)
- React Navigation for screen transitions
- AsyncStorage to keep users logged in

## Getting started

You'll need Node.js and a Supabase account.

### 1. Clone and install

```bash
git clone <your-repo-url>
cd supa-tasks
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Update `src/supabase.js` with your credentials

### 3. Create the database table

In your Supabase SQL editor, run this:

```sql
CREATE TABLE public.tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own" ON public.tasks 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "insert_own" ON public.tasks 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_own" ON public.tasks 
  FOR UPDATE USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "delete_own" ON public.tasks 
  FOR DELETE USING (auth.uid() = user_id);
```

### 4. Run it

```bash
npm start
```

## How it works

The app has two main screens:
- **AuthScreen**: Handles sign up/sign in
- **TasksScreen**: Shows your tasks and lets you add/edit/delete them

Each task is tied to your user account, so you only see your own tasks. The real-time updates mean if you add a task on your phone, it'll show up on your computer too.

## Security stuff

I used Supabase's Row Level Security (RLS) to make sure users can only see their own tasks. The database policies check that the `user_id` matches the logged-in user before allowing any operations.

## Testing

To make sure the security works:
1. Create two accounts
2. Add tasks with each account
3. Check that each user only sees their own tasks

## Building for production

```bash
expo build:android
expo build:ios
```

## Common issues

- **"Invalid API key"**: Double-check your Supabase credentials
- **Tasks not showing**: Make sure you ran the SQL setup in Supabase
- **App won't start**: Check that all dependencies are installed





