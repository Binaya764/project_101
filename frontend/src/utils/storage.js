// LocalStorage management for Virtual Diyo Wall and User Preferences
import { SAMPLE_DIYAS } from '../data/sampleDiyas';

const DIYAS_STORAGE_KEY = 'jhilimili_user_diyos';
const LIKES_STORAGE_KEY = 'jhilimili_user_likes';
const SOUND_STORAGE_KEY = 'jhilimili_sound_enabled';

export const getStoredDiyas = () => {
  try {
    const raw = localStorage.getItem(DIYAS_STORAGE_KEY);
    const userDiyas = raw ? JSON.parse(raw) : [];
    // User diyos go first, followed by sample community diyos
    return [...userDiyas, ...SAMPLE_DIYAS];
  } catch (e) {
    console.warn('Error reading from localStorage', e);
    return SAMPLE_DIYAS;
  }
};

export const saveUserDiya = (newDiya) => {
  try {
    const raw = localStorage.getItem(DIYAS_STORAGE_KEY);
    const userDiyas = raw ? JSON.parse(raw) : [];
    const updated = [newDiya, ...userDiyas];
    localStorage.setItem(DIYAS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Error saving to localStorage', e);
    return [newDiya];
  }
};

export const toggleLikeDiya = (diyaId) => {
  try {
    const raw = localStorage.getItem(LIKES_STORAGE_KEY);
    const likesSet = new Set(raw ? JSON.parse(raw) : []);
    const isLiked = likesSet.has(diyaId);
    if (isLiked) {
      likesSet.delete(diyaId);
    } else {
      likesSet.add(diyaId);
    }
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(Array.from(likesSet)));
    return !isLiked;
  } catch (e) {
    return false;
  }
};

export const getLikedDiyaIds = () => {
  try {
    const raw = localStorage.getItem(LIKES_STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    return new Set();
  }
};

export const getSoundPreference = () => {
  try {
    const raw = localStorage.getItem(SOUND_STORAGE_KEY);
    return raw === null ? true : JSON.parse(raw);
  } catch {
    return true;
  }
};

export const saveSoundPreference = (enabled) => {
  try {
    localStorage.setItem(SOUND_STORAGE_KEY, JSON.stringify(enabled));
  } catch {}
};
