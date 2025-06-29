'use client';

import { useState } from 'react';
import { supabase } from '@/../lib/supabaseClient';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    setMessage(null);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('新規アカウントを作成しました。メールを確認してください。');
      console.log('登録されたユーザー:', data.user);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/test/login_success', // ← ここにリダイレクト先を書く
      },
    });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>新規アカウント作成</h1>

      <div>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="パスワード（6文字以上）"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleSignup}>メールアドレスでサインアップ</button>

      <hr />

      <button onClick={handleGoogleLogin}>Googleでサインアップ / ログイン</button>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
