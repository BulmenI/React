import { useEffect, useState, useMemo, useCallback} from "react";

export function useDebounce(value, time){
    
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() =>{
        const timer = setTimeout(() => setDebounceValue(value), time)

        return () => clearTimeout(timer);

    },[value, time])


    return debounceValue;
    

}

export function useLocalStorage(key, initialValue){
   
    const [value, setValue] = useState(() => {

        try{
            const stored = localStorage.getItem(key);
            if(stored) {
                return JSON.parse(stored)

            } else {
                return initialValue;
            }

        }catch(error){
            console.error(`Ошибка чтения localStorage ключа "${key}":`, error);
            return initialValue;
        }

    });

    useEffect(()=>{
        try{
            localStorage.setItem(key, JSON.stringify(value));
        }catch(error){

            console.error(`Ошибка записи в localStorage ключа "${key}":`, error);
        }
        
    },[value, key]);

    return [value, setValue];
       
}


 const cache = new Map();

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Проверяем кэш
    const cached = cache.get(url);

    // Если есть свежие данные и promise отсутствует (запрос уже завершён) — берём из кэша
    if (cached && cached.data && Date.now() - cached.timestamp < 5000) {
      setData(cached.data);
      setLoading(false);
      return;
    }

    // Если promise есть — значит запрос в процессе, подписываемся на него
    if (cached && cached.promise) {
      let cancelled = false;
      cached.promise.then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      }).catch((err) => {
        if (!cancelled) setError(err.message);
      });
      return () => { cancelled = true; };
    }

    // Иначе — запускаем новый запрос
    const fetchPromise = fetch(url)
      .then(res => res.json())
      .then((result) => {
        // Обновляем кэш: сохраняем данные, убираем promise
        cache.set(url, { data: result, timestamp: Date.now() });
        setData(result);
      })
      .catch((err) => {
        // В случае ошибки удаляем запись или оставляем без данных
        cache.delete(url);
        setError(err.message);
      })
      .finally(() => setLoading(false));

    // Кладём в кэш промис (данных ещё нет)
    cache.set(url, { data: null, timestamp: Date.now(), promise: fetchPromise });

    // cleanup при размонтировании: если запрос ещё не завершён, можно отменить fetch через AbortController
  }, [url]);

  return { data, loading, error };
}

