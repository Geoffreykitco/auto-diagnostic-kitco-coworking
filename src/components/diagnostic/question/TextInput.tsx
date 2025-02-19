
interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const TextInput = ({ value, onChange, placeholder }: TextInputProps) => {
  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-4 text-left rounded-lg transition-all duration-200 text-sm md:text-base border bg-gray-50/80 hover:bg-gray-50 text-gray-700 border-gray-100 hover:border-[#12271F]/20 hover:shadow-sm"
      />
    </div>
  );
};
