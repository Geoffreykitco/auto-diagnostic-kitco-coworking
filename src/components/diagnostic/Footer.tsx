
import { IMAGES } from '@/utils/constants';

export const Footer = () => {
  return (
    <footer className="mt-auto py-8 px-4">
      <div className="container mx-auto max-w-4xl flex flex-col items-center justify-center pt-4">
        <img 
          src={IMAGES.LOGO.FOOTER}
          alt="KITCO - Des coworkings bien pensés" 
          className="h-24 mb-4" 
        />
      </div>
    </footer>
  );
};
