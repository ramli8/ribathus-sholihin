import Swal, { SweetAlertOptions } from 'sweetalert2';

// Helper to check if dark mode is active
const isDarkMode = () => {
  return document.documentElement.classList.contains('dark') ||
         document.body.classList.contains('dark') ||
         window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getThemeColors = () => {
  const dark = isDarkMode();
  return {
    background: dark ? '#1e293b' : '#ffffff',
    color: dark ? '#f1f5f9' : '#1e293b',
    confirmButton: '#10b981',
    cancelButton: '#64748b',
    backdrop: dark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(0, 0, 0, 0.5)',
  };
};

const getBaseConfig = (): SweetAlertOptions => {
  const colors = getThemeColors();
  return {
    background: colors.background,
    color: colors.color,
    confirmButtonColor: colors.confirmButton,
    cancelButtonColor: colors.cancelButton,
    confirmButtonText: 'OK',
    cancelButtonText: 'Batal',
    reverseButtons: true,
    customClass: {
      popup: 'backdrop-blur-sm',
      confirmButton: 'transition-all hover:opacity-90',
      cancelButton: 'transition-all hover:opacity-90',
    },
  };
};

export const alert = {
  success: (title: string, message?: string) => {
    const config: SweetAlertOptions = {
      ...getBaseConfig(),
      title,
      text: message,
      icon: 'success',
    };
    return Swal.fire(config);
  },

  error: (title: string, message?: string) => {
    const config: SweetAlertOptions = {
      ...getBaseConfig(),
      title,
      text: message,
      icon: 'error',
    };
    return Swal.fire(config);
  },

  warning: (title: string, message?: string) => {
    const config: SweetAlertOptions = {
      ...getBaseConfig(),
      title,
      text: message,
      icon: 'warning',
      confirmButtonColor: '#f59e0b',
    };
    return Swal.fire(config);
  },

  info: (title: string, message?: string) => {
    const config: SweetAlertOptions = {
      ...getBaseConfig(),
      title,
      text: message,
      icon: 'info',
      confirmButtonColor: '#3b82f6',
    };
    return Swal.fire(config);
  },

  confirm: (title: string, message?: string): Promise<boolean> => {
    const config: SweetAlertOptions = {
      ...getBaseConfig(),
      title,
      text: message,
      icon: 'question',
      showCancelButton: true,
    };
    return Swal.fire(config).then((result) => result.isConfirmed);
  },

  fire: (config: SweetAlertOptions) => {
    return Swal.fire({
      ...getBaseConfig(),
      ...config,
    });
  },
};

export default alert;
