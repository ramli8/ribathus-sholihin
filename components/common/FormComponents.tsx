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
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
          focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
          placeholder-gray-400 dark:placeholder-gray-500
          transition-colors duration-200 ${className}`}
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
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        rows={rows}
        className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
          focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
          placeholder-gray-400 dark:placeholder-gray-500
          transition-colors duration-200 ${className}`}
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
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        type="number"
        className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
          focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
          placeholder-gray-400 dark:placeholder-gray-500
          transition-colors duration-200 ${className}`}
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
    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
      {title}
    </h3>
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
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 
          hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg cursor-pointer 
          text-gray-700 dark:text-gray-300 transition-colors duration-200"
      >
        <Upload size={20} />
        <span className="text-sm font-medium">{uploading ? 'Uploading...' : label}</span>
      </label>
    </>
  );
};
