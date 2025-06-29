'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
const getUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('ユーザー取得エラー:', error.message);
    }

    if (user) {
      setUserEmail(user.email ?? null);
    } else {
      router.push('/test/auth');
    }

    setLoading(false);
  };


    getUser();
  }, [router]);

  if (loading) return <p>読み込み中...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>ダッシュボード</h1>
      <p>ログイン中のユーザー: {userEmail}</p>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push('/test/auth'); // ログアウト後にログイン画面に戻る
        }}
      >
        ログアウト
      </button>
    </div>
  );
}
