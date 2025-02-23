
interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}

export const TextInput = ({ value, onChange, placeholder, type }: TextInputProps) => {
  return (
    <div className="w-full">
      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-4 text-left rounded-lg transition-all duration-200 text-base border bg-gray-50/80 hover:bg-gray-50 text-[#132720] border-gray-100 hover:border-[#132720]/20 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#132720]/10 focus:border-[#132720]/30"
      />
    </div>
  );
};
