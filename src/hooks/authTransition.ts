type Listener = (locked: boolean) => void;

const listeners = new Set<Listener>();

export const authTransition = {
  locked: false as boolean,

  setLocked(value: boolean) {
    this.locked = value;
    // dispatch old events for backward compatibility
    if (value) window.dispatchEvent(new Event("auth-transition-start"));
    else window.dispatchEvent(new Event("auth-transition-complete"));

    // notify subscribers
    listeners.forEach((fn) => {
      try { fn(this.locked); } catch (e) { /* ignore */ }
    });
  },

  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

// also expose on window for any legacy reads (read-only intended)
declare global {
  interface Window {
    authTransition?: { locked: boolean };
  }
}
window.authTransition = window.authTransition || { locked: authTransition.locked };