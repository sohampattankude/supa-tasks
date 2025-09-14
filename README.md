# SupaTasks 📱

A cross-platform React Native mobile app for personal task management with secure authentication and real-time updates powered by Supabase.

## 🚀 Features

- **Secure Authentication**: Email/password sign-up and sign-in with persistent sessions
- **Task Management**: Full CRUD operations (Create, Read, Update, Delete) for personal tasks
- **Real-time Updates**: Live synchronization across devices using Supabase real-time subscriptions
- **Row-Level Security**: Complete data isolation - users can only access their own tasks
- **Cross-platform**: Works on iOS, Android, and Web
- **Modern UI**: Clean, intuitive interface with smooth animations

## 🛠 Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Navigation**: React Navigation v6
- **Storage**: AsyncStorage for session persistence
- **State Management**: React Hooks (useState, useEffect)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Supabase account

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd supa-tasks
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Update `src/supabase.js` with your credentials:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

### 3. Database Setup

Run the following SQL in your Supabase SQL Editor:

```sql
-- Create tasks table
CREATE TABLE public.tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
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

### 4. Run the App

```bash
# Start the development server
npm start

# Run on specific platforms
npm run android  # Android
npm run ios      # iOS (macOS only)
npm run web      # Web browser
```

## 📱 App Structure

```
src/
├── components/
│   └── TaskItem.js          # Individual task component
├── screens/
│   ├── AuthScreen.js        # Sign-up/Sign-in screen
│   └── TasksScreen.js       # Main tasks management screen
└── supabase.js              # Supabase client configuration
```

## 🔐 Security Features

### Row-Level Security (RLS)
- All database operations are protected by RLS policies
- Users can only access tasks where `user_id` matches their authenticated user ID
- Policies cover SELECT, INSERT, UPDATE, and DELETE operations

### Authentication
- Secure email/password authentication via Supabase Auth
- Session persistence using AsyncStorage
- Automatic session refresh and restoration
- Secure logout with session cleanup

## 🧪 Testing RLS

To verify Row-Level Security is working:

1. Create two user accounts
2. Add tasks with each account
3. Verify each user only sees their own tasks
4. Try accessing tasks via direct API calls (should fail for other users' data)

## 📱 User Stories Implemented

### Epic 1: Authentication ✅
- **Story 1.1**: New users can sign up with email & password
- **Story 1.2**: Returning users can sign in and stay signed in
- **Story 1.3**: Users can log out at any time

### Epic 2: Task Management ✅
- **Story 2.1**: Add tasks with titles
- **Story 2.2**: View tasks in chronological order
- **Story 2.3**: Edit task titles and toggle completion
- **Story 2.4**: Delete tasks

### Epic 3: Row Level Security ✅
- **Story 3.1**: RLS policies ensure data isolation
- **Story 3.2**: Cross-user access attempts fail

### Epic 4: Real-Time Updates ✅
- **Story 4.1**: Task list auto-refreshes on changes
- **Story 4.2**: User-friendly error handling

### Epic 5: Documentation ✅
- **Story 5.1**: Comprehensive README with setup instructions
- **Story 5.2**: Clean code structure ready for deployment

## 🚀 Deployment

### Expo Build
```bash
# Build for production
expo build:android
expo build:ios
```

### Environment Variables
For production, use environment variables for Supabase credentials:

```javascript
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
```

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid API key"**: Check your Supabase URL and anon key
2. **"RLS policy violation"**: Ensure RLS policies are correctly set up
3. **"Network request failed"**: Check your internet connection and Supabase project status
4. **Tasks not updating**: Verify real-time subscriptions are enabled in Supabase

### Debug Mode
Enable debug logging by adding to your Supabase client:

```javascript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  db: {
    schema: 'public',
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});
```

## 📄 License

MIT License - feel free to use this project as a starting point for your own apps!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
- Check the troubleshooting section above
- Review Supabase documentation
- Open an issue in this repository

---

**Happy Task Managing! 🎉**
