import { createContext, useContext, useEffect, useState, useRef, useMemo } from "react";
import { API_URL } from "../config";

const AuthContext = createContext(null);

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth는 context provider (AuthProvider) 안에서 쓰여야 합니다.');
    return ctx;
}

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    const refreshInFlightRef = useRef(null);

    async function fetchJson(url, option) {
        const res = await fetch(url, option);
        if (!res.ok) {
            const text = await res.text().catch(() => "");
            const error = new Error(`HTTP ${res.status} : ${text}`)
            error.status = res.status;
            throw error;
        }

        return res.json();
    }

    async function refreshAccessToken({ signal } = {}) {
        console.log('[1] refreshAccessToken 진입, inFlight 있음?', !!refreshInFlightRef.current);

        if (refreshInFlightRef.current) {
            console.log('[2] inFlight promise 재사용');
            return refreshInFlightRef.current;
        }

        const p = (async () => {
            try {
                console.log('[3] fetchJson 호출 직전, signal aborted?', signal?.aborted);
                const { accessToken } = await fetchJson(`${API_URL}/token/refresh`,
                    {
                        method: 'POST',
                        credentials: 'include',
                        signal,
                    }
                );
                console.log('[4] fetchJson 성공, accessToken 수신');
                setAccessToken(accessToken);
                return accessToken;
            }
            catch (err) {
                console.log('[5] refreshAccessToken catch:', err?.name, err?.message);
                setAccessToken(null);
                setUser(null);
                return null;
            }
            finally {
                console.log('[6] refreshAccessToken finally, inFlight 초기화');
                refreshInFlightRef.current = null;
            }
        })();

        refreshInFlightRef.current = p;
        return p;
    }

    async function loadMe (token, { signal }) {
            const { user } = await fetchJson(`${API_URL}/me`, 
                {
                    headers: {Authorization : `Bearer ${token}`},
                    credentials: 'include',
                    signal,           
                }
            );
            setUser(user);
            return user;
    };

    async function login(email, pw) {
        try {
            const { accessToken } = await fetchJson(`${API_URL}/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, pw}),
                credentials: 'include'
            });
            setAccessToken(accessToken);
            await loadMe(accessToken, { signal } = {});
            console.log('login 성공');
        } catch(err) {
            console.error('login 내부 에러:', err);
            throw err;
        }
    }

    async function logout() {
        try {
            await fetch(`${API_URL}/logout`,
                {
                    method: 'POST',
                    credentials: 'include'
                }
            );
        }
        finally {
            setAccessToken(null);
            setUser(null);
        }
        
    }

    async function authFetch (url, options = {}) {
        const headers = new Headers(options.headers || {});
        if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

        let res = await fetch(url, {
            ...options,
            headers,
            credentials: 'include'
        })

        if (res.status === 401) {
            const newToken = await refreshAccessToken();
            if (!newToken) return res;
            
            const retryHeaders = new Headers(options.headers || {});
            retryHeaders.set("Authorization", `Bearer ${newToken}`);

            res = await fetch(url, {
                ...options,
                headers: retryHeaders,
                credentials: "include"
            });
        }   
        
        return res;
    }

    useEffect(() => {
        console.log('[A] useEffect 시작');
        const controller = new AbortController();

        (async () =>  {
            try {
                console.log('[B] refreshAccessToken 호출 전');
                const token = await refreshAccessToken({ signal: controller.signal });
                console.log('[C] refreshAccessToken 반환값:', token);
                if (token) await loadMe(token, { signal: controller.signal });
            } 
            catch(err) {
                console.log('[D] useEffect catch:', err?.name, err?.message);
                if (err?.name == "AbortError") return;
                setAccessToken(null);
                setUser(null);
            } 
            finally {
                console.log('[E] useEffect finally → setIsAuthLoading(false)');
                setIsAuthLoading(false);
            }
        })();

        return () => {
            console.log('[F] useEffect cleanup → controller.abort()');
            controller.abort();
        }
    },[]);

    const value = useMemo(
        () => ({
            user,
            userId: user?.id ?? null,
            accessToken,
            isAuthLoading,
            login,
            logout,
            authFetch,
            refreshAccessToken,
        }),
        [user, accessToken, isAuthLoading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}