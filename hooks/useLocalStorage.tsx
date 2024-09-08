/*
 * 
 * 使用方法は以下のサンプルを参考にしてください
 *
 * =====================================================
 * :キーを保存する場合
 * useLocalStorage(theme_localkeyname_Str, String(theme_Bool), false);
 * 
 * :キーを呼び出す場合
 * const [keynname, value] = useLocalStorage(theme_localkeyname_Str, '', true);
 * 
 * =====================================================
 */

function useLocalStorage(keyname: string, value: string, getvalue: boolean) {

  if (getvalue) {
    if (!localStorage.getItem(keyname)) {
      localStorage.setItem(keyname, String(value));
    } else {
      value = String(localStorage.getItem(keyname));
    }
  } else {
    localStorage.setItem(keyname, value);
  }





  return [keyname, value, getvalue];
}

export default useLocalStorage;


//使い方
//  const showtime = useTimeDisplay(resttime_timeleft_Num);