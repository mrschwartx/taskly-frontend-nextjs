import { THEME_STORAGE_KEY } from './constants'

export const themeInitScript = `(function(){try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})||'"system"');var d=s==='dark'||(s!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.add(d?'dark':'light');r.style.colorScheme=d?'dark':'light'}catch(e){}})()`
