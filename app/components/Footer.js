import Image from 'next/image';
import { site } from '../content/th';

const { nav, brand, footer } = site;
const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-logo">
          <Image
            className="logo-icon"
            src="/images/amath-logo-transparent.png"
            alt=""
            width={28}
            height={28}
          />
          {brand}
        </div>

        <p className="footer-text">{footer.copyright(currentYear)}</p>

        <ul className="footer-links">
          <li>
            <a href="#features">{nav.features}</a>
          </li>
          <li>
            <a href="#gallery">{nav.screenshots}</a>
          </li>
          <li>
            <a href="#download">{nav.download}</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
