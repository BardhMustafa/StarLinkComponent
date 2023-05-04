// import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'Products',
      href: '#products',
    },
    {
      text: 'Services',
      href: '#services',
    },
    {
      text: 'About us',
      href: '#about',
    },
    {
      text: 'Contact',
      href: '#contact',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Explore',
      links: [
        { text: 'Home', href: '/' },
        { text: 'Products', href: '#products' },
        { text: 'Services', href: '#services' },
        { text: 'About us', href: '#about' },
        { text: 'Contact', href: '#contact' },
      ],
    },
    {
      title: '',
      links: [],
    },
    {
      title: 'Connect',
      links: [
        { text: 'Twitter', href: 'https://twitter.com/example' },
        { text: 'LinkedIn', href: 'https://linkedin.com/company/example' },
        { text: 'Instagram', href: 'https://instagram.com/example' },
        { text: 'Facebook', href: 'https://facebook.com/example' },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Twitter', icon: 'tabler:brand-twitter', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
  ],
  footNote: `
       <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 float-left rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)]"></span>
 All rights reserved.
     `,
};
