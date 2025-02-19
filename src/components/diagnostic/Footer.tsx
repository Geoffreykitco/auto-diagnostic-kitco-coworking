
import { IMAGES } from '@/utils/constants';

export const Footer = () => {
  return (
    <footer className="mt-auto py-8 px-4">
      <div className="container mx-auto max-w-4xl flex flex-col items-center justify-center pt-4">
        <picture className="h-24 mb-4">
          <source srcSet={IMAGES.LOGO.FOOTER} type="image/png" />
          <img 
            src={IMAGES.LOGO.FOOTER}
            alt="KITCO - Des coworkings bien pensés" 
            className="h-full w-auto"
            loading="eager"
            decoding="sync"
          />
        </picture>
      </div>
    </footer>
  );
};
