export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact Us", href: "/#contact" },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/simplifyr-in" },
  { label: "Twitter", href: "https://twitter.com/simplifyr_in" },
  { label: "Instagram", href: "https://www.instagram.com/simplifyr_in" },
] as const;

export const hero = {
  title: "Welcome to Simplifyr,",
  tagline: "where complexity meets simplicity",
  prefix: "in",
  words: ["Software", "Accounting", "Web Development", "HR Solutions"],
  sub: "we're dedicated to streamlining your business operations and enhancing efficiency across various domains.",
  cta: "Get Started",
};

export const trustedBy = {
  label: "Trusted by",
  logos: [
    { src: "/images/logo1dark.svg", w: 150 },
    { src: "/images/logoroyaloak.svg", w: 200 },
    { src: "/images/logo2.svg", w: 110 },
    { src: "/images/logo3.svg", w: 120 },
  ],
};

export const pride = {
  lead: "At Simplifyr we pride ourselves on delivering exceptional solutions that drive real results for our clients.",
  body: "Our team of talented people work hand-in-hand with clients to create impactful results that resonate with their needs. We strive to exceed expectations and deliver a fabulous result.",
};

export type Service = {
  slug: string;
  title: string;
  icon: string;
  illustration: string;
  description: string;
  tagline: string;
};

export const services: Service[] = [
  {
    slug: "softwareredefined",
    title: "Software Redefined",
    icon: "/images/SoftwareLogo.svg",
    illustration: "/images/hrms.svg",
    description:
      "Optimize your operations with our cutting-edge software solutions. Whether you're managing human resources or any other aspect of your business, our software streamlines tasks, simplifies complexities, and enhances efficiency. Transform your workforce management with our software solutions.",
    tagline: "Streamline Your Workforce with Simplifyr's Software",
  },
  {
    slug: "accounts",
    title: "Accounting Made Simple",
    icon: "/images/AccLogo.svg",
    illustration: "/images/tax.svg",
    description:
      "Say goodbye to the complexities of financial management. Simplifyr offers intuitive accounting solutions designed to streamline your financial processes. From bookkeeping to financial reporting, our tools are crafted to simplify every aspect of your accounting needs. Experience transparency and control like never before.",
    tagline: "Simplify Your Finances with Simplifyr's Accounting Expertise",
  },
  {
    slug: "webdevelopment",
    title: "Web Development",
    icon: "/images/WebLogo.svg",
    illustration: "/images/web.svg",
    description:
      "Embark on a digital journey with Simplifyr's web development services. Our team of experts is dedicated to creating clean, intuitive, and user-friendly websites. We believe in simplicity without compromising on functionality. Let your online presence shine with websites that not only look great but also deliver a hassle-free user experience.",
    tagline: "Elevate Your Online Success with Simplifyr's Web Development Solutions",
  },
  {
    slug: "hrsolutions",
    title: "HR Solutions",
    icon: "/images/HrLogo.svg",
    illustration: "/images/hr.svg",
    description:
      "Our HR services are crafted to lift the burdens of managing your workforce, allowing you to concentrate on what truly matters—strategic growth. Explore our comprehensive HR solutions tailored to cover critical areas and provide you with the peace of mind you need for your business journey.",
    tagline: "Simplify your HR experience with Simplifyr",
  },
];

export const about = {
  title: "About Us",
  paragraphs: [
    "In the realm of business solutions, we specialize in providing comprehensive services to streamline your operations. From end-to-end accounting to customized software development, web development, and HR solutions, we offer intuitive and tailored solutions to meet your unique needs.",
    "Our suite of services is designed to simplify complexities and enhance efficiency across all aspects of your business. Whether you need assistance with accounting, software development, web design, or human resource administration, we are here to empower your business with straightforward solutions.",
    "At Simplifyr, we understand the importance of focusing on your core objectives. That's why our commitment goes beyond just simplifying tasks; we aim to boost your overall productivity and help you achieve operational excellence. Join us on a journey where complexity meets simplicity, and let Simplifyr be your trusted partner in unlocking your business's full potential. Your success is our priority, and we are dedicated to simplifying the path.",
  ],
};

export const contact = {
  title: "Contact",
  email: "info@simplifyr.in",
};

export const emailjs = {
  serviceId: "service_g0nzovz",
  templateId: "template_u0qm5t9",
  publicKey: "FAWfSg-1gRwf4Uljw",
  toEmail: "simplifyr.official@gmail.com",
};
