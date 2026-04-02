import React from 'react';
import { Upload } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  required, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="group">
      <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className={`w-full px-4 py-3.5 border border-stone-200 dark:border-stone-800 rounded-xl 
          bg-stone-50 dark:bg-stone-950 text-[14px] font-medium text-stone-900 dark:text-white
          focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-white focus:border-stone-900 dark:focus:border-white 
          placeholder-stone-400 dark:placeholder-stone-600 shadow-inner
          transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({ 
  label, 
  required, 
  rows = 3,
  className = '', 
  ...props 
}) => {
  return (
    <div className="group">
      <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        rows={rows}
        className={`w-full px-4 py-3.5 border border-stone-200 dark:border-stone-800 rounded-xl 
          bg-stone-50 dark:bg-stone-950 text-[14px] font-medium text-stone-900 dark:text-white
          focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-white focus:border-stone-900 dark:focus:border-white 
          placeholder-stone-400 dark:placeholder-stone-600 shadow-inner
          transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};

interface FormNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormNumber: React.FC<FormNumberProps> = ({ 
  label, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="group">
      <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
        {label}
      </label>
      <input
        type="number"
        className={`w-full px-4 py-3.5 border border-stone-200 dark:border-stone-800 rounded-xl 
          bg-stone-50 dark:bg-stone-950 text-[14px] font-medium text-stone-900 dark:text-white
          focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-white focus:border-stone-900 dark:focus:border-white 
          placeholder-stone-400 dark:placeholder-stone-600 shadow-inner
          transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-1.5 h-1.5 bg-stone-900 dark:bg-stone-100 rounded-full inline-block shrink-0"></span>
      <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-widest">
        {title}
      </h3>
    </div>
  );
};

interface UploadButtonProps {
  label: string;
  uploading?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ 
  label, 
  uploading = false,
  onChange 
}) => {
  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
        id={`upload-${label.toLowerCase().replace(/\s/g, '-')}`}
      />
      <label
        htmlFor={`upload-${label.toLowerCase().replace(/\s/g, '-')}`}
        className={`flex items-center justify-center gap-2 px-5 py-3.5 bg-stone-100 text-stone-700 border border-stone-200 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer uppercase tracking-widest text-[11px] font-bold shadow-sm ${
          uploading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <Upload size={16} strokeWidth={2.5} />
        <span>{uploading ? 'PROSES UNGGAH...' : label}</span>
      </label>
    </>
  );
};
